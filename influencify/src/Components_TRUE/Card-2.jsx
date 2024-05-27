import React from 'react';
import { useState, useEffect } from 'react';
import './index.css';
import Card from './Card';
import {getStorage, getDownloadURL, ref, listAll} from 'firebase/storage';
import { KeyboardArrowLeft,KeyboardArrowRight, KeyboardDoubleArrowRight, TimeToLeave} from '@mui/icons-material';
import { doc, setDoc, collection, getDocs} from "firebase/firestore";
import { db, storage} from "../Config/firebase-config.js";
import { getAuth, onStateChanged} from "firebase/auth";
import {Link } from 'react-router-dom';
import { ForkLeft, Bookmark } from "@mui/icons-material";



function Card2(props)
  
    
    {
        return(
        <div className="card p-2 shadow  bg-black" style={{border: "3px solid", margin: "10px", display: "inline-block", minWidth: "200px", userSelect: "none", fontFamily: "sans-serif", fontSize: "12px"}
    }>
        <video src= {props.source} className="card-img-top"   style={{ display: "inline-block", maxWidth: "200px", fontSize: "15px"}}>        
            </video>
            
            <div className="card-body" style={{ color: "white"}}>
                <h2 className="card-title Heading2">
                    {props.title}
                    <div>
                    </div>
                    <a><Bookmark></Bookmark></a>
                   
                    
                </h2>
                {props.User}
            </div>
        </div>
        );



}

export default Card2