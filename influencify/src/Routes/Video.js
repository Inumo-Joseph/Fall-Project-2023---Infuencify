import React, { useState, useEffect } from 'react';
import myVideo from "../mp4ex.mp4"
import ReactPlayer from 'react-player';
import HeaderTrainer from '../Components_TRUE/Header-Trainer'
import {useParams} from "react-router-dom";
import { CommentsDisabledOutlined, ContactSupportOutlined } from '@mui/icons-material';
import { doc, collection, getDoc, getDocs, where, query, limit} from "firebase/firestore";
import { db, storage} from "../Config/firebase-config";
import Card from '../Components_TRUE/Card';
import {Link } from 'react-router-dom';
import { KeyboardArrowLeft,KeyboardArrowRight, KeyboardDoubleArrowRight, TimeToLeave} from '@mui/icons-material';
import Comments from './Comments';

function Video() {
  const UserTags="Beauty Comedy";
  const userTagsArray = UserTags.split(' ');
  const [userName,setUserName]= useState('');
  const [videoURL, setVideoURL] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoWheel, setVideoWheel] =useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('Comment Something');
  const {videoId} = useParams();
  var videoData;
  var vidIndex=decodeURIComponent(videoId);

  console.log("Index Recieved", vidIndex);

  const handleInputChange = (event) => {
    setComment(event.target.value);
    
  };

  const handleClick = (index) =>
  {
    vidIndex=index;
    window.location.reload();
    console.log("NEW INDEX", index)
  }

  //grabs the videos to display and for the video WHeel
const getData = async  ()  => {

    try{  
      
     const collectionRef = collection(db, 'videos');
     const query = where('videoUrl', '==', true);
     
     const limitedQuery = limit(query, 1);

     
     const querySnapshot = await getDocs(collectionRef, limitedQuery);
     querySnapshot.forEach((doc) => {

      videoWheel.push(doc.data()); 

  });
     if (!querySnapshot.empty) {
      // Loop through the documents
      //

       const doc = querySnapshot.docs[JSON.parse(localStorage.getItem('key'))];
       

        videoData = doc.data();
        console.log("VIDEO FOUND", videoData);
        setVideoURL(videoData['videoUrl']);
        setVideoTitle(videoData['Title']);
        setUserName(videoData['username']);
        setDescription(videoData['description']);
        

      } else {
        console.log('No matching document found');
      } 

    }catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }

    };  

    useEffect(() => {
         
    
      getData(); 
    }, [] ); 


{/*

  */}

    return(
      <div>
        <HeaderTrainer/>
        <br></br>
        
      <div className="container">
     

      <div className="container d-flex">
  <div className="row">
    <div className="col-sm-8">
    <div className="video-container container-fluid">
          <div className="video-main">
           
           {loading ? (
             <p>Loading...</p>
          ) : (            
            <ReactPlayer url={videoURL} controls={true} style={{ width: '300px' }} />
          )}
         
            <p className="main-video-title ">
              
                {videoTitle}
            </p>

            <p className="main-video-user">
              <span>USER: </span>
                {userName}
            </p>
            
            <p className='main-video-description'>
            <span>DESCRIPTION: </span>
                {description}
            </p>
  
            <div className="comment-section">
              <Comments video_title={videoTitle}/>
          </div>
  
          </div>

        </div>


    </div>


    <div className="col-sm-4"> 
    
    <div className="container">

    <div className= "row" >
    
    <div className="container-fluid col-12 " style ={{backgroundColor: ""}}>
    
    
    <div className="PageLayout" style ={{backgroundColor: ""}}>
        
    <div id ="myCarousel2" className="carousel slide">  
        <div className="column-md-4">
        <h1 className="Heading1">
                RECOMMENDED
        </h1>
        
       
        <div style={{paddingLeft: "50px"}}>
        
        <div className="carousel-inner">
            <div className="carousel-item active"> 
            { 
            
            videoWheel.slice(0,4).map((video, index) => ( 
                
            <Link to={`../video/${encodeURIComponent(index)}
              `} onClick={()=> handleClick(index)}>
               
             <Card key = {index} title={video.Title} source= {video.videoUrl} User={video.username}/> 
            
            </Link>
    
    ))}
    
             </div>
    
        <div className="carousel-item"> 
        
        { videoWheel.slice(5,videoWheel.length).map((video, index) => (
            
            <Link to={`../video/${encodeURIComponent(index)}
            `} onClick={()=> handleClick(index)}>
             
               
             <Card key = {index} title={video.Title} source= {video.videoUrl} User={video.username}/> 
            
            </Link>
    

            ))}

        </div>

        </div>

            <button className="carousel-control-prev Button PageLayout" type="button" data-bs-target="#myCarousel2" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden"><KeyboardArrowLeft></KeyboardArrowLeft></span>    
       </button>
           
    
            <button className="carousel-control-next Button" type="button" data-bs-target="#myCarousel2" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden"><KeyboardDoubleArrowRight> </KeyboardDoubleArrowRight></span>
      </button>
            
        </div>
        
            
            </div>
            <div className="carousel-indicators">
            <button type="button" data-bs-target="#myCarousel2" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#myCarousel2" data-bs-slide-to="1" aria-label="Slide 2"></button>
            </div>
        </div>
        
      
    </div>
        
    
            
    </div>
           
         
    </div>
    
    
    </div></div>
  </div>
  
</div>
       
      </div>
      </div>
  );

  }

  export default Video;