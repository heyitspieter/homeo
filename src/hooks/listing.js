import axios from "axios";
import useSWR from "swr";
import { fetcher } from "src/helpers";
import { useApiHandler } from "src/hooks";

export const useCreateListing = () =>
  useApiHandler((listing) => axios.post("/api/v1/listings/new", listing));

export const useGetListings = () => {
  const { data, error, ...rest } = useSWR("/api/v1/listings", fetcher);

  return { data, error, loading: !data && !error, ...rest };
};

export const useGetImage = () =>
  useApiHandler((id) => axios.get(`/api/v1/images/${id}`));

