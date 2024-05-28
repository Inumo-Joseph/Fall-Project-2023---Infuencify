
import React from 'react';
import { useState, useEffect } from 'react';
import './index.css';
import Card from './Card';
import { ArrowCircleLeft, ArrowCircleRight} from '@mui/icons-material';
import { collection, getDocs} from "firebase/firestore";
import { db } from "../Config/firebase-config.js";
import { getAuth} from "firebase/auth";
import {Link } from 'react-router-dom';




//VideoWheel Function grabs videos Documenst from Fire-Store 
function VideoWheel()

{
    const Auth=getAuth(); //Used to get the users signed information for displaying username
    const UserTags="Beauty Comedy"; //Tags that will be used for the recommended video section {Didnt get the chance to fully implement} 
    const userTagsArray = UserTags.split(' ');

    const [videoData, setVideoData] = useState([]); // an array of video information taken from Docs. Info like Video Title, Username, Tags etc
    
    
    //async function that recieves that data
    const getData = async  ()  => {

    try{
    //Query Snapshot created and refrenced the collection in our Firebase
    const querySnapshot = await getDocs(collection(db, "videos"));

    const titlesData = [];
    
    querySnapshot.forEach((doc) => {
  // Each doc is placed in titlesData array
    titlesData.push(doc.data()); 

    });
    
    //useState of videodata is set to the titlesData array
    setVideoData(titlesData);
    
    }catch (error) {
        console.error('Error fetching videos:', error);
      } 

   

    };
  
    //useEffect used after page renders
    useEffect(() => {
        getData();
       
      }, []); // set into empty array


return ( 


<div className="container-fluid videowheel row">


<div className="container">
    {/*Within this container a Bootstrap carousel componenet is used to display the videos

    */
    }
<div id ="myCarousel2" className="carousel slide">  

    <div className="">
    <h1 className="Heading1">
            FEATURED VIDEOS
    </h1>
    <div style={{paddingLeft: "150px"}}>
    
    <div className="carousel-inner">
        <div className="carousel-item active"> 
        { 
        
         //The videoData array is sliced so the first four videos are used always
         //then map and iterated through 
        videoData.slice(0,4).map((video, index) => ( 
          
            //anytime the Card compenent is clicked it changes the the URl and navigates to the Video page
            //the index the video was on is passed in the URL so the video page can find and load it 
        <Link to={`../video/${(index)}`}>

            {/* The card componenet takes props so it the videos Title and src url can be used*/}
         {console.log(video.videoUrl)}
         <Card key = {index} title={video.Title} source= {video.videoUrl} User={video.username}/> 
         { console.log("INDEX IN CARD COMP",index)}
        </Link>

           ))}
         </div>


    <div className="carousel-item"> 
    
    { 
    
    //Within the next page of the carousel the next set of videos are selected
    videoData.slice(4,(videoData.length)).map((video, index) => ( 
            //the same process happens here but we have to add plus 3 to offest. 
            //Since slice makes a subarray with a new inex 0-3
        <Link to={`../video/${(index+4)}`}>
         <Card key = {index+4} title={video.Title} source= {video.videoUrl} User={video.username}/> 
         {console.log("VIDEO LENGTH",videoData.length)}
         { console.log("INDEX IN CARD COMP2",index+4)}


        </Link>
  
        ))}


    </div>

    
    </div>

            {/*These Bootstrap components are for controlling the where the carousel turns to*/}

        <button className="carousel-control-prev Button" type="button" data-bs-target="#myCarousel2" data-bs-slide="prev">
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
    

{/*A similiar process happens for recommended videos*/}

<div className="container">
<div id ="myCarousel" className="carousel slide">  
    <div className="column-md-4">
    <h1 className="Heading1">
            RECOMMENDED VIDEOS
    </h1>
    
    <div style={{paddingLeft: "150px"}}>
    
    <div className="carousel-inner">
        <div className="carousel-item active"> 
        { videoData.slice(0,4).map((video, index) => (

        //The the users tags are used to render only videos that have the same tags as the user Tags
        userTagsArray.some(tag => video.genre.includes(tag)) ? ( //
         <Link to={`../video/${(index)}`}>            
        <Card key = {index} title={video.Title} source= {video.videoUrl} User={video.username}/> 
       </Link>         ) : null //If not nothing is displayed

        ))}
         </div>

    <div className="carousel-item"> 
    
    { videoData.slice(4,videoData.length).map((video, index) => (
        
        userTagsArray.some(tag => video.genre.includes(tag)) ? (
            <Link to={`../video/${(index+4)}`}>
            <Card key = {index+4} title={video.Title} source= {video.videoUrl} User={video.username}/> 
           
           </Link>       ) : null
            
        ))}


    </div>

    
    </div>


        <button className="carousel-control-prev Button " type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
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


