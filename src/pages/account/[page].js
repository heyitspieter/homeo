import withAuth from "src/hoc/withAuth";
import Layout from "src/components/Layout/Layout";
import Account from "src/components/Account/Account";

export default function account() {
  return (
    <Layout title="My Account: Secutitex" tabBar>
      <Account />
    </Layout>
  );
}

export const getServerSideProps = withAuth();
