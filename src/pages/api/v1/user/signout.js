import AuthApi from "src/apis/auth";
import { setCookie } from "src/helpers";

export default async (req, res) => {
  const authApi = new AuthApi(req);

  if (req.method === "POST") {
    const [success, err] = await authApi.signout();

    if (success) {
      setCookie(res, {
        path: "/",
        value: "",
        key: "_token",
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(0),
        secure: process.env.NODE_ENV !== "development",
      });

      return res.send({ success: true });
    }

    console.log(err);

    if (err && err.response && err.response.data) {
      return res.status(err.response.status).send(err.response.data);
    }

    res.status(422).send({ message: "An unexpected error has occured" });
  } else {
    res.status(405).end();
  }
};
