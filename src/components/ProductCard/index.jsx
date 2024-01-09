import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { black, green, white } from "../../utils/index";

function ProductCard({ el }) {
  const navigate = useNavigate();
  const [display, setDisplay] = useState("none");
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
    }
  }

  function makeBtnVisibleUnvisible(display) {
    setDisplay(display);
  }

  return (
    <div className={styles.allProductsBlockDiv}>
      {el.discont_price !== null && (
        <div className={styles.discountBox}>
          {(((el.price - el.discont_price) * 100) / el.price).toFixed(0) + "%"}
        </div>
      )}
      <img
        onClick={() => navigate(`/products/${el.id}`)}
        onMouseEnter={() => makeBtnVisibleUnvisible("flex")}
        onMouseLeave={() => makeBtnVisibleUnvisible("none")}
        className={styles.allProductsBlockImg}
        src={"http://localhost:3333" + el.image}
        alt={el.title}
      />

      <button
        className={styles.addToCartBtn}
        onMouseEnter={() => {
          onMouseEnterLeave(black);
          makeBtnVisibleUnvisible("flex");
        }}
        onMouseLeave={() => onMouseEnterLeave(green)}
        onClick={() => onClickFunc(white, black)}
        style={{
          backgroundColor: backGroundColor,
          color: btnTextColor,
          border: border,
          display: display,
        }}
      >
        {addToCartBtn}
      </button>

      <p
        className={styles.allProductsBlockP}
        onClick={() => navigate(`/products/${el.id}`)}
      >
        {el.title}
      </p>
      {el.discont_price !== null ? (
        <div className={styles.blockOfPrices}>
          <p className={styles.discountPrice}>${el.discont_price}</p>
          <p className={styles.discountedPrice}>${el.price}</p>
        </div>
      ) : (
        <p className={styles.price}>${el.price}</p>
      )}
    </div>
  );
}

export default ProductCard;
