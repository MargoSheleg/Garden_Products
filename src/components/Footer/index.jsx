import Title from "../../components/Title/index";
import styles from "./index.module.css";
import "./index.module.css";
import map from "../../assets/images/map.svg";
import instagramLogo from "../../assets/images/instagramLogo.svg";
import whatsappLogo from "../../assets/images/whatsappLogo.svg";

function Footer() {
  return (
    <footer className={styles.footer}>
      <Title title={"Contacts"} />
      <div className={styles.contactsInfo}>
        <div className={styles.phone}>
          <p className={styles.phoneP}>Phone</p>
          <p className={styles.phoneText}>+49 999 999 99 99</p>
        </div>
        <div className={styles.socials}>
          <p className={styles.socialsP}>Socials</p>
          <div className={styles.twoIconsInSocials}>
            <img src={instagramLogo} />
            <img src={whatsappLogo} />
          </div>
        </div>
        <div className={styles.address}>
          <p className={styles.addressP}>Address</p>
          <p className={styles.addressText}>
            Linkstraße 2, 8 OG, 10 785, Berlin, Deutschland
          </p>
        </div>
        <div className={styles.workingHours}>
          <p className={styles.workingHoursP}>Working Hours</p>
          <p className={styles.workingHoursText}>24 hours a day</p>
        </div>
      </div>
      <img className={styles.map} src={map} />
    </footer>
  );
}

export default Footer;
