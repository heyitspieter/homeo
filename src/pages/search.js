import { useRef } from "react";
import dynamic from "next/dynamic";
import Search from "src/components/Search/Search";
import Layout from "src/components/Layout/Layout";
import { useIsMobile } from "src/hooks/mediaQuery";
import Animated from "src/components/Animated/Animated";

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

export default function search() {
  const mobileSearchRef = useRef();
  const desktopSearchRef = useRef();

  const isMobile = useIsMobile(599);

  const mobileSearchConfig = {
    nodeRef: mobileSearchRef,
    mountOnEnter: true,
    unmountOnExit: true,
    in: isMobile,
    timeout: { enter: 0, exit: 0 },
    classNames: {
      enter: "",
      enterActive: "",
      exit: "",
      exitActive: "",
    },
  };

  const desktopSearchConfig = {
    nodeRef: desktopSearchRef,
    mountOnEnter: true,
    unmountOnExit: true,
    in: !isMobile,
    timeout: { enter: 0, exit: 0 },
    classNames: {
      enter: "",
      enterActive: "",
      exit: "",
      exitActive: "",
    },
  };

  return (
    <Layout tabBar title="Secutitex: Search properties for rent or sale in NG">
      <Search>
        <Animated type="css" config={mobileSearchConfig}>
          <SearchForm />
        </Animated>
        <Animated type="css" config={desktopSearchConfig}>
          <>
            <SearchFilter />
            <SearchFeed />
            <SearchMap />
          </>
        </Animated>
      </Search>
    </Layout>
  );
}
