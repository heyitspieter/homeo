import Search from "src/components/Search/Search";
import Layout from "src/components/Layout/Layout";
import SearchMap from "src/components/Search/SearchMap/SearchMap";
import SearchFeed from "src/components/Search/SearchFeed/SearchFeed";
import SearchFilter from "src/components/Search/SearchFilter/SearchFilter";

export default function search() {
  return (
    <Layout title="Secutitex: Search properties for rent or sale in NG" tabBar>
      <Search>
        <SearchFilter />
        <SearchFeed />
        <SearchMap />
      </Search>
    </Layout>
  );
}
