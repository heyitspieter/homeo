import UserApi from "src/apis/user";

export default async (req, res) => {
  const userApi = new UserApi(req);

  if (req.method === "GET") {
    const [user, err] = await userApi.getUser();

    if (user) return res.send(user);

    if (err && err.response && err.response.data) {
      return res.status(err.response.status).send(err.response.data);
    }

    res.status(422).send({ message: "An unexpected error has occured" });
  } else {
    res.status(405).end();
  }
};
