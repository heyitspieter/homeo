import useSWR from "swr";
import axios from "axios";
import { fetcher } from "src/helpers";
import { useApiHandler } from "src/hooks";

export const useGetProfile = () => {
  const { data, error, ...rest } = useSWR("/api/v1/user", fetcher);

  return { data, error, loading: !data && !error, ...rest };
};

export const useUpdateProfile = () =>
  useApiHandler((data) => axios.patch("/api/v1/user/update", data));

export const useUpdatePassword = () =>
  useApiHandler((data) => axios.post("/api/v1/user/password/update", data));
