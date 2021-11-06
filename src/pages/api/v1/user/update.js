import UserApi from "src/apis/user";

export default async (req, res) => {
  const userApi = new UserApi(req);

  if (req.method === "PATCH") {
    const [success, err] = await userApi.updateProfile(req.body);

    if (success) return res.send(success);

    if (err && err.response && err.response.data) {
      return res.status(err.response.status).send(err.response.data);
    }

    res.status(422).send({ message: "An unexpected error has occured" });
  } else {
    res.status(405).end();
  }
};
