import Main from "./main/main";
import { Route, Routes } from 'react-router-dom'
import Face from "./main/face";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/face" element={<Face />} />
    </Routes>
  );
}

export default App;
