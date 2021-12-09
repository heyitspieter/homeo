import axios from "axios";
import { useApiHandler } from "src/hooks";

export const useEmailSubscribe = () =>
  useApiHandler((data) => axios.post("/api/v1/subscribe", data));
