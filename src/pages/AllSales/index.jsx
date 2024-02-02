import Title from "../../components/Title/index";
import NavButtons from "../../components/NavButtons";
import ProductsFilter from "../../components/ProductsFilter";
import ProductCard from "../../components/ProductCard";
import { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../store/slices/productSlice";

function AllSales({ compareByDateDescending }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  const productsList = useSelector(
    (state) => state.products.productsFromServer
  );

  const [fromVal, setFromVal] = useState("");
  const [toVal, setToVal] = useState("");
  const [isDiscounted, setIsDiscounted] = useState(false);

  const [showByDefault, setShowByDefault] = useState(true);
  const [showNewest, setShowNewest] = useState(false);
  const [showHighLow, setShowHighLow] = useState(false);
  const [showLowHigh, setShowLowHigh] = useState(false);

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
          onlyDiscountedProducts.map((el) => <ProductCard el={el} />)) ||
          (showNewest &&
            onlyDiscountedProducts
              .sort(compareByDateDescending)
              .map((el) => <ProductCard el={el} />)) ||
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
              .map((el) => <ProductCard el={el} />)) ||
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
              .map((el) => <ProductCard el={el} />))}
      </div>
    </div>
  );
}

export default AllSales;
