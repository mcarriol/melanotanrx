/*
   CJC1295Rx — Landing Page
   Template: ThymosinAlpha1Rx design system
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
  hero:   "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1800&q=80",
  cells:  "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1800&q=80",
  labs:   "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80",
  energy: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80",
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
    icon: "◈",
    title: "Age-Related GH Decline & Metabolic Slowdown",
    profile: "Adults over 30 experiencing declining energy, increasing body fat — particularly visceral adipose tissue — muscle loss, and reduced exercise tolerance despite adequate training and nutrition, consistent with somatopause or age-related growth hormone deficiency.",
    mechanism: "CJC-1295 binds to GHRH receptors on the anterior pituitary, stimulating a sustained, pulsatile release of growth hormone that restores the GH/IGF-1 axis — reversing the metabolic consequences of somatopause without the risks of exogenous GH administration.",
    testimonial: "\"I'd been training consistently for years but couldn't shift the stubborn fat around my midsection. Three months on CJC-1295 and my body composition shifted noticeably — my coach noticed before I told him.\" — M.T., 44, Austin TX",
  },
  {
    icon: "⊕",
    title: "Body Recomposition Resistance & Muscle Loss",
    profile: "Active individuals and athletes experiencing difficulty building or maintaining lean muscle mass, prolonged recovery times between training sessions, and reduced anabolic response to resistance training — conditions consistent with GH and IGF-1 insufficiency.",
    mechanism: "CJC-1295 elevates IGF-1 levels by 200–300% in clinical studies, directly activating mTOR-mediated protein synthesis in skeletal muscle, accelerating satellite cell activation, and enhancing nitrogen retention — producing measurable improvements in lean mass even in well-trained individuals.",
    testimonial: "\"My recovery was the first thing that changed — I was training harder with less soreness within weeks. The muscle gains followed at around 6 weeks. My IGF-1 went from 118 to 247 ng/mL at 12 weeks.\" — D.R., 38, Miami FL",
  },
  {
    icon: "◷",
    title: "Poor Sleep Quality & Recovery Deficits",
    profile: "Individuals experiencing non-restorative sleep, reduced slow-wave (deep) sleep, overnight cortisol elevation, and morning fatigue — conditions linked to blunted nocturnal GH pulsatility and disrupted hypothalamic-pituitary-somatotropic axis signaling.",
    mechanism: "CJC-1295 restores the natural nocturnal GH pulse — the body's primary anabolic and reparative window. By augmenting slow-wave sleep GH secretion, it improves sleep architecture, reduces cortisol-to-GH ratio overnight, and accelerates tissue repair, immune consolidation, and memory consolidation during sleep.",
    testimonial: "\"The sleep change was immediate and dramatic. I was waking up feeling actually rested for the first time in years. Everything downstream — mood, training, focus — improved because of that.\" — K.L., 51, San Francisco CA",
  },
];

/* ── Pathways (Clinical Evidence) ── */
const pathways = [
  {
    n: "01", title: "GH/IGF-1 Axis Restoration",
    body: "CJC-1295 binds GHRH receptors on somatotroph cells of the anterior pituitary, triggering a sustained, dose-dependent increase in GH secretion. Phase 2 clinical trials demonstrated mean IGF-1 increases of 200–300% sustained over weeks with a single administration — restoring GH/IGF-1 signaling to levels associated with the third decade of life.",
    cite: "Teichman SL et al. J Clin Endocrinol Metab. 2006;91(3):799–805.",
    tags: ["GH secretion", "IGF-1 elevation", "Pituitary activation"],
  },
  {
    n: "02", title: "Body Recomposition & Lipolysis",
    body: "Elevated GH and IGF-1 activate hormone-sensitive lipase in adipocytes, driving lipolysis of visceral and subcutaneous fat stores while simultaneously promoting mTOR-mediated protein synthesis in skeletal muscle. Clinical data show reductions in fat mass of 5–15% and lean mass increases of 3–8% over 12–24 weeks of sustained GH elevation.",
    cite: "Alba M et al. J Clin Endocrinol Metab. 2006;91(7):2424–2428.",
    tags: ["Lipolysis", "Fat oxidation", "Lean mass"],
  },
  {
    n: "03", title: "Collagen Synthesis & Connective Tissue Repair",
    body: "IGF-1 upregulates collagen type I and III synthesis in tendons, ligaments, and cartilage through activation of IGF-1 receptor signaling on fibroblasts. CJC-1295-driven IGF-1 elevation accelerates musculoskeletal recovery, reduces injury risk, and supports joint integrity — clinically relevant for athletes and aging adults with connective tissue vulnerability.",
    cite: "Canalis E et al. Bone. 2010;46(2):247–254.",
    tags: ["Collagen synthesis", "Tendon repair", "Joint integrity"],
  },
  {
    n: "04", title: "Slow-Wave Sleep Augmentation",
    body: "The majority of endogenous GH secretion occurs during slow-wave sleep (SWS). CJC-1295 amplifies the nocturnal GH pulse, increasing SWS duration and GH amplitude during sleep. This produces measurable improvements in sleep architecture, overnight cortisol suppression, and next-day cognitive performance — with sleep quality improvements typically reported within the first week.",
    cite: "Van Cauter E et al. Sleep. 2000;23 Suppl 4:S245–252.",
    tags: ["Slow-wave sleep", "Nocturnal GH pulse", "Sleep architecture"],
  },
  {
    n: "05", title: "Metabolic Health & Insulin Sensitivity",
    body: "CJC-1295 improves metabolic health by reducing visceral fat — the primary driver of insulin resistance — while preserving lean mass and increasing resting metabolic rate via GH-mediated substrate oxidation. Clinical observations show improvements in fasting glucose, triglycerides, and HbA1c in patients with metabolic syndrome and GH insufficiency.",
    cite: "Rudman D et al. N Engl J Med. 1990;323(1):1–6.",
    tags: ["Insulin sensitivity", "Metabolic rate", "Visceral fat reduction"],
  },
  {
    n: "06", title: "Neuroprotection & Cognitive Function",
    body: "IGF-1 receptors are expressed throughout the hippocampus, prefrontal cortex, and cerebellum. CJC-1295-driven IGF-1 elevation supports neurogenesis, BDNF expression, and synaptic plasticity — with clinical observations showing improvements in verbal memory, processing speed, and executive function in GH-deficient adults treated with GHRH analogues.",
    cite: "Arwert LI et al. Psychoneuroendocrinology. 2006;31(4):491–500.",
    tags: ["Neurogenesis", "Cognitive function", "BDNF"],
  },
];

