import type { BlogPost, NewBlogPost } from '../types';

const STORAGE_KEY = 'modernblog_posts';

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function generateExcerpt(content: string): string {
  return content.length > 150 ? content.substring(0, 150) + '...' : content;
}

export function savePosts(posts: BlogPost[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function loadPosts(): BlogPost[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const posts = JSON.parse(saved);
      return posts.map((post: any) => ({
        ...post,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt)
      }));
    }
  } catch (error) {
    console.error('Error loading posts:', error);
  }
  return getSamplePosts();
}

export function createPost(newPost: NewBlogPost): BlogPost {
  const now = new Date();
  return {
    id: generateId(),
    ...newPost,
    excerpt: generateExcerpt(newPost.content),
    createdAt: now,
    updatedAt: now
  };
}

export function updatePost(existingPost: BlogPost, updates: NewBlogPost): BlogPost {
  return {
    ...existingPost,
    ...updates,
    excerpt: generateExcerpt(updates.content),
    updatedAt: new Date()
  };
}

function getSamplePosts(): BlogPost[] {
  return [
    {
      id: '1',
      title: 'Getting Started with Modern Web Development',
      content: 'Modern web development has evolved significantly over the past few years. With the introduction of new frameworks, tools, and best practices, developers now have more options than ever to build fast, scalable, and maintainable applications.\n\nIn this post, we\'ll explore some of the key trends and technologies that are shaping the future of web development, including React, TypeScript, and modern CSS techniques.\n\nWhether you\'re a beginner looking to learn the basics or an experienced developer wanting to stay up-to-date with the latest trends, this guide will provide you with valuable insights and practical tips.',
      excerpt: 'Modern web development has evolved significantly over the past few years. With the introduction of new frameworks, tools, and best practices...',
      author: 'Jane Smith',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      tags: ['web development', 'react', 'typescript'],
      published: true
    },
    {
      id: '2',
      title: 'The Future of CSS: New Features and Techniques',
      content: 'CSS continues to evolve with exciting new features that make styling web applications more powerful and intuitive. From CSS Grid and Flexbox to custom properties and container queries, modern CSS provides developers with unprecedented control over layout and design.\n\nIn this comprehensive guide, we\'ll dive deep into the latest CSS features and explore how they can be used to create responsive, accessible, and visually stunning web interfaces.',
      excerpt: 'CSS continues to evolve with exciting new features that make styling web applications more powerful and intuitive. From CSS Grid and Flexbox...',
      author: 'Alex Johnson',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-12'),
      tags: ['css', 'design', 'frontend'],
      published: true
    },
    {
      id: '3',
      title: 'Building Scalable Applications with TypeScript',
      content: 'TypeScript has become an essential tool for building large-scale JavaScript applications. Its static type system helps catch errors early, improves code maintainability, and enhances developer productivity through better tooling and IDE support.',
      excerpt: 'TypeScript has become an essential tool for building large-scale JavaScript applications. Its static type system helps catch errors early...',
      author: 'Sarah Davis',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05'),
      tags: ['typescript', 'javascript', 'development'],
      published: false
    }
  ];
}