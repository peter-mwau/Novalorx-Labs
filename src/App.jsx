// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BackgroundLayer from "./backgrounds/BackgroundLayer";
import "@fontsource/space-grotesk/700.css";

function App() {
  return (
    <>
      {/* mounted once, outside the router */}
      <BackgroundLayer />

      {/* app routes */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
