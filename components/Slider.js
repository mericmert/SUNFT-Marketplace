import React, {useEffect, useState} from 'react'
var $ = require('jquery')
window.$ = window.jQuery = require('jquery')
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel'
import OwlCarousel from 'react-owl-carousel'
import CategoriesCard from './CategoriesCard'


const Slider = ({ props: { categories } }) => {

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='container px-5 sm:px-32 z-0'>
          <h1 className='font-semibold text-white text-center text-3xl pt-20 pb-10'>
              Browse&nbsp;by&nbsp;category
          </h1>
            <OwlCarousel className="owl-carousel owl-theme" loop items={3} margin={6} lazyLoad autoplay autoplaySpeed={1000} autoplayTimeout={2000} autoplayHoverPause>
                {
                    categories && JSON.parse(categories).map((category) => (
                        <CategoriesCard key={category.name} category={category.name} image={`${category.backgroundPicture}`}/>
                    ))
                }
        </OwlCarousel>
        <div className='pt-20'></div>
      </div>
    </div>
  )
}

export default Slider

