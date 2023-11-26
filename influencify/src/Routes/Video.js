import React, { useState } from 'react';
import myVideo from "./mp4ex.mp4"
import ReactPlayer from 'react-player';
import HeaderTrainer from '../components/Header-Trainer';
import './Video.css'
function Video() {

  const [comment, setComment] = useState('Comment Something');
  
  const handleInputChange = (event) => {
    setComment(event.target.value);
  };
  
    return(
      <div>
        <HeaderTrainer/>
        <div className="video-container">
          <div className="video-main">
            {/* <video controls>
                <source src="./mp4ex.mp4" type='video/mp4' autoplay>
                
                </source>
            </video> */}
            <ReactPlayer url={myVideo} controls={true}/>
            <p className="main-video-title">
                Video Title
            </p>
            <p className='main-video-description'>
                Video description Video description Video description Video description Video description Video description
                Video description Video description Video description Video description Video description Video description 
                Video description Video description Video description Video description Video description Video description 
                Video description Video description Video description Video description Video description Video description
                Video description Video description Video description Video description Video description Video description
                Video description Video description Video description Video description Video description Video description
            </p>
  
            <div className="comment-section">
              <p className="comment-title">
                Comments
              </p>
              <form>
                <div className='comment-input'>
                <textarea className='comment-form' type="text" value={comment} onChange={handleInputChange}>
                </textarea>
                <button className='comment-button'> Submit Comment</button>
                </div>
                
              </form>
          </div>
  
          </div>
          <div className='video-suggestions'>
              <div className="video-1">
                <img className="suggested-vid-thumbnail" src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww&w=1000&q=80" alt="1"></img>
                  <p className='suggested-vid-title'>
                      Video Title
                  </p>
              </div> 
  
              <div className="video-2">
                  <img className="suggested-vid-thumbnail" src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww&w=1000&q=80" alt="2"></img>
                  <p className='suggested-vid-title'>
                      Video Title 2
                  </p>
              </div>
  
              <div className="video-3">
                  <img className="suggested-vid-thumbnail" src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww&w=1000&q=80" alt="3"></img>
                  <p className='suggested-vid-title'>
                      Video Title 3
                  </p>
              </div>
          </div>
        </div>
      </div>
  );
  }

  export default Video;