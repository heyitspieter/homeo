import SubscribeApi from "src/apis/subscribe";

export default async (req, res) => {
  const subcribeApi = new SubscribeApi();

  if (req.method === "POST") {
    const [success, err] = await subcribeApi.subscribe(req.body);

    if (success) return res.send(success);

    if (err && err.response && err.response.data) {
      return res.status(err.response.status).send(err.response.data);
    }

    res.status(422).send({ message: "An unexpected error has occured" });
  } else {
    res.status(405).end();
  }
};
