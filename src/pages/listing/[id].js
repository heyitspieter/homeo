import Layout from "src/components/Layout/Layout";
import Toolbar from "src/components/Toolbar/Toolbar";
import Listing from "src/components/Listing/Listing";

export default function listing() {
  return (
    <Layout title="Secutitex: Search properties for rent or sale in NG">
      <Toolbar />
      <Listing />
    </Layout>
  );
}

export const getStaticPaths = async () => {
  let paths = [];

  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async () => {
  return { props: {} };
};
