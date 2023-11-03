import React from "react";

function Card(props)
{
    return(
    <div className="card p4 shadow" style={{border: "3px solid", margin: "10px", display: "inline-block", width: "258px", userSelect: "none" }}>
        <video controls style={{width: "255px", height: "150px"}} >
            <source src={props.source} type="video/mp4"></source>
        </video>

        <div className="card-body">
            <h2 className="card-title Heading2">
                VIDEO TITLE: {props.title}
                <div >
                <button className="bg-primary" style={{margin: "5px"}}> CHANNEL</button>
                <button className="bg-success"> LIKE</button>

                </div>
                
               
            </h2>
        </div>
    </div>
    );
}

export default Card