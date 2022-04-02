import About from "src/components/About/About";
import Layout from "src/components/Layout/Layout";
import Toolbar from "src/components/Toolbar/Toolbar";

export default function about() {
  return (
    <Layout
      keywords=""
      robots="index, follow"
      title="Secutitex: About Us"
      description="Our goal is to create a wealth of jobs for trades persons and labour in Nigeria."
    >
      <Toolbar />
      <About />
    </Layout>
  );
}
