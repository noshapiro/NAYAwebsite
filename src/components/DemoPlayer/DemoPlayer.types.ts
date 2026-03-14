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

/** Bar colors per emotion: blue = calm/safe, orange = alert, red = critical */
export const EMOTION_9_COLORS = [
  "#0099ff",   /* Calmness */
  "#f97316",   /* Anxiety */
  "#fb923c",   /* Frustration */
  "rgba(251, 146, 60, 0.6)",   /* Sadness */
  "#ef4444",   /* Anger */
  "#0099ff",   /* Confidence */
  "#60a5fa",   /* Engagement */
  "#818cf8",   /* Surprise */
  "#475569",   /* Boredom */
] as const;

/** Detected emotion label → badge color (matches corresponding bar). */
export const EMOTION_BADGE_COLORS: Record<string, string> = {
  Anxious: "#f97316",
  Fearful: "#f97316",
  Distressed: "#f97316",
  Frustrated: "#fb923c",
  Sad: "#f59e0b",
  Angry: "#ef4444",
  Calm: "#0099ff",
  Confident: "#34d399",
  Engaged: "#60a5fa",
  Surprised: "#818cf8",
  Bored: "#475569",
  Skeptical: "#60a5fa",
  Neutral: "#94a3b8",
};

/** Badge style for detected emotion (background/border/color from bar color). */
export function getEmotionBadgeStyle(detectedEmotion: string): { background: string; border: string; color: string } {
  const color = EMOTION_BADGE_COLORS[detectedEmotion] ?? "#94a3b8";
  return {
    background: `${color}18`,
    border: `1px solid ${color}`,
    color,
  };
}

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
