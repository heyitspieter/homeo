import Head from "next/head";
import { useRouter } from "next/router";
import { updateObject } from "src/helpers";
import TabBar from "src/components/TabBar/TabBar";
import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";
import React, { useState, useEffect } from "react";
import Sidedrawer from "src/components/Sidedrawer/Sidedrawer";
import AuthModal from "src/components/Modals/AuthModal/AuthModal";

import styles from "src/components/Layout/Layout.module.scss";

function Layout({ title, tabBar, children }) {
  const router = useRouter();

  const [authModal, setAuthModal] = useState({
    visibility: false,
  });

  useEffect(() => {
    if (!authModal.visibility) {
      router.replace(router.asPath);
    }
  }, [authModal.visibility]);

  const toggleAuthModal = () => {
    setAuthModal(
      updateObject(authModal, {
        visibility: !authModal.visibility,
      })
    );
  };

  const toggleTabBar = () => {
    setTabBar(
      updateObject(tabBar, {
        visibility: !tabBar.visibility,
      })
    );
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        toggleAuthModal,
      });
    }

    return child;
  });

  let footer = null;

  if (router.pathname !== "/search") {
    footer = <Footer tabBar={tabBar} />;
  }

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
        <Sidedrawer />
        <AuthModal show={authModal.visibility} close={toggleAuthModal} />
        <Header toggleAuthModal={toggleAuthModal} />
        {childrenWithProps}
        {footer}
        {tabBar && <TabBar toggleAuthModal={toggleAuthModal} />}
      </div>
    </>
  );
}

export default Layout;
