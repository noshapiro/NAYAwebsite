/**
 * News / blog entries. Each card links to a LinkedIn post (founder's posts).
 * Add your LinkedIn post URL, title, excerpt, and date. Image is optional.
 * LinkedIn does not provide a public API to pull post content — update this file manually
 * when you publish new posts, or connect a CMS/backend later.
 */
export type NewsItem = {
  title: string;
  description: string;
  date: string;
  readTime?: string;
  image?: string;
  linkedInUrl: string;
};

const LINKEDIN_POST_MEMORY =
  "https://www.linkedin.com/posts/noashapiro_there-are-3-types-of-ai-memory-most-products-share-7437090426395877376-9y8U?utm_source=share&utm_medium=member_desktop&rcm=ACoAADpofQkB60a2q7d_SMxG8oTB7l2_T4q2B10";

const LINKEDIN_POST_MVP =
  "https://www.linkedin.com/posts/noashapiro_we-are-thrilled-to-announce-a-major-milestone-activity-7434501569406103554-u1sQ?utm_source=share&utm_medium=member_desktop&rcm=ACoAADpofQkB60a2q7d_SMxG8oTB7l2_T4q2B10";

const LINKEDIN_POST_EMBODIED_AI =
  "https://www.linkedin.com/posts/noashapiro_ai-artificialintelligence-hardware-share-7430234070967611392-Im6k?utm_source=share&utm_medium=member_desktop&rcm=ACoAADpofQkB60a2q7d_SMxG8oTB7l2_T4q2B10";

const LINKEDIN_POST_PROTOTYPE =
  "https://www.linkedin.com/posts/noashapiro_dropping-the-latest-prototype-design-today-ugcPost-7431086832903180289-8-sQ?utm_source=share&utm_medium=member_desktop&rcm=ACoAADpofQkB60a2q7d_SMxG8oTB7l2_T4q2B10";

const LINKEDIN_COMPANY = "https://www.linkedin.com/company/nearu/";

export const NEWS_ITEMS: NewsItem[] = [
  {
    title: "Our MVP is officially ready for demonstration",
    description:
      "We are thrilled to announce a major milestone: our MVP is officially ready for demonstration! Real-time emotion recognition across 9 emotions, three fused data streams (visual, prosodic, semantic), and personality customization. From high-stakes negotiation training to mental health support, we are giving AI a heart.",
    date: "March 2026",
    readTime: "5 min read",
    image: "/news/mvp-ready-demo.png",
    linkedInUrl: LINKEDIN_POST_MVP,
  },
  {
    title: "There are 3 types of AI memory. Most products only have one.",
    description:
      "Most AI products today don't actually have memory — they have a context window. The report identifies three layers of long-term memory every real agent needs: episodic, semantic, and procedural. At Nearu we're building toward a hybrid memory system with vector databases and RAG on conversation history.",
    date: "March 2026",
    readTime: "4 min read",
    image: "/news/3-types-of-AI-memory.gif",
    linkedInUrl: LINKEDIN_POST_MEMORY,
  },
  {
    title: "New industrial design on the latest prototype video",
    description:
      "Sleek new prototype featuring our latest industrial design — a glimpse at the hardware that will bring embodied AI to life. Transparent cylinder with soft blue glow, built for the next generation of human–machine interaction.",
    date: "March 2026",
    readTime: "2 min read",
    image: "/news/nearu-industrial-design-prototype.png",
    linkedInUrl: LINKEDIN_POST_PROTOTYPE,
  },
  {
    title: "Why 2026 marks the turning point for embodied AI",
    description:
      "The embodied AI market is set to grow from $3.02B to $9.34B by 2032. Edge AI, local multimodal models, and declining hardware costs are moving AI from the cloud into our hands. We're building the emotional intelligence layer for this new era.",
    date: "February 2026",
    readTime: "5 min read",
    image: "/news/embodied-ai-companion.png",
    linkedInUrl: LINKEDIN_POST_EMBODIED_AI,
  },
  {
    title: "Doron Pryluk joins Nearu as Board Advisory Member and Product Evangelist",
    description:
      "We are thrilled to announce that Doron Pryluk has officially joined Nearu. His experience scaling complex AI products at Quack AI and Colleen AI, and his operator mindset, are exactly what we need for the next phase of our journey. Welcome aboard, Doron!",
    date: "January 2026",
    readTime: "3 min read",
    image: "/news/doron-pryluk-nearu.jpg",
    linkedInUrl: LINKEDIN_COMPANY,
  },
];
