import NavButtons from "../../components/NavButtons/index";
import { Link } from "react-router-dom";
import { black } from "../../utils/index";
import styles from "./index.module.css";
import { useSelector } from "react-redux";

function Categories() {
  const categoriesList = useSelector(
    (store) => store.categories.categoriesFromServer
  );

  return (
    <div className={styles.categoriesPage}>
      <NavButtons title={"Categories"} linkTo={"/categories"} color={black} />

      <div className={styles.categoriesPageTitle}>
        <h2 className={styles.pageCatH2}>Categories</h2>
      </div>
      <div className={styles.categoriesPageBlock}>
        {categoriesList &&
          categoriesList.map((el) => (
            <Link
              className={styles.catLink}
              to={`/categories/${el.id}`}
              key={el.id}
            >
              <div className={styles.categoriesPageBlockDiv}>
                <img
                  className={styles.categoriesPageBlockImg}
                  src={"http://localhost:3333" + el.image}
                  alt={el.title}
                />
                <p className={styles.categoriesPageBlocksP}>{el.title}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Categories;
