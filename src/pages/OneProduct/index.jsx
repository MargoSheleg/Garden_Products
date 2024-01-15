import NavButtons from "../../components/NavButtons";
import NavButton from "../../components/NavButton";
import PlusMinusBtn from "../../components/PlusMinusBtn";
import { gray, black, green, white } from "../../utils/index";
import { useState } from "react";
import styles from "./index.module.css";

function OneProduct({
  productCategory,
  el,

  cart,
  setCart,
}) {
  const [quantity, setQuantity] = useState(0);

  function minus() {
    if (quantity > 0) {
      if (quantity === 1) {
        addBorder("none");
        setBackGroundColor(green);
        changeBtnTextColor(white);
        setAddToCartBtn("Add to cart");

        if (cart.length > 1) {
          setCart((prevCart) => {
            prevCart.filter((obj) => {
              return obj !== el;
            });
          });
        } else {
          setCart([]);
        }
      }
      setQuantity(quantity - 1);
    }
  }

  function plus() {
    setQuantity(quantity + 1);
    onClickFunc(white, black, "Added");
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

  function onClickFunc(bgColor, color, text) {
    if (addToCartBtn === "Add to cart") {
      addBorder("2px solid #8b8b8b");
      setBackGroundColor(bgColor);
      changeBtnTextColor(color);
      setAddToCartBtn(text);
      setQuantity(quantity + 1);
      if (!cart.includes(el)) {
        setCart((prevCart) => [...prevCart, el]);
      }
    }
  }

  return (
    <div className={styles.oneProduct}>
      <div className={styles.navButtonsDiv}>
        <NavButtons title={"Categories"} linkTo={"/categories"} color={gray} />
        <NavButton
          title={productCategory}
          color={gray}
          linkTo={`/categories/${el.categoryId}`}
        />
        <NavButton
          title={el.title}
          color={black}
          linkTo={`/products/${el.id}`}
        />
      </div>

      <div className={styles.oneProductDiv}>
        <img
          className={styles.oneProductImg}
          src={"http://localhost:3333" + el.image}
          alt={el.title}
        />
        <div className={styles.descriptionOfTheProductDiv}>
          <h2 className={styles.titleOfTheProduct}>{el.title}</h2>
          <div className={styles.divOfAllPrices}>
            {el.discont_price !== null ? (
              <div className={styles.blockOfPrices}>
                <p className={styles.discountPrice}>${el.discont_price}</p>
                <p className={styles.discountedPrice}>${el.price}</p>
              </div>
            ) : (
              <p className={styles.discountPrice}>${el.price}</p>
            )}
            {el.discont_price !== null && (
              <div className={styles.priceBox}>
                {(((el.price - el.discont_price) * 100) / el.price).toFixed(0) +
                  "%"}
              </div>
            )}
          </div>
          <div className={styles.buttonsOfProduct}>
            <PlusMinusBtn plus={plus} minus={minus} quantity={quantity} />
            <button
              className={styles.addToCartBtn}
              onMouseEnter={() => onMouseEnterLeave(black)}
              onMouseLeave={() => onMouseEnterLeave(green)}
              onClick={() => onClickFunc(white, black, "Added")}
              style={{
                backgroundColor: backGroundColor,
                color: btnTextColor,
                border: border,
              }}
            >
              {addToCartBtn}
            </button>
          </div>

          <p className={styles.descriptionP}>Description</p>
          <div className={styles.description}>{el.description}</div>
        </div>
      </div>
    </div>
  );
}

export default OneProduct;
