import Title from "../../components/Title/index";
import NavButtons from "../../components/NavButtons";
import styles from "./index.module.css";
import ProductsFilter from "../../components/ProductsFilter";
import ProductCard from "../../components/ProductCard";
import { useState } from "react";

function AllSales({ productsFromServer }) {
  const [fromVal, setFromVal] = useState("");
  const [toVal, setToVal] = useState("");
  const [isDiscounted, setIsDiscounted] = useState(false);

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
      />

      <div className={styles.allSalesBlock}>
        {onlyDiscountedProducts.map((el) => (
          <ProductCard key={el.id} el={el} />
        ))}
      </div>
    </div>
  );
}

export default AllSales;
