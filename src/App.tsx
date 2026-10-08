import { FormEvent, useEffect, useRef, useState } from "react";

/* ---------- content ---------- */
type Kind = "pmo" | "doc" | "sign" | "mind" | "net";
const PROJECTS = [
  { name: "PMO Command Center", kind: "pmo" as Kind, bg: "#8aa8ff", fg: "#14121f", meta: "Emerson internship",
    text: "A 6-node LangGraph multi-agent pipeline that automates PMO reporting across 20+ projects, plus a natural-language query platform used daily by project managers. Includes the Risk Review Agent, which builds prioritized risk registers.",
    tags: ["LangGraph", "Azure OpenAI", "Azure AI Search", "FastAPI", "React"], stat: "10 hrs/week saved, 40% faster reporting" },
  { name: "DocNearYou", kind: "doc" as Kind, bg: "#ff9fc2", fg: "#14121f", meta: "Healthcare assistant",
    text: "Compared Random Forest, SVM, Logistic Regression and Decision Tree classifiers for multi-disease prediction, then wrapped it with an AI chatbot and a face-recognition login.",
    tags: ["scikit-learn", "NLP", "Face recognition"], stat: "92% accuracy, F1 above 0.90, 98% auth accuracy" },
  { name: "Sign Language Translator", kind: "sign" as Kind, bg: "#ffd75e", fg: "#14121f", meta: "Pure ML",
    text: "Hand gestures in, words out. Built on classical machine learning with no LLM shortcuts.",
    tags: ["Computer vision", "Machine learning"], stat: "Gestures to text" },
  { name: "AITherapistAgent", kind: "mind" as Kind, bg: "#86ecc4", fg: "#14121f", meta: "Agentic AI",
    text: "A conversational agent designed to listen first and respond with care.",
    tags: ["Agentic AI", "LLMs"], stat: "Conversation that listens" },
];
const SKILLS: [string, string[]][] = [
  ["Languages", ["Python", "Java", "SQL"]],
  ["GenAI", ["LangChain", "LangGraph", "RAG", "Prompt engineering", "Agentic workflows", "Vector databases", "Pydantic"]],
  ["Machine learning", ["NLP", "Deep learning", "Model training and evaluation", "Predictive forecasting"]],
  ["Backend and web", ["FastAPI", "Flask", "React.js", "REST APIs"]],
  ["Data and cloud", ["MongoDB", "SQLite", "MySQL", "Azure", "Git", "GitHub"]],
];
const WORK = [
  ["Emerson Export Engineering Centre", "AIML Intern", "Feb 2026 to now"],
  ["Tata Technologies", "AI Intern", "Jan to Feb 2026"],
];
const EDU = [
  ["K. E. Society's Rajarambapu Institute of Technology", "BTech, CSE (AI and ML), CGPA 8.47", "2023 to 2026"],
  ["Dr Bapuji Salunkhe Institute of Technology", "Diploma, Computer Science, 85.60%", "2020 to 2023"],
];

const CERTS = [["Internship appreciation letter for outstanding performance", "EEEC", "2026"], ["AI bootcamp: LangGraph and LangChain", "Udemy", "2026"], ["AI/ML for geodata analysis", "ISRO", "2025"], ["Foundations of IoT and edge machine learning", "NPTEL", "2024"]];
const TINT = ["#ffd9e6", "#d8ccff", "#c9f4e3", "#fff0b3", "#cfe8ff"];
const VIV = ["#b9a6ff", "#ff9fc2", "#ffd75e", "#86ecc4", "#8fd3ff"];
const STATS = [["20+", "projects automated"], ["10 hrs", "saved every week"], ["40%", "faster reporting"]];
const EMAIL = "patilgargi209@gmail.com";
function Contact() {
  const [st, setSt] = useState<"idle" | "sending" | "sent" | "err">("idle");
  const send = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name")), from = String(fd.get("email")), message = String(fd.get("message"));
    const ep = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
    if (!ep) {
      location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Hello from " + name)}&body=${encodeURIComponent(message + "\n\n" + name + " (" + from + ")")}`;
      setSt("sent"); return;
    }
    setSt("sending");
    try {
      const r = await fetch(ep, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ name, email: from, message }) });
      setSt(r.ok ? "sent" : "err");
    } catch { setSt("err"); }
  };
  if (st === "sent") return (
    <div className="conn done"><h3>Message sent. Thank you!</h3><p>I will get back to you soon.</p><button data-h onClick={() => setSt("idle")}>Send another</button></div>
  );
  return (
    <form className="conn" onSubmit={send}>
      <h3>Say hello</h3>
      <p>Have a role, a project or an idea? Write to me and let's connect.</p>
      <label>Your name<input name="name" required placeholder="Jane Doe" /></label>
      <label>Your email<input name="email" type="email" required placeholder="jane@company.com" /></label>
      <label>Message<textarea name="message" required rows={4} placeholder="Tell me what you have in mind..." /></label>
      <button data-h type="submit" disabled={st === "sending"}>{st === "sending" ? "Sending..." : "Send message"}</button>
      {st === "err" && <p className="er">Something went wrong. Please try again.</p>}
    </form>
  );
}
const Grp = ({ t, items }: { t: string; items: string[][] }) => (
  <>
    <h3 className="gh">{t}</h3>
    <div className="grid">
      {items.map(([a, b, c], i) => (
        <div className="cd rv" data-h key={a} style={{ background: TINT[i % TINT.length], animationDelay: `${i * 0.08}s` }}><em>{c}</em><b>{a}</b><span>{b}</span></div>
      ))}
    </div>
  </>
);

