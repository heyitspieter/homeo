import axios from "axios";
import { useApiHandler } from "src/hooks";

export const useSearchListings = () =>
  useApiHandler((query) => axios.get(`/api/v1/search?q=${query}`));

export const useApplyFilter = () =>
  useApiHandler((addr, filter) =>
    axios.post(`/api/v1/search/filter?addr=${addr}`, filter)
  );
