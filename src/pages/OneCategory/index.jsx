import NavButtons from "../../components/NavButtons";
import NavButton from "../../components/NavButton";
import ProductCard from "../../components/ProductCard";
import ProductsFilter from "../../components/ProductsFilter";
import Title from "../../components/Title/index";
import { gray } from "../../utils/index";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../store/slices/productSlice";

function OneCategory({
  productCategory,
  categoryId,
  cart,
  setCart,
  compareByDateDescending,
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts);
  }, []);
  const productsList = useSelector(
    (store) => store.products.productsFromServer
  );

  const [oneCategoryFromServer, setOneCategoryFromServer] = useState([]);

  useEffect(() => {
    setOneCategoryFromServer(
      productsList.filter((el) => {
        return el.categoryId === categoryId;
      })
    );
  }, [productsList, categoryId]);

  const [fromVal, setFromVal] = useState("");
  const [toVal, setToVal] = useState("");
  const [isDiscounted, setIsDiscounted] = useState(false);

  const [showByDefault, setShowByDefault] = useState(true);
  const [showNewest, setShowNewest] = useState(false);
  const [showHighLow, setShowHighLow] = useState(false);
  const [showLowHigh, setShowLowHigh] = useState(false);

  const filteredProducts = oneCategoryFromServer.filter((el) => {
    if (fromVal && toVal) {
      return el.price >= fromVal && el.price <= toVal;
    } else if (fromVal) {
      return el.price >= fromVal;
    } else if (toVal) {
      return el.price <= toVal;
    } else {
      return oneCategoryFromServer;
    }
  });

  const onlyDiscountedProducts = filteredProducts.filter((el) => {
    return el.discont_price !== null;
  });

  return (
    <div className={styles.oneCategoryDiv}>
      <div className={styles.navigationBtn}>
        <NavButtons title={"Categories"} linkTo={"/categories"} color={gray} />
        <NavButton
          title={productCategory}
          color={gray}
          linkTo={`/categories/${categoryId}`}
        />
      </div>

      <Title title={productCategory} />

      <ProductsFilter
        isDiscounted={isDiscounted}
        setIsDiscounted={setIsDiscounted}
        fromVal={fromVal}
        setFromVal={setFromVal}
        toVal={toVal}
        setToVal={setToVal}
        displayCheckBox={"flex"}
        showByDefault={showByDefault}
        setShowByDefault={setShowByDefault}
        showNewest={showNewest}
        setShowNewest={setShowNewest}
        showHighLow={showHighLow}
        setShowHighLow={setShowHighLow}
        showLowHigh={showLowHigh}
        setShowLowHigh={setShowLowHigh}
      />

      <div className={styles.oneCategoryProductsBlock}>
        {isDiscounted
          ? (showByDefault &&
              onlyDiscountedProducts.map((el) => (
                <ProductCard el={el} cart={cart} setCart={setCart} />
              ))) ||
            (showNewest &&
              onlyDiscountedProducts
                .sort(compareByDateDescending)
                .map((el) => (
                  <ProductCard el={el} cart={cart} setCart={setCart} />
                ))) ||
            (showHighLow &&
              onlyDiscountedProducts
                .sort(function (a, b) {
                  if (a.discont_price === null && b.discont_price === null) {
                    return b.price - a.price;
                  } else if (
                    a.discont_price !== null &&
                    b.discont_price === null
                  ) {
                    return b.price - a.discont_price;
                  } else if (
                    a.discont_price === null &&
                    b.discont_price !== null
                  ) {
                    return b.discont_price - a.price;
                  } else if (
                    a.discont_price !== null &&
                    b.discont_price !== null
                  ) {
                    return b.discont_price - a.discont_price;
                  }
                })
                .map((el) => (
                  <ProductCard el={el} cart={cart} setCart={setCart} />
                ))) ||
            (showLowHigh &&
              onlyDiscountedProducts
                .sort(function (a, b) {
                  if (a.discont_price === null && b.discont_price === null) {
                    return a.price - b.price;
                  } else if (
                    a.discont_price !== null &&
                    b.discont_price === null
                  ) {
                    return a.discont_price - b.price;
                  } else if (
                    a.discont_price === null &&
                    b.discont_price !== null
                  ) {
                    return a.price - b.discont_price;
                  } else if (
                    a.discont_price !== null &&
                    b.discont_price !== null
                  ) {
                    return a.discont_price - b.discont_price;
                  }
                })
                .map((el) => (
                  <ProductCard el={el} cart={cart} setCart={setCart} />
                )))
          : (showByDefault &&
              filteredProducts.map((el) => (
                <ProductCard el={el} cart={cart} setCart={setCart} />
              ))) ||
            (showNewest &&
              filteredProducts
                .sort(compareByDateDescending)
                .map((el) => (
                  <ProductCard el={el} cart={cart} setCart={setCart} />
                ))) ||
            (showHighLow &&
              filteredProducts
                .sort(function (a, b) {
                  if (a.discont_price === null && b.discont_price === null) {
                    return b.price - a.price;
                  } else if (
                    a.discont_price !== null &&
                    b.discont_price === null
                  ) {
                    return b.price - a.discont_price;
                  } else if (
                    a.discont_price === null &&
                    b.discont_price !== null
                  ) {
                    return b.discont_price - a.price;
                  } else if (
                    a.discont_price !== null &&
                    b.discont_price !== null
                  ) {
                    return b.discont_price - a.discont_price;
                  }
                })
                .map((el) => (
                  <ProductCard el={el} cart={cart} setCart={setCart} />
                ))) ||
            (showLowHigh &&
              filteredProducts
                .sort(function (a, b) {
                  if (a.discont_price === null && b.discont_price === null) {
                    return a.price - b.price;
                  } else if (
                    a.discont_price !== null &&
                    b.discont_price === null
                  ) {
                    return a.discont_price - b.price;
                  } else if (
                    a.discont_price === null &&
                    b.discont_price !== null
                  ) {
                    return a.price - b.discont_price;
                  } else if (
                    a.discont_price !== null &&
                    b.discont_price !== null
                  ) {
                    return a.discont_price - b.discont_price;
                  }
                })
                .map((el) => (
                  <ProductCard el={el} cart={cart} setCart={setCart} />
                )))}
      </div>
    </div>
  );
}

export default OneCategory;
