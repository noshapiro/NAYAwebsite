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

export const NEWS_ITEMS: NewsItem[] = [
  {
    title: "There are 3 types of AI memory. Most products only have one.",
    description:
      "Most AI products today don't actually have memory — they have a context window. The report identifies three layers of long-term memory every real agent needs: episodic, semantic, and procedural. At Nearu we're building toward a hybrid memory system with vector databases and RAG on conversation history.",
    date: "March 2026",
    readTime: "4 min read",
    image: "/news/ai-memory-types.png",
    linkedInUrl: LINKEDIN_POST_MEMORY,
  },
  {
    title: "Why emotional AI is the next platform shift",
    description: "The shift from functional AI to relational AI is the defining product transition of this decade. Empathy is becoming the primary differentiator for user retention.",
    date: "March 2026",
    readTime: "5 min read",
    linkedInUrl: "https://www.linkedin.com/in/noashapiro/",
  },
  {
    title: "Building souls for machines",
    description: "Nearu provides the emotional intelligence layer that turns AI agents into entities people actually bond with. Here's how we're building it.",
    date: "February 2026",
    readTime: "4 min read",
    linkedInUrl: "https://www.linkedin.com/in/noashapiro/",
  },
  {
    title: "Three channels of emotion: acoustic, semantic, facial",
    description: "Separating acoustic from semantic emotion is a non-obvious architectural choice. Most systems treat voice emotion as one signal. Our approach produces significantly more accurate results.",
    date: "January 2026",
    readTime: "6 min read",
    linkedInUrl: "https://www.linkedin.com/in/noashapiro/",
  },
];
