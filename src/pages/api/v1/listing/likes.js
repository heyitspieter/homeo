import ListingApi from "src/apis/listing";

export default async (req, res) => {
  const listingApi = new ListingApi();

  if (req.method === "POST") {
    const [listings, err] = await listingApi.getLikes(req.body);

    if (listings) return res.send(listings);

    if (err && err.response && err.response.data) {
      return res.status(err.response.status).send(err.response.data);
    }

    res.status(422).send({ message: "An unexpected error has occured" });
  } else {
    res.status(405).end();
  }
};
