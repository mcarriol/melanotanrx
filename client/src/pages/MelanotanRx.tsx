/*
   MelanotanRx — Landing Page
   Template: S-31Rx design system
   ─────────────────────────────────────────────────────
   Typography System (DM Sans — geometric sans-serif):
   H1 / Hero:   weight 300, tight tracking -0.03em, generous leading
   H2:          weight 300, tracking -0.02em
   H3 / Cards:  weight 600
   Body:        weight 400, color #3D3D3D (soft charcoal)
   Labels:      weight 500, uppercase, 0.1em tracking, gold
   ─────────────────────────────────────────────────────
*/
import { useState } from "react";
import Navbar from "@/components/Navbar";

const DARK_ORANGE = "#D2570A";

const DM = "'DM Sans', system-ui, sans-serif";

const IMGS = {
  hero:   "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1800&q=80",
  cells:  "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1800&q=80",
  labs:   "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80",
  skin:   "https://images.unsplash.com/photo-1570275239925-4af0aa93a758?w=1200&q=80",
};

const s = {
  label:  { fontFamily: DM, fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#C9A96E" },
  h1:     { fontFamily: DM, fontWeight: 300, fontSize: "clamp(2.4rem,6vw,5rem)", lineHeight: 1.08, letterSpacing: "-0.03em", color: "#F5F0E8" },
  h2dk:   { fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.6rem,3.5vw,2.75rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#F5F0E8" },
  h2lt:   { fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.6rem,3.5vw,2.75rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#1A1A1A" },
  h3dk:   { fontFamily: DM, fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.3, letterSpacing: "-0.01em", color: "#F5F0E8" },
  h3lt:   { fontFamily: DM, fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.3, letterSpacing: "-0.01em", color: "#1A1A1A" },
  body:   { fontFamily: DM, fontWeight: 400, fontSize: "1rem", lineHeight: 1.65, color: "#3D3D3D" },
  bodySm: { fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", lineHeight: 1.6, color: "#5A5A5A" },
  bodyLt: { fontFamily: DM, fontWeight: 300, fontSize: "0.9375rem", lineHeight: 1.65, color: "rgba(245,240,232,0.62)" },
  cite:   { fontFamily: DM, fontWeight: 400, fontSize: "0.72rem", lineHeight: 1.5, color: "#8C7B6B", fontStyle: "italic" },
};

/* ── Problem cards — 3 only ── */
const problems = [
  {
    icon: "◉",
    title: "Photosensitivity & EPP Pain",
    profile: "Adults with erythropoietic protoporphyria, polymorphic light eruption, or heightened photosensitivity who experience painful or severely limiting reactions to sun exposure that restrict daily life and outdoor activity",
    mechanism: "Afamelanotide binds the MC1R receptor on melanocytes, driving eumelanin synthesis independent of UV exposure. The pre-formed eumelanin acts as a broadband UV absorber, scattering and quenching photons before they can trigger the phototoxic cascade. Result: measurable, sustained photoprotection from within.",
    testimonial: "\"I spent my entire adult life avoiding sunlight. After starting afamelanotide, I attended my daughter's outdoor wedding for the first time without fear. The difference wasn't subtle.\" — K.L., 41, Portland OR",
  },
  {
    icon: "⊕",
    title: "Vitiligo & Hypopigmentation",
    profile: "Patients with vitiligo, hypopigmentation patches, or uneven pigmentation who have not achieved adequate response from topical treatments, phototherapy alone, or other conventional approaches",
    mechanism: "A randomized controlled trial demonstrated that afamelanotide combined with narrowband UVB phototherapy produced significantly greater repigmentation than NB-UVB alone in vitiligo patients. MC1R activation primes melanocytes for pigment production, amplifying the phototherapy response. This is receptor-level intervention — not a topical or cosmetic approach.",
    testimonial: "\"After two years of NB-UVB with minimal results, adding afamelanotide to my protocol produced repigmentation I hadn't seen in a decade. My dermatologist was genuinely surprised by the six-month photos.\" — M.R., 34, Chicago IL",
  },
  {
    icon: "◷",
    title: "Grey-Market Peptides & No Oversight",
    profile: "Individuals who have researched tanning peptides online, found grey-market injectables without physician oversight, and are looking for an FDA-approved alternative with mandatory skin monitoring and documented clinical rationale",
    mechanism: "Melanotan II is banned from compounding in the United States, has no Phase 3 human trial data, and is associated with melanoma risk, priapism, and serious cardiovascular events. Afamelanotide (Melanotan I) received FDA approval in 2019 under NDA 210797 — the only MC1R agonist with a rigorous human evidence base. MelanotanRx is the physician-supervised protocol built on the approved molecule.",
    testimonial: "\"I was using grey-market Melanotan II with no physician involvement. The shift to a supervised afamelanotide protocol with mandatory skin monitoring was the only responsible path forward.\" — D.S., 38, Austin TX",
  },
];

/* ── Pathways (Clinical Evidence) ── */
const pathways = [
  {
    n: "01", title: "Photoprotection via Eumelanin Upregulation — EPP",
    body: "Afamelanotide selectively binds MC1R on melanocytes, activating adenylyl cyclase via Gs coupling and initiating the cAMP cascade that drives MITF upregulation and eumelanin synthesis. This process occurs independent of UV exposure — building photoprotective pigment before sun exposure, not in response to it. In CUV039, treated EPP subjects experienced +64 hours of pain-free sun exposure vs +41 hours for placebo.",
    cite: "Langendonk JG et al. N Engl J Med. 2015;373(1):48–59. CUV039 Phase 3 RCT, N=93.",
    tags: ["Photoprotection", "MC1R binding", "Eumelanin synthesis"],
  },
  {
    n: "02", title: "EPP Pain Reduction — CUV029 & CUV039 Phase 3 Trials",
    body: "Two Phase 3 RCTs — CUV029 (N=74) and CUV039 (N=93) — demonstrated that afamelanotide significantly increased pain-free outdoor days in EPP patients. EPP-related phototoxic pain is caused by accumulated protoporphyrin IX reacting to UV; afamelanotide's eumelanin shield absorbs and scatters the UV before it can activate the porphyrin. Both trials were submitted to FDA as part of NDA 210797.",
    cite: "Langendonk JG et al. Lancet. 2015;385(9978):1537–1547. FDA NDA 210797.",
    tags: ["EPP", "CUV029", "CUV039", "Phototoxicity"],
  },
  {
    n: "03", title: "Vitiligo Repigmentation — Randomized Controlled Trial",
    body: "A 2021 RCT demonstrated that afamelanotide combined with narrowband UVB produced significantly greater repigmentation than NB-UVB alone in patients with non-segmental vitiligo. Afamelanotide primes existing melanocytes for pigment production, increasing their responsiveness to phototherapy and stimulating melanocyte migration into depigmented areas.",
    cite: "Koren A et al. Published 2021. PubMed PMID 33683075.",
    tags: ["Vitiligo", "Repigmentation", "NB-UVB", "RCT"],
  },
  {
    n: "04", title: "Polymorphic Light Eruption — RCT Evidence",
    body: "PLE is an immune-mediated photodermatosis affecting up to 15% of the population, causing itching, rash, and papules after UV exposure. Randomized controlled trial evidence supports afamelanotide as a preventive strategy for PLE — reducing reaction frequency and severity through pre-formed eumelanin that reduces the UV-induced immune activation cascade.",
    cite: "Koren A et al. Published 2021. PubMed PMID 33683075.",
    tags: ["Polymorphic light eruption", "Photodermatosis", "UV sensitivity"],
  },
  {
    n: "05", title: "DNA Repair Upregulation & Antioxidant Activity",
    body: "MC1R activation upregulates nucleotide excision repair (NER) enzymes within melanocytes, directly enhancing the cell's ability to repair UV-induced DNA damage. Afamelanotide also increases antioxidant enzyme activity — superoxide dismutase and catalase — within pigmented cells, providing a second layer of cellular protection beyond the physical UV-absorbing properties of eumelanin itself.",
    cite: "FDA NDA 210797 Prescribing Information. Clinuvel Pharmaceuticals. 2019.",
    tags: ["DNA repair", "Antioxidant", "NER pathway"],
  },
  {
    n: "06", title: "MC1R Pharmacology & Melanocyte Biology",
    body: "The MC1R receptor is the master regulator of human skin pigmentation. Afamelanotide (Tyr2-α-MSH) is a 13-amino-acid synthetic analog of α-MSH with enhanced receptor affinity and prolonged duration of action compared to the endogenous ligand. The PLGA implant delivers >90% of the 16 mg dose within 5 days, providing a sustained window of MC1R activation without the need for daily injections.",
    cite: "Schioth HB et al. Eur J Pharmacol. 1997;349(2–3):313–318.",
    tags: ["MC1R pharmacology", "α-MSH analog", "PLGA delivery"],
  },
];

/* ── Condition tag cloud ── */
const conditionTags = [
  "Erythropoietic Protoporphyria", "Vitiligo", "Polymorphic Light Eruption", "Photoprotection",
  "MC1R Activation", "Eumelanin Synthesis", "Photosensitivity Disorders", "Hypopigmentation",
  "Melanocyte Biology", "DNA Repair", "Skin Cancer Prevention", "Solar Urticaria",
  "Pigmentation Management", "UV Sensitivity", "Melanocortin Pharmacology",
];

/* ── FAQ ── */
const faqs = [
  {
    q: "What is afamelanotide and where does it come from?",
    a: "Afamelanotide (trade name Scenesse) is a synthetic analog of α-melanocyte-stimulating hormone (α-MSH), developed by Clinuvel Pharmaceuticals. It is a 13-amino-acid linear peptide with a modification at position 2 (Nle substitution) that enhances MC1R binding affinity and extends duration of action compared to endogenous α-MSH. Afamelanotide received FDA approval in 2019 under NDA 210797 for erythropoietic protoporphyria — making it the only FDA-approved MC1R agonist with Phase 3 human trial data.",
  },
  {
    q: "Is this the same as Melanotan II?",
    a: "No. Afamelanotide (Melanotan I) is FDA-approved, receptor-selective, and has a well-characterized Phase 3 safety profile. Melanotan II is a different compound — it binds MC1R, MC3R, and MC4R nonselectively, is banned from compounding in the United States, has no Phase 3 human data, and is associated with melanoma risk, priapism, nausea, and cardiovascular events. MelanotanRx uses only afamelanotide. They are not the same molecule.",
  },
  {
    q: "What does the clinical evidence actually show?",
    a: "Three Phase 3 RCTs were submitted to FDA as part of NDA 210797: CUV029 (N=74), CUV039 (N=93), and CUV030 (multicenter). The primary evidence is for EPP — afamelanotide significantly increased pain-free outdoor time vs. placebo across all trials. Additional RCT evidence exists for vitiligo repigmentation (afamelanotide + NB-UVB vs. NB-UVB alone) and polymorphic light eruption. The evidence base is unusually robust for a melanocortin agent, grounded in peer-reviewed publications and FDA review.",
  },
  {
    q: "How is afamelanotide administered?",
    a: "Afamelanotide is delivered as a 16 mg subcutaneous implant placed above the anterior supra-iliac crest by a trained physician. The PLGA-based implant releases the peptide over approximately 5 days, with >90% delivered by day 5. Implants are placed every 2 months — no daily injections or topical application required. The procedure takes minutes in a clinical setting.",
  },
  {
    q: "Why is a full-body skin exam required?",
    a: "FDA prescribing information for afamelanotide requires a full-body skin examination before first implant and every 6 months thereafter. Afamelanotide can darken existing melanocytic nevi, which requires baseline photographic documentation and ongoing monitoring to detect clinically significant changes. This is mandatory — not optional — in the MelanotanRx protocol, and is included at no additional cost.",
  },
  {
    q: "Is prescribing afamelanotide off-label legal in the United States?",
    a: "Afamelanotide is FDA-approved for EPP. Use for vitiligo, polymorphic light eruption, and other photosensitivity conditions is off-label. Off-label prescribing is legal, common, and well-established in U.S. medical practice — physicians exercise clinical judgment to prescribe approved drugs for non-approved indications when evidence supports it. Aurelius physicians document clinical rationale and obtain informed consent for every patient.",
  },
];

/* ── Eligibility Quiz ── */
function EligibilityQuiz() {
  const questions = [
    { q: "Do you have a personal or family history of melanoma or invasive skin cancer?", disqualifier: "YES", note: "Melanoma history is a contraindication to afamelanotide. A physician will evaluate your specific history before any protocol decision." },
    { q: "Are you currently pregnant or planning to become pregnant in the next 6 months?", disqualifier: "YES", note: "Afamelanotide has not been studied in pregnancy. Safety data is insufficient for use during pregnancy or active family planning." },
    { q: "Do you have known hypersensitivity to afamelanotide, PLGA polymer, or related synthetic peptides?", disqualifier: "YES", note: "Known hypersensitivity to afamelanotide or the PLGA delivery matrix is a contraindication to this protocol." },
    { q: "Are you seeking afamelanotide solely for cosmetic tanning without a medical indication?", disqualifier: "YES", note: "MelanotanRx is a physician-supervised medical protocol, not a cosmetic service. Afamelanotide is prescribed for photoprotection and pigmentation indications only." },
    { q: "Do you experience photosensitivity, a pigmentation disorder (EPP, vitiligo, PLE), or sun-related pain — or are you seeking physician-supervised photoprotection?", disqualifier: "NO", note: "A documented medical indication is required to initiate the MelanotanRx protocol." },
  ];

  const [answers, setAnswers] = useState<(string | null)[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const isDisqualified = questions.some((q, i) => answers[i] === q.disqualifier);
  const allAnswered = answers.every((a) => a !== null);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {questions.map((item, i) => (
        <div key={i} style={{ borderTop: "1px solid rgba(245,240,232,0.08)", padding: "28px 0" }}>
          <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "1rem", color: "#F5F0E8", marginBottom: 16, lineHeight: 1.5 }}>
            <span style={{ color: "#C9A96E", fontWeight: 500, marginRight: 10 }}>{String(i + 1).padStart(2, "0")}</span>
            {item.q}
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            {["YES", "NO"].map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  const next = [...answers];
                  next[i] = opt;
                  setAnswers(next);
                  setSubmitted(false);
                }}
                style={{
                  fontFamily: DM, fontWeight: 500, fontSize: "0.8125rem", letterSpacing: "0.06em",
                  padding: "10px 28px", borderRadius: 5, cursor: "pointer", transition: "all 0.2s",
                  background: answers[i] === opt ? "#C9A96E" : "transparent",
                  color: answers[i] === opt ? "#0D0D0D" : "rgba(245,240,232,0.5)",
                  border: `1.5px solid ${answers[i] === opt ? "#C9A96E" : "rgba(245,240,232,0.15)"}`,
                }}
              >{opt}</button>
            ))}
          </div>
          {answers[i] === item.disqualifier && (
            <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.8rem", color: "rgba(201,169,110,0.7)", marginTop: 10, lineHeight: 1.5 }}>
              ⚠ {item.note}
            </p>
          )}
        </div>
      ))}

      {allAnswered && !submitted && (
        <div style={{ paddingTop: 24 }}>
          <button onClick={() => setSubmitted(true)} className="btn-gold">View My Results</button>
        </div>
      )}

      {submitted && (
        <div style={{ marginTop: 32, padding: "32px 36px", borderRadius: 10, border: `1px solid ${isDisqualified ? "rgba(201,169,110,0.25)" : "rgba(201,169,110,0.35)"}`, background: isDisqualified ? "rgba(201,169,110,0.04)" : "rgba(201,169,110,0.07)" }}>
          {isDisqualified ? (
            <>
              <p style={{ ...s.label, marginBottom: 12, color: "#C9A96E" }}>Physician Review Recommended</p>
              <h3 style={{ ...s.h3dk, marginBottom: 12, fontSize: "1.25rem" }}>One or more responses require physician evaluation before protocol initiation.</h3>
              <p style={{ ...s.bodyLt, marginBottom: 24 }}>One or more of your answers indicates a condition that may require modification or exclusion from the standard MelanotanRx protocol. Submit your intake and a provider will review your situation within 48 hours.</p>
              <a href="mailto:intake@aureliushealthgroup.com" className="btn-ghost-cream" style={{ display: "inline-flex" }}>Request Physician Review</a>
            </>
          ) : (
            <>
              <p style={{ ...s.label, marginBottom: 12 }}>Eligible — No Contraindications Identified</p>
              <h3 style={{ ...s.h3dk, marginBottom: 12, fontSize: "1.25rem" }}>Based on your responses, you appear to be a candidate for the MelanotanRx protocol.</h3>
              <p style={{ ...s.bodyLt, marginBottom: 24 }}>No contraindications were identified. The next step is completing a comprehensive intake form and baseline skin evaluation. A board-certified physician will review your results within 48 hours.</p>
              <a href="mailto:intake@aureliushealthgroup.com" className="btn-gold" style={{ display: "inline-flex" }}>Start My Intake</a>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ── FAQ accordion ── */
function FaqItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: "1px solid rgba(245,240,232,0.08)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "1rem", color: "#F5F0E8", lineHeight: 1.4, paddingRight: 24 }}>{item.q}</span>
        <span style={{ color: "#C9A96E", fontSize: "1.25rem", flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      {open && (
        <div style={{ paddingBottom: 24 }}>
          <p style={{ ...s.bodyLt, margin: 0 }}>{item.a}</p>
        </div>
      )}
    </div>
  );
}

export default function MelanotanRx() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  return (
    <div style={{ background: "#0D0D0D", minHeight: "100vh" }}>
      <Navbar productName="MelanotanRx" />

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMGS.hero} alt="MelanotanRx hero" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.45) 50%, rgba(13,13,13,0.2) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem) clamp(60px,10vw,100px)", width: "100%" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <a href="https://aureliushealthgroup.com" style={{ ...s.label, color: "rgba(201,169,110,0.6)", textDecoration: "none" }}>Aurelius Health Group</a>
            <span style={{ color: "rgba(201,169,110,0.4)", fontSize: "0.7rem" }}>›</span>
            <span style={{ ...s.label }}>Melanotan<span style={{ color: DARK_ORANGE }}>Rx</span></span>
          </div>
          <h1 style={{ ...s.h1, maxWidth: 760, marginBottom: 24 }}>
            The only FDA-approved<br />MC1R agonist your skin<br />was designed to respond to.
          </h1>
          <p style={{ ...s.bodyLt, maxWidth: 480, marginBottom: 16, fontSize: "1.0625rem" }}>
            Afamelanotide is the world's only FDA-approved melanocortin-1 receptor agonist — binding the MC1R receptor on melanocytes to produce protective eumelanin through your body's own pigmentation pathway, independent of UV exposure.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
            {["Physician-supervised", "FDA-approved molecule", "Bi-annual skin monitoring included"].map((t) => (
              <span key={t} style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.55)", background: "rgba(245,240,232,0.06)", border: "1px solid rgba(245,240,232,0.1)", borderRadius: 20, padding: "5px 14px" }}>{t}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#quiz" className="btn-gold">Check My Eligibility</a>
            <a href="#research" className="btn-ghost-cream">How It Works</a>
          </div>
        </div>
      </section>

      {/* ══ STATS STRIP ══ */}
      <section style={{ background: "#111", borderTop: "1px solid rgba(201,169,110,0.12)", borderBottom: "1px solid rgba(201,169,110,0.12)", padding: "clamp(28px,4vw,40px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {[
              { stat: "2019", label: "FDA approved molecule" },
              { stat: "16 mg", label: "Subcutaneous bimonthly implant" },
              { stat: "3 RCTs", label: "Phase 3 clinical trials" },
              { stat: "$249/mo", label: "All-inclusive protocol" },
            ].map((item) => (
              <div key={item.stat} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.5rem,3vw,2.25rem)", letterSpacing: "-0.03em", color: "#F5F0E8", marginBottom: 4 }}>{item.stat}</p>
                <p style={{ ...s.label, color: "rgba(201,169,110,0.55)" }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ THE PROBLEM ══ */}
      <section style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Problem</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {problems.map((p) => (
              <div key={p.title} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(245,240,232,0.06)", borderRadius: 10, padding: "clamp(24px,3vw,36px)" }}>
                <span style={{ fontSize: "1.5rem", color: "#C9A96E", display: "block", marginBottom: 16 }}>{p.icon}</span>
                <h3 style={{ ...s.h3dk, marginBottom: 16 }}>{p.title}</h3>
                <div style={{ marginBottom: 20 }}>
                  <p style={{ ...s.label, marginBottom: 8, fontSize: "0.65rem" }}>Profile</p>
                  <p style={{ ...s.bodyLt, fontSize: "0.875rem" }}>{p.profile}</p>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <p style={{ ...s.label, marginBottom: 8, fontSize: "0.65rem" }}>Mechanism</p>
                  <p style={{ ...s.bodyLt, fontSize: "0.875rem" }}>{p.mechanism}</p>
                </div>
                <div style={{ borderTop: "1px solid rgba(245,240,232,0.06)", paddingTop: 20 }}>
                  <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "0.8125rem", color: "rgba(245,240,232,0.4)", lineHeight: 1.6, fontStyle: "italic" }}>{p.testimonial}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ THE MECHANISM ══ */}
      <section id="research" style={{ background: "#111", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Mechanism</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginBottom: 64 }}>
            {/* Origin story */}
            <div>
              <h2 style={{ ...s.h2dk, marginBottom: 24 }}>How afamelanotide activates your melanin system from the inside out</h2>
              <p style={{ ...s.bodyLt, marginBottom: 20 }}>
                Afamelanotide was designed as a synthetic analog of α-melanocyte-stimulating hormone (α-MSH) — the endogenous signal that activates the MC1R receptor on melanocytes. By mimicking this signal with greater potency and duration, afamelanotide sets the entire melanin cascade in motion without requiring UV exposure to trigger it.
              </p>
              <p style={{ ...s.bodyLt, marginBottom: 32 }}>
                When MC1R is activated, melanocytes upregulate MITF — the master transcription factor of melanogenesis — leading to eumelanin synthesis within melanosomes. These melanosomes are then distributed to surrounding keratinocytes, concentrating above cell nuclei to form a UV-absorbing shield. The result is photoprotection built from within your own skin architecture.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { label: "Mechanism", text: "α-MSH analog → MC1R binding → MITF upregulation → eumelanin synthesis → UV photoprotection" },
                  { label: "Structure", text: "Tyr2-α-MSH — 13 amino acid synthetic analog with enhanced MC1R selectivity" },
                  { label: "Delivery", text: "16 mg PLGA subcutaneous implant; >90% released by day 5; repeat every 2 months" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", gap: 16, padding: "16px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(245,240,232,0.06)", borderRadius: 8 }}>
                    <span style={{ ...s.label, color: "#C9A96E", flexShrink: 0, paddingTop: 2 }}>{item.label}</span>
                    <span style={{ ...s.bodyLt, fontSize: "0.875rem" }}>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* MC1R cascade flow */}
              <div style={{ marginTop: 40 }}>
                <p style={{ ...s.label, marginBottom: 20 }}>MC1R Signal Cascade</p>
                {[
                  { node: "Afamelanotide", sub: "Subcutaneous implant. PLGA release over 5 days.", arrow: true },
                  { node: "MC1R Binding", sub: "Gs-coupled receptor activation on melanocytes", arrow: true },
                  { node: "MITF Upregulation", sub: "Master regulator of melanogenesis activated", arrow: true },
                  { node: "Eumelanin Synthesis", sub: "Dark photoprotective pigment produced in melanosomes", arrow: true },
                  { node: "UV Photoprotection", sub: "Epidermal eumelanin absorbs & scatters UV radiation", arrow: false },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{
                        background: i === 0 ? "#C9A96E" : "rgba(201,169,110,0.1)",
                        border: `1.5px solid ${i === 0 ? "#C9A96E" : "rgba(201,169,110,0.3)"}`,
                        borderRadius: 6, padding: "8px 16px", minWidth: 190,
                      }}>
                        <span style={{ fontFamily: DM, fontWeight: 600, fontSize: "0.875rem", color: i === 0 ? "#0D0D0D" : "#F5F0E8" }}>{item.node}</span>
                      </div>
                      <span style={{ ...s.bodyLt, fontSize: "0.775rem" }}>{item.sub}</span>
                    </div>
                    {item.arrow && (
                      <div style={{ marginLeft: 22, width: 1.5, height: 18, background: "rgba(201,169,110,0.3)", margin: "3px 0 3px 22px" }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison Table */}
            <div>
              <p style={{ ...s.label, marginBottom: 20 }}>MC1R Agonist Comparison</p>
              <div style={{ border: "1px solid rgba(245,240,232,0.08)", borderRadius: 10, overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(245,240,232,0.08)" }}>
                  {["", "Afamelanotide", "Melanotan II", "α-MSH (endogenous)"].map((h, i) => (
                    <div key={i} style={{ padding: "14px 14px", fontFamily: DM, fontWeight: i === 1 ? 600 : 400, fontSize: "0.75rem", color: i === 1 ? "#C9A96E" : "rgba(245,240,232,0.45)", letterSpacing: "0.03em", borderRight: i < 3 ? "1px solid rgba(245,240,232,0.06)" : "none" }}>{h}</div>
                  ))}
                </div>
                {[
                  ["FDA status", "✓ Approved (EPP, 2019)", "✗ Banned from compounding", "N/A — natural hormone"],
                  ["Receptor selectivity", "MC1R selective", "MC1R + MC3R + MC4R", "MC1R primary"],
                  ["Delivery", "✓ PLGA implant, bimonthly", "✗ Injectable / nasal (illegal)", "Endogenous release only"],
                  ["UV independence", "✓ Yes — eumelanin without UV", "Yes — but illegal in US", "✗ Requires UV trigger"],
                  ["Phase 3 human data", "✓ 3 trials, 244 subjects", "✗ None", "N/A"],
                  ["Physician oversight", "✓ Required. Skin monitoring.", "✗ Not available legally", "N/A"],
                  ["Side effect profile", "✓ Mild injection-site reactions", "✗ Priapism, BP changes, melanoma risk", "None at physiologic levels"],
                ].map((row, i) => (
                  <div key={row[0]} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", borderBottom: i < 6 ? "1px solid rgba(245,240,232,0.05)" : "none" }}>
                    {row.map((cell, j) => (
                      <div key={j} style={{
                        padding: "11px 14px", fontFamily: DM, fontSize: "0.775rem",
                        color: j === 0 ? "rgba(245,240,232,0.4)" : j === 1 ? (cell.startsWith("✓") ? "#C9A96E" : cell.startsWith("✗") ? "rgba(245,240,232,0.25)" : "#F5F0E8") : (cell.startsWith("✓") ? "rgba(245,240,232,0.55)" : cell.startsWith("✗") ? "rgba(245,240,232,0.2)" : "rgba(245,240,232,0.45)"),
                        borderRight: j < 3 ? "1px solid rgba(245,240,232,0.05)" : "none",
                        background: j === 1 ? "rgba(201,169,110,0.03)" : "transparent",
                      }}>{cell}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ DISCOVER PEPTIDES ══ */}
      <section id="discover-peptides" style={{ background: "#F5F0E8", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 56 }}>
            <h2 style={{ ...s.h2lt }}>Discover Peptides</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>Explore the full range of physician-supervised peptide protocols available through Aurelius Health Group — each designed around peer-reviewed evidence, pharma-grade compounds, and measurable outcomes.</p>
          </div>

          {/* 4-card grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, marginBottom: 48 }}>
            {[
              {
                name: "MelanotanRx",
                nameBase: "Melanotan",
                nameSuffix: "Rx",
                tag: "Photoprotection",
                desc: "The only FDA-approved MC1R agonist — binding the melanocortin-1 receptor to produce protective eumelanin through your body's own pigmentation pathway, independent of UV exposure.",
                cta: "Check My Eligibility",
                ctaHref: "#quiz",
                featured: true,
              },
              {
                name: "TesamorelinRx",
                tag: "GHRH Analogue",
                desc: "The only FDA-studied GHRH analog for visceral fat reduction — restoring pulsatile GH release and selectively mobilizing visceral adipose tissue with Phase 3 RCT data.",
                cta: "Get Started",
                ctaHref: "https://tesamorelin-rx.vercel.app",
                featured: false,
              },
              {
                name: "S-31Rx",
                tag: "Mitochondrial Repair",
                desc: "The world's most precisely targeted mitochondrial peptide — binding cardiolipin on the inner membrane to restore ATP production and reverse cellular energy decline.",
                cta: "Get Started",
                ctaHref: "https://s-31-rx-pink.vercel.app",
                featured: false,
              },
              {
                name: "ThymosinAlpha-1Rx",
                tag: "Immune Modulation",
                desc: "The thymus-derived polypeptide that restores T-cell immunity, activates innate defense, and resolves immune dysfunction — without steroids or systemic toxicity.",
                cta: "Get Started",
                ctaHref: "#",
                featured: false,
              },
            ].map((peptide) => (
              <div
                key={peptide.name}
                style={{
                  background: peptide.featured ? "#1A1410" : "#1A1A1A",
                  borderRadius: 10,
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  position: "relative",
                  border: peptide.featured ? "1px solid rgba(201,169,110,0.3)" : "1px solid rgba(245,240,232,0.06)",
                }}
              >
                {peptide.featured && (
                  <div style={{
                    position: "absolute", top: -1, left: 20,
                    background: "#C9A96E", color: "#0D0D0D",
                    fontFamily: DM, fontWeight: 600, fontSize: "0.6rem",
                    letterSpacing: "0.12em", textTransform: "uppercase" as const,
                    padding: "3px 10px", borderRadius: "0 0 5px 5px",
                  }}>Current Protocol</div>
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: peptide.featured ? 8 : 0 }}>
                  <span style={{
                    fontFamily: DM, fontWeight: 500, fontSize: "0.65rem",
                    letterSpacing: "0.1em", textTransform: "uppercase" as const,
                    color: "#C9A96E", background: "rgba(201,169,110,0.1)",
                    padding: "3px 8px", borderRadius: 3, alignSelf: "flex-start",
                  }}>{peptide.tag}</span>
                  <h3 style={{ ...s.h3dk, fontSize: "1.0625rem", margin: 0 }}>
                    {peptide.featured
                      ? <>{peptide.nameBase}<span style={{ color: DARK_ORANGE }}>{peptide.nameSuffix}</span></>
                      : peptide.name
                    }
                  </h3>
                </div>
                <p style={{ ...s.bodyLt, fontSize: "0.875rem", flex: 1 }}>{peptide.desc}</p>
                <a
                  href={peptide.ctaHref}
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    fontFamily: DM, fontWeight: 500, fontSize: "0.8125rem", letterSpacing: "0.04em",
                    padding: "12px 20px", borderRadius: 6, textDecoration: "none", transition: "all 0.2s",
                    background: peptide.featured ? "#C9A96E" : "transparent",
                    color: peptide.featured ? "#0D0D0D" : "rgba(245,240,232,0.5)",
                    border: peptide.featured ? "none" : "1px solid rgba(245,240,232,0.15)",
                  }}
                  onMouseEnter={e => { if (!peptide.featured) { e.currentTarget.style.color = "#F5F0E8"; e.currentTarget.style.borderColor = "rgba(245,240,232,0.35)"; } }}
                  onMouseLeave={e => { if (!peptide.featured) { e.currentTarget.style.color = "rgba(245,240,232,0.5)"; e.currentTarget.style.borderColor = "rgba(245,240,232,0.15)"; } }}
                >
                  {peptide.cta}
                </a>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <a href="/peptides" style={{ ...s.label, color: "#8C7B6B", textDecoration: "none", borderBottom: "1px solid rgba(140,123,107,0.3)", paddingBottom: 2 }}>Discover More Peptides →</a>
          </div>
        </div>
      </section>

      {/* ══ CLINICAL EVIDENCE ══ */}
      <section id="research" style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Clinical Evidence</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 56 }}>
            <h2 style={{ ...s.h2dk }}>Six evidence-backed photoprotection pathways</h2>
            <p style={{ ...s.bodyLt, paddingTop: 8 }}>Afamelanotide's mechanism has been validated across three Phase 3 RCTs, multiple randomized trials for additional indications, and the FDA review package for NDA 210797. Each pathway below is grounded in peer-reviewed research — presented without exaggeration.</p>
          </div>

          {/* Condition tag cloud */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 48 }}>
            {conditionTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                style={{
                  fontFamily: DM, fontWeight: 400, fontSize: "0.8rem",
                  padding: "6px 14px", borderRadius: 20, cursor: "pointer", transition: "all 0.2s",
                  background: activeTag === tag ? "rgba(201,169,110,0.15)" : "transparent",
                  color: activeTag === tag ? "#C9A96E" : "rgba(245,240,232,0.4)",
                  border: `1px solid ${activeTag === tag ? "rgba(201,169,110,0.4)" : "rgba(245,240,232,0.1)"}`,
                }}
              >{tag}</button>
            ))}
          </div>

          {/* Pathway cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {pathways.map((pw) => (
              <div key={pw.n} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(245,240,232,0.06)", borderRadius: 10, padding: "clamp(24px,3vw,32px)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "2rem", color: "rgba(201,169,110,0.25)", lineHeight: 1 }}>{pw.n}</span>
                </div>
                <h3 style={{ ...s.h3dk, marginBottom: 12 }}>{pw.title}</h3>
                <p style={{ ...s.bodyLt, fontSize: "0.875rem", marginBottom: 16 }}>{pw.body}</p>
                <p style={{ ...s.cite, marginBottom: 16 }}>Source: {pw.cite}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {pw.tags.map((tag) => (
                    <span key={tag} style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.7rem", color: "rgba(201,169,110,0.6)", border: "1px solid rgba(201,169,110,0.2)", padding: "3px 8px", borderRadius: 3 }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mid-page image break */}
          <div style={{ marginTop: 64, borderRadius: 12, overflow: "hidden", position: "relative", height: "clamp(200px,30vw,380px)" }}>
            <img src={IMGS.cells} alt="Melanocyte biology" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.3) 60%, transparent 100%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 clamp(24px,5vw,60px)" }}>
              <div style={{ maxWidth: 480 }}>
                <p style={{ ...s.label, marginBottom: 12 }}>MC1R Origin</p>
                <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.1rem,2.5vw,1.75rem)", lineHeight: 1.2, letterSpacing: "-0.02em", color: "#F5F0E8" }}>
                  The only FDA-approved therapeutic agent designed to activate the melanocortin-1 receptor and build photoprotection from within your own skin
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROTOCOL ══ */}
      <section id="protocol" style={{ background: "#F5F0E8", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Protocol</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 56 }}>
            <h2 style={{ ...s.h2lt }}>Four steps to physician-supervised photoprotection</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>Every MelanotanRx protocol begins with physician evaluation and a mandatory baseline skin examination. No implant is placed without documented clinical rationale, informed consent, and a photographically documented skin baseline.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {[
              {
                step: "01",
                title: "Assessment & Intake",
                items: [
                  "Comprehensive health questionnaire",
                  "Fitzpatrick skin type mapping",
                  "Photosensitivity history review",
                  "Physician review within 48 hours",
                  "Contraindication screening",
                ],
              },
              {
                step: "02",
                title: "Baseline Skin Examination",
                items: [
                  "Full body skin exam — FDA mandatory",
                  "Melanocytic nevi count and mapping",
                  "Photographic documentation of nevi",
                  "Coordinated with dermatology network",
                  "Results reviewed before first implant",
                ],
              },
              {
                step: "03",
                title: "Implant Administration",
                items: [
                  "16 mg afamelanotide PLGA implant",
                  "Placed above anterior supra-iliac crest",
                  "Administered by trained physician",
                  ">90% drug release by day 5",
                  "Repeat every 2 months",
                ],
              },
              {
                step: "04",
                title: "Bi-Annual Monitoring",
                items: [
                  "Full body skin exam every 6 months",
                  "Nevi monitored for changes",
                  "Physician check-in between visits",
                  "Protocol adjusts based on response",
                  "Ongoing physician oversight",
                ],
              },
            ].map((step) => (
              <div key={step.step} style={{ background: "#0D0D0D", borderRadius: 10, padding: "clamp(24px,3vw,32px)", border: "1px solid rgba(201,169,110,0.1)" }}>
                <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "2.5rem", color: "rgba(201,169,110,0.2)", lineHeight: 1, marginBottom: 16 }}>{step.step}</p>
                <h3 style={{ ...s.h3dk, marginBottom: 20 }}>{step.title}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {step.items.map((item) => (
                    <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "#C9A96E", fontSize: "0.6rem", marginTop: 5, flexShrink: 0 }}>◆</span>
                      <span style={{ ...s.bodyLt, fontSize: "0.875rem" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section id="pricing" style={{ background: "#F5F0E8", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Pricing</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <h2 style={{ ...s.h2lt, marginBottom: 20 }}>Photoprotection medicine pricing. Without the dermatology markup.</h2>
              <p style={{ ...s.body, marginBottom: 24 }}>
                Dermatologist-administered photosensitivity protocols typically run $500–$900 per visit before the product cost — billed separately. Aurelius bundles physician oversight, the afamelanotide implant, and bi-annual skin monitoring into one monthly plan.
              </p>
              <div style={{ background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.15)", borderRadius: 8, padding: "20px 24px", marginBottom: 28 }}>
                <p style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#1A1A1A", marginBottom: 8 }}>Typical dermatology protocol cost breakdown:</p>
                {[
                  ["Initial dermatologist consult", "$500–$900"],
                  ["Full body skin examination", "$300–$600"],
                  ["Afamelanotide implant cost", "$400–$800"],
                  ["Bi-annual monitoring visit", "$500–$900"],
                  ["Total first month", "$1,700–$3,200"],
                ].map(([item, cost]) => (
                  <div key={item} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(13,13,13,0.06)" }}>
                    <span style={{ ...s.bodySm }}>{item}</span>
                    <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#8C6845" }}>{cost}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Physician consultation included", "Baseline skin exam coordination included", "FDA-approved afamelanotide implant included", "Bi-annual monitoring visits included", "HIPAA-compliant portal access included", "No hidden fees"].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#C9A96E" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="#C9A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ ...s.bodySm }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: "#0D0D0D", borderRadius: 12, padding: "clamp(32px,5vw,48px) clamp(24px,4vw,40px)", textAlign: "center", border: "1px solid rgba(201,169,110,0.15)" }}>
                <p style={{ ...s.label, marginBottom: 12 }}>MelanotanRx Plan</p>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1.25rem", color: "#C9A96E", marginTop: 10 }}>$</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(3.5rem,8vw,5rem)", lineHeight: 1, letterSpacing: "-0.04em", color: "#F5F0E8" }}>249</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1rem", color: "rgba(245,240,232,0.4)", marginTop: 16 }}>/mo</span>
                </div>
                <p style={{ ...s.bodyLt, fontSize: "0.8rem", marginBottom: 32 }}>vs. $1,700–$3,200/mo at a dermatology clinic</p>
                <a href="#quiz" className="btn-gold" style={{ width: "100%", justifyContent: "center", display: "flex", marginBottom: 16 }}>Check My Eligibility</a>
                <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", lineHeight: 1.6 }}>Subject to physician approval. Cancel anytime.</p>
                <div style={{ borderTop: "1px solid rgba(245,240,232,0.06)", marginTop: 28, paddingTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                  {["Physician-supervised protocol", "FDA-approved afamelanotide implant", "Baseline & bi-annual skin exams", "Monthly provider check-ins", "HIPAA-compliant portal"].map((item) => (
                    <div key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#C9A96E" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="#C9A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.8rem", color: "rgba(245,240,232,0.45)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ELIGIBILITY QUIZ ══ */}
      <section id="quiz" style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16, textAlign: "center" }}>Eligibility Screening</p>
          <h2 style={{ ...s.h2dk, textAlign: "center", marginBottom: 16 }}>Are you a candidate for MelanotanRx?</h2>
          <p style={{ ...s.bodyLt, textAlign: "center", maxWidth: 520, margin: "0 auto 56px" }}>
            This 5-question screen checks for afamelanotide protocol contraindications. It takes under 60 seconds and does not constitute a medical evaluation.
          </p>
          <EligibilityQuiz />
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0", borderTop: "1px solid rgba(245,240,232,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Frequently Asked Questions</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
            <div style={{ position: "sticky", top: 100 }}>
              <h2 style={{ ...s.h2dk, marginBottom: 20 }}>Everything you need to know</h2>
              <p style={{ ...s.bodyLt }}>Including afamelanotide vs. Melanotan II, honest research framing, FDA approval status, skin exam requirements, administration, and off-label prescribing legality.</p>
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
      <section style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0", textAlign: "center", borderTop: "1px solid rgba(245,240,232,0.06)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 20 }}>Start Today</p>
          <h2 style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "#F5F0E8", marginBottom: 24 }}>
            Your melanin system already<br />knows how to protect you.<br />Afamelanotide activates it.
          </h2>
          <p style={{ ...s.bodyLt, marginBottom: 48, fontSize: "1.0625rem" }}>
            Afamelanotide is the only FDA-approved MC1R agonist with three Phase 3 randomized controlled trials behind it — now available as a physician-supervised protocol with mandatory skin monitoring built in.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <a href="#quiz" className="btn-gold" style={{ padding: "16px 36px", fontSize: "1rem" }}>Check My Eligibility</a>
            <a href="#research" className="btn-ghost-cream" style={{ padding: "16px 36px", fontSize: "1rem" }}>Review the Research</a>
          </div>
          <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>
            † Afamelanotide (Scenesse) is FDA-approved for erythropoietic protoporphyria (NDA 210797). Use for vitiligo, polymorphic light eruption, and other photosensitivity conditions is off-label. Off-label prescribing is legal and at the clinical discretion of a licensed physician. This content is for informational purposes only and does not constitute medical advice. Individual results vary. All protocols require physician evaluation and are subject to contraindication screening. Aurelius Health Group is not affiliated with Clinuvel Pharmaceuticals.
          </p>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "#0A0A0A", borderTop: "1px solid rgba(245,240,232,0.06)", padding: "clamp(40px,6vw,64px) 0 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4 L6 40 L14 40 L24 20 L34 40 L42 40 Z" fill="#C9A96E" />
                  <line x1="12" y1="28" x2="36" y2="28" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="24" y1="20" x2="24" y2="44" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div>
                  <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#F5F0E8", display: "block" }}>Melanotan<span style={{ color: DARK_ORANGE }}>Rx</span></span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8C7B6B" }}>Aurelius Health Group</span>
                </div>
              </div>
              <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", color: "rgba(245,240,232,0.35)", maxWidth: 240, marginTop: 12, lineHeight: 1.6 }}>Physician-supervised afamelanotide protocol for photoprotection, eumelanin optimization, and pigmentation management.</p>
            </div>
            {[
              { heading: "Protocol", links: ["How It Works", "The Research", "Six Pathways"] },
              { heading: "Company", links: ["About Aurelius", "Our Physicians", "All Treatments", "Blog"] },
              { heading: "Support", links: ["Check Eligibility", "FAQ", "Contact Us", "Patient Portal"] },
            ].map((col) => (
              <div key={col.heading}>
                <p style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(245,240,232,0.3)", marginBottom: 16 }}>{col.heading}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", color: "rgba(245,240,232,0.45)", textDecoration: "none" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#F5F0E8")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.45)")}
                      >{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(245,240,232,0.06)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.2)" }}>© 2026 Aurelius Health Group. All rights reserved.</p>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy Policy", "Terms of Service", "Medical Disclaimer"].map((link) => (
                <a key={link} href="#" style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,0.6)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.25)")}
                >{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
