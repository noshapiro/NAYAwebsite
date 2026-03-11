import type { DemoScenario, EqSnapshot } from "./DemoPlayer.types";
import { EMOTION_9_COLORS, EMOTION_9_LABELS } from "./DemoPlayer.types";

const LISTENING_EQ: EqSnapshot = {
  bars: Array(9).fill(0),
  labels: [...EMOTION_9_LABELS],
  colors: [...EMOTION_9_COLORS],
  verdictHtml: "Listening...",
  pill: "Detecting...",
  pillStyle: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid var(--border)",
    color: "var(--text-3)",
  },
};

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    name: "onboarding",
    tabLabel: "Employee Onboarding",
    agentName: "Nearu Onboarding Agent",
    agentColor: "linear-gradient(135deg,#00AEEF,#38bdf8)",
    calloutBadHtml:
      "<strong>Standard agent misses the signal</strong>Hears \"first day\" → dumps a resource list. Employee feels invisible on day one.",
    calloutGoodHtml:
      "<strong>Nearu detects anxiety before it compounds</strong>Validates, slows down, builds trust in the first 30 seconds.",
    steps: [
      {
        type: "user",
        text: "Hi... it's my first day and to be honest I've been having a hard time adjusting. I'm not sure if I'm doing something wrong or just need more time.",
        eq: LISTENING_EQ,
      },
      {
        type: "eq-update",
        eq: {
          bars: [15, 72, 24, 28, 5, 18, 45, 12, 8],
          labels: [...EMOTION_9_LABELS],
          colors: [...EMOTION_9_COLORS],
          verdictHtml:
            "Hesitant cadence + self-doubt markers → <strong>ANXIETY</strong> detected. Activating reassurance mode.",
          pill: "Anxious • 88%",
          pillStyle: {
            background: "var(--accent-12)",
            border: "1px solid var(--accent-25)",
            color: "var(--accent)",
          },
        },
      },
      {
        type: "both-bot",
        vanillaText:
          "Welcome to the team! Here are resources to help you get started: 1) Company handbook 2) IT setup guide 3) Benefits portal. Let me know if you have questions.",
        nearuHtml:
          "Hey — first days can feel <span class=\"ehw\">overwhelming</span>, and that's <span class=\"ehw\">completely normal</span>. You're not doing anything wrong. I'm <span class=\"ehw\">here with you</span> — we can take this <span class=\"ehw\">step by step</span>. What would help you feel most settled right now?",
      },
    ],
  },
  {
    name: "support",
    tabLabel: "Customer Support",
    agentName: "Nearu Support Agent",
    agentColor: "linear-gradient(135deg,#22D3A5,#00AEEF)",
    calloutBadHtml:
      "<strong>Standard agent adds fuel to the fire</strong>Procedural response to an emotional moment. CSAT drops. A review gets written.",
    calloutGoodHtml:
      "<strong>Nearu detects escalation risk instantly</strong>Leads with empathy, moves with urgency. Churn avoided, CSAT recovered.",
    steps: [
      {
        type: "user",
        text: "I've been waiting 20 minutes and nobody helped me. This is ridiculous. I just need to cancel my order!",
        eq: LISTENING_EQ,
      },
      {
        type: "eq-update",
        eq: {
          bars: [5, 22, 76, 10, 81, 12, 22, 8, 15],
          labels: [...EMOTION_9_LABELS],
          colors: [...EMOTION_9_COLORS],
          verdictHtml:
            "High vocal intensity + sharp onset → <strong>ANGER / ESCALATION RISK</strong>. De-escalation mode activated.",
          pill: "Angry • 91%",
          pillStyle: {
            background: "var(--accent-12)",
            border: "1px solid var(--accent-25)",
            color: "var(--accent)",
          },
        },
      },
      {
        type: "both-bot",
        vanillaText:
          "I'm sorry to hear that. To cancel your order, please provide your order number and I will process the request. Note that cancellations may take 3–5 business days.",
        nearuHtml:
          "I completely <span class=\"ehw\">hear you</span> — 20 minutes is too long, and I'm sorry. Let me handle this <span class=\"ehw\">right now</span>. I've pulled up your order. I'll process the cancellation and send you a confirmation <span class=\"ehw\">within 2 minutes</span>.",
      },
    ],
  },
  {
    name: "healthcare",
    tabLabel: "Healthcare",
    agentName: "Nearu Health Agent",
    agentColor: "linear-gradient(135deg,#34D399,#059669)",
    calloutBadHtml:
      "<strong>Standard agent makes it worse</strong>Throws tasks at a distressed patient. Information without empathy is noise. Trust erodes.",
    calloutGoodHtml:
      "<strong>Nearu reads distress before the patient says so</strong>Slows down, creates safety, earns trust. Patient stays engaged.",
    steps: [
      {
        type: "user",
        text: "I got my test results back... I'm not really sure what to do next. The doctor said something but I was too overwhelmed to take it all in.",
        eq: LISTENING_EQ,
      },
      {
        type: "eq-update",
        eq: {
          bars: [12, 68, 20, 44, 5, 15, 38, 10, 25],
          labels: [...EMOTION_9_LABELS],
          colors: [...EMOTION_9_COLORS],
          verdictHtml:
            "Trembling voice + slowed speech → <strong>DISTRESS / OVERWHELM</strong> detected. Gentle support mode activated.",
          pill: "Distressed • 85%",
          pillStyle: {
            background: "var(--accent-12)",
            border: "1px solid var(--accent-25)",
            color: "var(--accent)",
          },
        },
      },
      {
        type: "both-bot",
        vanillaText:
          "To understand your test results I recommend: 1) Review the report in your patient portal 2) Schedule a follow-up appointment 3) Contact your care team with any questions.",
        nearuHtml:
          "It's <span class=\"ehw\">completely understandable</span> to feel overwhelmed — that's a lot to process. <span class=\"ehw\">Take your time.</span> Can you tell me what you remember the doctor saying? We'll go through it <span class=\"ehw\">together, slowly</span>, until it feels clearer.",
      },
    ],
  },
  {
    name: "sales",
    tabLabel: "Sales",
    agentName: "Nearu Sales Agent",
    agentColor: "linear-gradient(135deg,#F59E0B,#EF4444)",
    calloutBadHtml:
      "<strong>Standard agent pitches harder — and loses</strong>Hears \"skeptical\" → responds with enthusiasm. Tone mismatch kills the deal.",
    calloutGoodHtml:
      "<strong>Nearu detects hesitation, builds trust first</strong>Validates the concern, flips the dynamic, opens dialogue. Conversion follows.",
    steps: [
      {
        type: "user",
        text: "The pricing looks interesting but... I don't know. We've tried a few solutions before and they didn't work out. I'm a bit skeptical.",
        eq: LISTENING_EQ,
      },
      {
        type: "eq-update",
        eq: {
          bars: [20, 65, 15, 10, 5, 20, 42, 18, 55],
          labels: [...EMOTION_9_LABELS],
          colors: [...EMOTION_9_COLORS],
          verdictHtml:
            "Trailing intonation + hedging language → <strong>SKEPTICISM / BUYING HESITATION</strong>. Trust-building mode activated.",
          pill: "Skeptical • 82%",
          pillStyle: {
            background: "var(--accent-12)",
            border: "1px solid var(--accent-25)",
            color: "var(--accent)",
          },
        },
      },
      {
        type: "both-bot",
        vanillaText:
          "Great question! Our platform offers best-in-class ROI with a 98% satisfaction rate. We offer a free trial so you can experience the value firsthand. Ready to get started?",
        nearuHtml:
          "That skepticism makes <span class=\"ehw\">total sense</span> — honestly it's the right instinct. Rather than pitching you, let me ask: what <span class=\"ehw\">specifically didn't work</span> last time? I'd rather understand your situation first.",
      },
    ],
  },
];
