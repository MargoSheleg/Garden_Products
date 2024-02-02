import NavButtons from "../../components/NavButtons";
import NavButton from "../../components/NavButton";
import PlusMinusBtn from "../../components/PlusMinusBtn";
import { gray, black, green, white } from "../../utils/index";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  pushToCart,
  makeCartEmpty,
  removeFromCart,
} from "../../store/slices/cartSlice";

function OneProduct({ productCategory, el }) {
  let cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(0);

  function minus() {
    if (quantity > 0) {
      if (quantity === 1) {
        addBorder("none");
        setBackGroundColor(green);
        changeBtnTextColor(white);
        setAddToCartBtn("Add to cart");

        if (cart.length > 1) {
          dispatch(removeFromCart(el));
        } else {
          dispatch(makeCartEmpty());
        }
      }
      setQuantity((prevQuantity) => prevQuantity - 1);
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
        dispatch(pushToCart(el));
      }
    }
  }

  useEffect(() => {
    if (cart.includes(el)) {
      setAddToCartBtn("Added");
      setQuantity(1);
      setBackGroundColor(white);
      changeBtnTextColor(black);
      addBorder("2px solid #8b8b8b");
    }
  }, []);

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
