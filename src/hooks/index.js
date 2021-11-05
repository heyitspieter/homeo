import { useState } from "react";
import { catchError, updateObject } from "src/helpers";

export function useApiHandler(apiCall) {
  const [reqState, setReqState] = useState({
    error: null,
    data: null,
    loading: false,
  });

  const clearData = () => {
    setReqState(
      updateObject(reqState, {
        data: null,
      })
    );
  };

  const clearError = () => {
    setReqState(
      updateObject(reqState, {
        error: null,
      })
    );
  };

  const handler = async (...data) => {
    setReqState(
      updateObject(reqState, {
        data: null,
        error: null,
        loading: true,
      })
    );

    try {
      const res = await apiCall(...data);

      setReqState(
        updateObject(reqState, {
          data: res.data,
          error: null,
          loading: false,
        })
      );

      return [res.data, null];
    } catch (err) {
      const error = catchError(err);

      if (error.message) {
        setReqState(
          updateObject(reqState, {
            error: error.message,
            data: null,
            loading: false,
          })
        );
      } else {
        setReqState(
          updateObject(reqState, {
            error,
            data: null,
            loading: false,
          })
        );
      }

      return [null, error.message ? error.message : error];
    }
  };

  return [handler, { ...reqState, clearData, clearError }];
}
