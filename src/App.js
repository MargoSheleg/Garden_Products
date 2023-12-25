import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import Footer from "./components/Footer/index";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";
import { useState, useEffect } from "react";
import AllProducts from "./pages/AllProducts";

function App() {
  const [categoriesFromServer, setCategoriesFromServer] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/categories/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCategoriesFromServer(data);
      })
      .catch((error) => {
        console.log("Fetch error", error);
      });
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home categoriesFromServer={categoriesFromServer} />}
        />
        <Route
          path="/categories"
          element={<Categories categoriesFromServer={categoriesFromServer} />}
        />
        <Route path="/allproducts" element={<AllProducts />} />

        {/* <Route path="/allsales" element={<AllSales />} /> */}

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
