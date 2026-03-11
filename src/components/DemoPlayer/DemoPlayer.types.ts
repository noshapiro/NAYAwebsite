/** All 9 emotions shown in NearuVibe™ Live (order and colors match UI). */
export const EMOTION_9_LABELS = [
  "Calmness",
  "Anxiety",
  "Frustration",
  "Sadness",
  "Anger",
  "Confidence",
  "Engagement",
  "Surprise",
  "Boredom",
] as const;

/** Bar colors per emotion (reference: Live Demo skrin 2) */
export const EMOTION_9_COLORS = [
  "#22C55E",   /* Calmness — green */
  "#EAB308",   /* Anxiety — amber */
  "#EF4444",   /* Frustration — red */
  "#A855F7",   /* Sadness — purple */
  "#EF4444",   /* Anger — red */
  "#22C55E",   /* Confidence — green */
  "#3B82F6",   /* Engagement — blue */
  "#06B6D4",   /* Surprise — cyan */
  "#6B7280",   /* Boredom — gray */
] as const;

export type EqSnapshot = {
  bars: number[];
  labels: string[];
  colors: string[];
  verdictHtml: string;
  pill: string;
  pillStyle: {
    background: string;
    border: string;
    color: string;
  };
};

export type DemoStep =
  | {
      type: "user";
      text: string;
      eq: EqSnapshot;
    }
  | {
      type: "eq-update";
      eq: EqSnapshot;
    }
  | {
      type: "both-bot";
      vanillaText: string;
      nearuHtml: string;
    };

export type DemoScenario = {
  name: "onboarding" | "support" | "healthcare" | "sales";
  tabLabel: string;
  agentName: string;
  agentColor: string;
  calloutBadHtml: string;
  calloutGoodHtml: string;
  steps: DemoStep[];
};
