// Free trial request form. Posts to the docs-free-trial Cloudflare Worker,
// which forwards each request to the #sales Slack channel.
// Use <FreeTrialForm /> inline, or <FreeTrialForm modal /> for a button that opens it in a modal.

export const FreeTrialForm = ({ modal = false, title = "Request a free trial" }) => {
  const ENDPOINT = "https://free-trial-request.salisbury88.workers.dev";
  // Cloudflare Turnstile site key (public). Leave empty to skip the widget.
  const TURNSTILE_SITE_KEY = "0x4AAAAAAFd7ZBja-KRVzASn";

  const PRODUCTS = ["Data API", "Streams", "RPC Nodes", "Data Feeds"];
  const VOLUMES = [
    "Under 1M requests/month",
    "1M - 10M requests/month",
    "10M - 100M requests/month",
    "100M+ requests/month",
    "Not sure yet",
  ];

  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [telegram, setTelegram] = useState("");
  const [project, setProject] = useState("");
  const [products, setProducts] = useState([]);
  const [volume, setVolume] = useState("");
  const [website, setWebsite] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [widgetId] = useState(
    () => "ft-turnstile-" + Math.random().toString(36).slice(2)
  );

  // Keep in step with FREE_EMAIL_DOMAINS in the Worker.
  const FREE_EMAIL = ["gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.uk", "ymail.com", "hotmail.com", "hotmail.co.uk", "outlook.com", "live.com", "msn.com", "icloud.com", "me.com", "mac.com", "aol.com", "proton.me", "protonmail.com", "pm.me", "gmx.com", "gmx.de", "gmx.net", "web.de", "mail.com", "yandex.com", "yandex.ru", "mail.ru", "qq.com", "163.com", "126.com", "zoho.com", "tutanota.com", "tuta.io", "hey.com", "fastmail.com"];
  const WORK_EMAIL_MSG = "Please use your work email so we can set up your trial.";
  const TELEGRAM_MSG = "Check your Telegram username, or leave it blank.";
  const isTelegram = (v) => /^@?[A-Za-z0-9_]{5,32}$/.test(v.trim().replace(/^(https?:\/\/)?(t\.me|telegram\.me)\//i, ""));
  const isFreeEmail = (v) => FREE_EMAIL.includes((v.trim().split("@")[1] || "").toLowerCase());

  const needsVolume = products.includes("Data API");

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    const render = () => {
      const el = document.getElementById(widgetId);
      if (!el || el.childElementCount || !window.turnstile) return;
      window.turnstile.render(el, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (t) => setToken(t),
        "expired-callback": () => setToken(""),
      });
    };
    if (window.turnstile) return render();
    let script = document.getElementById("cf-turnstile-script");
    if (!script) {
      script = document.createElement("script");
      script.id = "cf-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", render);
    return () => script.removeEventListener("load", render);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  const toggleProduct = (p) =>
    setProducts((cur) =>
      cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]
    );

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (isFreeEmail(email)) return setError(WORK_EMAIL_MSG);
    if (telegram.trim() && !isTelegram(telegram)) return setError(TELEGRAM_MSG);
    if (!products.length) return setError("Pick at least one product.");
    if (needsVolume && !volume) return setError("Select your expected API volume.");
    if (TURNSTILE_SITE_KEY && !token) return setError("Please complete the verification check.");

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          company,
          telegram: telegram.trim(),
          project,
          products,
          volume: needsVolume ? volume : "",
          website,
          token,
          page: window.location.href,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      setError(
        err.message === "personal email" ? WORK_EMAIL_MSG
          : err.message === "invalid telegram" ? TELEGRAM_MSG
          : "Something went wrong. Please try again in a moment."
      );
      if (window.turnstile) window.turnstile.reset("#" + widgetId);
    }
  };

  const label = { display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "6px" };
  const input = {
    width: "100%",
    padding: "10px 12px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid rgba(128,128,128,0.4)",
    backgroundColor: "transparent",
    color: "inherit",
    boxSizing: "border-box",
  };
  const field = { marginBottom: "16px" };

  const sent = (
      <div style={{ padding: "8px 0" }}>
        <div style={{ fontSize: "16px", fontWeight: 600, margin: "0 0 8px" }}>
          Thanks, your request is in.
        </div>
        <div style={{ fontSize: "14px", margin: "0 0 16px", opacity: 0.8 }}>
          The team will reach out to {email} about your free trial.
        </div>
        {modal && (
          <button type="button" onClick={() => setOpen(false)} className="free-trial-submit">
            Close
          </button>
        )}
      </div>
  );

  const form = (
    <form onSubmit={submit}>
      <div style={field}>
        <label style={label} htmlFor="ft-email">Work email</label>
        <input id="ft-email" type="email" required value={email}
          onChange={(e) => setEmail(e.target.value)} style={input} placeholder="you@company.com" />
      </div>

      <div style={field}>
        <label style={label} htmlFor="ft-company">Company</label>
        <input id="ft-company" type="text" required value={company}
          onChange={(e) => setCompany(e.target.value)} style={input} />
      </div>

      <div style={field}>
        <label style={label} htmlFor="ft-telegram">Telegram <span style={{ fontWeight: 400, opacity: 0.7 }}>(optional)</span></label>
        <input id="ft-telegram" type="text" value={telegram} autoComplete="off"
          onChange={(e) => setTelegram(e.target.value)} style={input} placeholder="@handle" />
      </div>

      <div style={field}>
        <label style={label} htmlFor="ft-project">What are you building?</label>
        <textarea id="ft-project" required rows={3} value={project}
          onChange={(e) => setProject(e.target.value)} style={{ ...input, resize: "vertical" }}
          placeholder="A short description of your project or use case" />
      </div>

      <div style={field}>
        <span style={label}>Products you're interested in</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {PRODUCTS.map((p) => {
            const active = products.includes(p);
            return (
              <button
                key={p}
                type="button"
                aria-pressed={active}
                onClick={() => toggleProduct(p)}
                style={{
                  padding: "6px 14px",
                  fontSize: "14px",
                  fontWeight: active ? 600 : 500,
                  borderRadius: "9999px",
                  cursor: "pointer",
                  border: "1px solid",
                  borderColor: active ? "#0f7fff" : "rgba(128,128,128,0.4)",
                  backgroundColor: active ? "#0f7fff" : "transparent",
                  color: active ? "#ffffff" : "inherit",
                }}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      {needsVolume && (
        <div style={field}>
          <label style={label} htmlFor="ft-volume">Expected API volume</label>
          <select id="ft-volume" required value={volume} className="free-trial-form-select"
            onChange={(e) => setVolume(e.target.value)} style={input}>
            <option value="" disabled>Select a range</option>
            {VOLUMES.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
      )}

      {/* Honeypot: hidden from people, filled in by bots. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website}
        onChange={(e) => setWebsite(e.target.value)} aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }} />

      {TURNSTILE_SITE_KEY && <div id={widgetId} style={field} />}

      {error && (
        <div style={{ color: "#dc2626", fontSize: "14px", margin: "0 0 12px" }}>{error}</div>
      )}

      <button type="submit" className="free-trial-submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Request free trial"}
      </button>
    </form>
  );

  const styles = (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          .free-trial-submit {
            padding: 12px 24px;
            border-radius: 8px;
            border: none;
            background: linear-gradient(135deg, #0f7fff 0%, #0a5fd9 100%);
            color: #fff;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(15, 127, 255, 0.35);
          }
          .free-trial-submit:disabled { opacity: 0.6; cursor: default; }
          .free-trial-form-select option { color: #000; }
        `,
      }}
    />
  );

  const body = (
    <>
      {styles}
      {status === "sent" ? sent : form}
    </>
  );
  if (!modal) return body;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 24px",
          borderRadius: "8px",
          background: "linear-gradient(135deg, #0f7fff 0%, #0a5fd9 100%)",
          color: "#fff",
          fontSize: "15px",
          fontWeight: 600,
          border: "none",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(15, 127, 255, 0.35)",
        }}
      >
        <span>{title}</span>
        <span aria-hidden="true">{"→"}</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Request a free trial"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            backgroundColor: "rgba(0,0,0,0.55)",
          }}
        >
          <div
            className="free-trial-modal"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "520px",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid rgba(128,128,128,0.3)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
            }}
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  .free-trial-modal { background-color: #ffffff; color: #111827; }
                  .dark .free-trial-modal { background-color: #191B19; color: #f3f4f6; }
                  #content { isolation: auto !important; }
                `,
              }}
            />
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                border: "none",
                background: "transparent",
                color: "inherit",
                fontSize: "22px",
                lineHeight: 1,
                cursor: "pointer",
                opacity: 0.6,
              }}
            >
              ×
            </button>
            <div style={{ display: "block", fontSize: "20px", fontWeight: 700, margin: "0 0 4px" }}>
              Request a free trial
            </div>
            <div style={{ display: "block", fontSize: "14px", margin: "0 0 20px", opacity: 0.75 }}>
              Tell us what you're building and the team will set you up.
            </div>
            {body}
          </div>
        </div>
      )}
    </>
  );
};
