import styles from "./index.module.css";
import NavButtons from "../../components/NavButtons/index";
import Title from "../../components/Title/index";
import { black, green, white } from "../../utils/index";
import ProductCard from "../../components/ProductCard";
import { useState } from "react";
import ProducstFilter from "../../components/ProductsFilter";

function AllProducts({
  productsFromServer,
  fromVal,
  setFromVal,
  toVal,
  setToVal,
  isDiscounted,
  setIsDiscounted,
  filteredProducts,
  onlyDiscountedProducts,
}) {
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
      />

      <div className={styles.productsBlock}>
        {isDiscounted
          ? onlyDiscountedProducts.map((el) => (
              <ProductCard key={el.id} el={el} />
            ))
          : filteredProducts.map((el) => <ProductCard key={el.id} el={el} />)}
      </div>
    </div>
  );
}

export default AllProducts;
