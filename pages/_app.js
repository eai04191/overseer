import "../styles/tailwind.css";
import "../styles/index.css";
import "../styles/tailwind-utils.css";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
    return (
        <Provider session={pageProps.session}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
