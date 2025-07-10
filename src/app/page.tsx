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


const LoanFormSlide = ({ title, description, lottieAnimation, slideIndex }: { title: string, description: string, lottieAnimation?: any, slideIndex?: number }) => {
    // Determine if this slide should have smaller mobile animation (slides 1, 3, 4 = indices 0, 2, 3)
    const shouldBeSmaller = slideIndex === 0 || slideIndex === 2 || slideIndex === 3;
    
    return (
    <div className="keen-slider__slide w-full flex flex-col lg:flex-row items-center justify-center px-4 sm:px-8 lg:px-16 py-8 lg:py-0">
        <div className="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0 order-2 lg:order-1">
            <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#002855] mb-4 leading-tight"
            >
                {title}
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-sm sm:text-base text-slate-600 mb-6 lg:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
                {description}
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-3 sm:gap-4"
                >
                <Button className="w-full sm:w-auto bg-[#00b894] hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg">
                    Get Started
                </Button>
                <Button variant="outline" className="w-full sm:w-auto text-slate-600 border-slate-300 hover:bg-slate-100 py-3 px-6 rounded-lg">
                    Learn More
                </Button>
            </motion.div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center order-1 lg:order-2 mb-6 lg:mb-0">
             <div className={`flex items-center justify-center ${
                 shouldBeSmaller 
                     ? 'h-36 sm:h-40 md:h-44 w-full max-w-xs sm:max-w-xs lg:w-72 lg:h-72 xl:w-80 xl:h-80' 
                     : 'h-48 sm:h-56 md:h-64 w-full max-w-xs sm:max-w-sm lg:w-80 lg:h-80 xl:w-96 xl:h-96'
             }`}>
                {lottieAnimation ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                        className="w-full h-full"
                    >
                        <LottieAnimation animationData={lottieAnimation} />
                    </motion.div>
                ) : (
                    <div className={`bg-slate-100 rounded-full flex items-center justify-center ${
                        shouldBeSmaller 
                            ? 'w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-72 lg:h-72 xl:w-80 xl:h-80' 
                            : 'w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-80 lg:h-80 xl:w-96 xl:h-96'
                    }`}>
                        <p className="text-slate-500">Lottie Animation Here</p>
                    </div>
                )}
            </div>
        </div>
    </div>
    );
};


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
      <section className="relative bg-gradient-to-b from-teal-50 to-white pt-8 sm:pt-12 pb-12 sm:pb-16">
        <div ref={sliderRef} className="keen-slider h-auto min-h-[500px] sm:h-[600px] lg:h-[650px]">
            {/* Slide 1: Original Hero */}
            <div className="keen-slider__slide w-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-16 py-8 lg:py-0">
                <div className="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0 order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-wrap items-center gap-2 mb-6 justify-center lg:justify-start"
                    >
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-teal-100 px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-[#00b894]">
                            <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline">Welcome to NetWealth India</span>
                            <span className="sm:hidden">NetWealth India</span>
                        </div>
                         <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-blue-100 px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-[#002855]">
                            <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>25+ years</span>
                        </div>
                         <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-amber-100 px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-amber-800">
                            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>1000+ Clients</span>
                        </div>
                    </motion.div>
                    
                    {/* Mobile Animation - Between badges and heading */}
                    <div className="lg:hidden w-full flex items-center justify-center mb-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                            className="w-48 h-36 flex items-center justify-center"
                        >
                            <LottieAnimation animationData={MoneyLottie} />
                        </motion.div>
                    </div>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#002855] mb-4 sm:mb-6 leading-tight"
                    >
                        Navigate Your Financial Future with Confidence
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
                    >
                        Your trusted partner for comprehensive financial planning, from
                        strategic investments and insurance to achieving your life goals.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start sm:gap-4"
                    >
                        <Link href="/contact" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto bg-[#00b894] text-white hover:bg-[#00a383] font-semibold py-3 px-6">
                                Get Started <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto border-[#00b894] text-[#00b894] hover:bg-teal-50 hover:text-[#00a383] font-semibold py-3 px-6">
                            Explore Services
                        </Button>
                    </motion.div>
                </div>
                <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center order-1 lg:order-2 mb-6 lg:mb-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                        className="w-80 h-80 xl:w-96 xl:h-96 flex items-center justify-center"
                    >
                        <LottieAnimation animationData={MoneyLottie} />
                    </motion.div>
                </div>
            </div>

            {/* Slides 2-5: Forms */}
            {slides.map((slide, index) => (
                    <LoanFormSlide
                    key={index}
                    title={slide.title}
                    description={slide.description}
                    lottieAnimation={slide.lottie}
                    slideIndex={index}
                    />
            ))}
        </div>
        
        {loaded && instanceRef.current && (
            <>
                <ArrowLeft
                    onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 p-1.5 sm:p-2 text-[#00b894] bg-white/80 backdrop-blur-sm rounded-full cursor-pointer hover:bg-white shadow-lg transition-all duration-200 z-10"
                />

                <ArrowRight
                    onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 p-1.5 sm:p-2 text-[#00b894] bg-white/80 backdrop-blur-sm rounded-full cursor-pointer hover:bg-white shadow-lg transition-all duration-200 z-10"
                />
            </>
        )}
        {loaded && instanceRef.current && (
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
                {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
                    return (
                        <button
                            key={idx}
                            onClick={() => instanceRef.current?.moveToIdx(idx)}
                            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                                currentSlide === idx 
                                    ? 'bg-[#00b894] scale-125' 
                                    : 'bg-white/70 hover:bg-white/90'
                            }`}
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
