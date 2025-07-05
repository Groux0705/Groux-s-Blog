export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  published: boolean;
}

export interface NewBlogPost {
  title: string;
  content: string;
  author: string;
  tags: string[];
  published: boolean;
}