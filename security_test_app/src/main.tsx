import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_DOMAIN}
      clientId={import.meta.env.VITE_CLIENT_ID}
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
