import dynamic from "next/dynamic";
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

export default function search({ view }) {
  const renderView = () => {
    if (view === "mobile") {
      return <SearchForm />;
    }

    if (view === "desktop") {
      return (
        <>
          <SearchFilter />
          <SearchFeed />
          <SearchMap />
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

export const getServerSideProps = ({ query }) => {
  let view = query.v;

  return { props: { view: view || null } };
};
