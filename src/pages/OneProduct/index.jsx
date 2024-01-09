import styles from "./index.module.css";
import NavButtons from "../../components/NavButtons";
import NavButton from "../../components/NavButton";
import { gray, black, green, white } from "../../utils/index";
import { useEffect, useState } from "react";

function OneProduct({
  productCategory,
  title,
  productId,
  image,
  discountPrice,
  price,
  description,
  categoryId,

  cart,
  addToCart,
}) {
  const [quantity, setQuantity] = useState(0);

  function minus() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  function plus() {
    setQuantity(quantity + 1);
  }

  const [backGroundColor, setBackGroundColor] = useState(green);

  const [border, addBorder] = useState("none");
  const [btnTextColor, changeBtnTextColor] = useState(white);

  const [addToCartBtn, setAddToCartBtn] = useState("Add to cart");

  function onMouseEnterLeave(color) {
    if (addToCartBtn === "Add to cart") {
      setBackGroundColor(color);
    }
  }

  function onClickFunc(bgColor, color) {
    if (addToCartBtn === "Add to cart") {
      addBorder("2px solid #8b8b8b");
      setBackGroundColor(bgColor);
      changeBtnTextColor(color);
      setAddToCartBtn("Added");
      setQuantity(quantity + 1);
    }
  }

  return (
    <div className={styles.oneProduct}>
      <div className={styles.navButtonsDiv}>
        <NavButtons title={"Categories"} linkTo={"/categories"} color={gray} />
        <NavButton
          title={productCategory}
          color={gray}
          linkTo={`/categories/${categoryId}`}
        />
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
              <p className={styles.discountPrice}>${price}</p>
            )}
            {discountPrice !== null && (
              <div className={styles.priceBox}>
                {(((price - discountPrice) * 100) / price).toFixed(0) + "%"}
              </div>
            )}
          </div>
          <div className={styles.buttonsOfProduct}>
            <div className={styles.quantityButtonDiv}>
              <button className={styles.minusBtn} onClick={minus}>
                -
              </button>
              <p className={styles.quantity}>{quantity}</p>
              <button className={styles.plusBtn} onClick={plus}>
                +
              </button>
            </div>
            <button
              className={styles.addToCartBtn}
              onMouseEnter={() => onMouseEnterLeave(black)}
              onMouseLeave={() => onMouseEnterLeave(green)}
              onClick={() => onClickFunc(white, black)}
              style={{
                backgroundColor: backGroundColor,
                color: btnTextColor,
                border: border,
              }}
            >
              {addToCartBtn}
            </button>
          </div>

          <div>
            <p className={styles.descriptionP}>Description</p>
            <div className={styles.description}>{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneProduct;
