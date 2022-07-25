import { HashtagIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { setChannelInfo, selectChannelId } from "../features/channelSlice";
import { useNavigate } from "react-router-dom";
 import { db } from "../firebase";
import { useEffect } from "react";
 
import React from "react";
 
import { setServerInfo, selectServerId } from "../features/serverSlice";
 
 

import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useState } from "react";
 

function Channel({ id, channelName }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const channelId = useSelector(selectChannelId);
  const serverId = useSelector(selectServerId);
  const [channels, setChannels] = useState();

  useEffect(() => {
    if (serverId) {
      onSnapshot(
        collection(db, "servers", serverId, "channels"),
        // orderBy("timeStamp", "desc"),
        (snapshot) => {
          setChannels(snapshot.docs);

          dispatch(
            setChannelInfo({
              channelId: snapshot?.docs[0]?.id,
              channelName: snapshot?.docs[0]?.data().channelName,
            })
          );

          navigate(`/channels/${serverId}/${snapshot.docs[0].id}`);
        }
      );
    }
  }, [channelId]);
  console.log('sdsd')

  const setChannel = () => {
    dispatch(
      setChannelInfo({
        channelId : id|null,
        channelName : channelName
      })
    )
  
    navigate(`/channels/${serverId}/${id}`)
  }

  return (
    <div
      className={`font-medium flex items-center cursor-pointer ${
        id === channelId && "bg-discord_channelHoverBg text-white"
      }
     hover:bg-discord_channelHoverBg p-1 rounded-md hover:text-white`}
      onClick={setChannel}
    >
      <HashtagIcon className="h-5 mr-2" />
      {channelName}
    </div>
  );
}

export default Channel;
