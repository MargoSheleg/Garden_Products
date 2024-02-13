import NavButtons from "../../components/NavButtons/index";
import Error from "../../components/Error";
import Title from "../../components/Title/index";
import ProducstFilter from "../../components/ProductsFilter";
import ProductCard from "../../components/ProductCard";
import {
  makeOnlyDiscountedProductsArray,
  filterProductsByFromvalToval,
} from "../../helpers";
import { black } from "../../utils/index";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";

function AllProducts() {
  const statusOfProduct = useSelector((store) => store.products.status);
  const productsList = useSelector(
    (store) => store.products.productsFromServer
  );

  const fromVal = useSelector((store) => store.filter.fromVal);
  const toVal = useSelector((store) => store.filter.toVal);
  const isDiscounted = useSelector((store) => store.filter.isDiscounted);
  const showByDefault = useSelector((store) => store.filter.showByDefault);
  const showHighLow = useSelector((store) => store.filter.showHighLow);
  const showLowHigh = useSelector((store) => store.filter.showLowHigh);

  const filteredProducts = filterProductsByFromvalToval(
    productsList,
    fromVal,
    toVal
  );
  const onlyDiscountedProducts =
    makeOnlyDiscountedProductsArray(filteredProducts);

  return (
    <div className={styles.allProductsPage}>
      <NavButtons
        title={"All products"}
        linkTo={"/allproducts"}
        color={black}
      />
      <Title title={"All products"} />

      <ProducstFilter displayCheckBox={"flex"} />

      <div className={styles.productsBlock}>
        {statusOfProduct === "fulfilled" &&
          (isDiscounted
            ? (showByDefault &&
                onlyDiscountedProducts.map((el) => (
                  <ProductCard key={el.id} el={el} />
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
