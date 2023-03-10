import ListingApi from "src/apis/listing";

export default async (req, res) => {
  const listingApi = new ListingApi(req);

  if (req.method === "POST") {
    const [success, err] = await listingApi.createListing(req.body);

    if (success) return res.send(success);

    if (err && err.response && err.response.data) {
      return res.status(err.response.status).send(err.response.data);
    }

    res.status(422).send({ message: "An unexpected error has occured" });
  } else {
    res.status(405).end();
  }
};
