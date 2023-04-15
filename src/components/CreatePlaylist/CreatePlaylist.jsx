import React, {useEffect} from "react";
import './createPlaylist.css'

const CreatePlaylist = ({showCreatePlaylist, toggleCreatePlaylist, createTitleRef, titleValue, setTitleValue, createPlaylist}) => {


    useEffect(() => {
        if (showCreatePlaylist) {
          createTitleRef.current.focus();
        } else {
          setTitleValue('');
        }
      }, [showCreatePlaylist, createTitleRef, setTitleValue]
    );

    const handleKeyPress = (e) => {
      if (titleValue.length >= 35) {
        e.preventDefault();
      }
    };

    const changeTitle = () => {
      setTitleValue(createTitleRef.current.value);
    };


    return (
      <>
        <div className={showCreatePlaylist ? "create-playlist-mask show-create-playlist-mask" : "create-playlist-mask"}
             onClick={() => toggleCreatePlaylist()}/>
        <div
          className={showCreatePlaylist ? "create-playlist-modal show-create-playlist-modal" : "create-playlist-modal"}>
          <div className="create-playlist-modal-body">
            <div className="create-playlist-modal-item">
              <form onSubmit={(e) => createPlaylist(e)}>
                <label className="create-playlist-input-label" htmlFor="create-playlist">Add a name for a playlist</label>
                <input className="create-playlist-input" id="create-playlist" placeholder="Name"
                       ref={createTitleRef} onChange={changeTitle} value={titleValue} onKeyPress={handleKeyPress}
                       type="text" autoComplete="off" required/>
                <span className="name-length-section">{titleValue.length}/35</span>
                <input className={titleValue.length === 0 ? "submit-button disabled" : "submit-button"} type="submit"
                       value="Create" disabled={titleValue.length === 0 && "disabled"}/>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }
;

export default CreatePlaylist;