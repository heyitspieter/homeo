import ListingApi from "src/apis/listing";
import Layout from "src/components/Layout/Layout";
import ListingUploadForm from "src/containers/ListingForm/ListingUploadForm/ListingUploadForm";

export default function listingImageUpload({ images = [] }) {
  return (
    <Layout title="Secutitex: Upload Listing Images" tabBar>
      <ListingUploadForm images={images} />
    </Layout>
  );
}

export const getServerSideProps = async ({ req, query }) => {
  const listingId = query.id;

  const listingApi = new ListingApi(req);

  if (listingId) {
    const [images] = await listingApi.getListingImages(listingId);

    if (images) {
      return { props: { images: images } };
    }
  }

  return { props: {} };
};
