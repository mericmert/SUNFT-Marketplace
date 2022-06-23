import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
export default function Layout(props) {
  return (
    <div>
        <Header/>
        <div className='mt-20 min-h-[calc(100vh_-_120px)]'>
            {props.children}
        </div>
        <Footer/>
    </div>
  )
}
