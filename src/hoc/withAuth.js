import AuthApi from "src/apis/auth";

const withAuth =
  (cb = null) =>
  async (ctx) => {
    const { req, query } = ctx;

    const authApi = new AuthApi(req);

    let rest = {};
    let next = "/";
    let isAuthenticated = null;

    if (cb) rest = await cb(ctx);

    const [session] = await authApi.getSession();

    if (session) {
      isAuthenticated = session.isAuthenticated;
    }

    if (query.page) {
      next = `/account/${query.page}`;
    }

    if (!isAuthenticated && !query.type) {
      return {
        redirect: {
          destination: `/`,
          permanent: false,
        },
      };
    }

    return {
      props: { isAuthenticated, ...rest },
    };
  };

export default withAuth;
