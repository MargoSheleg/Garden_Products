import NavButtons from "../../components/NavButtons";
import NavButton from "../../components/NavButton";
import ProductCard from "../../components/ProductCard";
import ProductsFilter from "../../components/ProductsFilter";
import Title from "../../components/Title/index";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import {
  makeOnlyDiscountedProductsArray,
  filterProductsByFromvalToval,
} from "../../helpers";
import { gray } from "../../utils/index";
import styles from "./index.module.css";
import { useSelector } from "react-redux";

function OneCategory({ productCategory, categoryId, compareByDateDescending }) {
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

  const statusOfCategories = useSelector((store) => store.categories.status);

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

      <ProductsFilter displayCheckBox={"flex"} />

      <div className={styles.oneCategoryProductsBlock}>
        {statusOfCategories === "fulfilled" &&
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
        {statusOfCategories === "pending" && <Loading />}
        {statusOfCategories === "rejected" && <Error />}
      </div>
    </div>
  );
}

export default OneCategory;
