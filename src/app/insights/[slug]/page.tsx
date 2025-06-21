import { getPostData, getAllPostSlugs, getSortedPostsData } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkSlug from 'remark-slug';
import { Pluggable } from 'unified';

type Props = {
  params: { slug: string };
};

// Generate static routes for each post
export function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts.map(post => ({ slug: post.params.slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = await getPostData(params.slug);
  if (!post) {
    return { title: 'Not Found' };
  }
  return {
    title: `${post.title} | NetWealth Insights`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPostData(params.slug);
  if (!post) {
    notFound();
  }

  const otherPosts = getSortedPostsData()
    .filter((p) => p.slug !== params.slug)
    .slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px] w-full">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl text-center text-white p-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <main className="lg:col-span-2">
            <article className="prose prose-slate max-w-none prose-lg prose-headings:text-[#002855] prose-a:text-[#00b894] hover:prose-a:text-[#008a70]">
              <MDXRemote
                source={post.content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkSlug as Pluggable],
                    rehypePlugins: [rehypeAutolinkHeadings as Pluggable],
                  },
                }}
              />
            </article>
          </main>

          {/* Sticky Sidebar */}
          <aside className="lg:sticky top-24 self-start">
            <div className="space-y-8">
              {/* Author Box */}
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
                <h3 className="text-lg font-bold text-[#002855] mb-4">Author</h3>
                <User className="mx-auto h-16 w-16 rounded-full bg-teal-100 text-[#00b894] p-3" />
                <p className="mt-4 text-xl font-semibold text-slate-800">{post.author}</p>
                <div className="mt-2 flex items-center justify-center text-sm text-slate-500">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>
                    {new Date(post.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-lg font-bold text-[#002855] mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      <Tag className="mr-2 h-3 w-3" /> {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* More from NetWealth */}
              <div>
                <h3 className="text-lg font-bold text-[#002855] mb-4">
                  More From NetWealth
                </h3>
                <div className="space-y-4">
                  {otherPosts.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/insights/${p.slug}`}
                      className="group block"
                    >
                      <div className="font-semibold text-slate-700 group-hover:text-[#00b894]">
                        {p.title}
                      </div>
                      <p className="text-sm text-slate-500 line-clamp-2">
                        {p.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
} 