'use client'

import React, { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Radio } from 'lucide-react'
import LottieAnimation from '@/components/animations/LottieAnimation'
import money from '@/../public/assets/lotties/money.json'
import { Button } from '../ui/button'

const LoanFormSlide = ({ title, description, lottiePlaceholder, isActive }: { title: string, description: string, lottiePlaceholder: any, isActive: boolean }) => (
    <div className="keen-slider__slide w-full flex items-center">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="text-4xl lg:text-5xl font-bold text-[#002855] mb-4"
            >
                {title}
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                className="text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0"
            >
                {description}
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
                className="flex justify-center lg:justify-start items-center gap-4"
                >
                <Button className="bg-brand-green hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg">
                    Get Started
                </Button>
                <Button variant="outline" className="text-slate-600 border-slate-300 hover:bg-slate-100 py-3 px-6 rounded-lg">
                    Learn More
                </Button>
            </motion.div>
        </div>
        <div className="hidden lg:flex w-1/2 h-full items-center justify-center">
             <div className="w-[450px] h-[450px] bg-slate-100 rounded-full flex items-center justify-center">
                {/* Placeholder for Lottie Animation */}
                <p className="text-slate-500">Lottie Animation Here</p>
            </div>
        </div>
    </div>
)


export default function HeroCarousel() {
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
    })

    const slides = [
        { 
            type: 'hero',
            title: 'Smarter Investing, Brighter Future', 
            description: 'Unlock your financial potential with personalized advice, data-driven insights, and a commitment to your long-term growth. Welcome to NetWealth.',
            lottie: money
        },
        { 
            type: 'form',
            title: 'Secure Your Dream Home', 
            description: 'Fast, transparent, and hassle-free home loans. Let us help you unlock the door to your new home with competitive rates and expert guidance.',
            lottie: null
        },
        { 
            type: 'form',
            title: 'Achieve Your Personal Goals', 
            description: 'Need funds for a wedding, vacation, or an emergency? Our personal loans offer flexible terms and quick disbursal to help you meet your needs.',
            lottie: null
        },
        { 
            type: 'form',
            title: 'Fuel Your Business Growth', 
            description: 'Expand your operations, purchase new equipment, or manage cash flow with our customized business loan solutions designed for entrepreneurs.',
            lottie: null
        },
        { 
            type: 'form',
            title: 'Turn Your Vision into Reality', 
            description: 'Seeking capital for your startup or a new venture? We connect innovators with the right funding opportunities to help bring your ideas to life.',
            lottie: null
        },
    ]

    return (
        <div className="relative bg-gradient-to-b from-teal-50 to-white pt-24 pb-16">
            <div ref={sliderRef} className="keen-slider h-[650px]">
                {/* Slide 1: Original Hero */}
                <div className="keen-slider__slide w-full flex flex-col lg:flex-row items-center justify-between px-8 lg:px-16">
                    <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
                        <motion.h1 
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: currentSlide === 0 ? 1 : 0, y: currentSlide === 0 ? 0 : 20 }}
                             transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#002855] mb-6 leading-tight"
                        >
                            Smarter Investing, <br /> Brighter Future
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: currentSlide === 0 ? 1 : 0, y: currentSlide === 0 ? 0 : 20 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                            className="text-lg text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0"
                        >
                           Unlock your financial potential with personalized advice, data-driven insights, and a commitment to your long-term growth. Welcome to NetWealth.
                        </motion.p>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: currentSlide === 0 ? 1 : 0, y: currentSlide === 0 ? 0 : 20 }}
                            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                            className="flex justify-center lg:justify-start items-center gap-4"
                        >
                            <Button className="bg-brand-green hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg">
                                Get Started
                            </Button>
                            <Button variant="outline" className="text-slate-600 border-slate-300 hover:bg-slate-100 py-3 px-6 rounded-lg">
                                Learn More
                            </Button>
                        </motion.div>
                    </div>
                    <div className="w-full lg:w-1/2 flex items-center justify-center">
                        <LottieAnimation animationData={money} />
                    </div>
                </div>

                {/* Slides 2-5: Forms */}
                {slides.slice(1).map((slide, index) => (
                     <LoanFormSlide 
                        key={index}
                        title={slide.title} 
                        description={slide.description}
                        lottiePlaceholder={slide.lottie}
                        isActive={currentSlide === index + 1}
                     />
                ))}

            </div>
             {loaded && instanceRef.current && (
                <>
                    <ArrowLeft
                        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 p-2 text-slate-600 bg-white/50 rounded-full cursor-pointer hover:bg-white transition"
                    />

                    <ArrowRight
                       onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                       className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 p-2 text-slate-600 bg-white/50 rounded-full cursor-pointer hover:bg-white transition"
                    />
                </>
            )}
             {loaded && instanceRef.current && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
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
        </div>
    )
}
