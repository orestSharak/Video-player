import React from "react";
import './cover.css'

const Cover = ({backgroundImageUrl}) => {
  return (
    backgroundImageUrl && <div className="cover-wrapper"><img alt="cover" className='cover' src={backgroundImageUrl}/></div>
  )
};

export default Cover;