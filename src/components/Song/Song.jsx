import React, {useRef} from 'react';
import './song.css'
import {Draggable} from "react-beautiful-dnd";

const Song = ({item, handlePlay, activeVideoId, statePlayer, toggleModal, index}) => {

  const kebabRef = useRef(null);

  const handleNameAndTitle = (str, select) => {
    if (str.includes('|')) {
      if (select === "name") {
        return str.split("|")[0];
      }
      if (select === "title") {
        return str.split("|")[1];
      }
    } else {
      if (select === "name") {
        return str.split("-")[0];
      }
      if (select === "title") {
        return str.split("-")[1];
      }
    }
  };

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="list-wrapper"
          onClick={(e) => {
            if (e.target !== kebabRef.current) handlePlay(item.id)
          }
          }
        >
          <div className="list-item row">
            <div className="thumb-wrapper col-2">
              {item.img && (<img
                className="thumb-img"
                alt={item.title}
                src={item.img}
              />)}
              {activeVideoId === item.id && statePlayer === 1 ? (
                <i className="bi bi-pause-fill thumb-icon"/>
              ) : (
                <i className="bi bi-play-fill thumb-icon"/>
              )
              }
            </div>
            <div className="col-8 title-wrapper">
              <span
                className={item.title ? 'song-title' : 'song-title error'}>{item.title ? handleNameAndTitle(item.title, "title") : 'Error'}</span>
              <span className='artist-name'>{item.title ? handleNameAndTitle(item.title, "name") : ''}</span>{" "}
            </div>
            <div className="col-2 kebab-section">
              <i className="bi bi-three-dots-vertical kebab pointer"
                 ref={kebabRef}
                 onClick={() => {
                   toggleModal(item.id);
                   if (statePlayer === 1) {
                     handlePlay();
                   }
                 }}
              />
            </div>
          </div>
        </li>
      )}
    </Draggable>
  )
};
export default React.memo(Song);
