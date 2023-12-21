import "./App.css";
import Header from "./components/Header";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Categories />} />
      <Route path="/" element={<AllProducts />} />
      <Route path="/" element={<AllSales />} />
    </Routes>
  );
}

export default App;
