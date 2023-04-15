import Song from "../Song/Song";
import React, {useEffect, useState} from "react";
import './list.css'


const List = ({isShuffle, setIsShuffle, handleShufflePlay, iframeRef, list, handlePlay, activeVideoId, statePlayer, playListTitle, handleDeleteListItem, toggleModal}) => {
  const [iframeHeight, setIframeHeight] = useState(null);

  useEffect(() => {
    function updateHeight() {
      if (iframeRef.current) {
        setIframeHeight(iframeRef.current.clientHeight);
      }
    }

    window.addEventListener('resize', updateHeight);
    updateHeight();

    return () => window.removeEventListener('resize', updateHeight);
  }, [iframeRef, iframeHeight]);

  return (
    // 120px padding with form height + 51 is counter section
    <>
      <div className="counter-container row">
        <span className="counter col-2"><i className="bi bi-music-note-list icon"/>{list.length} songs</span>
        <span className="play-list-name col-8">{playListTitle}</span>
        {list.length > 0 && <span className="play-list-name col-2 text-end"><i
          onClick={() => {
            setIsShuffle(true);
            handleShufflePlay();
          }}
          className={isShuffle ? "bi bi-shuffle shuffle-icon shuffle" : "bi bi-shuffle shuffle-icon"}/></span>
        }
      </div>
      <ul className='list-container' style={{height: `calc(100vh - ${iframeHeight && iframeHeight + 171}px )`}}>
        {list.map((item, index) => (
          <Song index={index} key={item.id} toggleModal={toggleModal} item={item} handlePlay={handlePlay}
                activeVideoId={activeVideoId} statePlayer={statePlayer} handleDeleteListItem={handleDeleteListItem}/>
        ))}
      </ul>
    </>
  )
};

export default React.memo(List);