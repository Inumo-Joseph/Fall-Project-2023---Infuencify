
import React from 'react';
import './index.css';
import Card from './Card';


function VideoWheel()
{
    
   
return ( 
   
<div className="container-fluid column-md-6">

<div className="PageLayout">
<div id ="myCarousel" className="carousel slide">  
    <div className="column-md-4">
    <h1 className="Heading1">
            RECOMMENDED VIDEOS
        </h1>
        
    
    <div style={{paddingLeft: "150px"}}>
    
    <div className="carousel-inner">

        <div className="carousel-item active"> 
        
        <Card title="Title-1" source="C:\Users\inumo\pexels-maxime-g-18562741 (Original).mp4"/>
        <Card title="Title-2"/>
        <Card title="Title-3"/>
        <Card title="Title-4"/>

         </div>

    <div className="carousel-item"> 
    
        <Card title="Title-5" />
        <Card title="Title-6"/>
        <Card title="Title-7"/>
        <Card title="Title-8"/>

    </div>

    <div className="carousel-item"> 
    
        <Card title="Title-9"/>
        <Card title="Title-10"/>
        <Card title="Title-11"/>
        <Card title="Title-12"/>

    </div>
    </div>


        <button className="carousel-control-prev Button" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>    
   </button>
       

        <button className="carousel-control-next Button" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
        

  
    </div>
    <div className="carousel-indicators">
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        
        </div>
    </div>
    
  
</div>
    


    
<div className="PageLayout">
<div id ="myCarousel2" className="carousel slide">      
            <div className="column-md-4"> 
            <h1 className="Heading1">
            FEATURED VIDEOS
            </h1>

            <div style={{paddingLeft: "150px"}}>
            <div className="carousel-inner">

<div className="carousel-item active"> 

<Card title="Title-1"/>
<Card title="Title-2"/>
<Card title="Title-3"/>
<Card title="Title-4"/>

 </div>

<div className="carousel-item"> 

<Card title="Title-5"/>
<Card title="Title-6"/>
<Card title="Title-7"/>
<Card title="Title-8"/>

</div>

<div className="carousel-item"> 

<Card title="Title-9"/>
<Card title="Title-10"/>
<Card title="Title-11"/>
<Card title="Title-12"/>

</div>



<button className="carousel-control-prev Button" type="button" data-bs-target="#myCarousel2" data-bs-slide="prev">
<span className="carousel-control-prev-icon" aria-hidden="true"></span>
<span className="visually-hidden">Previous</span>    
</button>


<button className="carousel-control-next Button" type="button" data-bs-target="#myCarousel2" data-bs-slide="next">
<span className="carousel-control-next-icon" aria-hidden="true"></span>
<span className="visually-hidden">Next</span>
</button>



</div>
            </div>
            
        </div>
        <div className="carousel-indicators">
<button type="button" data-bs-target="#myCarousel2" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#myCarousel2" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#myCarousel2" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
        </div>
        
</div>
       
     
</div>


);


}

export default VideoWheel;


