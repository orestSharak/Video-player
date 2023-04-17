import React, {useEffect, useRef, useState} from "react";
import './page.css';
import {Link} from "react-router-dom";
import image from '../../img/logo-transparent.png'
import defaultImage from '../../img/logo-round.png'

import CreatePlaylist from "../CreatePlaylist/CreatePlaylist";

export const defaultPlaylists = [
  {
    id: 1,
    img: 'https://i.ytimg.com/vi/4DSrRGNyse8/maxresdefault.jpg',
    list: [
      {id: "4DSrRGNyse8", img: "https://i.ytimg.com/vi/4DSrRGNyse8/maxresdefault.jpg", title: "Orest - Sunny day"}],
    title: 'Default playlist'
  },
];

const Page = () => {

  const initalStateList = JSON.parse(localStorage.getItem("playlist")) || [];

  const [playlist, setPlaylist] = useState(initalStateList);
  const [showTitle, setShowTitle] = useState(false);
  const [titleValue, setTitleValue] = useState('');

  const createTitleRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("playlist", JSON.stringify(playlist));
  }, [playlist]);

  const toggleTitle = () => {
    if (showTitle) {
      setShowTitle(false);
    } else {
      setShowTitle(true);
    }
  };

  const createPlaylist = (e) => {
    e.preventDefault();

    setPlaylist(prev => [...prev, {
      id: Date.now(),
      title: `${titleValue}`,
      img: `${defaultImage}`,
      list: [],
    }]);

    setShowTitle(false);
  };

  return (
    <>
      <div className="page-header">
        <img src={image} alt="logo" className="logo"/>
      </div>
      <div className="play-list-section">
        <i className="bi bi-collection-play-fill play-list-icons play-list-icon-list"/>
        <span className="play-list-title">Your playlists</span>
        {playlist.length > 2 && <i className="bi bi-chevron-right play-list-icons play-list-icon-chevron"/>}</div>
      <ul className="play-list-container">
        {playlist.length > 0 ?
        playlist.map(item =>
          (
            <Link key={item.id} to={`/player/${item.id}`} className="text-decoration-disabled">
              <li className="play-list-item">
                <img src={item.img} alt={item.title} className="play-item-img"/>
                <span className="play-item-title">{item.title}</span>
              </li>
            </Link>
          )) : (
            defaultPlaylists.map(item =>
              (
                <Link key={item.id} to={`/player/${item.id}`} className="text-decoration-disabled">
                  <li className="play-list-item">
                    <img src={item.img} alt={item.title} className="play-item-img"/>
                    <span className="play-item-title">{item.title}</span>
                  </li>
                </Link>
              ))
          )}
        }
        <li className="play-list-item" onClick={() => setShowTitle(true)}>
        <span className="plus-icon-wrapper">
        <i className="bi bi-plus play-list-icon-plus"/>
        </span>
          <span className="play-item-title">Create playlist</span>
        </li>
      </ul>
      <CreatePlaylist createTitleRef={createTitleRef} showCreatePlaylist={showTitle} toggleCreatePlaylist={toggleTitle}
                      titleValue={titleValue} setTitleValue={setTitleValue} createPlaylist={createPlaylist}/>
    </>
  )
};

export default React.memo(Page);