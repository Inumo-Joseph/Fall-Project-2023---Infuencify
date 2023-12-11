
import React from 'react';
import { useState, useEffect } from 'react';
import './index.css';
import Card from './Card';
import {getStorage, getDownloadURL, ref, listAll} from 'firebase/storage';
import { ArrowCircleLeft, ArrowCircleRight,TimeToLeave} from '@mui/icons-material';
import { doc, setDoc, collection, getDocs} from "firebase/firestore";
import { db, storage} from "../Config/firebase-config";
import { getAuth, onStateChanged} from "firebase/auth";
import {Link } from 'react-router-dom';





function VideoWheel()

{
    const Auth=getAuth();
    const UserTags="Beauty Comedy";
    const userTagsArray = UserTags.split(' ');



    const [videoData, setVideoData] = useState([]);
    const getData = async  ()  => {

    try{
    const storage = getStorage();
    const videosCollection = ref(storage, 'videos');
    const querySnapshot = await getDocs(collection(db, "videos"));
    const titlesData = [];
  
    querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
    titlesData.push(doc.data()); 

    });

    setVideoData(titlesData);
    console.log(titlesData);
    
    }catch (error) {
        console.error('Error fetching videos:', error);
      } 

   

    };

    useEffect(() => {
        getData();
      }, []); 


return ( 

<div className="container-fluid column-md-6 videowheel" style ={{backgroundColor: ""}}>


<div className="" style ={{backgroundColor: ""}}>
    
<div id ="myCarousel2" className="carousel slide">  
    <div className="column-md-4">
    <h1 className="Heading1">
            FEATURED VIDEOS
    </h1>
    
   
    <div style={{paddingLeft: "150px"}}>
    
    <div className="carousel-inner">
        <div className="carousel-item active"> 
        { 
        
        videoData.slice(0,4).map((video, index) => ( 
            
        <Link to={`../video/${encodeURIComponent(index)}`}>
         <Card key = {index} title={video.Title} source= {video.videoUrl} User={video.username}/> 
        
        </Link>

))}

         </div>

    <div className="carousel-item"> 
    
    { videoData.slice(4,videoData.length-1).map((video, index) => (
        
       
          <Link to={`../video/${encodeURIComponent(index)}`}>
            
            <Card key = {index} title={video.Title} source= {video.videoUrl} User={video.username}/> 
           
           </Link>        
        ))}


    </div>

    
    </div>


        <button className="carousel-control-prev Button PageLayout" type="button" data-bs-target="#myCarousel2" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden"><ArrowCircleLeft></ArrowCircleLeft></span>    
   </button>
       

        <button className="carousel-control-next Button" type="button" data-bs-target="#myCarousel2" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden"><ArrowCircleRight></ArrowCircleRight></span>
  </button>
        
    </div>
    
        
        </div>
        
    </div>
    
  
</div>
    

<div className="">
<div id ="myCarousel" className="carousel slide">  
    <div className="column-md-4">
    <h1 className="Heading1">
            RECOMMENDED VIDEOS
    </h1>
    
    <div style={{paddingLeft: "150px"}}>
    
    <div className="carousel-inner">
        <div className="carousel-item active"> 
        { videoData.slice(0,4).map((video, index) => (
     
     userTagsArray.some(tag => video.genre.includes(tag)) ? (
        <Link to={`../video/${encodeURIComponent(video.videoUrl)}`}>
            
        <Card key = {index} title={video.Title} source= {video.videoUrl} User={video.username}/> 
       
       </Link>         ) : null

        ))}
         </div>

    <div className="carousel-item"> 
    
    { videoData.slice(4,videoData.length).map((video, index) => (
        
        userTagsArray.some(tag => video.genre.includes(tag)) ? (
            <Link to={`../video/${encodeURIComponent(video.videoUrl)}`}>
            
            <Card key = {index} title={video.Title} source= {video.videoUrl} User={video.username}/> 
           
           </Link>       ) : null
            
        ))}


    </div>

    
    </div>


        <button className="carousel-control-prev Button PageLayout" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden"><ArrowCircleLeft></ArrowCircleLeft></span>    
   </button>
       

        <button className="carousel-control-next Button" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden"><ArrowCircleRight> </ArrowCircleRight></span>
  </button>
        
    </div>
    
        
        </div>
    </div>


        
</div>
       
     
</div>


);


}

export default VideoWheel;


