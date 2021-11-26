import About from "src/components/About/About";
import Layout from "src/components/Layout/Layout";
import Toolbar from "src/components/Toolbar/Toolbar";

export default function about() {
  return (
    <Layout title="Secutitex: About Us">
      <Toolbar />
      <About />
    </Layout>
  );
}
