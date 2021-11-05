import { useGetSession } from "src/hooks/auth";
import { createContext, useState, useContext, useEffect } from "react";

const authContext = createContext();

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [authState, setAuthState] = useState({
    error: null,
    isVeriying: null,
    isAuthenticated: false,
  });

  const {
    data: session,
    error: sessionErr,
    loading: verifying,
  } = useGetSession();

  useEffect(() => {
    if (session && session.isAuthenticated) {
      setAuthState({ ...authState, isAuthenticated: true });
    }

    if (sessionErr) {
      setAuthState({
        error: true,
        isVerifying: false,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, sessionErr]);

  function onSetAuthState(newState) {
    let newAuthState = {
      ...authState,
      ...newState,
    };

    setAuthState(newAuthState);
  }

  const auth = {
    ...authState,
    isVerifying: verifying,
    setAuthState: (state) => onSetAuthState(state),
  };

  return auth;
}

export default function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
