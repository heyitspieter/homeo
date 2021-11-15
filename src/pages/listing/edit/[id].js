import ListingApi from "src/apis/listing";
import Layout from "src/components/Layout/Layout";
import Toolbar from "src/components/Toolbar/Toolbar";
import ListingEditForm from "src/containers/ListingForm/ListingEditForm/ListingEditForm";

export default function editlistingPage() {
  return (
    <Layout title={`Secutitex`}>
      <Toolbar />
      <ListingEditForm />
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
