/*
   MelanotanRx — Landing Page
   Template: ThymosinAlpha1Rx design system
   ─────────────────────────────────────────────────────
   Typography System (DM Sans — geometric sans-serif):
   H1 / Hero:   weight 300, tight tracking -0.03em, generous leading
   H2:          weight 300, tracking -0.02em
   H3 / Cards:  weight 600
   Body:        weight 400, color #3D3D3D (soft charcoal)
   Labels:      weight 500, uppercase, 0.1em tracking, amber
   ─────────────────────────────────────────────────────
   Color Palette:
   Amber:       #C8923A  (gold accent)
   Bronze:      #6B3A1F  (dark accent)
   Cream:       #FAF6F0  (light bg)
   Near-black:  #1A1008  (dark bg)
   ─────────────────────────────────────────────────────
*/
import { useState } from "react";
import Navbar from "@/components/Navbar";

const BRONZE = "#6B3A1F";

const DM = "'DM Sans', system-ui, sans-serif";

const IMGS = {
  hero:   "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1800&q=80",
  cells:  "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1800&q=80",
  labs:   "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80",
  skin:   "https://images.unsplash.com/photo-1570275239925-4af0aa93a758?w=1200&q=80",
};

const s = {
  label:  { fontFamily: DM, fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#C8923A" },
  h1:     { fontFamily: DM, fontWeight: 300, fontSize: "clamp(2.4rem,6vw,5rem)", lineHeight: 1.08, letterSpacing: "-0.03em", color: "#FAF6F0" },
  h2dk:   { fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.6rem,3.5vw,2.75rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#FAF6F0" },
  h2lt:   { fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.6rem,3.5vw,2.75rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#1A1008" },
  h3dk:   { fontFamily: DM, fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.3, letterSpacing: "-0.01em", color: "#FAF6F0" },
  h3lt:   { fontFamily: DM, fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.3, letterSpacing: "-0.01em", color: "#1A1008" },
  body:   { fontFamily: DM, fontWeight: 400, fontSize: "1rem", lineHeight: 1.65, color: "#3D3D3D" },
  bodyDk: { fontFamily: DM, fontWeight: 400, fontSize: "1rem", lineHeight: 1.65, color: "#C9B99A" },
  caption:{ fontFamily: DM, fontWeight: 400, fontSize: "0.8rem", lineHeight: 1.5, color: "#8A7A6A" },
};

// ─── Quiz data ────────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    q: "Personal or family history of melanoma or skin cancer?",
    options: ["No", "Yes"],
    disqualify: 1,
  },
  {
    q: "Currently pregnant or planning pregnancy?",
    options: ["No", "Yes"],
    disqualify: 1,
  },
  {
    q: "Known hypersensitivity to afamelanotide or PLGA polymer?",
    options: ["No", "Yes"],
    disqualify: 1,
  },
  {
    q: "Do you have a diagnosed photosensitivity or pigmentation disorder (EPP, XLP, PLE, vitiligo)?",
    options: ["No", "Yes — I have a diagnosed condition"],
    flag: 1,
    flagMsg: "Your condition may be within the approved indication scope. A physician will review your case.",
  },
  {
    q: "How many melanocytic nevi (moles) do you have, approximately?",
    options: ["Fewer than 50", "More than 50"],
    flag: 1,
    flagMsg: "Enhanced monitoring will be required. A dermatology baseline exam is mandatory.",
  },
  {
    q: "Are you currently using immunosuppressants or medications affecting pigmentation?",
    options: ["No", "Yes"],
    flag: 1,
    flagMsg: "Physician review required before protocol approval.",
  },
  {
    q: "What is your primary goal with MelanotanRx?",
    options: [
      "Photoprotection / reduce sun sensitivity",
      "Even pigmentation / repigmentation",
      "Photosensitivity disorder management",
      "Cosmetic tanning only",
    ],
    disqualify: 3,
    disqualifyMsg:
      "MelanotanRx is a physician-supervised protocol for photoprotection and pigmentation — not cosmetic tanning. A physician can assess whether your goals align with the approved indication.",
  },
];

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "What is afamelanotide?",
    a: "A synthetic analog of α-melanocyte-stimulating hormone (α-MSH). It binds the MC1R receptor on melanocytes and increases eumelanin production independent of UV exposure. FDA-approved since 2019 under the brand name Scenesse.",
  },
  {
    q: "Is this the same as Melanotan II?",
    a: "No. Afamelanotide (Melanotan I) is FDA-approved. Melanotan II is a different compound — unapproved, banned from compounding, and associated with serious adverse events including melanoma risk and priapism. MelanotanRx uses only afamelanotide.",
  },
  {
    q: "Is it FDA-approved?",
    a: "Afamelanotide received FDA approval in 2019. MelanotanRx operates within that approved scope under physician supervision.",
  },
  {
    q: "How is it administered?",
    a: "A 16 mg subcutaneous implant placed above the hip by a trained physician. Most of the dose releases within 48 hours; >90% by day 5. Administered every 2 months.",
  },
  {
    q: "Do I need a skin exam?",
    a: "Yes — FDA prescribing information requires a full body skin exam twice yearly. This is included in your MelanotanRx protocol. Afamelanotide can darken existing moles, so baseline documentation and ongoing monitoring are mandatory.",
  },
  {
    q: "What are the side effects?",
    a: "Most common (>2% in Phase 3 trials): implant site reaction, nausea, oropharyngeal pain, fatigue, skin hyperpigmentation, dizziness. All were mild to moderate in severity. Serious reactions are rare.",
  },
  {
    q: "Will it work without sun exposure?",
    a: "Afamelanotide increases eumelanin independent of UV — that is its mechanism. However, sun protection measures should be maintained during treatment per FDA prescribing information.",
  },
  {
    q: "How is this different from retail melanin supplements?",
    a: "Retail products act on surface hydration or contain ingredients like tyrosine with limited evidence. Afamelanotide works at the MC1R receptor — the same pathway governing your body's natural pigmentation response — with Phase 3 human trial data behind it.",
  },
];

