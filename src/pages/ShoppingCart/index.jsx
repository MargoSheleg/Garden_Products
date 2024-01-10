import Title from "../../components/Title/index";
import styles from "./index.module.css";
import NavButton from "../../components/NavButton/index";
import { useEffect, useState } from "react";
import { eventWrapper } from "@testing-library/user-event/dist/utils";
import ItemCart from "../../components/ItemCart";
import { useNavigate } from "react-router-dom";

function ShoppingCart({ cart, setCart, display, setDisplay }) {
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  const [nameInput, setNameInput] = useState();
  const [phoneInput, setPhoneInput] = useState();
  const [emailInput, setEmailInput] = useState();

  const [colorOfBtn, setColorOfBtn] = useState("#339933");

  const [orderObj, setOrderObj] = useState({});

  function makeAnOrder() {
    if (nameInput && phoneInput && emailInput) {
      setOrderObj({
        user: {
          name: nameInput,
          phone: phoneInput,
          email: emailInput,
        },
        cart,
      });

      fetch("http://localhost:3333/order/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderObj),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .catch((error) => {
          console.error("Fetch error", error);
          throw error;
        });

      localStorage.setItem("userCart", orderObj);

      setDisplay("flex");
      setCart([]);
      navigate("/cartZero");

      setNameInput("");
      setPhoneInput("");
      setEmailInput("");
    }
  }

  function changeColor(color) {
    setColorOfBtn(color);
  }

  return (
    <div className={styles.shoppingCart}>
      <div className={styles.titleOfCartDiv}>
        <Title title={"Shopping cart"} />
        <NavButton title={"Back to the store"} color={"#8B8B8B"} linkTo={"/"} />
      </div>

      <div className={styles.ordersAndDetailsDiv}>
        <div className={styles.itemsDiv}>
          {cart.map((el) => (
            <ItemCart el={el} cart={cart} setCart={setCart} />
          ))}
        </div>

        <div className={styles.orderDetailsDiv}>
          <h2 className={styles.orderDetails}>Order details</h2>
          <p className={styles.itemCounter}>{cart.length} items</p>
          <div className={styles.totalDiv}>
            <p className={styles.total}>Total</p>
            <p className={styles.totalPrice}>
              $
              {cart.reduce(
                (acc, el) => acc + (el.discont_price || el.price),
                0
              )}
            </p>
          </div>
          <input
            value={nameInput}
            onChange={(event) => setNameInput(event.target.value)}
            className={styles.inputNameCart}
            type="text"
            placeholder="Name"
          />
          <input
            value={phoneInput}
            onChange={(event) => setPhoneInput(event.target.value)}
            className={styles.inputPhoneCart}
            type="text"
            placeholder="Phone number"
          />
          <input
            value={emailInput}
            onChange={(event) => setEmailInput(event.target.value)}
            className={styles.inputEmailCart}
            type="text"
            placeholder="Email"
          />
          <button
            className={styles.orderBtnCart}
            style={{ backgroundColor: colorOfBtn }}
            onClick={() => makeAnOrder()}
            onMouseEnter={() => changeColor("#282828")}
            onMouseLeave={() => changeColor("#339933")}
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
