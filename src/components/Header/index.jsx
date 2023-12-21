import logo from "../../assets/images/logo.svg";
import cart from "../../assets/images/cart.svg";
import styles from "./index.module.css";
import { useState } from "react";

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
        <img src={logo} />
      </div>
      <nav className={styles.nav}>
        <a
          style={{ color: btnColorMainpage }}
          className={styles.a}
          href=""
          onMouseOver={btnTurnGreenMainPage}
          onMouseOut={btnTurnBlackEverything}
        >
          Main Page
        </a>
        <a
          style={{ color: btnColorCategories }}
          className={styles.a}
          href=""
          onMouseOver={btnTurnGreenCategories}
          onMouseOut={btnTurnBlackEverything}
        >
          Categories
        </a>
        <a
          style={{ color: btnColorAllproducts }}
          className={styles.a}
          href=""
          onMouseOver={btnTurnGreenAllproducts}
          onMouseOut={btnTurnBlackEverything}
        >
          All products
        </a>
        <a
          style={{ color: btnColorAllsales }}
          className={styles.a}
          href=""
          onMouseOver={btnTurnGreenAllsales}
          onMouseOut={btnTurnBlackEverything}
        >
          All sales
        </a>
      </nav>
      <div>
        <img src={cart} />
      </div>
    </header>
  );
}

export default Header;
