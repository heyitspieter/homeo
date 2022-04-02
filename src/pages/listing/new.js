import TabBar from "src/components/TabBar/TabBar";
import Layout from "src/components/Layout/Layout";
import ListingForm from "src/containers/ListingForm/ListingForm";

export default function newListing() {
  return (
    <Layout
      robots="noindex, nofollow"
      title="Submit New Listing: Secutitex"
      tabBar
    >
      <ListingForm />
    </Layout>
  );
}
