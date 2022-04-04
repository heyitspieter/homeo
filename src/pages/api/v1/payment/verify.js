import JobRequestApi from "src/apis/job-request";

export default async (req, res) => {
  const jobRequestApi = new JobRequestApi(req);

  if (req.method === "GET") {
    const [success, err] = await jobRequestApi.verifyPayment(req.query.tx);

    if (success) return res.send(success);

    if (err && err.response && err.response.data) {
      return res.status(err.response.status).send(err.response.data);
    }

    res.status(422).send({ message: "An unexpected error has occured" });
  } else {
    res.status(405).end();
  }
};
