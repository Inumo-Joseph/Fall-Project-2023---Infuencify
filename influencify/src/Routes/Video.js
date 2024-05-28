import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import HeaderTrainer from '../Components_TRUE/Header-Trainer.jsx'
import {useParams, useNavigate} from "react-router-dom";
import { doc, collection, getDoc, getDocs, where, query, limit} from "firebase/firestore";
import { db, storage} from "../Config/firebase-config.js";
import Card from '../Components_TRUE/Card.jsx';
import {Link } from 'react-router-dom';
import { KeyboardArrowLeft,ArrowCircleLeft, ArrowCircleRight, KeyboardDoubleArrowRight, AccountCircle} from '@mui/icons-material';
import Comments from './Comments.js';
import Footer from "../Components_TRUE/Footer.jsx"


function Video() {

  //This sets an up the variablee that will display the various user information
  const navigate=useNavigate() // will helpus navigate to the new link once a video has been clicked
  const [userName,setUserName]= useState('');
  const [videoURL, setVideoURL] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoWheel, setVideoWheel] =useState([]);
  const [commentname, setCommentName] = useState('');
  const {videoId} = useParams();//This takes the index from the Url and stores it
  var videoData; // a mutable videoData variable that is an object where all of the field will be stored. Title User Url etc
  var vidIndex=(videoId); // the index from the URL
  var videoArray =[];

  const checkComments = async(comments) =>{
    setCommentName('');
    setTimeout(()=>{
      setCommentName(comments);
    }, 100);
  }

  const hideComments = async() =>{
    setCommentName('');
  }

 //Function that takes us to another page
  const handleClick = (index) =>
  {
    navigate(`../video/${(index)}`); 
  }

  //grabs the videos to display and for the video WHeel
const getData = async  ()  => {

    try{  
      
     const collectionRef = collection(db, 'videos');
     const query = where('videoUrl', '==', true); //sets up a query variable that Looks through all the videos basically
     const limitedQuery = limit(query, 1); //this sets up the query to return just one doc at a time
     console.log(limitedQuery)

     const querySnapshot = await getDocs(collectionRef, limitedQuery);// the Doc is fetched from the firestore and placed nto this array
    
      const fetchedVideos = [];// Each doc is placed into this array
      querySnapshot.forEach((doc) => {
        fetchedVideos.push(doc.data());
      });
   
        

 
       setVideoWheel(fetchedVideos); // Update the state here

   if (!querySnapshot.empty) {
      // Loop through the documents if it isnt empty
      //

       const doc = querySnapshot.docs[vidIndex]; //The doc is fetched from  the Query snapshot by vidindex
      
        videoData = doc.data();//this videData object is set to the doc that was fetched
        
        //All of the vide information is fetched from the object and set to variables
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
      }

    };  

    useEffect(() => {
      getData(); //called within useffect 
      

    }, [videoId] );// the videoId is the name the Path uses in our App.js when we navigate to another page 
// makes so that the page refreshes and properly navigates to the next video clicked


    return(
      <div className=""> 
        <HeaderTrainer/>
        <br></br>
       
       {/*
Container that holds the video
  */}
      <div className="container d-flex ">
  <div className="row">
    <div className="col-sm-8">
    <div className="video-container container-fluid">
          <div className="col">
           {/*
               The video is played using the videoURL variable that was set earlier
  */}
                      
            <ReactPlayer url={videoURL} controls={true}  />
          
             {/*The various information is displayed from our set variables */}
            <p className="main-video-title Heading1 ">
                {videoTitle}
            </p>

            <p className="main-video-user Heading2">
              <AccountCircle></AccountCircle>
              {userName}
                
            </p>
            
            <p className='main-video-description '>
            <span>DESCRIPTION: </span>
                {description}
            </p>
  
            <div className="comment-section">
              <button onClick={()=> checkComments(videoTitle)}>See Comments</button>
              <button onClick={()=> hideComments()}> Hide Comments </button>
            {commentname ? (
                        <Comments video_title={commentname}/>
                    ) : (<div></div>)}
          </div>
  
          </div>

        </div>


    </div>

   {/* This is goning to be the vertical video wheel in the page*/}
    <div className="col-sm-4"> 
    
    <div className="container">

    <div className= "row" >
    
    <div className="container-fluid col-12 ">
    
    
    <div className="container" >
        
    <div id ="myCarousel2" className="carousel slide">  
        <div className="column-lg-3">
        <h1 className="Heading1">
                RECOMMENDED
        </h1>
         
       
        <div style={{paddingLeft: "45px"}}>
        
        <div className="carousel-inner">
            <div className="carousel-item active"> 
            { 
             /* The first 4 indexes are taken and displayed*/
            videoWheel.slice(0,3).map((video, index) => ( 
                
            <Link onClick={()=> handleClick(index)} to={`../video/${(index)}`} >
             <Card key = {index} title={video.Title} source= {video.videoUrl} User={video.username}/>        
            </Link>
    
    ))}
    
             </div>             
    
        <div className="carousel-item"> 
        {console.log("videoWheel length", videoWheel.length)}
        {   
         /*Then the rest of the videos are displayed offsetting the index as the slice function starts the index back at 0 */
                videoWheel.slice(4,(videoWheel.length)).map((video, index) => ( 
                <Link onClick={()=> handleClick(index+4)} to={`../video/${(index+4)}`} >
                 <Card key = {index+4} title={video.Title} source= {video.videoUrl} User={video.username}/>        
                </Link>

  ))}


        </div>

        </div>

            <button className="carousel-control-prev Button" type="button" data-bs-target="#myCarousel2" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden"><KeyboardArrowLeft></KeyboardArrowLeft></span>    
       </button>
           
    
        <button className="carousel-control-next Button" type="button" data-bs-target="#myCarousel2" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden"><KeyboardDoubleArrowRight> </KeyboardDoubleArrowRight></span>
      </button>
            
        </div>
        
            
            </div>
            
        </div>
        
      
    </div>
        
    
            
    </div>
           
         
    </div>
    
    
    </div>
    </div>
  </div>
  
</div>
       
      <Footer></Footer>
      </div>
  );

  }

  export default Video;