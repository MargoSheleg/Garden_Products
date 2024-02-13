import Title from "../../components/Title/index";
import NavButtons from "../../components/NavButtons";
import ProductsFilter from "../../components/ProductsFilter";
import ProductCard from "../../components/ProductCard";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import {
  makeOnlyDiscountedProductsArray,
  filterProductsByFromvalToval,
} from "../../helpers";
import styles from "./index.module.css";
import { useSelector } from "react-redux";

function AllSales() {
  const statusOfProducts = useSelector((store) => store.products.status);
  const productsList = useSelector(
    (state) => state.products.productsFromServer
  );

  const fromVal = useSelector((store) => store.filter.fromVal);
  const toVal = useSelector((store) => store.filter.toVal);
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
    <div className={styles.allSales}>
      <NavButtons title={"All sales"} linkTo={"/allsales"} />
      <Title title={"Discounted items"} />
      <ProductsFilter displayCheckBox={"none"} />

      <div className={styles.allSalesBlock}>
        {(statusOfProducts === "fulfilled" &&
          showByDefault &&
          onlyDiscountedProducts.map((el) => <ProductCard el={el} />)) ||
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
        {statusOfProducts === "pending" && <Loading />}
        {statusOfProducts === "rejected" && <Error />}
      </div>
    </div>
  );
}

export default AllSales;
