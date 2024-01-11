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
import OneCategory from "./pages/OneCategory/index";
import ShoppingCart from "./pages/ShoppingCart";
import CartZero from "./pages/CartZero/index";

function App() {
  const [categoriesFromServer, setCategoriesFromServer] = useState([]);

  const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   if (cart.length !== 0) {
  //     setCart((prevCart) => {
  //       prevCart.map((obj) => {
  //         obj.quantity = 1;
  //       });
  //     });
  //   }
  // }, [cart]);

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
            />
          }
        />

        <Route
          path="/allsales"
          element={<AllSales productsFromServer={productsFromServer} />}
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
