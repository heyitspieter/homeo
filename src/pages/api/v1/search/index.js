import SearchApi from "src/apis/search";

export default async (req, res) => {
  const searchApi = new SearchApi();

  if (req.method === "GET") {
    const [listings, err] = await searchApi.searchListings(req.query.q);

    if (listings) return res.send(listings);

    if (err && err.response && err.response.data) {
      return res.status(err.response.status).send(err.response.data);
    }

    res.status(422).send({ message: "An unexpected error has occured" });
  } else {
    res.status(405).end();
  }
};