import Main from "./main/main";
import { Route, Routes } from 'react-router-dom'
import Face from "./main/face";
import Test from "./main/test";

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/face" element={<Face />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