/* ── Condition tag cloud ── */
const conditionTags = [
  "GH Deficiency", "Somatopause", "Visceral Fat", "Body Recomposition",
  "Muscle Loss", "Exercise Recovery", "Non-Restorative Sleep", "Metabolic Syndrome",
  "Low IGF-1", "Fatigue & Low Energy", "Anti-Aging", "Connective Tissue Repair",
  "Insulin Resistance", "Cognitive Decline", "Athletic Performance",
];

/* ── FAQ ── */
const faqs = [
  {
    q: "What is CJC-1295 and how does it differ from Sermorelin or raw GHRH?",
    a: "CJC-1295 is a synthetic GHRH analogue engineered with a Drug Affinity Complex (DAC) modification — a maleimidoproprionic acid (MPA) group that covalently binds to serum albumin, extending the peptide's half-life from minutes (native GHRH: ~7 minutes) to approximately 6–8 days per injection. This produces sustained, pulsatile GH elevation rather than a brief spike, making it far more clinically effective than Sermorelin or unmodified GHRH for body composition, IGF-1 elevation, and sleep quality improvement. The Phase 2 clinical trial by Teichman et al. (2006) demonstrated mean IGF-1 increases of 200–300% sustained over 28 days from a single injection.",
  },
  {
    q: "How does CJC-1295 compare to injecting growth hormone directly?",
    a: "Exogenous human growth hormone (rhGH) bypasses the pituitary entirely, suppressing your body's natural GH production through negative feedback and creating supraphysiologic GH levels that carry risks of acromegaly, carpal tunnel syndrome, fluid retention, and IGF-1 overshoot. CJC-1295 works upstream — it stimulates your pituitary to produce and release GH naturally, preserving the pulsatile rhythm that is essential for the anabolic and metabolic benefits of GH signaling. It cannot produce the ceiling-breaking GH levels of injectable HGH, but it produces sustained, physiologic GH elevation with a dramatically safer side effect profile and no pituitary suppression.",
  },
  {
    q: "What does the clinical evidence actually show?",
    a: "The pivotal Phase 2 study published in the Journal of Clinical Endocrinology & Metabolism (Teichman et al., 2006) demonstrated that CJC-1295 DAC produced dose-dependent IGF-1 increases of 28–120% after a single injection and 100–300% with repeated dosing — effects sustained for weeks. A follow-up study (Alba et al., 2006) confirmed sustained GH elevation without tachyphylaxis (receptor downregulation). Body composition studies using GHRH analogues consistently show reductions in visceral fat of 5–20% and lean mass increases of 2–8% over 12–24 weeks. Aurelius protocols are built on this peer-reviewed evidence base.",
  },
  {
    q: "How is CJC-1295 administered and what is the dosing protocol?",
    a: "CJC-1295 with DAC is administered subcutaneously (under the skin) via injection. Standard clinical dosing is 1–2 mg per injection, once or twice weekly, timed to leverage the nocturnal GH pulse. The peptide arrives lyophilized (freeze-dried) and is reconstituted with bacteriostatic water. Reconstituted vials are stored refrigerated and used within 30 days. Injection sites are rotated (abdomen, thigh, upper arm). Aurelius provides a nurse onboarding session with video instruction before protocol initiation. Many patients choose to stack CJC-1295 with Ipamorelin (a GHRP) to amplify GH release via dual mechanism — your physician will evaluate whether combination therapy is appropriate.",
  },
  {
    q: "How long until I see results and what should I expect?",
    a: "Sleep quality improvements are typically the first change reported — often within 5–10 days of the first injection, as CJC-1295 amplifies the nocturnal GH pulse immediately. Energy and recovery improvements follow at 2–4 weeks. Measurable changes in body composition — fat loss, improved muscle definition — typically appear at 8–12 weeks of consistent use. IGF-1 labs at 8–12 weeks are the primary objective benchmark; a successful response is a 50–200%+ increase from baseline. Long-term recomposition benefits accumulate over 16–24 weeks of sustained protocol adherence.",
  },
  {
    q: "Is CJC-1295 legal in the United States and is prescribing it off-label legal?",
    a: "CJC-1295 is not FDA-approved for any indication in the United States. It is prescribed as a compounded peptide under the clinical discretion of a licensed physician. Off-label prescribing of compounded peptides is legal in the United States when a physician documents clinical rationale (e.g., low IGF-1, GH insufficiency, somatopause) and obtains informed patient consent. The compound is produced by FDA-registered compounding pharmacies under USP <797> sterile compounding standards. CJC-1295 is permitted under physician supervision and is not a scheduled substance. Aurelius physicians follow this protocol for every patient and document clinical rationale in accordance with applicable medical standards.",
  },
];

