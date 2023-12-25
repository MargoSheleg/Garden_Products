import styles from "./index.module.css";
import NavButtons from "../../components/NavButtons/index";

function AllProducts() {
  return (
    <div className={styles.allProductsPage}>
      <NavButtons title={"All products"} />
      <div className={styles.allProductsPageTitle}>
        <h2 className={styles.pageAllProdH2}>All products</h2>
      </div>

      <div className={styles.filter}></div>

      <div></div>
    </div>
  );
}

export default AllProducts;
