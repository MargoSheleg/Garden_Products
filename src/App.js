import Header from "./components/Header";
import Home from "./pages/Home/index";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";
import AllProducts from "./pages/AllProducts";
import AllSales from "./pages/AllSales";
import OneProduct from "./pages/OneProduct";
import OneCategory from "./pages/OneCategory/index";
import ShoppingCart from "./pages/ShoppingCart";
import CartZero from "./pages/CartZero/index";
import Footer from "./components/Footer/index";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [categoriesFromServer, setCategoriesFromServer] = useState([]);

  const [cart, setCart] = useState([]);

  const [display, setDisplay] = useState("none");

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

  const [fromVal, setFromVal] = useState("");
  const [toVal, setToVal] = useState("");
  const [isDiscounted, setIsDiscounted] = useState(false);

  const filteredProducts = productsFromServer.filter((el) => {
    if (fromVal && toVal) {
      return el.price >= fromVal && el.price <= toVal;
    } else if (fromVal) {
      return el.price >= fromVal;
    } else if (toVal) {
      return el.price <= toVal;
    } else {
      return productsFromServer;
    }
  });

  const onlyDiscountedProducts = filteredProducts.filter((el) => {
    return el.discont_price !== null;
  });

  function compareByDateDescending(a, b) {
    const dateA = Date.parse(a.createdAt);
    const dateB = Date.parse(b.createdAt);

    return dateB - dateA;
  }

  return (
    <>
      <Header cart={cart} display={display} setDisplay={setDisplay} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              categoriesFromServer={categoriesFromServer}
              productsFromServer={productsFromServer}
              onlyDiscountedProducts={onlyDiscountedProducts}
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/categories"
          element={<Categories categoriesFromServer={categoriesFromServer} />}
        />

        <Route
          path="/allproducts"
          element={
            <AllProducts
              productsFromServer={productsFromServer}
              cart={cart}
              setCart={setCart}
              compareByDateDescending={compareByDateDescending}
            />
          }
        />

        <Route
          path="/allsales"
          element={
            <AllSales
              productsFromServer={productsFromServer}
              cart={cart}
              setCart={setCart}
              compareByDateDescending={compareByDateDescending}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <ShoppingCart
              cart={cart}
              setCart={setCart}
              display={display}
              setDisplay={setDisplay}
            />
          }
        />

        <Route path="/cartZero" element={<CartZero />} />

        {categoriesFromServer.map((el) => (
          <Route
            path={`/categories/${el.id}`}
            element={
              <OneCategory
                productsFromServer={productsFromServer}
                productCategory={el.title}
                categoryId={el.id}
                cart={cart}
                setCart={setCart}
                compareByDateDescending={compareByDateDescending}
              />
            }
          />
        ))}

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
                  el={el}
                  cart={cart}
                  setCart={setCart}
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
