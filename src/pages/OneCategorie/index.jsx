import NavButtons from "../../components/NavButtons";
import NavButton from "../../components/NavButton";
import styles from "./index.module.css";

function OneCategorie() {
  return (
    <>
      <div className={styles.navButtonsDiv}>
        <NavButtons title={"Categories"} linkTo={"/categories"} color={gray} />
        <NavButton title={productCategory} color={gray} linkTo={"/"} />
        <NavButton
          title={title}
          color={black}
          linkTo={`/products/${productId}`}
        />
      </div>
    </>
  );
}

export default OneCategorie;
