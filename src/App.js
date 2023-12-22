import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import Footer from "./components/Footer/index";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/categories" element={<Categories />} />
      <Route path="/allproducts" element={<AllProducts />} />
      <Route path="/allsales" element={<AllSales />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
