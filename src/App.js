import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import Footer from "./components/Footer/index";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";
import { useState, useEffect } from "react";
import AllProducts from "./pages/AllProducts";
import AllSales from "./pages/AllSales";
import OneProduct from "./pages/OneProduct";

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

  const [productsFromServer, setProductsFromServer] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/products/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProductsFromServer(data);
      })
      .catch((error) => {
        console.log("Fetch error", error);
      });
  }, []);

  const [categorie1, setCategorie1] = useState({});

  // useEffect(() => {
  //   fetch("http://localhost:3333/categories/1")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setCategorie1(data);
  //     })
  //     .catch((error) => {
  //       console.log("Fetch error", error);
  //     });
  // }, []);

  // console.log(categorie1);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              categoriesFromServer={categoriesFromServer}
              productsFromServer={productsFromServer}
            />
          }
        />
        <Route
          path="/categories"
          element={<Categories categoriesFromServer={categoriesFromServer} />}
        />
        <Route
          path="/allproducts"
          element={<AllProducts productsFromServer={productsFromServer} />}
        />
        <Route path="/allsales" element={<AllSales />} />

        {productsFromServer &&
          categoriesFromServer &&
          productsFromServer.map((el) => (
            <Route
              key={el.id}
              path={`/products/${el.id}`}
              element={
                <OneProduct
                  productCategory={
                    categoriesFromServer[el.categoryId - 1].title
                  }
                  title={el.title}
                  productId={el.id}
                  image={el.image}
                  discountPrice={el.discont_price}
                  price={el.price}
                  description={el.description}
                />
              }
            />
          ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
