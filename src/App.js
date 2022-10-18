import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import News from "./components/News";
import Meals from "./components/Meals";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<News />}></Route>
          <Route path="/meals" element={<Meals />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
