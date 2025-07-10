import { getSortedPostsData, PostData } from '@/lib/blog';
import { BlogCarousel } from '@/components/blog/BlogCarousel';
import LottieAnimation from '@/components/animations/LottieAnimation';
import ZenLottie from '@/../public/assets/lotties/zen.json';
import {
  Lightbulb,
  GraduationCap,
  TrendingUp,
  ShieldCheck,
  Database,
  ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Post = Omit<PostData, 'content'>;

export default function InsightsPage() {
  const allPosts: Post[] = getSortedPostsData();
  const featuredPosts = allPosts.slice(0, 5);
  const recentPosts = allPosts.slice(0, 9);

  return (
    <div className="bg-slate-50">
      <header className="bg-white">
        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-28 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#002855]">
            NetWealth Insights
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Your hub for expert financial analysis, investment strategies, and
            market commentary.
          </p>

          <div className="mt-12 sm:mt-16">
            <div className="inline-flex items-center rounded-full bg-teal-100 px-3 sm:px-4 py-2 text-sm font-semibold text-[#00b894]">
              <Lightbulb className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Our Philosophy
            </div>
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-[#002855]">
              Clarity in Complexity
            </h2>
          </div>

          {/* Mobile-First Layout */}
          <div className="mt-12 sm:mt-16">
            {/* Mobile: Stack everything vertically */}
            <div className="block md:hidden space-y-8">
              {/* Animation first on mobile */}
              <div className="flex justify-center px-4">
                <div className="w-64 h-48">
                  <LottieAnimation animationData={ZenLottie} />
                </div>
              </div>
              
              {/* Info blocks below animation on mobile */}
              <div className="space-y-8 px-4">
                <InfoBlock
                  icon={<Database />}
                  title="Data-Driven Analysis"
                  text="We base our insights on rigorous quantitative analysis and market data, not on speculation or hype."
                />
                <InfoBlock
                  icon={<ShieldCheck />}
                  title="Unbiased & Independent"
                  text="Our commentary is objective. We are committed to providing you with honest assessments, free from commercial bias."
                />
                <InfoBlock
                  icon={<TrendingUp />}
                  title="Long-Term Perspective"
                  text="We encourage a long-term approach to investing, focusing on sustainable growth over short-term market noise."
                />
                <InfoBlock
                  icon={<GraduationCap />}
                  title="Educational Focus"
                  text="Our primary goal is to educate. We break down complex topics into simple, understandable language to empower you."
                />
              </div>
            </div>

            {/* Desktop: Original 3-column layout */}
            <div className="hidden md:grid grid-cols-3 items-center gap-x-8">
              <div className="space-y-10">
                <InfoBlock
                  icon={<Database />}
                  title="Data-Driven Analysis"
                  text="We base our insights on rigorous quantitative analysis and market data, not on speculation or hype."
                />
                <InfoBlock
                  icon={<ShieldCheck />}
                  title="Unbiased & Independent"
                  text="Our commentary is objective. We are committed to providing you with honest assessments, free from commercial bias."
                />
              </div>

              <div className="px-8">
                <LottieAnimation animationData={ZenLottie} />
              </div>

              <div className="space-y-10">
                <InfoBlock
                  icon={<TrendingUp />}
                  title="Long-Term Perspective"
                  text="We encourage a long-term approach to investing, focusing on sustainable growth over short-term market noise."
                  isRightAligned
                />
                <InfoBlock
                  icon={<GraduationCap />}
                  title="Educational Focus"
                  text="Our primary goal is to educate. We break down complex topics into simple, understandable language to empower you."
                  isRightAligned
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8 sm:mb-12 text-center">
            Featured Articles
          </h2>
          <BlogCarousel posts={featuredPosts} />
        </div>
      </section>

      <main className="bg-white py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8 sm:mb-12 text-center">
            All Insights
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post: Post) => (
              <div
                key={post.slug}
                className="group flex flex-col overflow-hidden rounded-xl bg-slate-50 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-xl"
              >
                <Link href={`/insights/${post.slug}`} className="block">
                  <div className="relative h-48 sm:h-56 w-full">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
            </div>
                </Link>
                <div className="flex flex-grow flex-col p-4 sm:p-6">
                  <div className="mb-3">
                    {post.tags.slice(0, 2).map((tag: string) => (
                      <span
                        key={tag}
                        className="mr-2 inline-block rounded-full bg-teal-100 px-2 sm:px-3 py-1 text-xs font-semibold text-[#00b894]"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
                  <h3 className="mb-3 text-base sm:text-lg font-bold leading-tight text-[#002855]">
                    <Link href={`/insights/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="mb-4 flex-grow text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto inline-flex items-center font-semibold text-[#002855] transition-colors group-hover:text-[#00b894]">
                    <Link href={`/insights/${post.slug}`} className="inline-flex items-center text-sm sm:text-base">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
                </div>
              </div>
            ))}
            </div>
        </div>
      </main>
    </div>
  );
}

const InfoBlock = ({
  icon,
  title,
  text,
  isRightAligned = false,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  isRightAligned?: boolean;
}) => (
  <div
    className={`flex items-start gap-4 text-center md:text-left ${isRightAligned ? 'md:flex-row-reverse' : ''}`}
  >
    <div className="flex-shrink-0 rounded-lg bg-teal-100 p-3 text-[#00b894] mx-auto md:mx-0">
      {icon}
    </div>
    <div className={`flex-1 ${isRightAligned ? 'md:text-right' : ''}`}>
      <h3 className="text-lg sm:text-xl font-bold text-[#002855] mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{text}</p>
    </div>
  </div>
);
