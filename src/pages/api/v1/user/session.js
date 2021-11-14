import AuthApi from "src/apis/auth";
import { setCookie } from "src/helpers";

export default async (req, res) => {
  const authApi = new AuthApi(req);

  if (req.method === "GET") {
    if (!req.cookies._token) return res.send({ guest: true });

    const [session, err] = await authApi.getSession();

    if (session) return res.send(session);

    if (err && err.response && err.response.data) {
      if (err.response.data.message) {
        if (err.response.data.message === "NO_AUTH") {
          setCookie(res, {
            path: "/",
            value: "",
            key: "_token",
            httpOnly: true,
            sameSite: "strict",
            expires: new Date(0),
            secure: process.env.NODE_ENV !== "development",
          });

          return res.end();
        }
      }
      return res.status(err.response.status).send(err.response.data);
    }

    res.status(422).send({ message: "An unexpected error has occured" });
  } else {
    res.status(405).end();
  }
};
