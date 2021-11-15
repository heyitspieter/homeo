import dynamic from "next/dynamic";
import SearchApi from "src/apis/search";
import Search from "src/components/Search/Search";
import Layout from "src/components/Layout/Layout";

const SearchMap = dynamic(() =>
  import("src/components/Search/SearchMap/SearchMap")
);

const SearchFeed = dynamic(() =>
  import("src/components/Search/SearchFeed/SearchFeed")
);

const SearchForm = dynamic(() =>
  import("src/components/Search/SearchForm/SearchForm")
);

const SearchFilter = dynamic(() =>
  import("src/components/Search/SearchFilter/SearchFilter")
);

export default function search({ view, results }) {
  const renderView = () => {
    if (view === "mobile") {
      return <SearchForm />;
    }

    if (view === "desktop") {
      return (
        <>
          <SearchFilter />
          <SearchFeed results={results} />
          <SearchMap results={results} />
        </>
      );
    }

    return null;
  };

  return (
    <Layout tabBar title="Secutitex: Search properties for rent or sale in NG">
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
