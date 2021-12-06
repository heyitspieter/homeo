import { useState } from "react";
import { toast } from "react-toastify";
import { useApplyFilter } from "src/hooks/search";
import Spinner from "src/components/Spinner/Spinner";
import SearchMap from "src/components/Search/SearchDesktop/SearchMap/SearchMap";
import SearchFeed from "src/components/Search/SearchDesktop/SearchFeed/SearchFeed";
import SearchFilter from "src/components/Search/SearchDesktop/SearchFilter/SearchFilter";

function SearchDesktop({ initialData }) {
  const [results, setResults] = useState(initialData);

  const [applyFilter, { loading }] = useApplyFilter();

  const onApplyFilters = async (addr, filters) => {
    const [data, err] = await applyFilter(addr, filters);

    if (data) {
      setResults(data);
    }

    if (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <Spinner loading={loading} />
      <SearchFilter applyFilters={onApplyFilters} />
      <SearchFeed results={results} />
      <SearchMap results={results} />
    </>
  );
}

export default SearchDesktop;
