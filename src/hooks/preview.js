import useSWR from "swr";
import { fetcher } from "src/helpers";
import { useApiHandler } from "src/hooks";
import PreviewApi from "src/apis/preview";

export const useCheckPreview = () => {
  const { data, error, ...rest } = useSWR("/api/v1/preview/check", fetcher);

  return { data, error, loading: !data && !error, ...rest };
};

export const useEndPreviewSession = () =>
  useApiHandler(() => new PreviewApi().endSession());
