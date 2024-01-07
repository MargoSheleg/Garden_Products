import Title from "../../components/Title/index";
import NavButtons from "../../components/NavButtons";
import styles from "./index.module.css";
import ProductsFilter from "../../components/ProductsFilter";
import ProductCard from "../../components/ProductCard";

function AllSales({
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
