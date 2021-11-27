import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { updateObject } from "src/helpers";
import { getLikes } from "src/store/actions";
import TabBar from "src/components/TabBar/TabBar";
import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";
import React, { useState, useEffect } from "react";
import Sidedrawer from "src/components/Sidedrawer/Sidedrawer";
import AuthModal from "src/components/Modals/AuthModal/AuthModal";
import { useCheckPreview, useEndPreviewSession } from "src/hooks/preview";
import PreviewModeDialog from "src/components/PreviewModeDialog/PreviewModeDialog";

import styles from "src/components/Layout/Layout.module.scss";

function Layout({ title, tabBar, children }) {
  const router = useRouter();

  const dispatch = useDispatch();

  const { data: preview } = useCheckPreview();

  const [endPreviewSession, { data: sessionEnded }] = useEndPreviewSession();

  const [previewModeDialog, setPreviewModeDialog] = useState(false);

  const onGetLikes = () => dispatch(getLikes());

  const [authModal, setAuthModal] = useState({
    visibility: false,
  });

  useEffect(() => {
    onGetLikes();
  }, []);

  useEffect(() => {
    if (sessionEnded) {
      setPreviewModeDialog(false);
    }
  }, [sessionEnded]);

  useEffect(() => {
    if (preview) {
      setPreviewModeDialog(true);
    } else {
      setPreviewModeDialog(false);
    }
  }, [preview]);

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
        <PreviewModeDialog
          endPreviewSession={endPreviewSession}
          previewModeDialog={previewModeDialog}
        />
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
