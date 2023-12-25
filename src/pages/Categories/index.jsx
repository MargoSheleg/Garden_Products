import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import NavButtons from "../../components/NavButtons/index";

function Categories({ categoriesFromServer }) {
  return (
    <div className={styles.categoriesPage}>
      {/* ======================ПОВТОР ИЗ HOME, СДЕЛАТЬ ЕДИНУЮ ПАПКУ!!!==================================================== */}

      <NavButtons title={"Categories"} />

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
