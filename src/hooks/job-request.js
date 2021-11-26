import axios from "axios";
import { useApiHandler } from "src/hooks";

export const useCreateJobRequest = () =>
  useApiHandler((data) => axios.post("/api/v1/job-request", data));
