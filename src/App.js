import React from "react";
import { Routes, Route } from "react-router-dom"
import Player from "./components/Player/Player";
import "./App.css";
import Page from "./components/Page/Page";

export default function App() {
  return (
    <div className="custom-container">
      <Routes>
        <Route path="/player/:playlistId" element={<Player/>}/>
        <Route path="/" element={<Page/>}/>
      </Routes>
    </div>
  )
}