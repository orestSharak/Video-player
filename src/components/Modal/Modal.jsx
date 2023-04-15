import React, {useEffect, useRef, useState} from "react";
import './modal.css'
import {useNavigate, useParams} from "react-router-dom";
import {defaultPlaylists} from "../Page/Page";


const Modal = ({handleDeleteListItem, handleDeletePlaylist, showModal, toggleModal, activeVideoId, info, isPlaylistDetailOpen, setIsPlaylistDetailOpen}) => {
  const navigate = useNavigate();
  const {playlistId} = useParams();

  const initialPlaylist = JSON.parse(localStorage.getItem("playlist"));
  const filteredList = initialPlaylist.filter((item) => item.id === parseInt(playlistId));
  const getTitle = initialPlaylist.length > 0 ? filteredList[0].title : defaultPlaylists[0].title;

  const [showName, seShowName] = useState(false);
  const [titleValue, setTitleValue] = useState(`${getTitle}`);

  const editTitleRef = useRef(null);

  useEffect(() => {
      if (showName) {
        editTitleRef.current.focus();
      } else {
      }
      setTitleValue(`${getTitle}`)
    }, [showName, getTitle]
  );

  const handleKeyPress = (e) => {
    if (titleValue.length >= 35) {
      e.preventDefault();
    }
  };

  const changeTitle = () => {
    setTitleValue(editTitleRef.current.value);
  };

  const toggleEdit = () => {
    if (showName) {
      seShowName(false);
    } else {
      seShowName(true);
    }
  };

  const editPlaylistName = (e) => {
    e.preventDefault();
    const filteredInitialStateList = initialPlaylist.length > 0 && initialPlaylist.filter(item => parseInt(item.id) === parseInt(playlistId));
    // eslint-disable-next-line
    const {id, img, list, title: playlistTitle} = filteredInitialStateList[0];
    const title = titleValue;
    const newObj = {id, img, list, title};
    const newListToLocalStorage = [newObj, ...initialPlaylist.filter(item => parseInt(item.id) !== parseInt(playlistId))];
    localStorage.setItem("playlist", JSON.stringify(newListToLocalStorage));
    toggleEdit();
    toggleModal();
  };

  return (
    info ? (
      <div className={info ? "modal info show-modal show-info" : "modal info"}>
        <div className="modal-body info-body">
          <span>Song has been added</span>
        </div>
      </div>
    ) : (
      <>
        <div className={showModal ? "mask show-mask" : "mask"} onClick={() => {
          setIsPlaylistDetailOpen(false);
          toggleModal();
          if (showName) {
            toggleEdit();
          }
        }}/>
        <div className={showModal ? `modal show-modal ${showName && 'edit'} ` : "modal"}>
          <div className="modal-body">
            <div className="modal-item" onClick={() => {
              toggleModal();
              if (isPlaylistDetailOpen) {
                handleDeletePlaylist();
                navigate('/')
              } else if (activeVideoId) handleDeleteListItem(activeVideoId);
            }}>
              <i className="bi bi-trash3 me-4"/>
              <span>{isPlaylistDetailOpen ? "Delete playlist" : "Delete song from the playlist"}</span>
            </div>
            {isPlaylistDetailOpen && initialPlaylist.length > 0 && (
              <>
                <div className="modal-item" onClick={() => {
                  toggleEdit();
                }}>
                  <i className="bi bi-pencil-square me-4"/>
                  <span>Edit name</span>
                </div>
                {showName && (
                  <form className="edit-name-form" onSubmit={(e) => editPlaylistName(e)}>
                    <input className="create-playlist-input" id="create-playlist" placeholder="Name"
                           ref={editTitleRef} onChange={changeTitle} value={titleValue} onKeyPress={handleKeyPress}
                           type="text" autoComplete="off" required/>
                    <span className="name-length-section">{titleValue.length}/35</span>
                    <input className={titleValue.length === 0 ? "submit-button disabled" : "submit-button"}
                           type="submit" value="Save" disabled={titleValue.length === 0 && "disabled"}/>
                  </form>
                )
                }
              </>
            )}
          </div>
        </div>
      </>
    )

  )
};

export default Modal;