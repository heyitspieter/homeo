import withAuth from "src/hoc/withAuth";
import ListingApi from "src/apis/listing";
import Layout from "src/components/Layout/Layout";
import Toolbar from "src/components/Toolbar/Toolbar";
import ListingEditForm from "src/containers/ListingForm/ListingEditForm/ListingEditForm";

export default function editlistingPage({ listing }) {
  return (
    <Layout title="Edit Listing: Secutitex">
      <Toolbar />
      <ListingEditForm listing={listing} />
    </Layout>
  );
}

export const getServerSideProps = withAuth(async ({ req, query }) => {
  const listingApi = new ListingApi(req);

  const [listing] = await listingApi.getListing(query.id);

  if (listing) {
    return { listing };
  }
});
