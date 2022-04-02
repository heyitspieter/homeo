import Layout from "src/components/Layout/Layout";
import Toolbar from "src/components/Toolbar/Toolbar";

export default function notFound() {
  return (
    <Layout robots="noindex, nofollow" title="Secutitex: (404) Page not found">
      <Toolbar />
    </Layout>
  );
}
