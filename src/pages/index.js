import { useState } from "react";
import Usp from "src/components/Usp/Usp";
import ListingApi from "src/apis/listing";
import Hero from "src/containers/Hero/Hero";
import Layout from "src/components/Layout/Layout";
import Finder from "src/containers/Finder/Finder";
import HomeBanner from "src/components/HomeBanner/HomeBanner";
import ListingFeed from "src/components/ListingFeed/ListingFeed";
import JobQuotation from "src/components/JobQuotation/JobQuotation";
import PropertyExplore from "src/components/PropertyExplore/PropertyExplore";

export default function home({ listings }) {
  const [finder, setFinder] = useState({ open: false });

  const toggleFinder = () => setFinder({ open: !finder.open });

  return (
    <>
      <Layout
        tabBar
        robots="index, follow"
        title="Homeo: Search properties for rent or sale in NG"
        keywords="Homeo, homeo.com, real estate properties near me"
        description="Find Properties for rent or for sale around your location in UAE"
      >
        <Hero />
        <ListingFeed listings={listings} />
        <JobQuotation launchFinder={toggleFinder} />
        <Usp />
        <HomeBanner />
        <PropertyExplore />
      </Layout>
      <Finder show={finder.open} close={toggleFinder} />
    </>
  );
}

export const getStaticProps = async () => {
  let listingApi = new ListingApi();

  const [listings] = await listingApi.getFeaturedListings();

  return {
    props: {
      listings,
    },
    revalidate: 10,
  };
};
