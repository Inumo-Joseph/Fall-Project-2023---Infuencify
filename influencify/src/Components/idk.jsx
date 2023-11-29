import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'

//Taking changeColor as a parameter here. 'changeColor' is coming from the app.js file. Remember that 'changeColor' is a function that is equivalent to 'changeBackgroundColor' function.
function UserSettings({changeColor, backgroundColor})
{
    //API:
    // const [Streams, setStreams]=useState([]);
    // const [loading, setLoading]=useState(true);
    // const clientId='uvoeqxy1lyclvoqqdvyfji8qc9xtxz';
    // const clientSecret='sx759owhratib6n8y0pprzydwv4e42';
    // const oauthTokenUrl='https://id.twitch.tv/oauth2/token?client_id=uvoeqxy1lyclvoqqdvyfji8qc9xtxz&client_secret=sx759owhratib6n8y0pprzydwv4e42&grant_type=client_credentials';
    // const apiEndpoint='';
    // useEffect(() => {
    //     // Request an OAuth token
    //     axios.post(oauthTokenUrl)
    //       .then((response) => {
    //         const token = response.data.access_token;
            
    //         // Make a request to the Twitch API with the token
    //         axios.get(apiEndpoint, {
    //           headers: {
    //             'Client-ID': clientId,
    //             'Authorization': `Bearer ${token}`,
    //           },
    //         })
    //         .then((response) => {
    //           setStreams(response.data.data);
    //           setLoading(false);
    //         })
    //         .catch((error) => {
    //           console.error('Error fetching Twitch data:', error);
    //           setLoading(false);
    //         });
    //       })
    //       .catch((error) => {
    //         console.error('Error getting OAuth token:', error);
    //         setLoading(false);
    //       });
    //   }, []);
    
      
    

    
    // const [color, setColor]=useState("white");
    //Function below runs when the buttons below are clicked. The parameter 'newColor' will take in a value of a color that is passed from the onClick event with the buttons below.
    //When 'colorChange' runs, the function 'changeColor' will kind of make a call back to the 'changeBackgroundColor' function with the value of 'newColor'.
    // const colorChange = (newColor)=>{
    //        changeColor(newColor);
    //       console.log("The value of colorChange is"+ newColor);
    // }-- took out function as it was not needed
    // const colorChange=(color)=>{
    //   setColor(color);
    // }
    // useEffect(()=>{
    //   document.body.style.backgroundColor=color;},[color])
    
    //useEffect used to change the background Color of the page that its in.
    useEffect(() => {
     console.log(typeof(changeColor));
        document.body.style.backgroundColor = backgroundColor;
        console.log("Test1:" + document.body.style.backgroundColor);
      }, [changeColor]);
    
    return(
        <div>
            <div className='changeSettings'>
                <h1>Change Settings</h1>
                {/* onClick events cause 'colorChange' functions to run with a specified color. */}

                <button onClick={()=> changeColor("yellow")}> Background Color- Yellow</button>
                <button onClick={()=> changeColor("white")}> Background Color- White</button>
                <button onClick={()=> changeColor("blue")}> Background Color- Blue</button>
            </div>
            
        </div>
    )
}
export default UserSettings






    