/* ---------- logo ---------- */
function Mark({ small }: { small?: boolean }) {
  return (
    <span className={`mk${small ? " sm" : ""}`} aria-label="Gargi">
      {[..."GARGI"].map((c, i) => <span key={i} style={{ animationDelay: `${i * 0.12}s` }}>{c}</span>)}
    </span>
  );
}

/* ---------- generative backgrounds ---------- */
const mouse = { x: 0.5, y: 0.5 };
function Bg({ kind, fg }: { kind: Kind; fg: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!, x = c.getContext("2d")!, par = c.parentElement!;
    const dpr = Math.min(devicePixelRatio, 2);
    let w = 0, h = 0, raf = 0;
    const fit = () => { const r = par.getBoundingClientRect(); w = r.width; h = r.height; c.width = w * dpr; c.height = h * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0); };
    fit(); addEventListener("resize", fit);
    const pts = Array.from({ length: 80 }, () => ({ x: Math.random(), y: Math.random(), a: Math.random() * 6.28, s: 0.02 + Math.random() * 0.05 }));
    const t0 = performance.now();
    const loop = (n: number) => {
      raf = requestAnimationFrame(loop);
      if (par.dataset.on === "0") return;
      const t = (n - t0) / 1000;
      x.clearRect(0, 0, w, h); x.strokeStyle = fg; x.fillStyle = fg; x.lineWidth = 2; x.lineCap = "round"; x.lineJoin = "round";
      const dot = (a: number, b: number, r: number) => { x.beginPath(); x.arc(a, b, r, 0, 6.283); x.fill(); };
      if (kind === "pmo") {
        const N = pts.slice(0, 6).map((_, i) => ({ x: w * (0.1 + 0.8 * i / 5), y: h * (0.45 + 0.2 * Math.sin(i * 1.4 + t * 0.6)) }));
        x.globalAlpha = 0.5; x.beginPath(); N.forEach((q, i) => (i ? x.lineTo(q.x, q.y) : x.moveTo(q.x, q.y))); x.stroke(); x.globalAlpha = 1;
        N.forEach((q, i) => {
          x.beginPath(); x.arc(q.x, q.y, 22 + 4 * Math.sin(t * 2 + i), 0, 6.283); x.stroke(); dot(q.x, q.y, 7);
          if (i < 5) for (let k = 0; k < 3; k++) { const f = (t * 0.35 + i * 0.17 + k / 3) % 1; dot(q.x + (N[i + 1].x - q.x) * f, q.y + (N[i + 1].y - q.y) * f, 4); }
        });
      } else if (kind === "doc") {
        x.lineWidth = 4; x.beginPath();
        for (let px = 0; px <= w; px += 4) {
          const ph = (px / w * 2.5 - t * 0.35) % 1, q = ph < 0 ? ph + 1 : ph;
          const y = h * 0.5 - (q < 0.08 ? Math.sin(q / 0.08 * Math.PI) * h * 0.22 : q < 0.14 ? -Math.sin((q - 0.08) / 0.06 * Math.PI) * h * 0.08 : 0);
          px ? x.lineTo(px, y) : x.moveTo(px, y);
        }
        x.stroke(); x.lineWidth = 3;
        pts.slice(0, 14).forEach((q, i) => { const a = (q.x * w + t * 12 * (i % 3 + 1)) % w, b = ((q.y * h - t * 18) % h + h) % h, s = 8 + (i % 4) * 4;
          x.globalAlpha = 0.45; x.beginPath(); x.moveTo(a - s, b); x.lineTo(a + s, b); x.moveTo(a, b - s); x.lineTo(a, b + s); x.stroke(); x.globalAlpha = 1; });
      } else if (kind === "sign") {
        x.lineWidth = 2;
        for (let k = 0; k < 3; k++) { x.globalAlpha = 0.28 - k * 0.07; x.beginPath(); for (let px = 0; px <= w; px += 6) { const y = h * (0.4 + k * 0.1) + Math.sin(px / (110 + k * 40) + t * (0.6 + k * 0.2)) * h * 0.05; px ? x.lineTo(px, y) : x.moveTo(px, y); } x.stroke(); }
        x.globalAlpha = 1;
      } else if (kind === "mind") {
        const r0 = Math.min(w, h) * 0.12;
        for (let i = 3; i > 0; i--) { x.globalAlpha = 0.1; x.beginPath(); x.arc(w * 0.74, h * 0.32, r0 * i * (1 + 0.05 * Math.sin(t * 0.7 - i)), 0, 6.283); x.fill(); }
        x.globalAlpha = 1;
      } else {
        const mx = mouse.x * w, my = mouse.y * h;
        pts.forEach((q, i) => {
          q.x = (q.x + Math.cos(q.a) * q.s * 0.0015 + 1) % 1; q.y = (q.y + Math.sin(q.a) * q.s * 0.0015 + 1) % 1;
          const a = q.x * w, b = q.y * h; x.globalAlpha = 0.5; dot(a, b, 2.5);
          for (let j = i + 1; j < pts.length; j++) { const d = Math.hypot(a - pts[j].x * w, b - pts[j].y * h); if (d < 120) { x.globalAlpha = (1 - d / 120) * 0.35; x.lineWidth = 1; x.beginPath(); x.moveTo(a, b); x.lineTo(pts[j].x * w, pts[j].y * h); x.stroke(); } }
          const dm = Math.hypot(a - mx, b - my); if (dm < 180) { x.globalAlpha = (1 - dm / 180) * 0.8; x.beginPath(); x.moveTo(a, b); x.lineTo(mx, my); x.stroke(); }
        });
        x.globalAlpha = 1;
      }
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", fit); };
  }, [kind, fg]);
  return <canvas ref={ref} className="cv" />;
}

