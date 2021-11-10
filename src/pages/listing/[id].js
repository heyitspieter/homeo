import ListingApi from "src/apis/listing";
import Layout from "src/components/Layout/Layout";
import Toolbar from "src/components/Toolbar/Toolbar";
import Listing from "src/components/Listing/Listing";

export default function listingPage({ listing }) {
  return (
    <Layout title="Secutitex: Search properties for rent or sale in NG">
      <Toolbar />
      <Listing listing={listing} />
    </Layout>
  );
}

export const getStaticPaths = async () => {
  let paths = [];

  const listingApi = new ListingApi();

  const [listings, err] = await listingApi.getAllListings();

  if (listings) {
    paths = listings.map((listing) => ({ params: { id: listing._lId } }));
  }

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const listingApi = new ListingApi();

  const [listing, err] = await listingApi.getListing(params.id);

  if (listing) {
    return { props: { listing }, revalidate: 10 };
  }

  if (err && err.response && err.response.status === 404) {
    return { notFound: true };
  }

  return { props: {} };
};
