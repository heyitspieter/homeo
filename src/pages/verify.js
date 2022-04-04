import Layout from "src/components/Layout/Layout";
import VerifyPayment from "src/containers/VerifyPayment/VerifyPayment";

export default function verify() {
  return (
    <Layout robots="noindex, nofollow" title="Secutitex: Verifying payment...">
      <VerifyPayment />
    </Layout>
  );
}