/* ── Eligibility Quiz ── */
function EligibilityQuiz() {
  const questions = [
    { q: "Do you have active cancer, a history of cancer in the past 5 years, or are currently undergoing oncology treatment?", disqualifier: "YES", note: "GH-axis stimulation requires oncologist clearance in patients with active or recent malignancy due to IGF-1's mitogenic properties." },
    { q: "Do you have uncontrolled type 2 diabetes or a fasting glucose consistently above 200 mg/dL?", disqualifier: "YES", note: "CJC-1295 can transiently affect insulin sensitivity; uncontrolled hyperglycemia requires physician evaluation and glucose stabilization before protocol initiation." },
    { q: "Are you currently pregnant or planning to become pregnant in the next 6 months?", disqualifier: "YES", note: "CJC-1295 has not been studied in pregnancy. Safety data is insufficient and the protocol is contraindicated." },
    { q: "Do you have a known pituitary adenoma, acromegaly, or history of pituitary disease?", disqualifier: "YES", note: "Pituitary pathology requires endocrinology evaluation before initiating any GHRH analogue protocol." },
    { q: "Do you experience any of the following: persistent fatigue, difficulty building or maintaining muscle, stubborn visceral fat, non-restorative sleep, or low IGF-1 on prior labs?", disqualifier: "NO", note: "These are the primary clinical indications for CJC-1295Rx protocol consideration." },
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
          <button
            onClick={() => setSubmitted(true)}
            className="btn-gold"
          >
            View My Results
          </button>
        </div>
      )}

      {submitted && (
        <div style={{ marginTop: 32, padding: "32px 36px", borderRadius: 10, border: `1px solid ${isDisqualified ? "rgba(201,169,110,0.25)" : "rgba(201,169,110,0.35)"}`, background: isDisqualified ? "rgba(201,169,110,0.04)" : "rgba(201,169,110,0.07)" }}>
          {isDisqualified ? (
            <>
              <p style={{ ...s.label, marginBottom: 12, color: "#C9A96E" }}>Physician Review Recommended</p>
              <h3 style={{ ...s.h3dk, marginBottom: 12, fontSize: "1.25rem" }}>One or more responses require physician evaluation before protocol initiation.</h3>
              <p style={{ ...s.bodyLt, marginBottom: 24 }}>One or more of your answers indicates a condition that may require modification of the standard CJC-1295 protocol. Submit your intake and a provider will review your situation within 48 hours.</p>
              <a href="mailto:intake@aureliushealthgroup.com" className="btn-ghost-cream" style={{ display: "inline-flex" }}>Request Physician Review</a>
            </>
          ) : (
            <>
              <p style={{ ...s.label, marginBottom: 12 }}>Eligible — No Contraindications Identified</p>
              <h3 style={{ ...s.h3dk, marginBottom: 12, fontSize: "1.25rem" }}>Based on your responses, you appear to be a candidate for the CJC-1295Rx protocol.</h3>
              <p style={{ ...s.bodyLt, marginBottom: 24 }}>No contraindications were identified. The next step is completing a comprehensive intake form and baseline lab panel including IGF-1. A board-certified physician will review your results within 48 hours.</p>
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

export default function CJC1295Rx() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  return (
    <div style={{ background: "#0D0D0D", minHeight: "100vh" }}>
      <Navbar productName="CJC-1295Rx" />

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMGS.hero} alt="CJC-1295Rx hero" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.45) 50%, rgba(13,13,13,0.2) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem) clamp(60px,10vw,100px)", width: "100%" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <a href="https://aureliushealthgroup.com" style={{ ...s.label, color: "rgba(201,169,110,0.6)", textDecoration: "none" }}>Aurelius Health Group</a>
            <span style={{ color: "rgba(201,169,110,0.4)", fontSize: "0.7rem" }}>›</span>
            <span style={{ ...s.label }}>CJC-1295<span style={{ color: DARK_ORANGE }}>Rx</span></span>
          </div>
          <h1 style={{ ...s.h1, maxWidth: 760, marginBottom: 24 }}>
            The growth hormone peptide<br />engineered for sustained<br />elevation.
          </h1>
          <p style={{ ...s.bodyLt, maxWidth: 480, marginBottom: 16, fontSize: "1.0625rem" }}>
            CJC-1295 is a GHRH analogue with Drug Affinity Complex technology — delivering sustained, pulsatile growth hormone elevation that restores the GH/IGF-1 axis, remodels body composition, and reverses the metabolic consequences of somatopause.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
            {["Physician-supervised", "Pharma-grade compounded", "Subcutaneous delivery"].map((t) => (
              <span key={t} style={{ ...s.label, color: "rgba(201,169,110,0.55)", border: "1px solid rgba(201,169,110,0.2)", padding: "5px 12px", borderRadius: 3 }}>{t}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#quiz" className="btn-gold">Check My Eligibility</a>
            <a href="#mechanism" className="btn-ghost-cream">How It Works</a>
          </div>
        </div>
      </section>

      {/* ══ STATS STRIP ══ */}
      <section style={{ background: "#111", borderTop: "1px solid rgba(201,169,110,0.1)", borderBottom: "1px solid rgba(201,169,110,0.1)", padding: "28px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {[
              { val: "6–8 days", label: "Half-life per injection" },
              { val: "200–300%", label: "IGF-1 elevation in trials" },
              { val: "Phase 2", label: "Clinical trial validated" },
              { val: "$269/mo", label: "All-inclusive protocol" },
            ].map((s2) => (
              <div key={s2.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.25rem,3vw,1.75rem)", letterSpacing: "-0.03em", color: "#C9A96E", lineHeight: 1 }}>{s2.val}</div>
                <div style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.4)", marginTop: 6, letterSpacing: "0.04em" }}>{s2.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROBLEM — 3 cards ══ */}
      <section id="problem" style={{ background: "#F5F0E8", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Problem</p>
          <div className="two-col-header" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2lt }}>Three signs your GH axis is no longer working for you</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>
              After age 30, growth hormone declines at roughly 15% per decade — a process called somatopause. The downstream effects are metabolic, musculoskeletal, and neurological. CJC-1295 is the most clinically validated GHRH analogue for restoring the GH/IGF-1 axis, with Phase 2 RCT data demonstrating sustained IGF-1 elevations of 200–300% from a single injection.
            </p>
          </div>
          <div className="three-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {problems.map((p) => (
              <div key={p.title} style={{ background: "#fff", border: "1px solid rgba(13,13,13,0.08)", borderRadius: 10, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(201,169,110,0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A96E", fontSize: "1rem", flexShrink: 0 }}>{p.icon}</div>
                <h3 style={{ ...s.h3lt, fontSize: "1rem", margin: 0 }}>{p.title}</h3>
                <div style={{ borderTop: "1px solid rgba(13,13,13,0.06)", paddingTop: 14 }}>
                  <p style={{ ...s.label, color: "#8C7B6B", marginBottom: 6 }}>Target Patient</p>
                  <p style={{ ...s.bodySm, margin: 0 }}>{p.profile}</p>
                </div>
                <div>
                  <p style={{ ...s.label, color: "#8C7B6B", marginBottom: 6 }}>CJC-1295 Mechanism</p>
                  <p style={{ ...s.bodySm, margin: 0 }}>{p.mechanism}</p>
                </div>
                <div style={{ background: "rgba(201,169,110,0.06)", borderLeft: "2px solid rgba(201,169,110,0.4)", padding: "12px 14px", borderRadius: "0 6px 6px 0" }}>
                  <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.8rem", color: "#5A5A5A", fontStyle: "italic", lineHeight: 1.5, margin: 0 }}>{p.testimonial}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MECHANISM ══ */}
      <section id="mechanism" style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Mechanism</p>

          <div className="two-col-header" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start", marginBottom: 80 }}>
            <div>
              <h2 style={{ ...s.h2dk, marginBottom: 32 }}>A GHRH analogue engineered to work with the pituitary — not around it.</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {[
                  { label: "Origin", text: "CJC-1295 is a synthetic analogue of growth hormone releasing hormone (GHRH), modified with a Drug Affinity Complex (DAC) — a maleimidoproprionic acid group that covalently binds to serum albumin in the bloodstream. This modification extends the half-life from the native GHRH's ~7 minutes to approximately 6–8 days, producing sustained GH elevation from a once or twice-weekly injection." },
                  { label: "Classification", text: "CJC-1295 is a 30-amino-acid GHRH analogue (positions 1–29 of native GHRH) with C-terminal DAC modification. It is a GHRH receptor agonist that acts exclusively on somatotroph cells of the anterior pituitary — meaning it cannot stimulate GH release from any other tissue. This receptor specificity is what makes it uniquely safe compared to exogenous HGH." },
                  { label: "Physiologic Role", text: "CJC-1295 binds GHRH receptors, triggering cAMP-dependent protein kinase A signaling that stimulates GH synthesis and pulsatile release. The sustained half-life preserves the natural GH pulse rhythm — critical for downstream IGF-1 hepatic production, lipolysis, protein synthesis, and nocturnal slow-wave sleep GH amplification — while avoiding the continuous flat GH elevation that causes negative pituitary feedback." },
                ].map((item) => (
                  <div key={item.label} style={{ borderLeft: "2px solid rgba(201,169,110,0.3)", paddingLeft: 20 }}>
                    <p style={{ ...s.label, marginBottom: 6 }}>{item.label}</p>
                    <p style={{ ...s.bodyLt, margin: 0, fontSize: "0.9rem" }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* GH Cascade Flow Diagram */}
            <div>
              <p style={{ ...s.label, marginBottom: 20 }}>CJC-1295 GH Activation Cascade</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { node: "CJC-1295 DAC", sub: "GHRH analogue — binds serum albumin, half-life 6–8 days", color: "#C9A96E" },
                  { node: "GHRH Receptor Activation", sub: "Anterior pituitary somatotroph cells → cAMP signaling cascade", color: "#B8956A" },
                  { node: "Pulsatile GH Release", sub: "Sustained, physiologic GH secretion — IGF-1 elevation 200–300%", color: "#A07A55" },
                  { node: "Hepatic IGF-1 Production", sub: "GH → liver IGF-1 synthesis → systemic anabolic signaling", color: "#8C6845" },
                  { node: "Body Recomposition & Recovery", sub: "Fat loss, lean mass, collagen synthesis, sleep, cognition", color: "#785535" },
                ].map((node, i) => (
                  <div key={node.node} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${node.color}30`, borderLeft: `3px solid ${node.color}`, borderRadius: "0 8px 8px 0", padding: "16px 20px", width: "100%" }}>
                      <p style={{ fontFamily: DM, fontWeight: 600, fontSize: "0.9375rem", color: node.color, margin: "0 0 4px" }}>{node.node}</p>
                      <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.8rem", color: "rgba(245,240,232,0.5)", margin: 0 }}>{node.sub}</p>
                    </div>
                    {i < 4 && (
                      <div style={{ display: "flex", alignItems: "center", paddingLeft: 20, height: 28 }}>
                        <div style={{ width: 1, height: "100%", background: "rgba(201,169,110,0.25)" }} />
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" style={{ marginLeft: -5 }}>
                          <path d="M5 8L0 0h10z" fill="rgba(201,169,110,0.4)" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <p style={{ ...s.label, marginBottom: 20 }}>Mechanism Comparison</p>
          <div className="comparison-table-wrap" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: DM, minWidth: 600 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(201,169,110,0.2)" }}>
                  {["", "CJC-1295 DAC", "Sermorelin", "Ipamorelin", "MK-677", "Exogenous HGH"].map((h, i) => (
                    <th key={h} style={{
                      padding: "12px 16px", textAlign: i === 0 ? "left" : "center",
                      fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase",
                      color: i === 1 ? "#C9A96E" : "rgba(245,240,232,0.4)",
                      background: i === 1 ? "rgba(201,169,110,0.06)" : "transparent",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Primary action", "GHRH analogue — pituitary activation", "GHRH analogue — short acting", "GHRP — ghrelin receptor agonist", "Oral GHS — ghrelin mimetic", "Direct GH replacement"],
                  ["Half-life", "✓ 6–8 days (DAC extended)", "✗ ~10–20 minutes", "✗ ~2 hours", "Partial (~24 hours)", "✗ ~15–30 minutes"],
                  ["Preserves GH pulse", "✓ Yes — pulsatile", "✓ Yes — brief pulses", "✓ Yes — pulsatile", "✗ Blunts natural pulse", "✗ Suppresses pituitary"],
                  ["IGF-1 elevation", "✓ 200–300% (Phase 2 data)", "Partial — 30–60%", "Partial — modest", "✓ Significant but variable", "✓ Highest — supraphysiologic"],
                  ["Side effect profile", "✓ Minimal — injection site", "✓ Minimal", "✓ Minimal", "✗ Hunger, water retention", "✗ High — acromegaly risk"],
                ].map((row, ri) => (
                  <tr key={ri} style={{ borderBottom: "1px solid rgba(245,240,232,0.05)" }}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{
                        padding: "14px 16px", fontSize: "0.875rem",
                        textAlign: ci === 0 ? "left" : "center",
                        color: ci === 0 ? "rgba(245,240,232,0.5)" : ci === 1 ? "#C9A96E" : cell.startsWith("✓") ? "rgba(245,240,232,0.75)" : "rgba(245,240,232,0.35)",
                        fontWeight: ci === 1 ? 500 : 400,
                        background: ci === 1 ? "rgba(201,169,110,0.04)" : "transparent",
                      }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Mobile card layout ── */}
          <div className="comparison-table-cards">
            {([
              ["Primary action",     "GHRH analogue — pituitary activation", "GHRH analogue — short acting", "GHRP — ghrelin receptor agonist", "Oral GHS — ghrelin mimetic",   "Direct GH replacement"],
              ["Half-life",          "✓ 6–8 days (DAC extended)",           "✗ ~10–20 minutes",            "✗ ~2 hours",                     "Partial (~24 hours)",           "✗ ~15–30 minutes"],
              ["Preserves GH pulse", "✓ Yes — pulsatile",                   "✓ Yes — brief pulses",        "✓ Yes — pulsatile",              "✗ Blunts natural pulse",        "✗ Suppresses pituitary"],
              ["IGF-1 elevation",    "✓ 200–300% (Phase 2 data)",           "Partial — 30–60%",            "Partial — modest",               "✓ Significant but variable",    "✓ Highest — supraphysiologic"],
              ["Side effect profile","✓ Minimal — injection site",          "✓ Minimal",                   "✓ Minimal",                      "✗ Hunger, water retention",     "✗ High — acromegaly risk"],
            ] as string[][]).map((row, ri) => {
              const cols = ["CJC-1295 DAC", "Sermorelin", "Ipamorelin", "MK-677", "Exogenous HGH"];
              return (
                <div key={ri} className="ctc-row">
                  <div className="ctc-row-label">{row[0]}</div>
                  <div className="ctc-cells">
                    {cols.map((col, ci) => {
                      const val = row[ci + 1];
                      const cls = ci === 0 ? "gold" : val.startsWith("✓") ? "yes" : val.startsWith("✗") ? "no" : "";
                      return (
                        <div key={ci} className="ctc-cell">
                          <div className="ctc-cell-name">{col}</div>
                          <div className={`ctc-cell-val ${cls}`}>{val}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ DISCOVER PEPTIDES ══ */}
      <section id="discover-peptides" style={{ background: "#F5F0E8", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <div className="two-col-header" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 56 }}>
            <h2 style={{ ...s.h2lt }}>Discover Peptides</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>Explore the full range of physician-supervised peptide protocols available through Aurelius Health Group — each designed around peer-reviewed evidence, pharma-grade compounds, and measurable outcomes.</p>
          </div>

          {/* 4-card grid */}
          <div className="four-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, marginBottom: 48 }}>
            {[
              {
                name: "CJC-1295Rx",
                nameSuffix: "Rx",
                nameBase: "CJC-1295",
                tag: "GH / Body Recomposition",
                desc: "The GHRH analogue with DAC technology that restores the GH/IGF-1 axis, remodels body composition, and reverses the metabolic consequences of somatopause — with 6–8 day half-life from a single injection.",
                cta: "Check My Eligibility",
                ctaHref: "#quiz",
                featured: true,
              },
              {
                name: "ThymosinAlpha-1",
                tag: "Immune Modulation",
                desc: "The thymus-derived polypeptide that restores T-cell immunity, activates innate defense, and resolves immune dysfunction — without steroids, stimulants, or systemic toxicity.",
                cta: "Get Started",
                ctaHref: "#",
                featured: false,
              },
              {
                name: "MOTS-c",
                tag: "Mitochondrial Health",
                desc: "The first peptide encoded in mitochondrial DNA. Activates AMPK — the master metabolic switch — restoring cellular energy, insulin sensitivity, and longevity signaling from the source.",
                cta: "Get Started",
                ctaHref: "#",
                featured: false,
              },
              {
                name: "Tesamorelin",
                tag: "Visceral Fat",
                desc: "An FDA-studied GHRH analogue that reduces visceral adipose tissue and improves metabolic markers. The only peptide with Phase 3 RCT data for abdominal fat reduction.",
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
                    ...(peptide.featured
                      ? { background: "#C9A96E", color: "#0D0D0D", border: "1px solid #C9A96E" }
                      : { background: "transparent", color: "rgba(245,240,232,0.6)", border: "1px solid rgba(245,240,232,0.15)" }
                    ),
                  }}
                  onMouseEnter={(e) => {
                    if (!peptide.featured) {
                      e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)";
                      e.currentTarget.style.color = "#C9A96E";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!peptide.featured) {
                      e.currentTarget.style.borderColor = "rgba(245,240,232,0.15)";
                      e.currentTarget.style.color = "rgba(245,240,232,0.6)";
                    }
                  }}
                >
                  {peptide.cta}
                </a>
              </div>
            ))}
          </div>

          {/* Discover More link */}
          <div style={{ textAlign: "center" }}>
            <a
              href="/peptides"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", letterSpacing: "0.04em",
                color: "#1A1A1A", textDecoration: "none",
                border: "1px solid rgba(13,13,13,0.2)", padding: "14px 28px", borderRadius: 6,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C9A96E"; e.currentTarget.style.color = "#C9A96E"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(13,13,13,0.2)"; e.currentTarget.style.color = "#1A1A1A"; }}
            >
              Discover More Peptides
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ══ CLINICAL EVIDENCE (pathways) ══ */}
      <section id="research" style={{ background: "#F5F0E8", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Clinical Evidence</p>
          <div className="two-col-header" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2lt }}>Six evidence-backed GH activation pathways</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>Each pathway is supported by peer-reviewed clinical research. CJC-1295 is the most extensively studied long-acting GHRH analogue in human trials — its Phase 2 data from JCEM represents the gold standard for peptide-driven GH restoration.</p>
          </div>
          <div className="three-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 64 }}>
            {pathways.map((p) => (
              <div key={p.n} style={{ background: "#fff", border: "1px solid rgba(13,13,13,0.07)", borderRadius: 10, padding: "28px 24px" }}>
                <div style={{ fontFamily: DM, fontWeight: 300, fontSize: "2.5rem", color: "rgba(13,13,13,0.1)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 12 }}>{p.n}</div>
                <h3 style={{ ...s.h3lt, marginBottom: 12, fontSize: "1rem" }}>{p.title}</h3>
                <p style={{ ...s.bodySm, marginBottom: 16 }}>{p.body}</p>
                <p style={{ ...s.cite, marginBottom: 16 }}>Source: {p.cite}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.tags.map((tag) => (
                    <span key={tag} style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.04em", padding: "3px 10px", borderRadius: 20, background: "rgba(201,169,110,0.1)", color: "#8C6845", border: "1px solid rgba(201,169,110,0.2)" }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Condition tag cloud */}
          <div style={{ borderTop: "1px solid rgba(13,13,13,0.08)", paddingTop: 48 }}>
            <p style={{ ...s.label, marginBottom: 20 }}>Conditions Addressed</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {conditionTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  style={{
                    fontFamily: DM, fontWeight: 400, fontSize: "0.8125rem",
                    padding: "8px 16px", borderRadius: 4, cursor: "pointer", transition: "all 0.2s",
                    background: activeTag === tag ? "#0D0D0D" : "transparent",
                    color: activeTag === tag ? "#C9A96E" : "#3D3D3D",
                    border: `1px solid ${activeTag === tag ? "#C9A96E" : "rgba(13,13,13,0.15)"}`,
                  }}
                >{tag}</button>
              ))}
            </div>
            {activeTag && (
              <div style={{ marginTop: 20, padding: "16px 20px", background: "rgba(201,169,110,0.06)", borderRadius: 6, border: "1px solid rgba(201,169,110,0.2)" }}>
                <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", color: "#3D3D3D", margin: 0 }}>
                  <strong style={{ color: "#1A1A1A" }}>{activeTag}</strong> — CJC-1295 addresses this condition through its GH/IGF-1 restoration cascade: pituitary GHRH receptor activation, sustained GH pulsatility, hepatic IGF-1 synthesis, and downstream anabolic and metabolic signaling. Speak with a physician to understand how this applies to your specific case.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ IMAGE BREAK ══ */}
      <section style={{ background: "#0D0D0D", padding: 0 }}>
        <div style={{ position: "relative", maxHeight: 500, overflow: "hidden" }}>
          <img src={IMGS.energy} alt="Athletic performance" style={{ width: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,13,13,0.85) 0%, transparent 40%, transparent 60%, rgba(13,13,13,0.85) 100%)" }} />
          <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", textAlign: "center", width: "100%", padding: "0 1.25rem" }}>
            <p style={{ ...s.label, marginBottom: 8 }}>DAC Technology</p>
            <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.1rem, 2.5vw, 2rem)", color: "#F5F0E8", letterSpacing: "-0.02em" }}>The only GHRH analogue engineered for 6–8 day sustained GH elevation — Phase 2 validated in the Journal of Clinical Endocrinology & Metabolism</p>
          </div>
        </div>
      </section>

      {/* ══ PROTOCOL STEPS — DARK THEME ══ */}
      <section style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Protocol</p>
          <div className="two-col-header" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2dk }}>Four steps from intake to results</h2>
            <p style={{ ...s.bodyLt, paddingTop: 8 }}>Designed to mirror the infrastructure of the published research — physician oversight, comprehensive baseline GH-axis labs, pharma-grade compound, and quantified IGF-1 outcomes at 8–12 weeks.</p>
          </div>
          <div className="four-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {[
              {
                n: "1", title: "Assessment & Intake", tag: "Required",
                items: ["Comprehensive health questionnaire", "GH deficiency symptom mapping", "Medication and supplement review", "Oncology and diabetes screening", "Physician review within 48 hours"],
              },
              {
                n: "2", title: "Baseline GH-Axis Labs", tag: "Required",
                items: ["IGF-1 (primary GH-axis marker)", "Fasting glucose and HbA1c", "Comprehensive metabolic panel (CMP)", "Thyroid panel (TSH, Free T4)", "Testosterone / estradiol (sex hormones)", "Inflammatory markers (CRP, ESR)"],
              },
              {
                n: "3", title: "Protocol Initiation", tag: "Week 1",
                items: ["CJC-1295 DAC 1–2 mg, lyophilized compounded", "Bacteriostatic water + sterile supplies shipped", "Cold-packed, overnight delivery", "Nurse onboarding session (video)", "Subcutaneous injection certification"],
              },
              {
                n: "4", title: "Monitoring & Optimization", tag: "Ongoing",
                items: ["Monthly provider check-ins", "IGF-1 labs repeated at 8–12 weeks", "Body composition outcome assessment", "Protocol adjustment based on IGF-1 response", "Ongoing direct messaging support"],
              },
            ].map((step) => (
              <div key={step.n} style={{ borderTop: "2px solid rgba(201,169,110,0.4)", paddingTop: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ fontFamily: DM, fontWeight: 300, fontSize: "2.5rem", color: "rgba(245,240,232,0.08)", letterSpacing: "-0.04em", lineHeight: 1 }}>{step.n}</div>
                  <span style={{ ...s.label, background: "rgba(201,169,110,0.1)", padding: "3px 8px", borderRadius: 3 }}>{step.tag}</span>
                </div>
                <h3 style={{ ...s.h3dk, marginBottom: 16, fontSize: "1rem" }}>{step.title}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {step.items.map((item) => (
                    <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "#C9A96E", fontSize: "0.75rem", marginTop: 3, flexShrink: 0 }}>◎</span>
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
          <div className="two-col-pricing" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <h2 style={{ ...s.h2lt, marginBottom: 20 }}>Endocrinology pricing. Without the specialist markup.</h2>
              <p style={{ ...s.body, marginBottom: 24 }}>
                Endocrinologists typically charge $500–$1,000 per consultation, $300–$600 per follow-up, and $500–$1,200/month for compounded peptides — billed separately. Aurelius bundles physician oversight, GH-axis labs, compound, and monitoring into one monthly plan.
              </p>
              <div style={{ background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.15)", borderRadius: 8, padding: "20px 24px", marginBottom: 28 }}>
                <p style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#1A1A1A", marginBottom: 8 }}>Typical endocrinology cost breakdown:</p>
                {[
                  ["Initial endocrinology consult", "$500–$1,000"],
                  ["GH-axis lab panel (IGF-1, CMP)", "$300–$600"],
                  ["Monthly compound cost", "$500–$1,200"],
                  ["Monthly follow-up visits", "$200–$500"],
                  ["Total first month", "$1,500–$3,300"],
                ].map(([item, cost]) => (
                  <div key={item} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(13,13,13,0.06)" }}>
                    <span style={{ ...s.bodySm }}>{item}</span>
                    <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#8C6845" }}>{cost}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Physician consultation included", "Full GH-axis lab panel included", "Pharma-grade CJC-1295 DAC included", "Nurse onboarding included", "Monthly check-ins included", "No hidden fees"].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#C9A96E" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="#C9A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ ...s.bodySm }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: "#0D0D0D", borderRadius: 12, padding: "clamp(32px,5vw,48px) clamp(24px,4vw,40px)", textAlign: "center", border: "1px solid rgba(201,169,110,0.15)" }}>
                <p style={{ ...s.label, marginBottom: 12 }}>CJC-1295Rx Plan</p>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1.25rem", color: "#C9A96E", marginTop: 10 }}>$</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(3.5rem,8vw,5rem)", lineHeight: 1, letterSpacing: "-0.04em", color: "#F5F0E8" }}>269</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1rem", color: "rgba(245,240,232,0.4)", marginTop: 16 }}>/mo</span>
                </div>
                <p style={{ ...s.bodyLt, fontSize: "0.8rem", marginBottom: 32 }}>vs. $1,500–$3,300/mo at an endocrinology clinic</p>
                <a href="#quiz" className="btn-gold" style={{ width: "100%", justifyContent: "center", display: "flex", marginBottom: 16 }}>Check My Eligibility</a>
                <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", lineHeight: 1.6 }}>Cancel anytime. No long-term commitment required.</p>
                <div style={{ borderTop: "1px solid rgba(245,240,232,0.06)", marginTop: 28, paddingTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                  {["Physician-supervised protocol", "Pharma-grade compounded CJC-1295 DAC", "IGF-1 lab panel at 8–12 weeks", "Monthly provider check-ins", "Cold-chain overnight delivery"].map((item) => (
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
          <h2 style={{ ...s.h2dk, textAlign: "center", marginBottom: 16 }}>Are you a candidate for CJC-1295Rx?</h2>
          <p style={{ ...s.bodyLt, textAlign: "center", maxWidth: 520, margin: "0 auto 56px" }}>
            This 5-question screen checks for CJC-1295 protocol contraindications. It takes under 60 seconds and does not constitute a medical evaluation.
          </p>
          <EligibilityQuiz />
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0", borderTop: "1px solid rgba(245,240,232,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Frequently Asked Questions</p>
          <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
            <div style={{ position: "sticky", top: 100 }}>
              <h2 style={{ ...s.h2dk, marginBottom: 20 }}>Everything you need to know</h2>
              <p style={{ ...s.bodyLt }}>Including CJC-1295 vs. Sermorelin and exogenous HGH, DAC technology explained, honest research framing, administration, timeline, and off-label prescribing legality.</p>
              <div style={{ marginTop: 40 }}>
                <img src={IMGS.labs} alt="Lab review" style={{ width: "100%", borderRadius: 10, objectFit: "cover" }} />
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
            Your pituitary already knows<br />how to produce growth hormone.<br />It just needs the right signal.
          </h2>
          <p style={{ ...s.bodyLt, marginBottom: 48, fontSize: "1.0625rem" }}>
            CJC-1295 is the signal your hypothalamus used to send — now available as a physician-supervised protocol engineered for the body composition, recovery, and metabolic goals that haven't responded to training and nutrition alone.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <a href="#quiz" className="btn-gold" style={{ padding: "16px 36px", fontSize: "1rem" }}>Check My Eligibility</a>
            <a href="#research" className="btn-ghost-cream" style={{ padding: "16px 36px", fontSize: "1rem" }}>Review the Research</a>
          </div>
          <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>
            † This page describes off-label use of CJC-1295, a compounded peptide. CJC-1295 is not FDA-approved. U.S. use is as a compounded peptide prescribed at the clinical discretion of a licensed physician. This content is for informational purposes only and does not constitute medical advice. Individual results vary. All protocols require physician evaluation and are subject to contraindication screening.
          </p>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "#0A0A0A", borderTop: "1px solid rgba(245,240,232,0.06)", padding: "clamp(40px,6vw,64px) 0 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4 L6 40 L14 40 L24 20 L34 40 L42 40 Z" fill="#C9A96E" />
                  <line x1="12" y1="28" x2="36" y2="28" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="24" y1="20" x2="24" y2="44" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div>
                  <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#F5F0E8", display: "block" }}>CJC-1295<span style={{ color: DARK_ORANGE }}>Rx</span></span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8C7B6B" }}>Aurelius Health Group</span>
                </div>
              </div>
              <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", color: "rgba(245,240,232,0.35)", maxWidth: 240, marginTop: 12, lineHeight: 1.6 }}>Physician-supervised CJC-1295 DAC protocol for GH restoration, body recomposition, and metabolic optimization.</p>
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
                <a key={link} href="#" style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.2)", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,0.5)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.2)")}
                >{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ══ RESPONSIVE STYLES ══ */}
      <style>{`
        /* Tablet */
        @media (max-width: 1024px) {
          .four-col-grid { grid-template-columns: repeat(2,1fr) !important; }
          .three-col-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 900px) {
          .two-col-header { grid-template-columns: 1fr !important; gap: 24px !important; }
          .two-col-pricing { grid-template-columns: 1fr !important; gap: 48px !important; }
          .faq-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        /* Mobile */
        @media (max-width: 640px) {
          .three-col-grid { grid-template-columns: 1fr !important; }
          .four-col-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        /* Touch targets */
        @media (max-width: 768px) {
          .btn-gold, .btn-ghost-cream { min-height: 48px; }
        }

        /* ── Comparison table: card layout on mobile ── */
        .comparison-table-wrap { display: block; }
        .comparison-table-cards { display: none; }

        @media (max-width: 700px) {
          .comparison-table-wrap { display: none; }
          .comparison-table-cards { display: flex; flex-direction: column; gap: 20px; margin-top: 24px; }
          .ctc-row { background: rgba(255,255,255,0.02); border: 1px solid rgba(245,240,232,0.06); border-radius: 8px; overflow: hidden; }
          .ctc-row-label { padding: 12px 16px; font-family: 'DM Sans', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(245,240,232,0.4); background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(245,240,232,0.06); }
          .ctc-cells { display: flex; flex-direction: column; }
          .ctc-cell { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; padding: 12px 16px; border-bottom: 1px solid rgba(245,240,232,0.04); }
          .ctc-cell:last-child { border-bottom: none; }
          .ctc-cell-name { font-family: 'DM Sans', sans-serif; font-size: 0.8rem; font-weight: 400; color: rgba(245,240,232,0.35); flex-shrink: 0; max-width: 40%; }
          .ctc-cell-val { font-family: 'DM Sans', sans-serif; font-size: 0.8rem; font-weight: 400; color: rgba(245,240,232,0.6); text-align: right; }
          .ctc-cell-val.gold { color: #C9A96E; font-weight: 500; }
          .ctc-cell-val.yes { color: rgba(245,240,232,0.75); }
          .ctc-cell-val.no { color: rgba(245,240,232,0.35); }
        }
      `}</style>
    </div>
  );
}
