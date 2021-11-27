import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Spinner from "src/components/Spinner/Spinner";
import ActiveButton from "src/components/ActiveButton/ActiveButton";

import styles from "src/components/Account/Account.module.scss";

const Profile = dynamic(() => import("src/containers/Profile/Profile"), {
  loading: () => (
    <div className={styles.spinner__wrapper}>
      <Spinner loading />
    </div>
  ),
});

const PropertyListings = dynamic(
  () => import("src/components/PropertyListings/PropertyListings"),
  {
    loading: () => (
      <div className={styles.spinner__wrapper}>
        <Spinner loading />
      </div>
    ),
  }
);

const AccountSetting = dynamic(
  () => import("src/containers/AccountSetting/AccountSetting"),
  {
    loading: () => (
      <div className={styles.spinner__wrapper}>
        <Spinner loading />
      </div>
    ),
  }
);

function Account() {
  const router = useRouter();

  const renderContent = () => {
    let page = router.query.page;

    switch (page) {
      case "me":
        return <Profile />;
      case "property-list":
        return <PropertyListings />;
      case "setting":
        return <AccountSetting />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <ActiveButton activeClassName={styles.activeTab}>
          <button onClick={() => router.push("/account/me")} id="/account/me">
            My Profile
          </button>
        </ActiveButton>
        <ActiveButton activeClassName={styles.activeTab}>
          <button
            onClick={() => router.push("/account/property-list")}
            id="/account/property-list"
          >
            My Property Listings
          </button>
        </ActiveButton>
        <ActiveButton activeClassName={styles.activeTab}>
          <button
            onClick={() => router.push("/favorites")}
            id="/favorites"
          >
            My Property Favorites
          </button>
        </ActiveButton>
        <ActiveButton activeClassName={styles.activeTab}>
          <button
            onClick={() => router.push("/account/setting")}
            id="/account/setting"
          >
            Account Setting
          </button>
        </ActiveButton>
      </div>
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
}

export default Account;
