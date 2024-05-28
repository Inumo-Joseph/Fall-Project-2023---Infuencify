import React from 'react'
import HeaderTrainer from './Header-Trainer.jsx'
import VideoWheel from './VideoWheel.jsx'
import Footer from './Footer.jsx'
import Link from 'react-dom'
import './index.css'
import Uploader from './Uploader.jsx'

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