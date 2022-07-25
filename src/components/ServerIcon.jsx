import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setServerInfo, selectServerId } from "../features/serverSlice";
import { useNavigate } from "react-router-dom";
import { auth, db, app } from "../firebase";
import { selectChannelId, setChannelInfo } from "../features/channelSlice";

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

function ServerIcon({ server, id }) {
  const [channels, setChannels] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const serverId = useSelector(selectServerId);
  const channelId = useSelector(selectChannelId);

  const setServers = () => {
    dispatch(
      setServerInfo({
        serverId: id,
        serverName: server?.serverName,
      })
    );

    onSnapshot(
      collection(db, "servers", id, "channels"),
      orderBy("timestamp", "desc"),
      (snapshot) => {
        setChannels(snapshot);
        dispatch(
          setChannelInfo({
            channelId: channels?.docs[0]?.id,
            channelName: channels?.docs[0]?.data().channelName,
          })
        );

        navigate(`/channels/${id}/${channels?.docs[0]?.id}`);
      }
    );
  };
  return (
    <div
      className={`cursor-pointer rounded-full transition-all ease-out hover:rounded-2xl flex
    items-center justify-center bg-[#36393f] p-7 w-7 h-7 ${
      id === serverId && "bg-discord_purple rounded-2xl"
    }`}
      onClick={setServers}
    >
      <p className="text-white font-semibold">
        {" "}
        {server?.serverName?.charAt(0).toUpperCase()}{" "}
      </p>
    </div>
  );
}

export default ServerIcon;
