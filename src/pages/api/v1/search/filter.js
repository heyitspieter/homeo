import SearchApi from "src/apis/search";

export default async (req, res) => {
  const searchApi = new SearchApi();

  if (req.method === "POST") {
    const [listings, err] = await searchApi.applyFilters(
      req.query.addr,
      req.body
    );

    if (listings) return res.send(listings);

    if (err && err.response && err.response.data) {
      return res.status(err.response.status).send(err.response.data);
    }

    res.status(422).send({ message: "An unexpected error has occured" });
  } else {
    res.status(405).end();
  }
};
