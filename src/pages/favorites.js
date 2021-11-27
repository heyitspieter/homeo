import Layout from "src/components/Layout/Layout";
import FavoritesList from "src/components/FavoritesList/FavoritesList";

export default function favorite() {
  return (
    <Layout title="Secutitex: My Favorites" tabBar>
      <FavoritesList />
    </Layout>
  );
}
