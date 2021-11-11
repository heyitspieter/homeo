export default async (req, res) => {
  if (req.method === "GET") {
    if (req) {
      return res.send(req.preview);
    }

    if (err && err.response && err.response.data) {
      return res.status(err.response.status).send(err.response.data);
    }

    res.status(422).send({ message: "An unexpected error has occured" });
  } else {
    res.status(405).end();
  }
};
