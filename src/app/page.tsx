'use client'
import React, { Suspense, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle, ShieldCheck, TrendingUp, Zap, ArrowLeft, Radio } from 'lucide-react';
import Image from 'next/image';
import AboutUs from '@/components/home/AboutUs';
import Services from '@/components/home/Services';
import FadeInUp from '@/components/animations/FadeInUp';
import CompanyCarousel from '@/components/carousel/CompanyCarousel';
import LottieAnimation from '@/components/animations/LottieAnimation';
import MoneyLottie from '@/../public/assets/lotties/money.json';
import HomeLottie from '@/../public/assets/lotties/home.json';
import PersonalLottie from '@/../public/assets/lotties/personal.json';
import BusinessLottie from '@/../public/assets/lotties/business.json';
import FundingLottie from '@/../public/assets/lotties/funding.json';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { motion } from 'framer-motion';
import Link from 'next/link';


const LoanFormSlide = ({ title, description, lottieAnimation }: { title: string, description: string, lottieAnimation?: any }) => (
    <div className="keen-slider__slide w-full flex items-center px-8 lg:px-16">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 
                className="text-4xl lg:text-5xl font-bold text-[#002855] mb-4"
            >
                {title}
            </h1>
            <p
                className="text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0"
            >
                {description}
            </p>
            <div
                className="flex justify-center lg:justify-start items-center gap-4"
                >
                <Button className="bg-[#00b894] hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg">
                    Get Started
                </Button>
                <Button variant="outline" className="text-slate-600 border-slate-300 hover:bg-slate-100 py-3 px-6 rounded-lg">
                    Learn More
                </Button>
            </div>
        </div>
        <div className="hidden lg:flex w-1/2 h-full items-center justify-center">
             <div className="w-full h-full flex items-center justify-center">
                {lottieAnimation ? (
                    <LottieAnimation animationData={lottieAnimation} />
                ) : (
                    <div className="w-[450px] h-[450px] bg-slate-100 rounded-full flex items-center justify-center">
                        <p className="text-slate-500">Lottie Animation Here</p>
                    </div>
                )}
            </div>
        </div>
    </div>
);


export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        loop: true,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
        defaultAnimation: {
            duration: 2500
        },
    },
    [
        (slider) => {
          let timeout: ReturnType<typeof setTimeout>
          let mouseOver = false
          function clearNextTimeout() {
            clearTimeout(timeout)
          }
          function nextTimeout() {
            clearTimeout(timeout)
            if (mouseOver) return
            timeout = setTimeout(() => {
              slider.next()
            }, 3000)
          }
          slider.on("created", () => {
            slider.container.addEventListener("mouseover", () => {
              mouseOver = true
              clearNextTimeout()
            })
            slider.container.addEventListener("mouseout", () => {
              mouseOver = false
              nextTimeout()
            })
            nextTimeout()
          })
          slider.on("dragStarted", clearNextTimeout)
          slider.on("animationEnded", nextTimeout)
          slider.on("updated", nextTimeout)
        },
      ]
    )

    const slides = [
        {
            type: 'form',
            title: 'Secure Your Dream Home',
            description: 'Fast, transparent, and hassle-free home loans. Let us help you unlock the door to your new home with competitive rates and expert guidance. Our dedicated team is here to guide you through every step of the mortgage process, ensuring you find a plan that fits your budget and lifestyle.',
            lottie: HomeLottie,
        },
        {
            type: 'form',
            title: 'Achieve Your Personal Goals',
            description: 'Need funds for a wedding, vacation, or an emergency? Our personal loans offer flexible terms and quick disbursal to help you meet your needs. We provide tailored solutions, competitive interest rates, and a simple application process to get you the funds you need, right when you need them.',
            lottie: PersonalLottie,
        },
        {
            type: 'form',
            title: 'Fuel Your Business Growth',
            description: 'Expand your operations, purchase new equipment, or manage cash flow with our customized business loan solutions designed for entrepreneurs. We offer a range of financing options to support your ambitions, from working capital loans to long-term financing for major projects.',
            lottie: BusinessLottie,
        },
        {
            type: 'form',
            title: 'Innovative IPO & Venture Funding',
            description: 'Secure capital for your Pre-IPO placement or next big venture. We connect visionary founders with strategic investors to fuel groundbreaking success. Our expert team provides strategic advice and access to a wide network of funding sources to help your innovative ideas flourish.',
            lottie: FundingLottie,
        },
    ]


  return (
    <>
      <section className="relative bg-gradient-to-b from-teal-50 to-white pt-12 pb-16">
        <div ref={sliderRef} className="keen-slider h-[600px]">
            {/* Slide 1: Original Hero */}
            <div className="keen-slider__slide w-full flex flex-col lg:flex-row items-center justify-between px-8 lg:px-16">
                <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
                    <div
                        className="flex flex-wrap items-center gap-2 mb-4 justify-center lg:justify-start"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs sm:text-sm font-semibold text-[#00b894]">
                            <Zap className="h-4 w-4" />
                            <span>Welcome to NetWealth India</span>
                        </div>
                         <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs sm:text-sm font-semibold text-[#002855]">
                            <ShieldCheck className="h-4 w-4" />
                            <span>25+ years of experience</span>
                        </div>
                         <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs sm:text-sm font-semibold text-amber-800">
                            <TrendingUp className="h-4 w-4" />
                            <span>1000+ Happy Clients</span>
                        </div>
                    </div>
                    <h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#002855] mb-6 leading-tight"
                    >
                        Navigate Your Financial Future with Confidence
                    </h1>
                    <p
                        className="text-lg text-slate-600 md:text-xl  mb-8 max-w-lg mx-auto lg:mx-0"
                    >
                        Your trusted partner for comprehensive financial planning, from
                        strategic investments and insurance to achieving your life goals.
                    </p>
                    <div
                        className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start"
                    >
                        <Link href="/contact">
                            <Button size="lg" className="bg-[#00b894] text-white hover:bg-[#00a383]">
                                Get Started <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" className="border-[#00b894] text-[#00b894] hover:bg-teal-50 hover:text-[#00a383]">
                            Explore Services
                        </Button>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                    <LottieAnimation animationData={MoneyLottie} />
                </div>
            </div>

            {/* Slides 2-5: Forms */}
            {slides.map((slide, index) => (
                    <LoanFormSlide
                    key={index}
                    title={slide.title}
                    description={slide.description}
                    lottieAnimation={slide.lottie}
                    />
            ))}
        </div>
        
        {loaded && instanceRef.current && (
            <>
                <ArrowLeft
                    onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 p-2 text-[#00b894] bg-teal-50/50 rounded-full cursor-pointer hover:bg-teal-100/70 transition z-10"
                />

                <ArrowRight
                    onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 p-2 text-[#00b894] bg-teal-50/50 rounded-full cursor-pointer hover:bg-teal-100/70 transition z-10"
                />
            </>
        )}
        {loaded && instanceRef.current && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
                    return (
                        <button
                            key={idx}
                            onClick={() => instanceRef.current?.moveToIdx(idx)}
                            className={'w-3 h-3 rounded-full ' + (currentSlide === idx ? 'bg-brand-green' : 'bg-slate-300')}
                        ></button>
                    )
                })}
            </div>
        )}
      </section>

      <Suspense fallback={<div className="h-96" />}>
        <FadeInUp delay={0.1}>
          <AboutUs />
        </FadeInUp>
      </Suspense>

      <Suspense fallback={<div className="h-96" />}>
        <FadeInUp delay={0.2}>
          <Services />
        </FadeInUp>
      </Suspense>

      <CompanyCarousel />
    </>
  );
}
