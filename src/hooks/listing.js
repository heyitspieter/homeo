import axios from "axios";
import useSWR from "swr";
import { fetcher } from "src/helpers";
import { useApiHandler } from "src/hooks";
import ListingApi from "src/apis/listing";

export const useCreateListing = () =>
  useApiHandler((listing) => axios.post("/api/v1/listing/new", listing));

export const useGetListings = () => {
  const { data, error, ...rest } = useSWR("/api/v1/listing/me", fetcher);

  return { data, error, loading: !data && !error, ...rest };
};

export const useGetImage = () =>
  useApiHandler((id) => axios.get(`/api/v1/image/${id}`));

export const useUploadImage = () =>
  useApiHandler((image) => axios.patch(`/api/v1/listing/upload`, image));

export const useGetStates = () => {
  const { data, error, ...rest } = useSWR("/api/v1/listing/states", fetcher);

  return { data, error, loading: !data && !error, ...rest };
};
