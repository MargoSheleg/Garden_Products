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
import {
  getCartFromLocalStorage,
  saveCartAtLocalStorage,
  addQuantityKeyToCart,
} from "./store/slices/cartSlice";
import { getOnlyDiscountedProducts } from "./store/slices/productSlice";

function App() {
  let cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const productsList = useSelector(
    (store) => store.products.productsFromServer
  );

  const categoriesList = useSelector(
    (store) => store.categories.categoriesFromServer
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategories());
    dispatch(getOnlyDiscountedProducts());
    if (
      !localStorage.getItem("cart") !== null &&
      !localStorage.getItem("cart") !== undefined
    ) {
      dispatch(getCartFromLocalStorage());
    }
  }, []);

  useEffect(() => {
    // if (!cart.some((item) => "quantity" in item)) {
    //   dispatch(addQuantityKeyToCart());
    // }
    dispatch(saveCartAtLocalStorage());
  }, [cart]);

  const [display, setDisplay] = useState("none");

  return (
    <>
      <Header display={display} setDisplay={setDisplay} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/categories" element={<Categories />} />

        <Route path="/allproducts" element={<AllProducts />} />

        <Route path="/allsales" element={<AllSales />} />

        <Route
          path="/cart"
          element={<ShoppingCart setDisplay={setDisplay} />}
        />

        <Route path="/cartZero" element={<CartZero />} />

        {categoriesList &&
          categoriesList.map((el) => (
            <Route
              key={el.id}
              path={`/categories/${el.id}`}
              element={
                <OneCategory productCategory={el.title} categoryId={el.id} />
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
                  productCategory={categoriesList[el.categoryId - 1]?.title}
                  el={el}
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
