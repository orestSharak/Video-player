import React from "react";
import {Link} from "react-router-dom";
import './header.css'

const Header = ({initialStateList, showForm, toggleForm, toggleModal, setIsPlaylistDetailOpen, handlePlay, statePlayer}) => {
  return (
    <div className="header">
      <div className="header-wrapper">
        <Link to="/"><i className="bi bi-chevron-left back-btn"/></Link>
        <span>
          {initialStateList.length > 0 && (
            <i onClick={() => {
              if (statePlayer === 1) {
                handlePlay();
              }
              toggleModal();
              setIsPlaylistDetailOpen(true);
            }} className="bi bi-three-dots-vertical menu-btn"/>
          )}
          {!showForm && (
            <i onClick={toggleForm} className="bi bi-search search-btn"/>
          )}
        </span>
      </div>
    </div>
  )
};

export default React.memo(Header);