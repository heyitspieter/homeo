import { SWRConfig } from "swr";
import { wrapper } from "src/store";
import { ToastContainer } from "react-toastify";
import MapProvider from "src/context/MapContext";
import AuthProvider from "src/context/AuthContext";
import SidedrawerProvider from "src/context/SidedrawerContext";

import "react-toastify/dist/ReactToastify.min.css";
import "styles/globals.scss";

const toastConfig = {
  position: "top-center",
  pauseOnFocusLoss: true,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  newestOnTop: true,
  autoClose: 5000,
  theme: "colored",
  draggable: true,
  icon: false,
  rtl: false,
};

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
      }}
    >
      <AuthProvider>
        <SidedrawerProvider>
          <MapProvider>
            <Component {...pageProps} />
          </MapProvider>
        </SidedrawerProvider>
      </AuthProvider>
      <ToastContainer {...toastConfig} />
    </SWRConfig>
  );
}

export default wrapper.withRedux(MyApp);
