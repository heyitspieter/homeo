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

function Layout({ title, robots, keywords, description, tabBar, children }) {
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
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@secutitex" />
        <meta name="twitter:creator" content="@secutitex" />
        <meta property="og:title" content={title} />
        <meta property="og:locale" content="en_NG" />
        <meta property="og:url" content={router.asPath} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Secutitex.com" />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/images/og.png`}
        />
        <meta property="og:image:alt" content="Secutitex Logo" />
        <meta name="robots" content={robots} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
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