export default function MelanotanRx() {
  const [quizStep, setQuizStep] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [quizResult, setQuizResult] = useState<"eligible" | "disqualified" | "flag" | null>(null);
  const [flagMsg, setFlagMsg] = useState("");
  const [disqualMsg, setDisqualMsg] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function handleAnswer(qIdx: number, aIdx: number) {
    const q = QUESTIONS[qIdx];
    if ("disqualify" in q && q.disqualify === aIdx) {
      setQuizResult("disqualified");
      setDisqualMsg((q as any).disqualifyMsg || "Based on your response, afamelanotide may not be appropriate. A physician can review your specific situation.");
      setQuizDone(true);
      return;
    }
    if ("flag" in q && q.flag === aIdx) {
      setQuizResult("flag");
      setFlagMsg((q as any).flagMsg || "");
      setQuizDone(true);
      return;
    }
    if (qIdx + 1 >= QUESTIONS.length) {
      setQuizResult("eligible");
      setQuizDone(true);
    } else {
      setQuizStep(qIdx + 1);
    }
  }

  return (
    <div style={{ fontFamily: DM, background: "#FAF6F0", minHeight: "100vh" }}>
      <Navbar productName="MelanotanRx" />

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "#1A1008",
        }}
      >
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${IMGS.hero})`,
            backgroundSize: "cover", backgroundPosition: "center 30%",
            opacity: 0.35,
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(26,16,8,0.92) 45%, rgba(26,16,8,0.4) 100%)" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "6rem 2rem 4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <p style={{ ...s.label, marginBottom: "1.5rem" }}>FDA-Approved · MC1R Agonist · Physician-Supervised</p>
            <h1 style={s.h1}>
              Your melanin system works.<br />
              <span style={{ color: "#C8923A" }}>Afamelanotide amplifies it.</span>
            </h1>
            <p style={{ ...s.bodyDk, fontSize: "1.1rem", maxWidth: 520, margin: "1.5rem 0 2.5rem" }}>
              MelanotanRx delivers afamelanotide — an FDA-approved MC1R agonist that increases your skin's natural eumelanin production through the body's own pigmentation pathway.
            </p>

            {/* Trust pill */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
              {["FDA-Approved Molecule", "Physician-Supervised", "Phase 3 RCT Data", "HIPAA-Compliant"].map((tag) => (
                <span key={tag} style={{ background: "rgba(200,146,58,0.15)", border: "1px solid rgba(200,146,58,0.35)", borderRadius: 100, padding: "0.3rem 0.9rem", ...s.caption, color: "#C8923A" }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#quiz" style={{ background: "#C8923A", color: "#1A1008", padding: "0.9rem 2rem", borderRadius: 4, fontFamily: DM, fontWeight: 600, fontSize: "0.9rem", letterSpacing: "0.04em", textDecoration: "none", display: "inline-block" }}>
                Check My Eligibility
              </a>
              <a href="#science" style={{ border: "1px solid rgba(250,246,240,0.3)", color: "#FAF6F0", padding: "0.9rem 2rem", borderRadius: 4, fontFamily: DM, fontWeight: 400, fontSize: "0.9rem", textDecoration: "none", display: "inline-block" }}>
                See the Science
              </a>
            </div>
          </div>

          {/* Stat boxes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { val: "+64 hrs", label: "pain-free sun exposure vs +41 hrs placebo", cite: "Study CUV039 · Phase 3 RCT · N=93" },
              { val: "244", label: "subjects across 3 Phase 3 trials", cite: "FDA NDA 210797 · 3 RCTs" },
              { val: "Bimonthly", label: "implant — no daily dosing required", cite: "FDA Prescribing Information" },
            ].map((stat) => (
              <div key={stat.val} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(200,146,58,0.2)", borderRadius: 8, padding: "1.5rem" }}>
                <div style={{ fontFamily: DM, fontWeight: 300, fontSize: "2.2rem", color: "#C8923A", lineHeight: 1 }}>{stat.val}</div>
                <div style={{ ...s.bodyDk, marginTop: "0.4rem" }}>{stat.label}</div>
                <div style={{ ...s.caption, marginTop: "0.4rem", color: "#6B5A4A" }}>{stat.cite}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section style={{ background: "#1A1008", borderTop: "1px solid rgba(200,146,58,0.15)", borderBottom: "1px solid rgba(200,146,58,0.15)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "1.5rem 2rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          {[
            { icon: "✓", label: "FDA-Approved Molecule", sub: "NDA 210797" },
            { icon: "◈", label: "3 Phase 3 Randomized Controlled Trials", sub: "CUV029 · CUV030 · CUV039" },
            { icon: "⊕", label: "Board-Certified Physician Protocol", sub: "Physician-Led" },
            { icon: "⬡", label: "HIPAA-Compliant Telehealth Platform", sub: "Secure Portal" },
            { icon: "◉", label: "Bi-Annual Skin Exam Included", sub: "Required by FDA PI" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ color: "#C8923A", fontSize: "1.1rem" }}>{item.icon}</span>
              <div>
                <div style={{ ...s.caption, color: "#FAF6F0", fontWeight: 500 }}>{item.label}</div>
                <div style={{ ...s.caption, color: "#6B5A4A" }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLEM CARDS ── */}
      <section style={{ background: "#FAF6F0", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ ...s.label, marginBottom: "1rem" }}>The Problem</p>
          <h2 style={{ ...s.h2lt, marginBottom: "3rem", maxWidth: 560 }}>
            Three signs your melanin system isn't working for you
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5rem" }}>
            {[
              {
                n: "01",
                title: "Photosensitivity That Limits Your Life",
                body: "Painful or uncomfortable reactions to sun exposure — whether from a diagnosed condition or heightened skin sensitivity — restrict what you can do outdoors. Your melanin system is the first line of photoprotection.",
              },
              {
                n: "02",
                title: "Uneven Pigmentation That Won't Resolve",
                body: "Vitiligo, hypopigmentation patches, and uneven tone are signs that MC1R-mediated eumelanin production is disrupted. Topical options address the surface. Afamelanotide works at the receptor level.",
              },
              {
                n: "03",
                title: "No Physician-Supervised Option Until Now",
                body: "You've looked at tanning peptides online. You found grey-market injectables and no physician oversight. MelanotanRx is the only afamelanotide protocol built on an FDA-approved molecule with mandatory skin monitoring.",
              },
            ].map((card) => (
              <div key={card.n} style={{ background: "#fff", border: "1px solid #E8E0D5", borderRadius: 12, padding: "2rem", borderTop: `3px solid #C8923A` }}>
                <div style={{ ...s.label, color: "#C8923A", marginBottom: "1rem" }}>{card.n}</div>
                <h3 style={{ ...s.h3lt, marginBottom: "0.75rem" }}>{card.title}</h3>
                <p style={s.body}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MECHANISM ── */}
      <section id="science" style={{ background: "#1A1008", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ ...s.label, marginBottom: "1rem" }}>Mechanism of Action</p>
          <h2 style={{ ...s.h2dk, marginBottom: "1rem", maxWidth: 640 }}>
            The MC1R pathway — your skin's own pigmentation signal, amplified
          </h2>
          <p style={{ ...s.bodyDk, maxWidth: 640, marginBottom: "3.5rem" }}>
            Afamelanotide works through the same cascade your body uses to produce protective eumelanin — but amplified, and independent of UV exposure.
          </p>

          {/* 5-step cascade */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "0", position: "relative", marginBottom: "4rem" }}>
            {[
              { n: 1, label: "Afamelanotide", body: "Synthetic α-MSH analog. Subcutaneous implant. Released over ~5 days." },
              { n: 2, label: "MC1R Binding", body: "Selectively binds MC1 receptor on melanocytes. Independent of UV exposure." },
              { n: 3, label: "Eumelanin Synthesis", body: "Drives production of eumelanin — the photoprotective dark pigment — within melanosomes." },
              { n: 4, label: "Melanosome Distribution", body: "Melanosomes distributed to surrounding keratinocytes, concentrated above the nucleus." },
              { n: 5, label: "Photoprotection", body: "Increased epidermal eumelanin absorbs, scatters, and quenches UV. Antioxidant activity upregulated." },
            ].map((step, i) => (
              <div key={step.n} style={{ position: "relative", padding: "1.5rem 1.25rem 1.5rem 1.5rem", borderLeft: i === 0 ? "1px solid rgba(200,146,58,0.3)" : "none", borderTop: "1px solid rgba(200,146,58,0.3)", borderBottom: "1px solid rgba(200,146,58,0.3)", borderRight: "1px solid rgba(200,146,58,0.3)", background: i === 2 ? "rgba(200,146,58,0.08)" : "transparent" }}>
                <div style={{ fontFamily: DM, fontWeight: 300, fontSize: "2rem", color: "rgba(200,146,58,0.3)", lineHeight: 1, marginBottom: "0.75rem" }}>{step.n}</div>
                <div style={{ ...s.h3dk, fontSize: "0.9rem", marginBottom: "0.5rem" }}>{step.label}</div>
                <p style={{ ...s.bodyDk, fontSize: "0.8rem" }}>{step.body}</p>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <h3 style={{ ...s.h3dk, marginBottom: "1.5rem" }}>MC1R Agonist Comparison</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: DM }}>
              <thead>
                <tr>
                  {["", "Afamelanotide (MelanotanRx)", "Melanotan II", "Endogenous α-MSH"].map((h, i) => (
                    <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", borderBottom: "1px solid rgba(200,146,58,0.3)", color: i === 1 ? "#C8923A" : "#FAF6F0", fontWeight: 600, fontSize: "0.85rem", background: i === 1 ? "rgba(200,146,58,0.08)" : "transparent" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["FDA status", "Approved (EPP, 2019)", "Not approved. Enforcement history.", "Natural hormone — not a product"],
                  ["Receptor specificity", "MC1R selective", "MC1R + MC3R + MC4R (broader)", "MC1R primary"],
                  ["Delivery", "Subcutaneous implant, bimonthly", "Injectable / nasal — illegal in US", "Endogenous release only"],
                  ["UV independence", "Yes — increases eumelanin without UV", "Yes — but illegal in US", "No — requires UV trigger"],
                  ["Phase 3 human data", "Yes — 3 trials, 244 subjects", "None", "N/A"],
                  ["Physician oversight", "Required — skin monitoring mandatory", "Not available legally", "N/A"],
                  ["Hormonal effects", "None significant at approved doses", "Priapism, nausea, BP changes reported", "None at physiologic levels"],
                ].map((row, i) => (
                  <tr key={row[0]} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent" }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: "0.75rem 1rem", fontSize: "0.85rem", color: j === 0 ? "#C8923A" : j === 1 ? "#FAF6F0" : "#8A7A6A", borderBottom: "1px solid rgba(200,146,58,0.1)", background: j === 1 ? "rgba(200,146,58,0.05)" : "transparent", fontWeight: j === 0 ? 500 : 400 }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── RESEARCH ── */}
      <section style={{ background: "#FAF6F0", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <p style={{ ...s.label, marginBottom: "1rem" }}>Clinical Evidence</p>
            <h2 style={{ ...s.h2lt, marginBottom: "1rem" }}>
              Phase 3 data.<br />244 subjects.<br />FDA-reviewed.
            </h2>
            <p style={{ ...s.body, maxWidth: 480, marginBottom: "2rem" }}>
              Three randomized controlled trials submitted to FDA as part of NDA 210797. The evidence base behind afamelanotide is the most rigorous of any melanocortin agent available.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["Erythropoietic Protoporphyria", "Vitiligo Repigmentation", "Polymorphic Light Eruption", "Photoprotection", "Melanocyte Biology", "MC1R Pharmacology"].map((tag) => (
                <span key={tag} style={{ background: "#F0E8DC", border: "1px solid #DDD0C0", borderRadius: 100, padding: "0.3rem 0.9rem", fontFamily: DM, fontSize: "0.75rem", color: "#6B3A1F" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { study: "CUV039 (Phase 3)", design: "RCT, N=93, 180 days", finding: "+64 hrs pain-free sunlight vs +41 placebo", cite: "Lancet 2015 · NEJM 2015" },
              { study: "CUV029 (Phase 3)", design: "RCT, N=74, 270 days", finding: "Significantly more pain-free outdoor days", cite: "Langendonk et al. NEJM 2015" },
              { study: "CUV030 (Phase 3)", design: "RCT, multicenter, vehicle-controlled", finding: "Contributed to FDA NDA 210797 approval package", cite: "FDA NDA Review 2019" },
              { study: "Vitiligo RCT", design: "Randomized controlled trial", finding: "RCT evidence for repigmentation in vitiligo", cite: "PubMed 33683075 (2021)" },
              { study: "Polymorphic Light Eruption", design: "RCT evidence", finding: "Reduced reactions to UV in PLE patients", cite: "PubMed 33683075 (2021)" },
            ].map((row) => (
              <div key={row.study} style={{ background: "#fff", border: "1px solid #E8E0D5", borderRadius: 8, padding: "1.25rem 1.5rem", borderLeft: `3px solid #C8923A` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                  <div>
                    <div style={{ ...s.h3lt, fontSize: "0.95rem", marginBottom: "0.2rem" }}>{row.study}</div>
                    <div style={{ ...s.caption, color: "#6B5A4A" }}>{row.design}</div>
                  </div>
                  <div style={{ ...s.caption, color: "#C8923A", textAlign: "right", flexShrink: 0 }}>{row.cite}</div>
                </div>
                <p style={{ ...s.body, fontSize: "0.875rem", marginTop: "0.5rem", color: "#3D3D3D" }}>{row.finding}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROTOCOL ── */}
      <section style={{ background: "#1A1008", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ ...s.label, marginBottom: "1rem" }}>The Protocol</p>
          <h2 style={{ ...s.h2dk, marginBottom: "3.5rem", maxWidth: 540 }}>
            Four steps from intake to your first implant
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.5rem" }}>
            {[
              {
                n: "01",
                title: "Medical Intake & Physician Review",
                body: "Health questionnaire: skin type (Fitzpatrick scale), photosensitivity history, melanocytic nevi count, cancer history, medications. Physician review within 48 hours. Informed consent required.",
              },
              {
                n: "02",
                title: "Baseline Skin Examination",
                body: "Full body skin exam by physician or coordinated dermatology partner — required by FDA prescribing information before first implant. Existing nevi documented photographically.",
              },
              {
                n: "03",
                title: "Implant Administration",
                body: "16 mg afamelanotide subcutaneous implant placed above the anterior supra-iliac crest by a trained physician. Drug releases over ~5 days. Repeat every 2 months.",
              },
              {
                n: "04",
                title: "Bi-Annual Monitoring",
                body: "Full body skin exam every 6 months — mandatory per FDA prescribing information. Nevi monitored for changes. Protocol continues or adjusts based on response and skin findings.",
              },
            ].map((step) => (
              <div key={step.n} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,146,58,0.2)", borderRadius: 12, padding: "2rem" }}>
                <div style={{ fontFamily: DM, fontWeight: 300, fontSize: "2.5rem", color: "rgba(200,146,58,0.35)", lineHeight: 1, marginBottom: "1rem" }}>{step.n}</div>
                <h3 style={{ ...s.h3dk, marginBottom: "0.75rem" }}>{step.title}</h3>
                <p style={{ ...s.bodyDk, fontSize: "0.9rem" }}>{step.body}</p>
              </div>
            ))}
          </div>

          {/* Photo + endorsement */}
          <div style={{ marginTop: "4rem", borderRadius: 12, overflow: "hidden", position: "relative", height: 300 }}>
            <img src={IMGS.labs} alt="Physician review" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.45 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(26,16,8,0.95) 40%, transparent)" }} />
            <div style={{ position: "absolute", top: "50%", left: "3rem", transform: "translateY(-50%)", maxWidth: 480 }}>
              <p style={{ ...s.bodyDk, fontSize: "1.05rem", fontStyle: "italic", marginBottom: "1rem" }}>
                "The mandatory monitoring cadence is what separates this from every other melanocortin protocol. Skin exam at baseline, six months, and annually thereafter — non-negotiable."
              </p>
              <p style={{ ...s.label }}>Aurelius Medical Advisory Board</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DISCOVER PEPTIDES ── */}
      <section style={{ background: "#FAF6F0", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ ...s.label, marginBottom: "1rem" }}>Aurelius Health Group</p>
          <h2 style={{ ...s.h2lt, marginBottom: "3rem", maxWidth: 480 }}>Explore related physician protocols</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem" }}>
            {[
              { name: "Tesamorelin", tag: "GHRH Analogue", url: "https://tesamorelin-rx.vercel.app" },
              { name: "CJC-1295", tag: "GHRH Analogue", url: "https://cjc-1295rx.vercel.app" },
              { name: "BPC-157", tag: "Tissue Repair", url: "#" },
              { name: "Semax", tag: "Nootropic", url: "#" },
              { name: "Thymosin α1", tag: "Immune", url: "#" },
              { name: "Ipamorelin", tag: "GH Secretagogue", url: "#" },
            ].map((p) => (
              <a key={p.name} href={p.url} style={{ background: "#fff", border: "1px solid #E8E0D5", borderRadius: 10, padding: "1.5rem", textDecoration: "none", display: "block" }}>
                <div style={{ ...s.label, marginBottom: "0.5rem" }}>{p.tag}</div>
                <div style={{ ...s.h3lt, fontSize: "1rem" }}>{p.name}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ background: "#1A1008", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <p style={{ ...s.label, marginBottom: "1rem" }}>Pricing</p>
            <h2 style={{ ...s.h2dk, marginBottom: "1rem" }}>
              Physician-supervised MC1R protocol. Without the dermatology markup.
            </h2>
            <p style={{ ...s.bodyDk, marginBottom: "1.5rem" }}>
              Dermatologist-administered photosensitivity protocols: $500–$900/visit + product. MelanotanRx bundles physician oversight, implant, and bi-annual skin monitoring.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                "Physician consultation",
                "Afamelanotide implant (bimonthly)",
                "Baseline skin exam coordination",
                "Bi-annual monitoring visits",
                "HIPAA portal access",
                "No hidden fees",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <span style={{ color: "#C8923A", fontSize: "0.9rem" }}>✓</span>
                  <span style={{ ...s.bodyDk, fontSize: "0.9rem" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,146,58,0.3)", borderRadius: 16, padding: "3rem", textAlign: "center" }}>
            <p style={{ ...s.label, marginBottom: "1rem" }}>Monthly Protocol</p>
            <div style={{ fontFamily: DM, fontWeight: 300, fontSize: "4rem", color: "#FAF6F0", lineHeight: 1 }}>$249</div>
            <div style={{ ...s.bodyDk, marginTop: "0.5rem", marginBottom: "2rem" }}>/month · billed monthly</div>
            <a href="#quiz" style={{ display: "block", background: "#C8923A", color: "#1A1008", padding: "1rem 2rem", borderRadius: 4, fontFamily: DM, fontWeight: 600, fontSize: "0.9rem", letterSpacing: "0.04em", textDecoration: "none", marginBottom: "1rem" }}>
              Check My Eligibility
            </a>
            <p style={{ ...s.caption, color: "#6B5A4A" }}>Subject to physician approval. Skin monitoring required. Cancel anytime.</p>
          </div>
        </div>
      </section>

      {/* ── QUIZ ── */}
      <section id="quiz" style={{ background: "#FAF6F0", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <p style={{ ...s.label, marginBottom: "1rem" }}>Eligibility Screening</p>
          <h2 style={{ ...s.h2lt, marginBottom: "0.75rem" }}>Am I a candidate for MelanotanRx?</h2>
          <p style={{ ...s.body, marginBottom: "0.75rem" }}>
            This screen does not constitute a medical evaluation. All protocols require physician review before implant placement.
          </p>
          <p style={{ ...s.caption, marginBottom: "2.5rem", color: "#8A7A6A" }}>
            Afamelanotide is approved for specific indications. Eligibility is determined by a physician.
          </p>

          {!quizDone ? (
            <div style={{ background: "#fff", border: "1px solid #E8E0D5", borderRadius: 12, padding: "2.5rem" }}>
              <div style={{ ...s.caption, color: "#C8923A", marginBottom: "1.5rem" }}>
                Question {quizStep + 1} of {QUESTIONS.length}
              </div>
              <div style={{ width: "100%", height: 3, background: "#F0E8DC", borderRadius: 3, marginBottom: "2rem" }}>
                <div style={{ width: `${((quizStep) / QUESTIONS.length) * 100}%`, height: "100%", background: "#C8923A", borderRadius: 3, transition: "width 0.3s" }} />
              </div>
              <h3 style={{ ...s.h3lt, marginBottom: "2rem" }}>{QUESTIONS[quizStep].q}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {QUESTIONS[quizStep].options.map((opt, aIdx) => (
                  <button key={opt} onClick={() => handleAnswer(quizStep, aIdx)} style={{ background: "#FAF6F0", border: "1px solid #DDD0C0", borderRadius: 8, padding: "1rem 1.25rem", textAlign: "left", fontFamily: DM, fontSize: "0.95rem", color: "#1A1008", cursor: "pointer" }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ background: "#fff", border: "1px solid #E8E0D5", borderRadius: 12, padding: "2.5rem", textAlign: "center" }}>
              {quizResult === "eligible" && (
                <>
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✓</div>
                  <h3 style={{ ...s.h3lt, marginBottom: "0.75rem" }}>You appear to be a candidate</h3>
                  <p style={{ ...s.body, marginBottom: "2rem" }}>Based on your responses, you may qualify for the MelanotanRx protocol. A physician will complete a full review before any implant is placed.</p>
                  <a href="mailto:intake@aureliushealthgroup.com" style={{ display: "inline-block", background: "#C8923A", color: "#1A1008", padding: "0.9rem 2rem", borderRadius: 4, fontFamily: DM, fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>Start Your Intake</a>
                </>
              )}
              {quizResult === "flag" && (
                <>
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>◈</div>
                  <h3 style={{ ...s.h3lt, marginBottom: "0.75rem" }}>Physician Review Required</h3>
                  <p style={{ ...s.body, marginBottom: "2rem" }}>{flagMsg}</p>
                  <a href="mailto:intake@aureliushealthgroup.com" style={{ display: "inline-block", background: "#C8923A", color: "#1A1008", padding: "0.9rem 2rem", borderRadius: 4, fontFamily: DM, fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>Request Physician Review</a>
                </>
              )}
              {quizResult === "disqualified" && (
                <>
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✕</div>
                  <h3 style={{ ...s.h3lt, marginBottom: "0.75rem" }}>Protocol Not Recommended</h3>
                  <p style={{ ...s.body, marginBottom: "2rem" }}>{disqualMsg || "Based on your responses, the MelanotanRx protocol is not appropriate. Please consult your physician for alternative options."}</p>
                  <button onClick={() => { setQuizStep(0); setQuizDone(false); setQuizResult(null); }} style={{ background: "transparent", border: "1px solid #C8923A", color: "#6B3A1F", padding: "0.9rem 2rem", borderRadius: 4, fontFamily: DM, fontWeight: 500, fontSize: "0.9rem", cursor: "pointer" }}>
                    Retake Quiz
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "#FAF6F0", padding: "2rem 2rem 6rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ ...s.label, marginBottom: "1rem" }}>FAQ</p>
          <h2 style={{ ...s.h2lt, marginBottom: "2.5rem" }}>Common questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderTop: "1px solid #E8E0D5" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", background: "transparent", border: "none", padding: "1.5rem 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: "left" }}
                >
                  <span style={{ ...s.h3lt, fontSize: "1rem" }}>{faq.q}</span>
                  <span style={{ color: "#C8923A", fontSize: "1.25rem", fontWeight: 300, flexShrink: 0, marginLeft: "1rem" }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <p style={{ ...s.body, paddingBottom: "1.5rem" }}>{faq.a}</p>
                )}
              </div>
            ))}
            <div style={{ borderTop: "1px solid #E8E0D5" }} />
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section style={{ background: "#1A1008", padding: "6rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <p style={{ ...s.label, marginBottom: "1.5rem" }}>The first FDA-approved melanocortin protocol</p>
          <h2 style={{ ...s.h2dk, marginBottom: "1.5rem" }}>
            Physician-supervised.<br />
            <span style={{ color: "#C8923A" }}>Built on approved science.</span>
          </h2>
          <p style={{ ...s.bodyDk, maxWidth: 480, margin: "0 auto 2.5rem" }}>
            Not grey-market. Not compounded. Afamelanotide — the FDA-approved MC1R agonist with three Phase 3 trials behind it.
          </p>
          <a href="#quiz" style={{ display: "inline-block", background: "#C8923A", color: "#1A1008", padding: "1rem 2.5rem", borderRadius: 4, fontFamily: DM, fontWeight: 600, fontSize: "0.95rem", letterSpacing: "0.04em", textDecoration: "none" }}>
            Check My Eligibility
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0F0904", padding: "3rem 2rem", borderTop: "1px solid rgba(200,146,58,0.1)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
            <div>
              <div style={{ fontFamily: DM, fontWeight: 600, fontSize: "1.1rem", color: "#C8923A", marginBottom: "1rem" }}>
                Melanotan<span style={{ color: "#FAF6F0" }}>Rx</span>
              </div>
              <p style={{ ...s.caption, color: "#6B5A4A", maxWidth: 380, lineHeight: 1.6 }}>
                MelanotanRx is a physician-supervised protocol using afamelanotide, an FDA-approved melanocortin-1 receptor agonist. All use is within the scope of applicable FDA approval. Individual results vary and are not guaranteed. Bi-annual skin monitoring is required. MelanotanRx is not affiliated with Clinuvel Pharmaceuticals.
              </p>
            </div>
            <div>
              <div style={{ ...s.label, marginBottom: "1rem", color: "#6B5A4A" }}>Protocol</div>
              {["How It Works", "The Science", "Protocol Steps", "Pricing", "FAQ"].map((l) => (
                <div key={l} style={{ marginBottom: "0.5rem" }}>
                  <a href="#" style={{ ...s.caption, color: "#6B5A4A", textDecoration: "none" }}>{l}</a>
                </div>
              ))}
            </div>
            <div>
              <div style={{ ...s.label, marginBottom: "1rem", color: "#6B5A4A" }}>Aurelius Health Group</div>
              {[
                { label: "aureliushealthgroup.com", url: "#" },
                { label: "tesamorelin-rx.com", url: "https://tesamorelin-rx.vercel.app" },
                { label: "cjc-1295rx.com", url: "https://cjc-1295rx.vercel.app" },
                { label: "ipamorelin-rx.com", url: "#" },
              ].map((l) => (
                <div key={l.label} style={{ marginBottom: "0.5rem" }}>
                  <a href={l.url} style={{ ...s.caption, color: "#6B5A4A", textDecoration: "none" }}>{l.label}</a>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(200,146,58,0.1)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <p style={{ ...s.caption, color: "#4A3A2A" }}>
              © 2026 Aurelius Health Group · melanotanrx.com · This content is for informational purposes only and does not constitute medical advice.
            </p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {["Privacy Policy", "Terms of Service", "Medical Disclaimer", "HIPAA Notice"].map((l) => (
                <a key={l} href="#" style={{ ...s.caption, color: "#4A3A2A", textDecoration: "none" }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
