import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

function Categories() {
  // ======================ПОВТОР ИЗ HOME, СДЕЛАТЬ ЕДИНУЮ ПАПКУ!!!=========================================================
  const [categoriesFromServer, setCategoriesFromServer] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/categories/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCategoriesFromServer(data);
      })
      .catch((error) => {
        console.log("Fetch error", error);
      });
  }, []);
  // =============================================================================================================
  return (
    <div className={styles.categoriesPage}>
      {/* ======================ПОВТОР ИЗ HOME, СДЕЛАТЬ ЕДИНУЮ ПАПКУ!!!==================================================== */}
      <div className={styles.twoBtnContainer}>
        <Link className={styles.linkToMainPage} to="/">
          <button className={styles.btnToMainPage}>Main page</button>
        </Link>
        <button className={styles.btnToCategories}>Categories</button>
      </div>

      <div className={styles.categoriesPageTitle}>
        <h2 className={styles.pageCatH2}>Categories</h2>
      </div>
      <div className={styles.categoriesPageBlock}>
        {categoriesFromServer &&
          categoriesFromServer.map((el) => (
            <Link
              className={styles.catLink}
              to={`/categories/${el.id}`}
              key={el.id}
            >
              <div className={styles.categoriesPageBlockDiv}>
                <img
                  className={styles.categoriesPageBlocksImg}
                  src={"http://localhost:3333" + el.image}
                  alt={el.title}
                />
                <p className={styles.categoriesPageBlocksP}>{el.title}</p>
              </div>
            </Link>
          ))}
      </div>

      {/* ========================================================================================================== */}
    </div>
  );
}

export default Categories;