/* ---------- gallery: 3D curved rail ---------- */
function Gallery() {
  const sec = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  const [idx, setIdx] = useState(0);
  const N = PROJECTS.length;
  useEffect(() => {
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cur = 0, raf = 0, last = 0, tx = 0, ty = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const r = sec.current!.getBoundingClientRect();
      const raw = Math.max(0, Math.min(N - 1, -r.top / innerHeight));
      cur += (raw - cur) * (calm ? 1 : 0.08);
      tx += (mouse.x - 0.5 - tx) * 0.06; ty += (mouse.y - 0.5 - ty) * 0.06;
      if (rail.current && !calm) rail.current.style.transform = `rotateX(${-ty * 4}deg) rotateY(${tx * 7}deg)`;
      const w = panels.current[0]?.offsetWidth || 600;
      panels.current.forEach((el, i) => {
        if (!el) return;
        const o = i - cur, a = Math.abs(o), vis = a < 2.4;
        el.dataset.on = vis ? "1" : "0"; el.style.visibility = vis ? "visible" : "hidden";
        el.style.opacity = String(Math.max(0, 1 - a * 0.38));
        el.style.zIndex = String(Math.round(100 - a * 20));
        el.style.transform = `translate(-50%,-50%) translate3d(${o * w * 0.8}px,0,${-a * w * 0.3}px) rotateY(${Math.max(-48, Math.min(48, -o * 30))}deg) scale(${1 - Math.min(a, 2) * 0.04})`;
      });
      const k = Math.round(cur); if (k !== last) { last = k; setIdx(k); }
    };
    tick(); return () => cancelAnimationFrame(raf);
  }, [N]);
  const go = (i: number) => scrollTo({ top: sec.current!.offsetTop + i * innerHeight, behavior: "smooth" });
  const p = PROJECTS[idx];
  return (
    <section id="work" ref={sec} className="gal" style={{ height: `${N * 100}svh` }}>
      <div className="stage">
        <h2 className="gt" key={idx}>{p.name}</h2>
        <div className="persp">
          <div className="rail" ref={rail}>
            {PROJECTS.map((q, i) => (
              <div key={q.name} ref={(e) => { panels.current[i] = e; }} className="panel" data-h onClick={() => go(i)} style={{ background: q.bg }}>
                <Bg kind={q.kind} fg={q.fg} />
                <span className="tag">{q.meta}</span><span className="num">0{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="cap" key={"c" + idx}>
          <div><small>{p.meta}</small><h3>{p.name}</h3></div>
          <p>{p.text}</p>
          <ul>{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
          <b>{p.stat}</b>
        </div>
        <nav className="dots">{PROJECTS.map((q, i) => <button key={q.name} data-h aria-label={q.name} className={i === idx ? "on" : ""} onClick={() => go(i)} />)}</nav>
      </div>
    </section>
  );
}

/* ---------- app ---------- */
export default function App() {
  const [phase, setPhase] = useState(0);
  const [pct, setPct] = useState(0);
  const cur = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = phase < 2 ? "hidden" : "";
  }, [phase]);

  useEffect(() => {
    let r = 0; const s = performance.now();
    const f = (n: number) => {
      const v = Math.min(1, (n - s) / 3000); setPct(Math.round(v * v * (3 - 2 * v) * 100));
      if (v < 1) r = requestAnimationFrame(f); else { setPhase(1); setTimeout(() => setPhase(2), 1300); }
    };
    r = requestAnimationFrame(f); return () => cancelAnimationFrame(r);
  }, []);

  useEffect(() => {
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const mv = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; mouse.x = e.clientX / innerWidth; mouse.y = e.clientY / innerHeight; };
    const ov = (e: MouseEvent) => cur.current?.classList.toggle("big", !!(e.target as HTMLElement).closest("a,button,[data-h]"));
    const f = () => { raf = requestAnimationFrame(f); x += (tx - x) * 0.18; y += (ty - y) * 0.18; if (cur.current) cur.current.style.transform = `translate(${x}px,${y}px)`; };
    addEventListener("mousemove", mv); addEventListener("mouseover", ov); f();
    return () => { cancelAnimationFrame(raf); removeEventListener("mousemove", mv); removeEventListener("mouseover", ov); };
  }, []);

  useEffect(() => {
    if (phase < 2) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.2 });
    document.querySelectorAll(".mask,.rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [phase]);

  return (
    <div className={`app ph${phase}`}>
      <style>{CSS}</style>
      <div ref={cur} className="cur"><i /></div>

      <div className="ld" aria-hidden={phase === 2}>
        <div className="ldlogo"><Mark /><i className="ldbar" style={{ width: `${pct}%` }} /></div>
        <span className="ldn">{pct}</span>
      </div>

      <header className="nav">
        <a href="#top" className="navlogo" aria-label="Home">{phase > 0 && <Mark small />}</a>
        <nav><a href="#work">Work</a><a href="#about">About</a><a href="#beyond">Beyond code</a><a href="#contact">Contact</a></nav>
      </header>

      <main id="top">
        <section className="hero">
          <Bg kind="net" fg="#14121f" />
          <h1 aria-label="Gargi Patil">
            {["GARGI", "PATIL"].map((w, r) => (
              <span className="row" key={w}>{[...w].map((ch, i) => <span key={i} className="ch" style={{ animationDelay: `${r * 0.15 + i * 0.06}s` }}>{ch}</span>)}</span>
            ))}
          </h1>
          <div className="hfoot">
            <p>AI and ML engineer building agents and RAG systems that work in production.</p>
            <a href="#work" data-h>See the work</a>
          </div>
          <div className="mq"><div className="mqt">{[0, 1, 2, 3].map((k) => <span key={k}>LangGraph ✦ RAG ✦ Azure OpenAI ✦ FastAPI ✦ React ✦ Agentic AI ✦ Prompt engineering ✦</span>)}</div></div>
        </section>

        <Gallery />

        <section id="about" className="sec">
          <span className="badge">01 About</span>
          <h2 className="mask"><span>Fresh out of college, already shipping.</span></h2>
          <p className="lead">I build GenAI systems that actually work in production: multi-agent LangGraph pipelines, RAG on Azure, and the FastAPI and React layers that put them in front of real users.</p>
          <div className="stats">{STATS.map(([n, l], i) => <div className="st rv" key={l} style={{ background: VIV[(i + 2) % VIV.length], animationDelay: `${i * 0.1}s` }}><b>{n}</b><span>{l}</span></div>)}</div>
          <Grp t="Experience" items={WORK} /><Grp t="Education" items={EDU} /><Grp t="Certifications" items={CERTS} />
        </section>

        <section className="sec soft">
          <span className="badge">02 Toolbox</span>
          <h2 className="mask"><span>Toolbox</span></h2>
          <div className="skills">{SKILLS.map(([g, l], i) => <div className="sk rv" data-h key={g} style={{ background: VIV[i % VIV.length], animationDelay: `${i * 0.08}s` }}><h4>{g}</h4><ul>{l.map((x) => <li key={x}>{x}</li>)}</ul></div>)}</div>
        </section>

        <section id="beyond" className="sec">
          <span className="badge">03 Beyond</span>
          <h2 className="mask"><span>Beyond the code</span></h2>
          <div className="duo">
            <div className="tile t1 rv" data-h><h3>Cultural secretary head</h3><p>Led cultural events and the team behind them during my diploma.</p></div>
            <div className="tile t2 rv" data-h><h3>Google Developers Club</h3><p>Team member at GDC during my degree, building and learning alongside other developers.</p></div>
          </div>
        </section>
      </main>

      <footer id="contact" className="foot">
        <div className="fgrid">
          <div>
            <span className="badge">04 Contact</span>
            <h2>LET'S BUILD SOMETHING.</h2>
            <p className="sub">Open to roles, projects and good ideas in AI and ML.</p>
            <div className="soc">
              <a data-h href="https://www.linkedin.com/in/garggii-patil">LinkedIn</a>
              <a data-h href="https://github.com/GarggiiPatil">GitHub</a>
              <a data-h href="tel:+918888945115">+91 8888945115</a>
            </div>
          </div>
          <Contact />
        </div>
        <small>Designed and built by Gargi Patil</small>
      </footer>
    </div>
  );
}

/* ---------- styles ---------- */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;700;800&family=Instrument+Sans:wght@400;500;600&display=swap');
@font-face{font-family:'Guka';font-weight:400;font-display:swap;src:url('/fonts/Guka-Regular.woff2') format('woff2')}
@font-face{font-family:'Guka';font-weight:500;font-display:swap;src:url('/fonts/Guka-Medium.woff2') format('woff2')}
@font-face{font-family:'Guka';font-weight:700;font-display:swap;src:url('/fonts/Guka-Bold.woff2') format('woff2')}
@font-face{font-family:'Guka';font-weight:800;font-display:swap;src:url('/fonts/Guka-ExtraBold.woff2') format('woff2')}
:root{--ink:#14121f;--disp:'Guka','Roboto Slab',Georgia,serif}
*{box-sizing:border-box;margin:0;padding:0}
html{overflow-x:hidden;font-size:clamp(16px,.55vw + 10px,26px)}
body{background:#fff;color:var(--ink);font-family:'Instrument Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased;font-size:1rem}
a{color:inherit;text-decoration:none}button{font:inherit;color:inherit;background:none;border:0}
h1,h2,h3,h4,.mail,.mk,.ldn{font-family:var(--disp)}
@media(hover:hover){body,a,button{cursor:none}}
.cur{position:fixed;top:0;left:0;z-index:999;pointer-events:none;mix-blend-mode:difference}
.cur i{display:block;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;background:#fff;transition:transform .35s cubic-bezier(.2,.8,.2,1)}
.cur.big i{transform:scale(3.2)}
@media(hover:none){.cur{display:none}}

/* wordmark + loader */
.mk{display:inline-flex;overflow:hidden;font-weight:800;letter-spacing:.02em;line-height:1.1;font-size:clamp(3rem,13vw,8rem)}
.mk span{display:inline-block;transform:translateY(110%);animation:up .9s cubic-bezier(.16,1,.3,1) forwards}
.mk.sm{font-size:1.4rem}.mk.sm span{animation-duration:.7s}
@keyframes up{to{transform:none}}
.ld{position:fixed;inset:0;z-index:500;background:#b9a6ff;color:var(--ink);display:grid;place-items:center;clip-path:inset(0);transition:clip-path 1.1s cubic-bezier(.77,0,.18,1) .15s}
.ph1 .ld,.ph2 .ld{clip-path:inset(0 0 100% 0)}.ph2 .ld{display:none}
.ldlogo{display:grid;justify-items:center;gap:1rem;transition:transform .8s cubic-bezier(.77,0,.18,1),opacity .5s}
.ph1 .ldlogo{transform:translateY(-30px);opacity:0}
.ldbar{display:block;height:4px;background:var(--ink);border-radius:4px;max-width:100%}
.ldn{position:absolute;right:4vw;bottom:4vh;font-weight:700;font-size:clamp(1.5rem,5vw,3rem);font-variant-numeric:tabular-nums;transition:opacity .4s}
.ph1 .ldn{opacity:0}

/* nav */
.nav{position:fixed;top:1.4vh;left:3vw;right:3vw;z-index:100;display:flex;justify-content:space-between;align-items:center;padding:.55rem 1.2rem;border-radius:99px;background:#ffffffb8;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.nav nav{display:flex;gap:1.6rem;font-weight:500;font-size:.9rem}
.nav nav a{position:relative}.nav nav a:after{content:"";position:absolute;left:0;bottom:-3px;height:2px;width:100%;background:var(--ink);transform:scaleX(0);transform-origin:right;transition:transform .45s cubic-bezier(.7,0,.2,1)}
.nav nav a:hover:after{transform:scaleX(1);transform-origin:left}
@media(max-width:640px){.nav nav{gap:1rem}.nav nav a:nth-child(n+2):not(:last-child){display:none}}

/* hero */
.hero{position:relative;min-height:100svh;display:flex;flex-direction:column;justify-content:flex-end;padding:9svh 4vw 0;overflow:hidden;background:linear-gradient(160deg,#ece5ff,#ffe6ef 55%,#dff3ff)}
.cv{position:absolute;inset:0;width:100%;height:100%;display:block}
h1{position:relative;font-weight:800;font-size:clamp(3.5rem,min(17vw,26svh),15rem);line-height:.9;letter-spacing:-.025em;pointer-events:none;margin:auto;text-align:center}
.row{display:block;text-align:center;overflow:hidden;padding-bottom:.08em}
.ch{display:inline-block;transform:translateY(110%) rotate(6deg)}
.ph1 .ch,.ph2 .ch{animation:up 1.1s cubic-bezier(.16,1,.3,1) forwards}
.ph1 .ch{animation-delay:.5s!important}
.hfoot{position:relative;display:flex;justify-content:space-between;align-items:flex-end;gap:1rem;flex-wrap:wrap;padding:1.1rem 0;border-top:1px solid #14121f33}
.hfoot p{max-width:32ch;font-size:1rem;line-height:1.4}
.hfoot a{background:var(--ink);color:#fff;border-radius:99px;padding:.75rem 1.4rem;font-weight:500;transition:transform .4s cubic-bezier(.16,1,.3,1),background .4s}
.hfoot a:hover{background:#7a5cff;transform:translateY(-3px)}
.mq{position:relative;overflow:hidden;border-top:1px solid #14121f33;padding:.9rem 0;margin:0 -4vw;font:700 1.05rem var(--disp)}
.mqt{display:flex;width:max-content;animation:mq 12s linear infinite}
.mqt span{white-space:pre;padding-right:1.5rem}
@keyframes mq{to{transform:translateX(-25%)}}

/* gallery 3D */
.gal{position:relative;background:#14121f}
.stage{position:sticky;top:0;height:100svh;overflow:hidden;color:#fff;display:flex;flex-direction:column;align-items:center;padding-top:19svh;background:radial-gradient(ellipse at 50% 40%,#2a2347,#14121f 70%)}
.gt{position:absolute;top:11svh;left:0;right:0;z-index:300;text-align:center;font-weight:800;font-size:clamp(2.2rem,7.5vw,7rem);line-height:.95;letter-spacing:-.02em;padding:0 4vw;pointer-events:none;text-shadow:0 .1em .5em #14121f88;animation:ttl .9s cubic-bezier(.16,1,.3,1)}
@keyframes ttl{from{opacity:0;transform:translateY(.35em)}}
.persp{--ar:1.6;perspective:1500px;width:100%;height:min(46svh,calc(74vw / var(--ar)));position:relative}
.rail{position:absolute;inset:0;transform-style:preserve-3d}
.panel{position:absolute;left:50%;top:50%;height:100%;aspect-ratio:var(--ar);border-radius:1rem;overflow:hidden;backface-visibility:hidden;will-change:transform,opacity;box-shadow:0 2rem 4rem #0007}
.panel .num{position:absolute;right:1rem;bottom:.6rem;font:800 clamp(2rem,6vw,5rem)/1 var(--disp);color:#14121f;opacity:.18}
.panel .tag{position:absolute;left:1rem;top:1rem;border:1px solid #14121f88;border-radius:99px;padding:.2rem .7rem;font-size:.8rem;color:#14121f;background:#ffffff66}
.cap{width:min(92vw,70rem);margin-top:3.5svh;display:grid;grid-template-columns:1fr 1.5fr 1fr auto;gap:1.2rem;align-items:start;animation:ttl .9s .1s cubic-bezier(.16,1,.3,1) both}
.cap small{font-size:.8rem;letter-spacing:.12em;text-transform:uppercase;opacity:.7}
.cap h3{font-size:1.3rem;margin-top:.2rem}
.cap p{line-height:1.45;font-size:.92rem;opacity:.85}
.cap ul{display:flex;flex-wrap:wrap;gap:.4rem;list-style:none}
.cap li{border:1px solid #fff6;border-radius:99px;padding:.2rem .65rem;font-size:.78rem}
.cap b{font:700 .9rem var(--disp);max-width:14ch;text-align:right}
.dots{position:absolute;bottom:2svh;left:50%;transform:translateX(-50%);z-index:50;display:flex;gap:.7rem}
.dots button{width:.6rem;height:.6rem;border-radius:50%;border:1.5px solid #fff;transition:transform .4s,background .4s}
.dots .on{background:#fff;transform:scale(1.4)}
@media(max-width:820px){.persp{--ar:.85;height:min(42svh,calc(70vw / var(--ar)))}.stage{padding-top:17svh}.cap{grid-template-columns:1fr;gap:.5rem}.cap b{text-align:left;max-width:none}.cap ul{order:3}.cap p{font-size:.85rem}.cap h3{display:none}.gt{top:10svh}}
@media(max-height:640px){.cap p{display:none}}

/* sections */
.sec{padding:12vh 4vw 10vh;background:#fff;position:relative}
.sec.soft{background:#f3eeff}
.badge{display:inline-block;border:2px solid var(--ink);border-radius:99px;padding:.25rem .95rem;font-weight:600;font-size:.85rem;margin-bottom:1.2rem;background:#ffd75e;color:var(--ink);transform:rotate(-3deg);box-shadow:3px 3px 0 var(--ink)}
.mask{font-weight:800;font-size:clamp(2.2rem,5.5vw,5.5rem);line-height:1.02;letter-spacing:-.02em;max-width:20ch;overflow:hidden;padding-bottom:.1em}
.mask span{display:block;transform:translateY(105%);transition:transform 1.1s cubic-bezier(.16,1,.3,1)}
.mask.in span{transform:none}
.lead{max-width:56ch;font-size:clamp(1rem,1.5vw,1.25rem);line-height:1.5;margin:3vh 0 4vh}
.rv{opacity:0}.rv.in{opacity:1;animation:pop .9s cubic-bezier(.16,1,.3,1) backwards}
@keyframes pop{from{opacity:0;transform:translateY(3rem) rotate(5deg) scale(.94)}}
.stats{display:flex;flex-wrap:wrap;gap:1.2rem;margin-bottom:2vh}
.st{flex:1 1 14rem;padding:1.2rem 1.5rem;display:grid;gap:.2rem}
.st b{font:800 clamp(2.4rem,5vw,4.5rem)/1 var(--disp)}.st span{font-weight:500}
.gh{font-size:1.2rem;font-weight:700;margin:5vh 0 1.2rem}
.grid,.skills{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,15rem),1fr));gap:1.4rem}
.cd,.sk,.tile,.st{border:2px solid var(--ink);box-shadow:6px 6px 0 var(--ink);border-radius:1.4rem;transition:transform .5s cubic-bezier(.16,1,.3,1),box-shadow .5s cubic-bezier(.16,1,.3,1)}
.cd:nth-child(odd),.sk:nth-child(odd),.st:nth-child(odd){transform:rotate(-.9deg)}
.cd:nth-child(even),.sk:nth-child(even),.st:nth-child(even){transform:rotate(.9deg)}
.cd:hover,.sk:hover,.tile:hover,.st:hover{transform:translate(-4px,-4px) rotate(0);box-shadow:11px 11px 0 var(--ink)}
.cd{padding:1.4rem;display:grid;gap:.5rem;align-content:start;min-height:9rem}
.cd em{font-style:normal;font-size:.8rem;font-weight:600;background:#fff;border:2px solid var(--ink);border-radius:99px;padding:.15rem .7rem;justify-self:start}
.cd b{font:700 1.1rem/1.25 var(--disp)}.cd span{font-size:.92rem;opacity:.8}
.skills{margin-top:5vh}
.sk{padding:1.5rem}.sk h4{font-size:1.2rem;margin-bottom:1rem}
.sk ul{list-style:none;display:flex;flex-wrap:wrap;gap:.5rem}
.sk li{background:#fff;border:2px solid var(--ink);border-radius:99px;padding:.25rem .8rem;font-size:.85rem;font-weight:500;transition:transform .3s}
.sk li:hover{transform:translateY(-3px) rotate(-3deg)}
.duo{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,18rem),1fr));gap:1.4rem;margin-top:4vh}
.tile{min-height:34vh;padding:1.8rem;display:flex;flex-direction:column;justify-content:flex-end;gap:.6rem}
.tile h3{font-size:clamp(1.5rem,2.8vw,2.4rem);line-height:1.05}.tile p{max-width:34ch}
.t1{background:#ff9fc2;transform:rotate(-1deg)}.t2{background:#8fd3ff;transform:rotate(1deg)}

/* footer */
.foot{background:#000;color:#fff;padding:12vh 4vw 4vh}
.fgrid{display:grid;grid-template-columns:1.1fr 1fr;gap:3rem;align-items:center;margin-bottom:10vh}
@media(max-width:900px){.fgrid{grid-template-columns:1fr}}
.foot h2{font-weight:800;font-size:clamp(2.4rem,6.5vw,6.5rem);line-height:.95;letter-spacing:-.02em;max-width:12ch}
.sub{margin:1.5rem 0 2rem;max-width:36ch;opacity:.8;line-height:1.45}
.soc{display:flex;gap:1.6rem;flex-wrap:wrap}
.soc a{border-bottom:2px solid #fff;padding-bottom:2px;transition:color .3s,border-color .3s}.soc a:hover{color:#ffd75e;border-color:#ffd75e}
.conn{background:#b9a6ff;color:var(--ink);border-radius:1.6rem;padding:clamp(1.2rem,2.4vw,2rem);display:grid;gap:1rem;border:2px solid #fff;box-shadow:8px 8px 0 #ffd75e}
.conn h3{font-size:1.6rem}.conn p{line-height:1.45}
.conn label{display:grid;gap:.35rem;font-weight:600;font-size:.85rem}
.conn input,.conn textarea{font:inherit;font-weight:400;border:2px solid var(--ink);border-radius:.9rem;padding:.75rem 1rem;background:#fff;color:var(--ink);resize:vertical;outline:none;transition:box-shadow .3s,transform .3s}
.conn input:focus,.conn textarea:focus{box-shadow:4px 4px 0 var(--ink);transform:translate(-2px,-2px)}
.conn button{background:var(--ink);color:#fff;border-radius:99px;padding:.9rem 1.4rem;font-weight:600;justify-self:start;transition:transform .4s cubic-bezier(.16,1,.3,1),background .4s}
.conn button:hover{background:#7a5cff;transform:translateY(-3px)}
.conn .er{color:#a0102a;font-weight:600}
.foot small{display:block;text-align:center;opacity:.55}
:focus-visible{outline:2px solid var(--ink);outline-offset:4px}
@media(prefers-reduced-motion:reduce){*{animation-duration:.01s!important;transition-duration:.01s!important}}
`;