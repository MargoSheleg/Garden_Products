import styles from "./index.module.css";
import NavButtons from "../../components/NavButtons/index";
import Title from "../../components/Title/index";
import { Link } from "react-router-dom";
import { useState } from "react";
import { black, green, white } from "../../utils/index";

function AllProducts({ productsFromServer }) {
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
    <div className={styles.allProductsPage}>
      <NavButtons
        title={"All products"}
        linkTo={"/allproducts"}
        color={black}
      />
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
                  <div className={styles.discountBox}>
                    {(((el.price - el.discont_price) * 100) / el.price).toFixed(
                      0
                    ) + "%"}
                  </div>
                )}
                <img
                  onMouseEnter={() => makeBtnVisibleUnvisible("flex")}
                  onMouseLeave={() => makeBtnVisibleUnvisible("none")}
                  className={styles.allProductsBlockImg}
                  src={"http://localhost:3333" + el.image}
                  alt={el.title}
                />

                <button
                  className={styles.addToCartBtn}
                  onMouseEnter={() => onMouseEnterLeave(black)}
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

                <p className={styles.allProductsBlockP}>{el.title}</p>
                {el.discont_price !== null ? (
                  <div className={styles.blockOfPrices}>
                    <p className={styles.discountPrice}>${el.discont_price}</p>
                    <p className={styles.discountedPrice}>${el.price}</p>
                  </div>
                ) : (
                  <p className={styles.price}>${el.price}</p>
                )}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default AllProducts;
