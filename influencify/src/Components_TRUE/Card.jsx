import { ForkLeft, Bookmark } from "@mui/icons-material";
import React from "react";

function Card(props)


{
    return(
    <div   className="card p-2 shadow  bg-black" style={{border: "3px solid", margin: "10px", display: "inline-block", minWidth: "245px", userSelect: "none", fontFamily: "Franklin Gothic Medium"}
}>
    <video src= {props.source} className="card-img-top"   style={{ display: "inline-block", maxWidth: "245px"}}>        
        </video>
        
        <div  className="card-body" style={{ color: "white"}}>
            <h2 className="card-title Heading2">
                {props.title}
                <div >
                </div>
                <a><Bookmark></Bookmark></a>
               
                
            </h2>
            {props.User}
        </div>
    </div>
    );
}

export default Card