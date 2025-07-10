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
  const { slug } = await params;
  const post = await getPostData(slug);
  if (!post) {
    return { title: 'Not Found' };
  }
  return {
    title: `${post.title} | NetWealth Insights`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostData(slug);
  if (!post) {
    notFound();
  }

  const otherPosts = getSortedPostsData()
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <div className="bg-slate-50">
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

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-16">
          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 lg:p-8 xl:p-12">
            <article className="prose prose-slate max-w-none prose-lg 
              prose-headings:text-[#002855] prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8 prose-h1:leading-tight
              prose-h2:text-3xl prose-h2:mb-5 prose-h2:mt-10 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-3
              prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-[#00b894]
              prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6
              prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base
              prose-a:text-[#00b894] prose-a:font-medium prose-a:no-underline hover:prose-a:text-[#008a70] hover:prose-a:underline
              prose-strong:text-[#002855] prose-strong:font-semibold
              prose-em:text-slate-600 prose-em:italic
              prose-code:bg-slate-100 prose-code:text-[#002855] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-medium
              prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
              prose-blockquote:border-l-4 prose-blockquote:border-[#00b894] prose-blockquote:bg-slate-50 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:my-8 prose-blockquote:italic prose-blockquote:text-slate-600
              prose-ul:mb-6 prose-ul:mt-4 prose-li:mb-2 prose-li:text-slate-700 prose-li:leading-relaxed
              prose-ol:mb-6 prose-ol:mt-4 prose-ol:counter-reset-[item]
              prose-table:w-full prose-table:border-collapse prose-table:bg-white prose-table:shadow-sm prose-table:rounded-lg prose-table:overflow-hidden prose-table:my-8
              prose-thead:bg-[#002855] prose-th:text-white prose-th:font-semibold prose-th:p-4 prose-th:text-left prose-th:border-b prose-th:border-slate-200
              prose-tbody:divide-y prose-tbody:divide-slate-200
              prose-td:p-4 prose-td:text-slate-700 prose-td:border-b prose-td:border-slate-100
              prose-tr:hover:bg-slate-50 prose-tr:transition-colors
              prose-hr:border-slate-300 prose-hr:my-12 prose-hr:border-t-2
              first:prose-p:text-lg first:prose-p:font-medium first:prose-p:text-slate-600 first:prose-p:leading-relaxed">
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
            </div>
          </main>

          {/* Sticky Sidebar */}
          <aside className="lg:sticky top-24 self-start">
            <div className="space-y-8">
              {/* Author Box */}
              <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 text-center shadow-sm">
                <h3 className="text-xl font-bold text-[#002855] mb-6">About the Author</h3>
                <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-[#00b894] to-[#008a70] flex items-center justify-center mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <p className="text-xl font-bold text-slate-800 mb-2">{post.author}</p>
                <div className="flex items-center justify-center text-sm text-slate-500 bg-slate-100 rounded-full px-3 py-2 mx-auto w-fit">
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
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#002855] mb-4 flex items-center">
                  <Tag className="mr-2 h-5 w-5 text-[#00b894]" />
                  Topics Covered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} className="bg-[#00b894] hover:bg-[#008a70] text-white border-0 px-3 py-1 text-sm font-medium">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* More from NetWealth */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#002855] mb-6 flex items-center">
                  <ArrowRight className="mr-2 h-5 w-5 text-[#00b894]" />
                  More Insights
                </h3>
                <div className="space-y-4">
                  {otherPosts.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/insights/${p.slug}`}
                      className="group block p-4 rounded-lg border border-slate-100 hover:border-[#00b894] hover:bg-slate-50 transition-all duration-200"
                    >
                      <div className="font-semibold text-slate-700 group-hover:text-[#00b894] mb-2 line-clamp-2 leading-snug">
                        {p.title}
                      </div>
                      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
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