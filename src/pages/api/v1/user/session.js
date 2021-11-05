import AuthApi from "src/apis/auth";

export default async (req, res) => {
  const authApi = new AuthApi(req);

  if (req.method === "GET") {
    if (!req.cookies._token) {
      return res.send({ guest: true });
    }

    const [session, err] = await authApi.getSession();

    if (session) {
      return res.send({ isAuthenticated: true });
    }

    if (err && err.response && err.response.data) {
      return res.status(err.response.status).send(err.response.data);
    }

    res.status(422).send({ message: "An unexpected error has occured" });
  } else {
    res.status(405).end();
  }
};
