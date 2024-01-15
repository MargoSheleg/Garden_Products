import CongratulationsPopUp from "../CongratulationsPopUp";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { green, back, black } from "../../utils/index";
import styles from "./index.module.css";
import logo from "../../assets/images/logo.svg";
import cartImg from "../../assets/images/cart.svg";

function Header({ cart, display, setDisplay }) {
  let [btnColorMainpage, changeBtnColorMainPage] = useState(black);
  let [btnColorCategories, changeBtnColorCategories] = useState(black);
  let [btnColorAllproducts, changeBtnColorAllproducts] = useState(black);
  let [btnColorAllsales, changeBtnColorAllsales] = useState(black);

  function btnTurnGreenMainPage() {
    changeBtnColorMainPage(green);
    changeBtnColorCategories(black);
    changeBtnColorAllproducts(black);
    changeBtnColorAllsales(black);
  }

  function btnTurnGreenCategories() {
    changeBtnColorMainPage(black);
    changeBtnColorCategories(green);
    changeBtnColorAllproducts(black);
    changeBtnColorAllsales(black);
  }

  function btnTurnGreenAllproducts() {
    changeBtnColorMainPage(black);
    changeBtnColorCategories(black);
    changeBtnColorAllproducts(green);
    changeBtnColorAllsales(black);
  }

  function btnTurnGreenAllsales() {
    changeBtnColorMainPage(black);
    changeBtnColorCategories(black);
    changeBtnColorAllproducts(black);
    changeBtnColorAllsales(green);
  }

  function btnTurnBlackEverything() {
    changeBtnColorMainPage(black);
    changeBtnColorCategories(black);
    changeBtnColorAllproducts(black);
    changeBtnColorAllsales(black);
  }

  const navigate = useNavigate();

  return (
    <header className={styles.Header}>
      <Link to="/">
        <img src={logo} />
      </Link>
      <nav className={styles.nav}>
        <Link
          to="/"
          style={{ color: btnColorMainpage }}
          className={styles.Link}
          href=""
          onMouseOver={btnTurnGreenMainPage}
          onMouseOut={btnTurnBlackEverything}
        >
          Main Page
        </Link>
        <Link
          to="/categories"
          style={{ color: btnColorCategories }}
          className={styles.Link}
          href=""
          onMouseOver={btnTurnGreenCategories}
          onMouseOut={btnTurnBlackEverything}
        >
          Categories
        </Link>
        <Link
          to="/allproducts"
          style={{ color: btnColorAllproducts }}
          className={styles.Link}
          href=""
          onMouseOver={btnTurnGreenAllproducts}
          onMouseOut={btnTurnBlackEverything}
        >
          All products
        </Link>
        <Link
          to="allsales"
          style={{ color: btnColorAllsales }}
          className={styles.Link}
          href=""
          onMouseOver={btnTurnGreenAllsales}
          onMouseOut={btnTurnBlackEverything}
        >
          All sales
        </Link>
      </nav>
      <div className={styles.cartLogoDiv}>
        <img
          className={styles.cartImgHeader}
          src={cartImg}
          onClick={() => {
            if (cart.length === 0) {
              navigate("/cartzero");
            } else {
              navigate("/cart");
            }
          }}
        />
        {cart.length >= 1 && (
          <p className={styles.itemQuantity}>{cart.length}</p>
        )}
      </div>

      <CongratulationsPopUp display={display} setDisplay={setDisplay} />
    </header>
  );
}

export default Header;
