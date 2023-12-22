import logo from "../../assets/images/logo.svg";
import cart from "../../assets/images/cart.svg";
import styles from "./index.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  let [btnColorMainpage, changeBtnColorMainPage] = useState("black");
  let [btnColorCategories, changeBtnColorCategories] = useState("black");
  let [btnColorAllproducts, changeBtnColorAllproducts] = useState("black");
  let [btnColorAllsales, changeBtnColorAllsales] = useState("black");

  function btnTurnGreenMainPage() {
    changeBtnColorMainPage("green");
    changeBtnColorCategories("black");
    changeBtnColorAllproducts("black");
    changeBtnColorAllsales("black");
  }

  function btnTurnGreenCategories() {
    changeBtnColorMainPage("black");
    changeBtnColorCategories("green");
    changeBtnColorAllproducts("black");
    changeBtnColorAllsales("black");
  }

  function btnTurnGreenAllproducts() {
    changeBtnColorMainPage("black");
    changeBtnColorCategories("black");
    changeBtnColorAllproducts("green");
    changeBtnColorAllsales("black");
  }

  function btnTurnGreenAllsales() {
    changeBtnColorMainPage("black");
    changeBtnColorCategories("black");
    changeBtnColorAllproducts("black");
    changeBtnColorAllsales("green");
  }

  function btnTurnBlackEverything() {
    changeBtnColorMainPage("black");
    changeBtnColorCategories("black");
    changeBtnColorAllproducts("black");
    changeBtnColorAllsales("black");
  }

  return (
    <header className={styles.Header}>
      <div>
        <Link to="/">
          <img src={logo} />
        </Link>
      </div>
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
      <div>
        <Link>
          <img src={cart} />
        </Link>
      </div>
    </header>
  );
}

export default Header;
