import React from 'react'
import HeaderTrainer from './Header-Trainer'
import VideoWheel from './VideoWheel'
import Footer from './Footer'
import Link from 'react-dom'
import './index.css'
import Uploader from './Uploader'

function Main() 
{
    return(

        <div className="">

            <HeaderTrainer/>

            <VideoWheel/>  
               
            <Footer/>
            
        </div>
        
    )
}
  
export default Main;