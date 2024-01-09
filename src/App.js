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
      <Header cart={cart} />

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

        <Route
          path="/allsales"
          element={<AllSales productsFromServer={productsFromServer} />}
        />

        <Route
          path="/cart"
          element={<ShoppingCart cart={cart} setCart={setCart} />}
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
                  title={el.title}
                  productId={el.id}
                  image={el.image}
                  discountPrice={el.discont_price}
                  price={el.price}
                  description={el.description}
                  categoryId={el.categoryId}
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
