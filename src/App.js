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
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "./store/slices/productSlice";
import { fetchAllCategories } from "./store/slices/categorySlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts);
    dispatch(fetchAllCategories);
  }, []);

  const productsList = useSelector(
    (store) => store.products.productsFromServer
  );

  const categoriesList = useSelector(
    (store) => store.categories.categoriesFromServer
  );

  const [cart, setCart] = useState([]);

  const [display, setDisplay] = useState("none");

  const [fromVal, setFromVal] = useState("");
  const [toVal, setToVal] = useState("");
  const [isDiscounted, setIsDiscounted] = useState(false);

  const filteredProducts = productsList.filter((el) => {
    if (fromVal && toVal) {
      return el.price >= fromVal && el.price <= toVal;
    } else if (fromVal) {
      return el.price >= fromVal;
    } else if (toVal) {
      return el.price <= toVal;
    } else {
      return productsList;
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
              onlyDiscountedProducts={onlyDiscountedProducts}
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route path="/categories" element={<Categories />} />

        <Route
          path="/allproducts"
          element={
            <AllProducts
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

        {categoriesList.map((el) => (
          <Route
            key={el.id}
            path={`/categories/${el.id}`}
            element={
              <OneCategory
                productCategory={el.title}
                categoryId={el.id}
                cart={cart}
                setCart={setCart}
                compareByDateDescending={compareByDateDescending}
              />
            }
          />
        ))}

        {productsList &&
          categoriesList &&
          productsList.map((el) => (
            <Route
              key={el.id}
              path={`/products/${el.id}`}
              element={
                <OneProduct
                  productCategory={categoriesList[el.categoryId - 1].title}
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
