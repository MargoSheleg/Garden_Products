import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import Footer from "./components/Footer/index";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />

        {/* <Route path="/allproducts" element={<AllProducts />} />
      <Route path="/allsales" element={<AllSales />} /> */}

        {/* {for(let i = 1; i < ){

      }
      } */}

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
