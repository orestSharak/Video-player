import React, {useEffect, useRef, useState} from "react";
import {useParams} from 'react-router-dom';
import YouTube from "react-youtube";
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import '../../variable.css'
import './player.css'
import Form from "../Form/Form";
import List from "../List/List";
import Modal from "../Modal/Modal";
import Cover from "../Cover/Cover"
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import Header from "../Header/Header";
import defaultThumb from '../../img/logo-black-freeky.png'
import {defaultPlaylists} from "../Page/Page";


const Player = () => {
  const {playlistId} = useParams();


  const initialStateList = JSON.parse(localStorage.getItem("playlist"));

  const filteredInitialStateList = initialStateList.length > 0 ? initialStateList.filter(item => parseInt(item.id) === parseInt(playlistId)) : defaultPlaylists.filter(item => parseInt(item.id) === parseInt(playlistId));
  const initialObject = initialStateList.length > 0 ? filteredInitialStateList[0] : defaultPlaylists[0];
  const initialPlaylist = initialObject.list;
  const playlistTitle = initialObject.title;


  const [player, setPlayer] = useState(null);
  const [statePlayer, setStatePlayer] = useState(null);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(null);

  const [list, setList] = useState(initialPlaylist);
  const [urls, setUrls] = useState(initialPlaylist.map((item) => item.id));
  const [draggedList, setDraggedList] = useState({items: list});

  const [isOnList, setIsOnList] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [info, setInfo] = useState(false);
  const [isPlaylistDetailOpen, setIsPlaylistDetailOpen] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (initialStateList.length > 0 || list.length > 1) {
      // eslint-disable-next-line
      const {id, img: playerImg, list: playerList, title} = filteredInitialStateList[0];
      // full size thumb
      const img = list.length > 0 ? list[0].img.split('hqdefault').join('mqdefault') : defaultThumb;
      const newObj = {id, img, list, title};

      const index = initialStateList.length > 0 ? initialStateList.findIndex(item => parseInt(item.id) === parseInt(playlistId)) : defaultPlaylists.findIndex(item => parseInt(item.id) === parseInt(playlistId))
      initialStateList[index] = newObj;
      localStorage.setItem("playlist", JSON.stringify(initialStateList));
    }
  }, [list, playlistId, initialStateList, filteredInitialStateList]);


  useEffect(() => {
    if (activeVideoId) {
      setBackgroundImageUrl(list.filter(item => item.id === activeVideoId)[0].img);
    }
  }, [activeVideoId, list]);

  useEffect(() => {
    setList(draggedList.items);
  }, [draggedList]);

  useEffect(() => {
    setDraggedList({items: list});
    setUrls(list.map((item) => item.id));
  }, [list]);


  const onStateChange = (e) => {
    setStatePlayer(e.data);
    setActiveVideoId(e.target.getVideoData().video_id);
  };

  const onReady = (e) => {
    setPlayer(e.target);
  };


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const inputUrlFormatter = () => {
        if (inputRef.current.value.includes("watch?")) {
          const preValue = inputRef.current.value.trim().split("?v=");
          return preValue[1].split("&")[0];
        } else if (inputRef.current.value.includes("live")) {
          const preValue = inputRef.current.value.trim().split("live/");
          const secondPreValue = preValue[1].split("?");
          return secondPreValue[0];
        } else {
          const preValue = inputRef.current.value.trim().split("/");
          return preValue[3];
        }
      };

      const videoId = inputUrlFormatter();

      const response = await fetch(
        `https://noembed.com/embed?dataType=json&url=https://www.youtube.com/watch?v=${videoId}`
      );
      const data = await response.json();
      const title = await data.title;
      const thumb = await data.thumbnail_url;
      const fullSieThumb = thumb.split('hqdefault').join('mqdefault');
      const validUrlRegex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;

      const isDublicate = list.some((item) => item.id === videoId);
      const isValid = validUrlRegex.test(inputRef.current.value);

      if (!isDublicate && isValid && videoId && title && thumb) {
        setList([
          ...list,
          {
            id: videoId,
            title: title,
            img: fullSieThumb
          }
        ]);

        setUrls(list.map((item) => item.id));

        setInfo(true);
        setShowForm(false);

        setTimeout(() => setInfo(false), 2000);

        if (player) {
          player.playVideo();
          player.pauseVideo();
        }
      } else if (!isValid) {
        setIsValidUrl(true);
        setTimeout(() => {
          setIsValidUrl(false);
        }, 2000);
      } else if (isError) {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 2000);
      } else {
        setIsOnList(true);
        setTimeout(() => {
          setIsOnList(false);
        }, 2000);
      }
    } catch (e) {
      console.log("custom fetch error: ", e);
    } finally {
      setInputValue('');
      inputRef.current.blur();
    }
  };

  const handleDeleteListItem = (id) => {
    const filteredList = list.filter((item) => item.id !== id);
    setList(filteredList);
    setUrls(filteredList.map((item) => item.id));
  };

  const handleDeletePlaylist = () => {
    const filteredPlayList = initialStateList.filter((item) => parseInt(item.id) !== parseInt(playlistId));
    localStorage.setItem("playlist", JSON.stringify(filteredPlayList));
  };

  const handlePlay = (id) => {

    if (isShuffle) {
      setIsShuffle(false);
      handleShufflePlay();
    }

    if (statePlayer === 2) {
      player.playVideo();
      player.unMute();
    }
    if (statePlayer === 1) {
      player.pauseVideo();
    }

    const indexOfActiveSong = list.map(item => item.id).indexOf(id);
    setUrls(list.slice(indexOfActiveSong).map(item => item.id));
  };

  const handleShufflePlay = () => {
    if (player) {
      setUrls(list.map((item) => item.id));


      player.setShuffle(true);
      player.setLoop(true);
      player.playVideoAt(0);

      player.playVideo();
      player.unMute();
    }

    if (isShuffle) {
      setIsShuffle(false);
      if (player) {
        player.setShuffle(false);
        player.setLoop(false);
      }
    }
  };

  const toggleModal = (id) => {
    if (showModal) {
      setShowModal(false);
      setActiveVideoId(null)
    } else {
      setShowModal(true);
      if (id) setActiveVideoId(id);
    }
  };

  const toggleForm = () => {
    if (showForm) {
      setShowForm(false)
    } else {
      setShowForm(true);
      player && player.pauseVideo();
    }
  };


  const reorder = (items, startIndex, endIndex) => {
    const result = Array.from(items);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const items = reorder(
      draggedList.items,
      result.source.index,
      result.destination.index
    );

    setDraggedList({items});
    setList(draggedList.items);
  }

  return (
    <>
      <Header toggleForm={toggleForm} showForm={showForm} toggleModal={toggleModal} handlePlay={handlePlay}
              setIsPlaylistDetailOpen={setIsPlaylistDetailOpen} initialStateList={initialStateList}
              statePlayer={statePlayer}/>
      <Cover backgroundImageUrl={backgroundImageUrl}/>
      <Form showForm={showForm} toggleForm={toggleForm} inputValue={inputValue} setInputValue={setInputValue}
            inputRef={inputRef} isOnList={isOnList}
            isError={isError}
            isValidUrl={isValidUrl} handleSubmit={handleSubmit}/>
      {list.length > 0 ? (
        <div className="iframe-wrapper" ref={iframeRef}>
          <YouTube
            id="player"
            iframeClassName="rounded-frame"
            onReady={onReady}
            onStateChange={onStateChange}
            opts={{
              playerVars: {
                autoplay: 1,
                mute: 1,
                playlist: urls.map((item) => item).join(","),
                rel: 0,
                controls: 1,
                modestbranding: 1,
              }
            }}
          />
        </div>
      ) : null}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="playlist">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <List player={player} playListTitle={playlistTitle} iframeRef={iframeRef} toggleModal={toggleModal}
                    handleDeleteListItem={handleDeleteListItem}
                    handlePlay={handlePlay}
                    activeVideoId={activeVideoId}
                    list={list} statePlayer={statePlayer}
                    isShuffle={isShuffle}
                    setIsShuffle={setIsShuffle}
                    handleShufflePlay={handleShufflePlay}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Modal info={info} activeVideoId={activeVideoId} toggleModal={toggleModal} showModal={showModal}
             handleDeleteListItem={handleDeleteListItem} isPlaylistDetailOpen={isPlaylistDetailOpen}
             setIsPlaylistDetailOpen={setIsPlaylistDetailOpen} handleDeletePlaylist={handleDeletePlaylist}/>
    </>
  );

};
export default Player;