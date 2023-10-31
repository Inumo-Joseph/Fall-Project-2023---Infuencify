import React from 'react'
import HeaderTrainer from './Header-Trainer'
import VideoWheel from './VideoWheel'
import Link from 'react-dom'
import './index.css'

function Main() 
{
    return(
        <div className="container-fluid">

            <HeaderTrainer/>
            <div>
            <div className="container">
                <div className="">
                    <p>
                        NEWS HERE 
                    </p>
                </div>

            </div>
            </div>
            <VideoWheel/>
               

            
        </div>
        
    )
}
  
export default Main