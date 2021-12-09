import Layout from "src/components/Layout/Layout";
import Toolbar from "src/components/Toolbar/Toolbar";
import FavoritesList from "src/components/FavoritesList/FavoritesList";

export default function favorite() {
  return (
    <Layout title="Secutitex: My Favorites" tabBar>
      <Toolbar />
      <FavoritesList />
    </Layout>
  );
}
