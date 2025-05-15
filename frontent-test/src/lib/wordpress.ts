import { WordPressPost, WordPressMedia, Category } from '@/types/wordpress';

const API_URL = 'https://bergvik.se/wp-json/wp/v2';

export interface PaginatedPosts {
  posts: WordPressPost[];
  totalPages: number;
  totalPosts: number;
}

async function getTotalPosts(): Promise<number> {
  try {
    const response = await fetch(
      `${API_URL}/posts?per_page=1`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch posts count');
    }

    const total = parseInt(response.headers.get('X-WP-Total') || '0', 10);
    return total;
  } catch (error) {
    console.error('Error fetching total posts:', error);
    return 0;
  }
}

export async function getPosts(page?: number, perPage?: number): Promise<PaginatedPosts> {
  try {
    // If no perPage is specified, get all posts
    if (!perPage) {
      const total = await getTotalPosts();
      perPage = total;
      page = 1;
    }

    const response = await fetch(
      `${API_URL}/posts?page=${page}&per_page=${perPage}&_embed`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const posts = await response.json();
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0', 10);
    const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0', 10);

    return {
      posts,
      totalPages,
      totalPosts
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      posts: [],
      totalPages: 0,
      totalPosts: 0
    };
  }
}

export async function getPost(slug: string): Promise<WordPressPost | null> {
  try {
    const response = await fetch(
      `${API_URL}/posts?slug=${slug}&_embed`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }

    const posts = await response.json();
    return posts[0] || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function getMedia(mediaId: number): Promise<WordPressMedia | null> {
  try {
    const response = await fetch(
      `${API_URL}/media/${mediaId}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch media');
    }

    const media = await response.json();
    return media;
  } catch (error) {
    console.error('Error fetching media:', error);
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(
      `${API_URL}/categories`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getPostCategories(postId: number): Promise<Category[]> {
  try {
    const response = await fetch(
      `${API_URL}/categories?post=${postId}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch post categories');
    }

    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error('Error fetching post categories:', error);
    return [];
  }
}

export async function getRelatedPosts(postId: number, categoryIds: number[], limit: number = 3): Promise<WordPressPost[]> {
  try {
    // Exclude current post and get posts from the same categories
    const response = await fetch(
      `${API_URL}/posts?exclude=${postId}&categories=${categoryIds.join(',')}&per_page=${limit}&_embed`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch related posts');
    }

    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
} 