import React, { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, query, serverTimestamp, where, orderBy } from "firebase/firestore";
import { auth, db } from "../Config/firebase-config";

function DataAnalytics() {
    const apikey = 'AIzaSyCjBuaqJCR1Lc0BGX5lZZjfBgKIehkXwI0';
    const channelstatsRef = collection(db, "channel-stats");
    const [channelStats, setChannelStats] = useState([]); 

    useEffect(() =>{
        const queryChannel = query(channelstatsRef, where("user", "==", auth.currentUser.displayName), orderBy("timestamp", "desc"));
        const viewStats = onSnapshot(queryChannel, (snapshot) => {
            let alldata = [];
            snapshot.forEach((doc) =>{
                alldata.push({...doc.data(), id: doc.id});
            });
            setChannelStats(alldata);
        });

        return () => viewStats();
    }, []);

    const channel = async () => {
        const channelID = document.querySelector("#channelID").value;
        const part = 'snippet,contentDetails,statistics';

        let url = 'https://www.googleapis.com/youtube/v3/channels';
        url += `?part=${encodeURIComponent(part)}`;
        url += `&id=${encodeURIComponent(channelID)}`;
        url += `&key=${encodeURIComponent(apikey)}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            const channel = data.items[0];

            // Update state instead of manipulating DOM directly
            setChannelName(channel.snippet.title);
            setChannelSubscribers(channel.statistics.subscriberCount);
            setChannelVideos(channel.statistics.videoCount);
            setChannelViews(channel.statistics.viewCount);

            // Assuming channelstatsRef is your Firestore reference
            await addDoc(channelstatsRef, {
                name: channel.snippet.title,
                subscribers: channel.statistics.subscriberCount,
                timestamp: serverTimestamp(),
                user: auth.currentUser.displayName,
                videos: channel.statistics.videoCount,
                views: channel.statistics.viewCount
            });
        } catch (error) {
            console.error('Error fetching channel data:', error);
        }
    }

    // State variables to hold channel data
    const [channelName, setChannelName] = useState("");
    const [channelSubscribers, setChannelSubscribers] = useState("");
    const [channelVideos, setChannelVideos] = useState("");
    const [channelViews, setChannelViews] = useState("");

    return (
        <div>
            Channel ID: <input type="text" id="channelID" /> <br />
            <button type="button" onClick={channel}>Add Statistics</button>
            <p />

            <div className="data-container">
                <h2>Statistics Newest To Oldest</h2>
                {channelStats.map((stat) => (
                    <div key={stat.id}>
                        <h2>Timestamp: {stat.timestamp?.toDate().toString()}</h2>
                        <h3>Channel Name: {stat.name}</h3>
                        <h3>Number of Subscribers: {stat.subscribers}</h3>
                        <h3>Number of Videos: {stat.videos}</h3>
                        <h3>Number of Views: {stat.views}</h3>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default DataAnalytics;
