import useSWR from "swr";
import { fetcher } from "src/helpers";

export const useGetProfile = () => {
  const { data, error, ...rest } = useSWR("/api/v1/user", fetcher);

  return { data, error, loading: !data && !error, ...rest };
};
