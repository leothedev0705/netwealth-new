'use client';

import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { getSortedPostsData } from '@/lib/blog';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

type Post = Omit<Awaited<ReturnType<typeof getSortedPostsData>>[0], 'content'>;

interface BlogCarouselProps {
  posts: Post[];
}

export function BlogCarousel({ posts }: BlogCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      mode: 'free-snap',
      slides: {
        perView: 3,
        spacing: 24,
      },
      breakpoints: {
        '(max-width: 1280px)': {
          slides: { perView: 2, spacing: 20 },
        },
        '(max-width: 768px)': {
          slides: { perView: 1, spacing: 16 },
        },
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 6000);
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      },
    ]
  );

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider">
        {posts.map((post) => (
          <div key={post.slug} className="keen-slider__slide group">
            <Link
              href={`/insights/${post.slug}`}
              className="block h-full overflow-hidden rounded-xl shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl"
            >
              <div className="flex h-full flex-col bg-[#002855]">
                {/* Top half: Image */}
                <div className="relative h-56 w-full">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </div>
                {/* Bottom half: Content */}
                <div className="flex flex-grow flex-col p-6 text-white">
                  <h3 className="mb-3 text-lg font-bold leading-tight">
                    {post.title}
                  </h3>
                  <p className="mb-4 flex-grow text-sm text-slate-300 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto inline-flex items-center font-semibold text-[#00b894] transition-colors group-hover:text-white">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {loaded && instanceRef.current && (
        <>
          <Arrow
            left
            onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
            disabled={currentSlide === 0 && !instanceRef.current.options.loop}
          />
          <Arrow
            onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
            disabled={
              currentSlide === instanceRef.current.track.details.slides.length - 1 &&
              !instanceRef.current.options.loop
            }
          />
        </>
      )}
    </div>
  );
}

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabled = props.disabled ? ' opacity-50 cursor-not-allowed' : '';
  return (
    <button
      onClick={props.onClick}
      className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 text-slate-800 shadow-md transition hover:bg-white ${
        props.left ? 'left-4' : 'right-4'
      } ${disabled}`}
      disabled={props.disabled}
    >
      {props.left ? (
        <ChevronLeft className="h-5 w-5" />
      ) : (
        <ChevronRight className="h-5 w-5" />
      )}
    </button>
  );
} 