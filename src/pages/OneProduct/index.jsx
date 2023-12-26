import styles from "./index.module.css";
import NavButtons from "../../components/NavButtons";
import NavButton from "../../components/NavButton";
import { gray, black } from "../../utils/index";

function OneProduct({
  productCategory,
  title,
  productId,
  image,
  discountPrice,
  price,
}) {
  return (
    <div className={styles.oneProduct}>
      <div className={styles.navButtonsDiv}>
        <NavButtons title={"Categories"} linkTo={"/categories"} color={gray} />
        <NavButton title={productCategory} color={gray} linkTo={"/"} />
        <NavButton
          title={title}
          color={black}
          linkTo={`/products/${productId}`}
        />
      </div>

      <div className={styles.oneProductDiv}>
        <img
          className={styles.oneProductImg}
          src={"http://localhost:3333" + image}
          alt={title}
        />
        <div className={styles.descriptionOfTheProductDiv}>
          <h2 className={styles.titleOfTheProduct}>{title}</h2>
          <div className={styles.divOfAllPrices}>
            {discountPrice !== null ? (
              <div className={styles.blockOfPrices}>
                <p className={styles.discountPrice}>${discountPrice}</p>
                <p className={styles.discountedPrice}>${price}</p>
              </div>
            ) : (
              <p className={styles.price}>${price}</p>
            )}
            {discountPrice !== null && (
              <div className={styles.priceBox}>
                {(((price - discountPrice) * 100) / price).toFixed(0) + "%"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneProduct;
