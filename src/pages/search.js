import SearchApi from "src/apis/search";
import Search from "src/components/Search/Search";
import Layout from "src/components/Layout/Layout";
import SearchMobile from "src/components/Search/SearchMobile/SearchMobile";
import SearchDesktop from "src/containers/Search/SearchDesktop/SearchDesktop";

export default function search({ view, results }) {
  const renderView = () => {
    if (view === "mobile") {
      return <SearchMobile />;
    }

    if (view === "desktop") {
      return <SearchDesktop initialData={results} />;
    }

    return null;
  };

  return (
    <Layout
      tabBar
      robots="noindex, nofollow"
      title="Secutitex: Search properties for rent or sale in NG"
    >
      <Search>{renderView()}</Search>
    </Layout>
  );
}

export const getServerSideProps = async ({ query }) => {
  let view = query.v;
  let address = query.q;
  let filter = query.filter;

  let searchResults = [];

  if (address && view === "desktop") {
    const searchApi = new SearchApi();
    const [results, err] = await searchApi.searchListings(query.q, filter);

    if (results) {
      searchResults = results;
    }
  }

  return { props: { view: view || null, results: searchResults } };
};
