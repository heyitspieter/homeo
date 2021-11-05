import useSWR from "swr";
import axios from "axios";
import AuthApi from "src/apis/auth";
import { fetcher } from "src/helpers";
import { useApiHandler } from "src/hooks";

export const useLogin = () =>
  useApiHandler((data) => axios.post("/api/v1/user/login", data));

export const useRegister = () =>
  useApiHandler((data) => axios.post("/api/v1/user/register", data));

export const useSignout = () =>
  useApiHandler(() => axios.post("/api/v1/user/signout"));

export const useGetSession = () => {
  const { data, error, ...rest } = useSWR("/api/v1/user/session", fetcher);

  return { data, error, loading: !data && !error, ...rest };
};
