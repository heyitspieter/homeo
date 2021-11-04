import Head from "next/head";
import { useState } from "react";
import { updateObject } from "src/helpers";
import TabBar from "src/components/TabBar/TabBar";
import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";
import AuthModal from "src/components/Modals/AuthModal/AuthModal";

import styles from "src/components/Layout/Layout.module.scss";

function Layout({ title, tabBar, children }) {
  const [authModal, setAuthModal] = useState({
    visiblility: false,
  });

  const toggleAuthModal = () => {
    setAuthModal(
      updateObject(authModal, {
        visiblility: !authModal.visiblility,
      })
    );
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div className={styles.container}>
        <AuthModal show={authModal.visiblility} close={toggleAuthModal} />
        <Header toggleAuthModal={toggleAuthModal} />
        {children}
        <Footer tabBar={tabBar} />
        {tabBar && <TabBar />}
      </div>
    </>
  );
}

export default Layout;
