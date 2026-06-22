export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  imageUrl?: string;
};

export type BlogArticle = BlogPost & {
  content?: string;
  domainId?: "studyabroad" | "ivf";
  author?: string;
};
