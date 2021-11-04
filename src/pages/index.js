import Usp from "src/components/Usp/Usp";
import Hero from "src/containers/Hero/Hero";
import Layout from "src/components/Layout/Layout";
import ListingFeed from "src/components/ListingFeed/ListingFeed";
import PropertyExplore from "src/components/PropertyExplore/PropertyExplore";

export default function home() {
  return (
    <Layout title="Secutitex: Search properties for rent or sale in NG" tabBar>
      <Hero />
      <ListingFeed />
      <Usp />
      <PropertyExplore />
    </Layout>
  );
}
