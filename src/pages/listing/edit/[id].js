import ListingApi from "src/apis/listing";
import Layout from "src/components/Layout/Layout";
import Toolbar from "src/components/Toolbar/Toolbar";

export default function editlistingPage() {
  return (
    <Layout title={`Secutitex`}>
      <Toolbar />
    </Layout>
  );
}

export const getStaticPaths = async () => {
  let paths = [];

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async () => {
  const listingApi = new ListingApi();

  let listing = null;

  return { props: {} };
};
