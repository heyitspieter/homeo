import UserApi from "src/apis/user";

export default async (req, res) => {
  const userApi = new UserApi();

  if (req.method === "GET") {
    const [professions, err] = await userApi.getProfessions();

    if (professions) return res.send(professions);

    if (err && err.response && err.response.data) {
      return res.status(err.response.status).send(err.response.data);
    }

    res.status(422).send({ message: "An unexpected error has occured" });
  } else {
    res.status(405).end();
  }
};
