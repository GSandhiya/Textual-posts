// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Posts from "./Pages/Posts";
import SavedPosts from "./Pages/savedPosts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/savedPosts" element={<SavedPosts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
