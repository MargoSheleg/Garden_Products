import styles from "./index.module.css";
import NavButtons from "../../components/NavButtons/index";
import Title from "../../components/Title/index";
import { Link } from "react-router-dom";

function AllProducts({ productsFromServer }) {
  console.log(productsFromServer);
  return (
    <div className={styles.allProductsPage}>
      <NavButtons title={"All products"} linkTo={"/allproducts"} />
      <Title title={"All products"} />

      <div className={styles.filterProducts}></div>

      <div className={styles.productsBlock}>
        {productsFromServer &&
          productsFromServer.map((el) => (
            <Link
              className={styles.allProductsLink}
              to={`/products/${el.id}`}
              key={el.id}
            >
              <div className={styles.allProductsBlockDiv}>
                {el.discont_price !== null && (
                  <div className={styles.priceBox}></div>
                )}
                <img
                  className={styles.allProductsBlockImg}
                  src={"http://localhost:3333" + el.image}
                  alt={el.title}
                />
                <p className={styles.allProductsBlockP}>{el.title}</p>
                {el.discont_price !== null ? (
                  <>
                    <p className={styles.discountPrice}>${el.discount_price}</p>
                    <p className={styles.price}>${el.price}</p>
                  </>
                ) : (
                  <p className={styles.price}>${el.discountPrice}</p>
                )}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default AllProducts;
