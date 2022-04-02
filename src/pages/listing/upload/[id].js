import withAuth from "src/hoc/withAuth";
import ListingApi from "src/apis/listing";
import Layout from "src/components/Layout/Layout";
import Toolbar from "src/components/Toolbar/Toolbar";
import ListingUploadForm from "src/containers/ListingForm/ListingUploadForm/ListingUploadForm";

export default function listingImageUpload({ images = [] }) {
  return (
    <Layout
      robots="noindex, nofollow"
      title="Upload Listing Images: Secutitex"
      tabBar
    >
      <Toolbar />
      <ListingUploadForm images={images} />
    </Layout>
  );
}

export const getServerSideProps = withAuth(async ({ req, query }) => {
  const listingId = query.id;

  const listingApi = new ListingApi(req);

  if (listingId) {
    const [images] = await listingApi.getListingImages(listingId);

    if (images) {
      return { images };
    }
  }
});
