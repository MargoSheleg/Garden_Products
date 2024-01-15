import Title from "../../components/Title/index";
import NavButtons from "../../components/NavButtons";
import ProductsFilter from "../../components/ProductsFilter";
import ProductCard from "../../components/ProductCard";
import { useState } from "react";
import styles from "./index.module.css";

function AllSales({
  productsFromServer,
  cart,
  setCart,
  compareByDateDescending,
}) {
  const [fromVal, setFromVal] = useState("");
  const [toVal, setToVal] = useState("");
  const [isDiscounted, setIsDiscounted] = useState(false);

  const [showByDefault, setShowByDefault] = useState(true);
  const [showNewest, setShowNewest] = useState(false);
  const [showHighLow, setShowHighLow] = useState(false);
  const [showLowHigh, setShowLowHigh] = useState(false);

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
    <div className={styles.allSales}>
      <NavButtons title={"All sales"} linkTo={"/allsales"} />
      <Title title={"Discounted items"} />
      <ProductsFilter
        isDiscounted={isDiscounted}
        setIsDiscounted={setIsDiscounted}
        fromVal={fromVal}
        setFromVal={setFromVal}
        toVal={toVal}
        setToVal={setToVal}
        displayCheckBox={"none"}
        showByDefault={showByDefault}
        setShowByDefault={setShowByDefault}
        showNewest={showNewest}
        setShowNewest={setShowNewest}
        showHighLow={showHighLow}
        setShowHighLow={setShowHighLow}
        showLowHigh={showLowHigh}
        setShowLowHigh={setShowLowHigh}
      />

      <div className={styles.allSalesBlock}>
        {(showByDefault &&
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
              )))}
      </div>
    </div>
  );
}

export default AllSales;
