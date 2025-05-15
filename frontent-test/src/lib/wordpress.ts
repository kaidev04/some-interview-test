import { WordPressPost, WordPressMedia } from '@/types/wordpress';

const API_URL = 'https://bergvik.se/wp-json/wp/v2';

export async function getPosts(page: number = 1, perPage: number = 10): Promise<WordPressPost[]> {
  try {
    const response = await fetch(
      `${API_URL}/posts?page=${page}&per_page=${perPage}&_embed`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
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