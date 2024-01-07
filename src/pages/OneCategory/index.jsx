import NavButtons from "../../components/NavButtons";
import NavButton from "../../components/NavButton";
import styles from "./index.module.css";
import { gray, black } from "../../utils/index";
import ProductCard from "../../components/ProductCard";
import ProductsFilter from "../../components/ProductsFilter";
import Title from "../../components/Title/index";
import { useEffect, useState } from "react";

function OneCategory({ productsFromServer, productCategory, categoryId }) {
  const [oneCategoryFromServer, setOneCategoryFromServer] = useState([]);

  useEffect(() => {
    setOneCategoryFromServer(
      productsFromServer.filter((el) => {
        return el.categoryId === categoryId;
      })
    );
  }, [productsFromServer, categoryId]);

  const [fromVal, setFromVal] = useState("");
  const [toVal, setToVal] = useState("");
  const [isDiscounted, setIsDiscounted] = useState(false);

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
      />

      <div className={styles.oneCategoryProductsBlock}>
        {isDiscounted
          ? onlyDiscountedProducts.map((el) => (
              <ProductCard key={el.id} el={el} />
            ))
          : filteredProducts.map((el) => <ProductCard key={el.id} el={el} />)}
      </div>
    </div>
  );
}

export default OneCategory;
