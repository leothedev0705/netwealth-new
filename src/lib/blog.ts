import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blogs');

export interface PostData {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishDate: string;
  tags: string[];
  content: string;
}

export function getSortedPostsData(): Omit<PostData, 'content'>[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .map((fileName) => {
      try {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
          slug,
          ...(matterResult.data as Omit<PostData, 'slug' | 'content'>),
        };
      } catch (e) {
        console.error(`Error parsing front-matter for ${fileName}:`, e);
        return null;
      }
    })
    .filter((post): post is Omit<PostData, 'content'> => post !== null);

  return allPostsData.sort((a, b) => {
    if (a.publishDate < b.publishDate) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(slug: string): Promise<PostData | undefined> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      content: matterResult.content,
      ...(matterResult.data as Omit<PostData, 'slug' | 'content'>),
    };
  } catch (error) {
    // If the file doesn't exist, fs.readFileSync will throw an error.
    // We catch it and return undefined.
    return undefined;
  }
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.mdx$/, ''),
      },
    };
  });
} 