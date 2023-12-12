import { ForkLeft, Bookmark, Person } from "@mui/icons-material";
import React from "react";

function Card(props)

//Card component used to display video and user information
{
    return(
    <div   className="card p-2 shadow  bg-black" style={{border: "3px solid", margin: "10px", display: "inline-block", minWidth: "245px", userSelect: "none", fontFamily: "Franklin Gothic Medium"}
}>
     {/* The thumbnail is set by plugging a video link with no controls set*/}
    <video src= {props.source} className="card-img-top"   style={{ display: "inline-block", maxWidth: "245px"}}> </video>
    
    {/* Card body */}

        <div  className="card-body" style={{ color: "white"}}>
            <h2 className="card-title Heading2">
                {props.title}
                <div>
                </div>
                
            </h2>
            <div style={{marginLeft: "-10px"}}>
            <Person></Person>
            {props.User}
            </div>
            
        </div>
    </div>
    );
}

export default Card