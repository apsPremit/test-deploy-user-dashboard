"use client"
import React, { useContext, useState } from 'react';
import FinalSlide from '@/components/newOrder/slides/FinalSlide/FinalSlide';
import AlignSlide from '@/components/newOrder/slides/AlignSlide/AlignSlide';
import BackgroundSlide from '@/components/newOrder/slides/BackgroundSlide/BackgroundSlide';
import FormatSlide from '@/components/newOrder/slides/FormatSlide/FormatSlide';
import OrderName from '@/components/newOrder/slides/OrderName/OrderName';
import SlideFoot from '../slides/SlideFoot/SlideFoot';
import TypeSlide from '../slides/TypeSlide/TypeSlide';
import { StateContext } from '@/context/StateProvider';

const Slider = () => {
    const { currentSlide, setCurrentSlide } = useContext(StateContext)

    // prev button handler 
    const handlePrev = () => {
        if (currentSlide > 1) {
            setCurrentSlide(currentSlide - 1)
        }
    }

    // next button handler 
    const handleNext = () => {
        if (currentSlide < 6) {
            setCurrentSlide(currentSlide + 1)
        }
    }



    return (
        <div className={`border-shadow border-2 rounded-xl w-full  ${currentSlide === 1 ? "lg:w-3/4" : currentSlide === 5 ? ' lg:max-w-[900px]' : 'lg:w-[640px]'} mx-auto p-5 mt-10`}>
            {currentSlide === 1 && <TypeSlide handleNext={handleNext} handlePrev={handlePrev} />}
            {currentSlide === 2 && <OrderName handleNext={handleNext} handlePrev={handlePrev} />}
            {currentSlide === 3 && <FormatSlide handleNext={handleNext} handlePrev={handlePrev} />}
            {currentSlide === 4 && <BackgroundSlide handleNext={handleNext} handlePrev={handlePrev} />}
            {currentSlide === 5 && <AlignSlide handleNext={handleNext} handlePrev={handlePrev} />}
            {currentSlide === 6 && <FinalSlide handleNext={handleNext} handlePrev={handlePrev} />}
            <SlideFoot handlePrev={handlePrev} handleNext={handleNext} currentSlide={currentSlide} />
        </div>

    );
};

export default Slider;