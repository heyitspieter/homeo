import axios from "axios";
import { useApiHandler } from "src/hooks";

export const useVerifyTransaction = () =>
  useApiHandler((tx) => axios.get(`/api/v1/payment/verify?tx=${tx}`));
