import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setServerInfo, selectServerId } from '../features/serverSlice';
import { useNavigate } from "react-router-dom";

function ServerIcon({ server, id }) {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const serverId= useSelector(selectServerId)

  

  const setServers = () => {
    dispatch(
      setServerInfo({
        serverId : id,
        serverName : server?.serverName
  })
    )
  
    navigate(`/channels/${id }`)
  }

  // ${id === serverId && 'bg-discord_purple'}

  return (
    <div
      className={`cursor-pointer rounded-full transition-all ease-out hover:rounded-2xl flex
    items-center justify-center bg-[#36393f] w-12 h-12 ${id === serverId && 'bg-discord_purple rounded-2xl'}`}
      onClick={setServers}
    >
      <p className="text-white font-semibold"> {server?.serverName?.charAt(0).toUpperCase()} </p>
    </div>
  );
}

export default ServerIcon;
