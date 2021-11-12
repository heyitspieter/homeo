import axios from "axios";
import { useApiHandler } from "src/hooks";

export const useSearchListings = () =>
  useApiHandler((query) => axios.get(`/api/v1/search?q=${query}`));
