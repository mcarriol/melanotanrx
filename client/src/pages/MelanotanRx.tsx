/* MelanotanRx — Standalone Landing Page
   Typography System (DM Sans — geometric sans-serif):
   ─────────────────────────────────────────────────────
   H1 / Hero:   weight 300, tight tracking -0.03em, generous leading
   H2:          weight 300, tracking -0.02em
   H3 / Cards:  weight 600
   Body:        weight 400, color #3D3D3D (soft charcoal)
   Labels:      weight 500, uppercase, 0.1em tracking, gold
   ─────────────────────────────────────────────────────
   Color Palette (matches TesamorelinRx design system):
   Gold:        #C9A96E
   Cream:       #F5F0E8
   Dark:        #0D0D0D
   Dark card:   #141414
*/
import { useState } from "react";
import Navbar from "@/components/Navbar";

const DM = "'DM Sans', system-ui, sans-serif";

const IMGS = {
  hero:  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1800&q=80",
  vial:  "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1800&q=80",
  labs:  "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80",
  body:  "https://images.unsplash.com/photo-1570275239925-4af0aa93a758?w=1200&q=80",
};

/* ── shared style tokens ── */
const s = {
  label: { fontFamily: DM, fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#C9A96E" },
  h1:    { fontFamily: DM, fontWeight: 300, fontSize: "clamp(2.75rem,6vw,5rem)", lineHeight: 1.08, letterSpacing: "-0.03em", color: "#F5F0E8" },
  h2dk:  { fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.75rem,3.5vw,2.75rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#F5F0E8" },
  h2lt:  { fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.75rem,3.5vw,2.75rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#1A1A1A" },
  h3dk:  { fontFamily: DM, fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.3, letterSpacing: "-0.01em", color: "#F5F0E8" },
  h3lt:  { fontFamily: DM, fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.3, letterSpacing: "-0.01em", color: "#1A1A1A" },
  body:  { fontFamily: DM, fontWeight: 400, fontSize: "1rem", lineHeight: 1.65, color: "#3D3D3D" },
  bodySm:{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", lineHeight: 1.6, color: "#5A5A5A" },
  bodyLt:{ fontFamily: DM, fontWeight: 300, fontSize: "0.9375rem", lineHeight: 1.65, color: "rgba(245,240,232,0.62)" },
  cite:  { fontFamily: DM, fontWeight: 400, fontSize: "0.72rem", lineHeight: 1.5, color: "#8C7B6B", fontStyle: "italic" },
};

/* ── Problem cards ── */
const problems = [
  { icon: "◉", title: "Photosensitivity That Limits Your Life", desc: "Painful reactions to sunlight — whether from EPP, PLE, or heightened skin sensitivity — restrict what you can do outdoors. Your melanin system is your first line of photoprotection." },
  { icon: "⊕", title: "Erythropoietic Protoporphyria Pain", desc: "EPP causes agonizing phototoxic pain after even brief sun exposure. Until afamelanotide, there was no FDA-approved pharmacologic option. Now there is." },
  { icon: "◎", title: "Uneven Pigmentation That Won't Resolve", desc: "Vitiligo, hypopigmentation, and uneven tone are signs that MC1R-mediated eumelanin production is disrupted. Topical options address the surface. Afamelanotide works at the receptor level." },
  { icon: "◈", title: "Vitiligo Without a Medical-Grade Option", desc: "Most vitiligo 'solutions' are cosmetic. Afamelanotide has randomized controlled trial evidence for repigmentation — the only MC1R agonist with published Phase 3 human data." },
  { icon: "⚡", title: "Grey-Market Peptides and No Oversight", desc: "Melanotan II is banned from compounding, unapproved, and associated with melanoma risk and serious cardiovascular events. MelanotanRx uses only FDA-approved afamelanotide with mandatory physician oversight." },
  { icon: "◷", title: "Dermatology Bottlenecks and High Costs", desc: "Dermatologist-administered photosensitivity protocols run $500–$900 per visit before product costs. MelanotanRx bundles physician oversight, implant, and bi-annual skin monitoring into one monthly plan." },
];

/* ── Five clinical pathways ── */
const pathways = [
  {
    n: "01", title: "Photoprotection via Eumelanin Upregulation",
    body: "Afamelanotide binds the MC1R receptor on melanocytes, driving eumelanin synthesis independent of UV exposure. In Phase 3 EPP trials, treated subjects experienced +64 hours of pain-free sun exposure vs. +41 hours for placebo — a clinically meaningful difference in photoprotective capacity.",
    cite: "Langendonk JG et al. N Engl J Med. 2015;373(1):48–59. CUV039 Phase 3 RCT, N=93.",
  },
  {
    n: "02", title: "EPP-Specific Phototoxic Pain Reduction",
    body: "In erythropoietic protoporphyria, excess protoporphyrin IX accumulates in red blood cells, causing phototoxic reactions upon sun exposure. Afamelanotide's pre-formed eumelanin shield reduces the UV-induced porphyrin activation that triggers EPP pain episodes.",
    cite: "Langendonk JG et al. Lancet. 2015;385(9978):1537–1547. CUV029 Phase 3 RCT.",
  },
  {
    n: "03", title: "Vitiligo Repigmentation",
    body: "A randomized controlled trial demonstrated afamelanotide's ability to stimulate repigmentation in vitiligo patients when used in combination with narrowband UVB. MC1R activation primes melanocytes for pigment production, enhancing the response to phototherapy.",
    cite: "PubMed PMID 33683075. Randomized controlled trial. Published 2021.",
  },
  {
    n: "04", title: "Polymorphic Light Eruption Management",
    body: "PLE — an immune-mediated photodermatosis affecting up to 15% of the population — causes itching and rash after UV exposure. Randomized controlled trial evidence supports afamelanotide as a preventive strategy, reducing PLE reaction frequency and severity.",
    cite: "PubMed PMID 33683075. RCT evidence for PLE. Published 2021.",
  },
  {
    n: "05", title: "Melanocyte Biology and Antioxidant Activity",
    body: "Beyond pigment production, MC1R activation upregulates DNA repair enzymes and antioxidant pathways within melanocytes. This dual mechanism — increased eumelanin plus enhanced cellular defense — is why afamelanotide outperforms melanin supplements that act only on the surface.",
    cite: "FDA NDA 210797 Review. Afamelanotide (Scenesse) Prescribing Information. Clinuvel Pharmaceuticals.",
  },
];

/* ── Research studies ── */
const studies = [
  {
    authors: "Langendonk JG et al.",
    journal: "N Engl J Med.",
    year: "2015",
    title: "Afamelanotide for Erythropoietic Protoporphyria",
    finding: "Phase 3 RCT, N=93. +64 hrs pain-free sun exposure vs +41 hrs placebo. Primary endpoint met. Submitted to FDA as part of NDA 210797 approval package.",
    tag: "Phase 3 RCT",
  },
  {
    authors: "Langendonk JG et al.",
    journal: "Lancet.",
    year: "2015",
    title: "CUV029 Phase 3 Randomized Controlled Trial",
    finding: "Phase 3 RCT, N=74. Significantly more pain-free outdoor days in afamelanotide arm vs. vehicle control. Contributed to FDA NDA 210797 approval package.",
    tag: "Phase 3 RCT",
  },
  {
    authors: "FDA NDA 210797 Review",
    journal: "FDA Clinical Review.",
    year: "2019",
    title: "CUV030 — Phase 3 Multicenter Vehicle-Controlled Trial",
    finding: "Third Phase 3 RCT in the NDA package. Multicenter, vehicle-controlled. Afamelanotide received FDA approval for EPP in 2019 based on all three trials combined.",
    tag: "FDA Approval",
  },
  {
    authors: "Koren A et al.",
    journal: "PubMed PMID 33683075.",
    year: "2021",
    title: "Afamelanotide and Narrowband UVB for Vitiligo Repigmentation",
    finding: "Randomized controlled trial. Afamelanotide + NB-UVB produced significantly greater repigmentation than NB-UVB alone. MC1R priming enhances phototherapy response.",
    tag: "Vitiligo RCT",
  },
  {
    authors: "Koren A et al.",
    journal: "PubMed PMID 33683075.",
    year: "2021",
    title: "Polymorphic Light Eruption: RCT Evidence",
    finding: "Randomized evidence supporting afamelanotide for PLE prevention. Reduction in reaction frequency and severity vs. control. Mechanism: pre-formed eumelanin reduces UV-induced immune activation.",
    tag: "PLE RCT",
  },
  {
    authors: "FDA Scenesse Prescribing Information",
    journal: "Clinuvel Pharmaceuticals.",
    year: "2019",
    title: "Afamelanotide (Scenesse) — Full Prescribing Information",
    finding: "FDA-approved for EPP. 16 mg subcutaneous implant every 2 months. Mandatory bi-annual full body skin exam. Contraindications: melanoma history, pregnancy, PLGA hypersensitivity.",
    tag: "FDA Label",
  },
];

/* ── What's included ── */
const included = [
  { icon: "◎", title: "Board-Certified Physician", desc: "A licensed provider reviews your intake, skin history, and Fitzpatrick type before prescribing. Every protocol is individualized — no one-size-fits-all dosing." },
  { icon: "⊕", title: "Baseline Skin Examination", desc: "Full body skin exam required by FDA prescribing information before first implant. Existing melanocytic nevi documented photographically. Coordinated with our dermatology network." },
  { icon: "◈", title: "FDA-Approved Afamelanotide Implant", desc: "16 mg Scenesse subcutaneous implant administered by a trained physician. Releases over ~5 days. Bimonthly administration. No daily dosing." },
  { icon: "◷", title: "Bi-Annual Skin Monitoring", desc: "Full body skin exam every 6 months — mandatory per FDA prescribing information. Melanocytic nevi monitored for changes. Protocol adjusts based on skin findings and response." },
  { icon: "◉", title: "Telehealth Consultations", desc: "Asynchronous and synchronous visits with your physician. No waiting rooms, no commute. Intake review within 48 hours." },
  { icon: "◑", title: "HIPAA-Compliant Portal", desc: "Secure patient portal for records, messaging, lab results, and protocol documentation. Fully HIPAA-compliant. All communications encrypted." },
];

/* ── FAQ ── */
const faqs = [
  {
    q: "What is afamelanotide?",
    a: "A synthetic analog of α-melanocyte-stimulating hormone (α-MSH). It binds the MC1R receptor on melanocytes and increases eumelanin production independent of UV exposure. FDA-approved since 2019 under the brand name Scenesse for erythropoietic protoporphyria.",
  },
  {
    q: "Is this the same as Melanotan II?",
    a: "No. Afamelanotide (Melanotan I) is FDA-approved. Melanotan II is a different compound — unapproved, banned from compounding since 2020, and associated with serious adverse events including melanoma risk, priapism, and cardiovascular changes. MelanotanRx uses only afamelanotide.",
  },
  {
    q: "Is afamelanotide FDA-approved?",
    a: "Yes. Afamelanotide received FDA approval in 2019 under NDA 210797 for erythropoietic protoporphyria. MelanotanRx operates within that approved scope under physician supervision. Use for vitiligo and other photosensitivity conditions is off-label but legally prescribed by physicians with documented clinical rationale.",
  },
  {
    q: "How is it administered?",
    a: "A 16 mg subcutaneous implant placed above the anterior supra-iliac crest by a trained physician. Most of the dose releases within 48 hours; >90% by day 5. Administered every 2 months. No daily injections or topical products required.",
  },
  {
    q: "Why is a skin exam required?",
    a: "FDA prescribing information mandates a full body skin exam twice yearly for all afamelanotide patients. Afamelanotide can darken existing moles, which requires baseline documentation and ongoing monitoring to detect changes early. This is non-negotiable in the MelanotanRx protocol.",
  },
  {
    q: "What are the side effects?",
    a: "Most common (>2% in Phase 3 trials): implant site reaction, nausea, oropharyngeal pain, fatigue, skin hyperpigmentation, dizziness. All were mild to moderate in severity. Serious reactions are rare. Full safety data reviewed with every patient at intake.",
  },
  {
    q: "Will it work without sun exposure?",
    a: "Afamelanotide increases eumelanin independent of UV — that is its mechanism. However, sun protection measures should be maintained during treatment per FDA prescribing information. The protocol is for photoprotection, not cosmetic tanning.",
  },
  {
    q: "How does this compare to retail melanin supplements?",
    a: "Retail products act on surface hydration or contain ingredients like tyrosine with no published Phase 3 evidence. Afamelanotide works at the MC1R receptor — the same pathway governing your body's natural pigmentation response — with three Phase 3 RCTs and FDA approval behind it.",
  },
];

/* ── Eligibility quiz ── */
const quizQuestions = [
  { q: "Personal or family history of melanoma or invasive skin cancer?", disqualify: "yes" },
  { q: "Currently pregnant or planning pregnancy in the next 6 months?", disqualify: "yes" },
  { q: "Known hypersensitivity to afamelanotide or PLGA polymer?", disqualify: "yes" },
  { q: "Active or recent immunosuppressant therapy that would prevent protocol participation?", disqualify: "yes" },
  { q: "Are you seeking afamelanotide solely for cosmetic tanning without a medical indication?", disqualify: "yes" },
  { q: "Do you have a diagnosed photosensitivity condition, pigmentation disorder, or are you seeking physician-supervised photoprotection?", disqualify: "no" },
];

function EligibilityQuiz() {
  const [answers, setAnswers] = useState<(string | null)[]>(Array(quizQuestions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = answers.every((a) => a !== null);
  const disqualified = answers.some((a, i) => a === quizQuestions[i].disqualify);

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      {!submitted ? (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {quizQuestions.map((item, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(245,240,232,0.1)", borderRadius: 8, padding: "20px 24px" }}>
                <p style={{ ...s.body, color: "#F5F0E8", marginBottom: 16, fontWeight: 400 }}>
                  <span style={{ color: "#C9A96E", fontWeight: 600, marginRight: 8 }}>{i + 1}.</span>
                  {item.q}
                </p>
                <div style={{ display: "flex", gap: 12 }}>
                  {["yes", "no"].map((val) => (
                    <button
                      key={val}
                      onClick={() => {
                        const next = [...answers];
                        next[i] = val;
                        setAnswers(next);
                      }}
                      style={{
                        fontFamily: DM, fontWeight: 500, fontSize: "0.875rem",
                        letterSpacing: "0.06em", textTransform: "uppercase",
                        padding: "10px 28px", borderRadius: 6, cursor: "pointer",
                        border: answers[i] === val ? "1.5px solid #C9A96E" : "1.5px solid rgba(245,240,232,0.2)",
                        background: answers[i] === val ? "rgba(201,169,110,0.15)" : "transparent",
                        color: answers[i] === val ? "#C9A96E" : "rgba(245,240,232,0.5)",
                        transition: "all 0.2s",
                      }}
                    >
                      {val.charAt(0).toUpperCase() + val.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setSubmitted(true)}
            disabled={!allAnswered}
            style={{
              marginTop: 32, width: "100%", padding: "16px", borderRadius: 6,
              fontFamily: DM, fontWeight: 500, fontSize: "1rem", cursor: allAnswered ? "pointer" : "not-allowed",
              background: allAnswered ? "#C9A96E" : "rgba(201,169,110,0.25)",
              color: allAnswered ? "#0D0D0D" : "rgba(245,240,232,0.3)",
              border: "none", transition: "all 0.2s",
            }}
          >
            Check My Eligibility
          </button>
        </>
      ) : disqualified ? (
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(245,240,232,0.12)", borderRadius: 10, padding: "40px 32px", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: 16 }}>◎</div>
          <h3 style={{ ...s.h3dk, marginBottom: 12 }}>You may not be a candidate at this time</h3>
          <p style={{ ...s.bodyLt, marginBottom: 24 }}>
            Based on your responses, one or more afamelanotide contraindications may apply. We recommend speaking with your physician before proceeding. Our care team is available to answer questions.
          </p>
          <a href="mailto:care@aureliushealthgroup.com" className="btn-ghost-cream" style={{ display: "inline-flex" }}>Contact Our Care Team</a>
        </div>
      ) : (
        <div style={{ background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.3)", borderRadius: 10, padding: "40px 32px", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: 16, color: "#C9A96E" }}>✓</div>
          <h3 style={{ ...s.h3dk, marginBottom: 12, color: "#C9A96E" }}>You appear to be a strong candidate</h3>
          <p style={{ ...s.bodyLt, marginBottom: 28 }}>
            Based on your responses, no absolute contraindications were identified. The next step is a physician intake and baseline skin examination to confirm eligibility and schedule your first implant.
          </p>
          <a href="#cta" className="btn-gold" style={{ display: "inline-flex" }}>Start Your Assessment</a>
        </div>
      )}
    </div>
  );
}

function FaqItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(245,240,232,0.1)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "22px 0", background: "none", border: "none", cursor: "pointer", gap: 16,
        }}
      >
        <span style={{ ...s.h3dk, textAlign: "left", fontSize: "1rem" }}>{item.q}</span>
        <span style={{
          width: 28, height: 28, borderRadius: "50%", border: "1px solid rgba(245,240,232,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#F5F0E8", fontFamily: DM, fontWeight: 300, fontSize: "1.1rem", flexShrink: 0,
          transition: "transform 0.25s", transform: open ? "rotate(45deg)" : "none",
        }}>+</span>
      </button>
      <div style={{ overflow: "hidden", maxHeight: open ? 400 : 0, transition: "max-height 0.35s ease" }}>
        <p style={{ ...s.bodyLt, paddingBottom: 20, paddingRight: 44 }}>{item.a}</p>
      </div>
    </div>
  );
}

export default function MelanotanRx() {
  return (
    <div style={{ background: "#F5F0E8", minHeight: "100vh" }}>
      <Navbar productName="MelanotanRx" />

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden", background: "#0D0D0D" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMGS.hero})`, backgroundSize: "cover", backgroundPosition: "center 25%", backgroundRepeat: "no-repeat" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.6) 55%, rgba(13,13,13,0.1) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.7) 0%, transparent 55%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem 100px", width: "100%" }}>
          {/* Sister brand breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <a href="https://aureliushealthgroup.com" style={{ ...s.label, color: "rgba(201,169,110,0.6)", textDecoration: "none" }}>Aurelius Health Group</a>
            <span style={{ color: "rgba(201,169,110,0.4)", fontSize: "0.7rem" }}>›</span>
            <span style={{ ...s.label }}>MelanotanRx</span>
          </div>
          <h1 style={{ ...s.h1, maxWidth: 660, marginBottom: 24 }}>
            The only FDA-approved<br />MC1R agonist for<br />photoprotection.
          </h1>
          <p style={{ ...s.bodyLt, maxWidth: 440, marginBottom: 20, fontSize: "1.0625rem" }}>
            Afamelanotide doesn't block UV. It activates your melanin system at the receptor level — producing protective eumelanin through the body's own pigmentation pathway, independent of sun exposure.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A96E", display: "inline-block" }} />
            <span style={{ ...s.bodyLt, fontSize: "0.875rem" }}>Physician-supervised · FDA-approved molecule · Bi-annual skin monitoring included</span>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#quiz" className="btn-gold">Check My Eligibility</a>
            <a href="#mechanism" className="btn-ghost-cream">How It Works</a>
          </div>
        </div>
      </section>

      {/* ══ PROBLEM — 6 cards ══ */}
      <section id="problem" style={{ background: "#F5F0E8", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Problem</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2lt }}>Six signs your melanin system isn't protecting you</h2>
            <p style={{ ...s.body, maxWidth: 520, paddingTop: 8 }}>
              The MC1R pathway is your body's primary photoprotective mechanism. When it's disrupted — by EPP, vitiligo, grey-market compounds, or inadequate clinical options — the downstream effects are painful, progressive, and often preventable.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {problems.map((p) => (
              <div key={p.title} style={{ background: "#fff", border: "1px solid rgba(13,13,13,0.07)", borderRadius: 10, padding: "28px 24px", transition: "box-shadow 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(13,13,13,0.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(201,169,110,0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A96E", fontSize: "1rem", marginBottom: 16 }}>{p.icon}</div>
                <h3 style={{ ...s.h3lt, marginBottom: 10, fontSize: "1rem" }}>{p.title}</h3>
                <p style={{ ...s.bodySm, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MECHANISM ══ */}
      <section id="mechanism" style={{ background: "#0D0D0D", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Mechanism</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <h2 style={{ ...s.h2dk, marginBottom: 20 }}>The upstream receptor signal itself.</h2>
              <p style={{ ...s.bodyLt, marginBottom: 40 }}>
                Most photoprotective strategies work at the surface — sunscreens, antioxidants, UV-blocking fabrics. Afamelanotide is different: it is a synthetic analog of α-MSH, the hormone that activates your melanin system at the MC1R receptor. This means your melanocytes remain active, eumelanin is produced in your own skin cells, and photoprotection is built from within — not applied from without.
              </p>

              {/* 5-node flow diagram */}
              <div style={{ marginBottom: 40 }}>
                <p style={{ ...s.label, marginBottom: 20 }}>Signal Cascade</p>
                {[
                  { node: "Afamelanotide", sub: "Synthetic α-MSH analog. Subcutaneous implant.", arrow: true },
                  { node: "MC1R Binding", sub: "Selective receptor activation on melanocytes", arrow: true },
                  { node: "Eumelanin Synthesis", sub: "Photoprotective dark pigment produced in melanosomes", arrow: true },
                  { node: "Melanosome Distribution", sub: "Melanosomes transferred to keratinocytes above nucleus", arrow: true },
                  { node: "Photoprotection", sub: "UV absorption, scattering, and antioxidant upregulation", arrow: false },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{
                        background: i === 0 ? "#C9A96E" : "rgba(201,169,110,0.12)",
                        border: `1.5px solid ${i === 0 ? "#C9A96E" : "rgba(201,169,110,0.35)"}`,
                        borderRadius: 8, padding: "10px 18px", minWidth: 200,
                      }}>
                        <span style={{ fontFamily: DM, fontWeight: 600, fontSize: "0.9375rem", color: i === 0 ? "#0D0D0D" : "#F5F0E8" }}>{item.node}</span>
                      </div>
                      <span style={{ ...s.bodyLt, fontSize: "0.8rem" }}>{item.sub}</span>
                    </div>
                    {item.arrow && (
                      <div style={{ marginLeft: 24, width: 1.5, height: 20, background: "rgba(201,169,110,0.35)", margin: "4px 0 4px 24px" }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison table */}
            <div>
              <p style={{ ...s.label, marginBottom: 20 }}>MC1R Agonist Comparison</p>
              <div style={{ border: "1px solid rgba(245,240,232,0.1)", borderRadius: 10, overflow: "hidden" }}>
                {/* Header */}
                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(245,240,232,0.1)" }}>
                  {["", "Afamelanotide", "Melanotan II", "α-MSH (endogenous)"].map((h, i) => (
                    <div key={i} style={{ padding: "14px 16px", fontFamily: DM, fontWeight: i === 1 ? 600 : 400, fontSize: "0.8rem", color: i === 1 ? "#C9A96E" : "rgba(245,240,232,0.5)", letterSpacing: "0.04em", borderRight: i < 3 ? "1px solid rgba(245,240,232,0.08)" : "none" }}>{h}</div>
                  ))}
                </div>
                {[
                  ["FDA status", "✓ Approved (EPP, 2019)", "✗ Not approved. Enforcement action.", "N/A — natural hormone"],
                  ["Receptor specificity", "MC1R selective", "MC1R + MC3R + MC4R", "MC1R primary"],
                  ["Delivery", "✓ Subcutaneous implant, bimonthly", "✗ Injectable / nasal — illegal in US", "Endogenous only"],
                  ["UV independence", "✓ Yes — eumelanin without UV", "Yes — but illegal in US", "✗ Requires UV trigger"],
                  ["Phase 3 human data", "✓ Yes — 3 trials, 244 subjects", "✗ None", "N/A"],
                  ["Physician oversight", "✓ Required — skin monitoring mandatory", "✗ Not available legally", "N/A"],
                  ["Hormonal side effects", "✓ None significant at approved doses", "✗ Priapism, nausea, BP changes", "None at physiologic levels"],
                ].map((row, i) => (
                  <div key={row[0]} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", borderBottom: i < 6 ? "1px solid rgba(245,240,232,0.06)" : "none" }}>
                    {row.map((cell, j) => (
                      <div key={j} style={{
                        padding: "12px 16px", fontFamily: DM, fontSize: "0.8rem",
                        color: j === 0 ? "rgba(245,240,232,0.45)" : j === 1 ? (cell.startsWith("✓") ? "#C9A96E" : cell.startsWith("✗") ? "rgba(245,240,232,0.3)" : "#F5F0E8") : (cell.startsWith("✓") ? "rgba(245,240,232,0.6)" : cell.startsWith("✗") ? "rgba(245,240,232,0.25)" : "rgba(245,240,232,0.5)"),
                        borderRight: j < 3 ? "1px solid rgba(245,240,232,0.06)" : "none",
                        background: j === 1 ? "rgba(201,169,110,0.04)" : "transparent",
                      }}>{cell}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FIVE PATHWAYS ══ */}
      <section style={{ background: "#F5F0E8", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Clinical Evidence</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2lt }}>Five evidence-backed pathways</h2>
            <p style={{ ...s.body, maxWidth: 520, paddingTop: 8 }}>
              Afamelanotide's effects are documented across Phase 3 randomized controlled trials, FDA prescribing data, and peer-reviewed research. Each pathway below is supported by a specific citation.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {pathways.map((p, i) => (
              <div key={p.n} style={{
                display: "grid", gridTemplateColumns: "80px 1fr 1fr",
                gap: 40, padding: "36px 0",
                borderBottom: i < pathways.length - 1 ? "1px solid rgba(13,13,13,0.08)" : "none",
                alignItems: "start",
              }}>
                <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "2rem", color: "rgba(13,13,13,0.15)", letterSpacing: "-0.04em", lineHeight: 1 }}>{p.n}</span>
                <div>
                  <h3 style={{ ...s.h3lt, marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ ...s.body, margin: 0 }}>{p.body}</p>
                </div>
                <div style={{ paddingTop: 4 }}>
                  <p style={{ ...s.cite }}>Source: {p.cite}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ RESEARCH — 6 studies ══ */}
      <section id="research" style={{ background: "#0D0D0D", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Peer-Reviewed Evidence</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2dk }}>The research behind the protocol</h2>
            <p style={{ ...s.bodyLt, paddingTop: 8 }}>
              Afamelanotide is the only FDA-approved MC1R agonist with Phase 3 randomized controlled trial data. These six studies form the evidentiary foundation of every Aurelius MelanotanRx protocol.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {studies.map((st) => (
              <div key={st.title} style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "24px 22px", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ ...s.label, fontSize: "0.65rem", border: "1px solid rgba(201,169,110,0.35)", borderRadius: 4, padding: "3px 8px" }}>{st.tag}</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "0.8rem", color: "rgba(245,240,232,0.3)" }}>{st.year}</span>
                </div>
                <h3 style={{ ...s.h3dk, fontSize: "0.9375rem", lineHeight: 1.4 }}>{st.title}</h3>
                <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "0.75rem", color: "#C9A96E", letterSpacing: "0.02em" }}>{st.authors} <em style={{ color: "rgba(245,240,232,0.4)" }}>{st.journal}</em></p>
                <p style={{ ...s.bodyLt, fontSize: "0.85rem", margin: 0 }}>{st.finding}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4-STEP PROTOCOL ══ */}
      <section style={{ background: "#F5F0E8", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Protocol</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2lt }}>Four steps from intake to your first implant</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>Designed to mirror the monitoring infrastructure of the Phase 3 trials — physician oversight, baseline skin documentation, FDA-approved implant administration, and mandatory bi-annual monitoring.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
            {[
              {
                n: "1", title: "Medical Intake & Physician Review",
                items: ["Health questionnaire: Fitzpatrick type, photosensitivity history", "Melanocytic nevi count, cancer history, medications", "Physician review within 48 hours", "Informed consent and contraindication screening"],
              },
              {
                n: "2", title: "Baseline Skin Examination",
                items: ["Full body skin exam — required by FDA prescribing information", "Existing nevi documented photographically", "Coordinated with our dermatology partner network", "Results reviewed before first implant is placed"],
              },
              {
                n: "3", title: "Implant Administration",
                items: ["16 mg afamelanotide subcutaneous implant", "Placed above anterior supra-iliac crest by trained physician", "Drug releases over ~5 days, >90% by day 5", "Repeat every 2 months — no daily dosing required"],
              },
              {
                n: "4", title: "Bi-Annual Monitoring",
                items: ["Full body skin exam every 6 months — FDA mandatory", "Nevi monitored for changes at each visit", "Physician check-ins between appointments", "Protocol adjusts based on skin findings and response"],
              },
            ].map((step) => (
              <div key={step.n} style={{ borderTop: "2px solid rgba(201,169,110,0.4)", paddingTop: 24 }}>
                <div style={{ fontFamily: DM, fontWeight: 300, fontSize: "2.5rem", color: "rgba(13,13,13,0.12)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 12 }}>{step.n}</div>
                <h3 style={{ ...s.h3lt, marginBottom: 16, fontSize: "1rem" }}>{step.title}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {step.items.map((item) => (
                    <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "#C9A96E", fontSize: "0.75rem", marginTop: 3, flexShrink: 0 }}>◎</span>
                      <span style={{ ...s.bodySm }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHAT'S INCLUDED ══ */}
      <section style={{ background: "#0D0D0D", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>What's Included</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2dk }}>Phase 3 trial infrastructure. Delivered to you.</h2>
            <p style={{ ...s.bodyLt, paddingTop: 8 }}>Every element of the Aurelius MelanotanRx plan mirrors the physician oversight and monitoring infrastructure used in the clinical trials that generated the FDA approval package.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {included.map((item) => (
              <div key={item.title} style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "28px 24px" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(201,169,110,0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A96E", fontSize: "1rem", marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ ...s.h3dk, marginBottom: 8, fontSize: "1rem" }}>{item.title}</h3>
                <p style={{ ...s.bodyLt, fontSize: "0.875rem", margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section id="pricing" style={{ background: "#F5F0E8", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Pricing</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <h2 style={{ ...s.h2lt, marginBottom: 20 }}>Specialist-level care. Without the dermatology markup.</h2>
              <p style={{ ...s.body, marginBottom: 32 }}>
                Dermatologist-administered photosensitivity protocols run $500–$900 per visit before product costs. Aurelius bundles physician oversight, the afamelanotide implant, and bi-annual skin monitoring into a single monthly plan.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {["Physician consultation included", "Baseline skin exam coordination included", "FDA-approved afamelanotide implant included", "Bi-annual monitoring visits included", "HIPAA-compliant portal access included", "No hidden fees"].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#C9A96E" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="#C9A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ ...s.bodySm }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: "#0D0D0D", borderRadius: 12, padding: "48px 40px", textAlign: "center", border: "1px solid rgba(201,169,110,0.15)" }}>
                <p style={{ ...s.label, marginBottom: 12 }}>MelanotanRx Plan</p>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1.25rem", color: "#C9A96E", marginTop: 10 }}>$</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "5rem", lineHeight: 1, letterSpacing: "-0.04em", color: "#F5F0E8" }}>249</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1rem", color: "rgba(245,240,232,0.4)", marginTop: 16 }}>/mo</span>
                </div>
                <p style={{ ...s.bodyLt, fontSize: "0.8rem", marginBottom: 32 }}>
                  vs. $500–$900/visit at a dermatology clinic
                </p>
                <a href="#quiz" className="btn-gold" style={{ width: "100%", justifyContent: "center", padding: "16px", fontSize: "1rem" }}>Check My Eligibility</a>
                <p style={{ ...s.bodyLt, fontSize: "0.75rem", marginTop: 16, opacity: 0.5 }}>Subject to physician approval. Skin monitoring required. Cancel anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ BODY IMAGE ══ */}
      <section style={{ background: "#0D0D0D", padding: "0" }}>
        <div style={{ position: "relative", maxHeight: 480, overflow: "hidden" }}>
          <img src={IMGS.body} alt="Photoprotection protocol" style={{ width: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,13,13,0.75) 0%, transparent 40%, transparent 60%, rgba(13,13,13,0.75) 100%)" }} />
          <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", textAlign: "center", width: "100%" }}>
            <p style={{ ...s.label, marginBottom: 8 }}>Phase 3 Trial Outcome</p>
            <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.25rem, 2.5vw, 2rem)", color: "#F5F0E8", letterSpacing: "-0.02em" }}>+64 hours pain-free sun exposure vs +41 hours placebo</p>
          </div>
        </div>
      </section>

      {/* ══ ELIGIBILITY QUIZ ══ */}
      <section id="quiz" style={{ background: "#0D0D0D", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16, textAlign: "center" }}>Eligibility Screening</p>
          <h2 style={{ ...s.h2dk, textAlign: "center", marginBottom: 16 }}>Are you a candidate for MelanotanRx?</h2>
          <p style={{ ...s.bodyLt, textAlign: "center", marginBottom: 56, maxWidth: 520, margin: "0 auto 56px" }}>
            This 6-question screen checks for afamelanotide-specific contraindications. It takes under 60 seconds and does not constitute a medical evaluation.
          </p>
          <EligibilityQuiz />
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" style={{ background: "#0D0D0D", padding: "100px 0", borderTop: "1px solid rgba(245,240,232,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Frequently Asked Questions</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
            <div style={{ position: "sticky", top: 100 }}>
              <h2 style={{ ...s.h2dk, marginBottom: 20 }}>Everything you need to know</h2>
              <p style={{ ...s.bodyLt }}>Including afamelanotide vs. Melanotan II, FDA approval status, skin exam requirements, side effects, and how this compares to retail melanin supplements.</p>
              <div style={{ marginTop: 40 }}>
                <img src={IMGS.labs} alt="Physician skin review" style={{ width: "100%", borderRadius: 10, objectFit: "cover" }} />
              </div>
            </div>
            <div>
              {faqs.map((item) => (
                <FaqItem key={item.q} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CLOSING CTA ══ */}
      <section id="cta" style={{ background: "#0D0D0D", padding: "120px 0", textAlign: "center", borderTop: "1px solid rgba(245,240,232,0.06)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 20 }}>Start Today</p>
          <h2 style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "#F5F0E8", marginBottom: 24 }}>
            Your photosensitivity is not inevitable.
          </h2>
          <p style={{ ...s.bodyLt, marginBottom: 48, fontSize: "1.0625rem" }}>
            Afamelanotide has more Phase 3 evidence behind it than any other melanocortin agent available. A physician-supervised protocol is available today. The question is whether you're a candidate.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <a href="#quiz" className="btn-gold" style={{ padding: "16px 36px", fontSize: "1rem" }}>Check My Eligibility</a>
            <a href="#mechanism" className="btn-ghost-cream" style={{ padding: "16px 36px", fontSize: "1rem" }}>Review the Research</a>
          </div>
          <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>
            † Afamelanotide (Scenesse) is FDA-approved for erythropoietic protoporphyria. Use for vitiligo, polymorphic light eruption, and other photosensitivity conditions is off-label. Off-label prescribing is legal and at the clinical discretion of a licensed physician. This content is for informational purposes only and does not constitute medical advice. Individual results vary. All protocols require physician evaluation and are subject to contraindication screening. Aurelius Health Group is not affiliated with Clinuvel Pharmaceuticals.
          </p>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "#0A0A0A", borderTop: "1px solid rgba(245,240,232,0.06)", padding: "64px 0 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4 L6 40 L14 40 L24 20 L34 40 L42 40 Z" fill="#C9A96E" />
                  <line x1="12" y1="28" x2="36" y2="28" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="24" y1="20" x2="24" y2="44" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div>
                  <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#F5F0E8", display: "block" }}>MelanotanRx</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8C7B6B" }}>by Aurelius Health Group</span>
                </div>
              </div>
              <p style={{ ...s.bodySm, color: "rgba(245,240,232,0.35)", maxWidth: 220, marginTop: 12 }}>Physician-supervised afamelanotide protocol for photoprotection, eumelanin optimization, and pigmentation management.</p>
            </div>
            {[
              { heading: "Protocol", links: ["How It Works", "The Research", "Five Pathways", "What's Included"] },
              { heading: "Company", links: ["About Aurelius", "Our Physicians", "All Treatments", "Blog"] },
              { heading: "Support", links: ["Check Eligibility", "FAQ", "Contact Us", "Patient Portal"] },
            ].map((col) => (
              <div key={col.heading}>
                <p style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(245,240,232,0.3)", marginBottom: 16 }}>{col.heading}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", color: "rgba(245,240,232,0.45)", textDecoration: "none" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F0E8")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.45)")}>{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(245,240,232,0.06)", paddingTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.8rem", color: "rgba(245,240,232,0.22)" }}>© 2026 Aurelius Health Group. MelanotanRx is a physician-supervised telehealth protocol. All rights reserved.</p>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy Policy", "Terms of Service", "Medical Disclaimer"].map((link) => (
                <a key={link} href="#" style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.8rem", color: "rgba(245,240,232,0.22)", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.5)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.22)")}>{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
