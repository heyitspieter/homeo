import AuthApi from "src/apis/auth";
import { setCookie } from "src/helpers";

export default async (req, res) => {
  const authApi = new AuthApi();

  if (req.method === "POST") {
    const [session, err] = await authApi.register(req.body);

    if (session) {
      setCookie(res, {
        path: "/",
        key: "_token",
        httpOnly: true,
        sameSite: "strict",
        value: session.token,
        maxAge: 604800, // 7 days
        secure: process.env.NODE_ENV !== "development",
      });

      return res.send({ success: true });
    }

    if (err && err.response && err.response.data) {
      return res.status(err.response.status).send(err.response.data);
    }

    res.status(422).send({ message: "An unexpected error has occured" });
  } else {
    res.status(405).end();
  }
};
