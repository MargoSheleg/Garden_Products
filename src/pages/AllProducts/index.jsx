import NavButtons from "../../components/NavButtons/index";
import Error from "../../components/Error";
import Title from "../../components/Title/index";
import ProducstFilter from "../../components/ProductsFilter";
import ProductCard from "../../components/ProductCard";
import { useState, useEffect } from "react";
import { black } from "../../utils/index";
import styles from "./index.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../../store/slices/productSlice";
import Loading from "../../components/Loading";

function AllProducts({ compareByDateDescending }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  const productsList = useSelector(
    (store) => store.products.productsFromServer
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
      return true;
    }
  });

  const onlyDiscountedProducts = filteredProducts.filter((el) => {
    return el.discont_price !== null;
  });

  const statusOfProduct = useSelector((store) => store.products.status);
  console.log(statusOfProduct);
  return (
    <div className={styles.allProductsPage}>
      <NavButtons
        title={"All products"}
        linkTo={"/allproducts"}
        color={black}
      />
      <Title title={"All products"} />

      <ProducstFilter
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

      <div className={styles.productsBlock}>
        {statusOfProduct === "fulfilled" &&
          (isDiscounted
            ? (showByDefault &&
                onlyDiscountedProducts.map((el) => (
                  <ProductCard key={el.id} el={el} />
                ))) ||
              (showNewest &&
                onlyDiscountedProducts
                  .sort(compareByDateDescending)
                  .map((el) => <ProductCard key={el.id} el={el} />)) ||
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
                  .map((el) => <ProductCard key={el.id} el={el} />)) ||
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
                  .map((el) => <ProductCard key={el.id} el={el} />))
            : (showByDefault &&
                filteredProducts.map((el) => (
                  <ProductCard key={el.id} el={el} />
                ))) ||
              (showNewest &&
                filteredProducts
                  .sort(compareByDateDescending)
                  .map((el) => <ProductCard key={el.id} el={el} />)) ||
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
                  .map((el) => <ProductCard key={el.id} el={el} />)) ||
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
                  .map((el) => <ProductCard key={el.id} el={el} />)))}
        {statusOfProduct === "pending" && <Loading />}
        {statusOfProduct === "rejected" && <Error />}
      </div>
    </div>
  );
}

export default AllProducts;
