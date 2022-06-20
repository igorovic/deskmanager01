import "../styles/globals.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import store from "lib/app/store";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);

/* <Provider store={store}> 
<Component {...pageProps} />
</Provider>*/
