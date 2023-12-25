import Title from "../../components/Title/index";
import NavButtons from "../../components/NavButtons";
import style from "./index.module.css";

function AllSales() {
  return (
    <div className={style.allSales}>
      <NavButtons title={"All sales"} linkTo={"/allsales"} />
      <Title title={"Discounted items"} />
    </div>
  );
}

export default AllSales;
