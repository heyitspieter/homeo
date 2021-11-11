import ListingApi from "src/apis/listing";

export default async (req, res) => {
  const listingApi = new ListingApi();

  if (req.method === "GET") {
    const [success, err] = await listingApi.verifyPreviewToken(
      req.query.secret
    );

    if (success) {
      res.setPreviewData(
        {},
        {
          maxAge: (60 + 20) * 60,
        }
      );

      return res.redirect(req.query.slug);
    }

    if (err && err.response && err.response.data) {
      return res.status(err.response.status).send(err.response.data);
    }

    res.status(422).send({ message: "An unexpected error has occured" });
  } else {
    res.status(405).end();
  }
};
