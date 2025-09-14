import { useEffect } from "react";
import { I18nProvider } from "@lingui/react";
import { i18n, activate } from "./i18n";
import PrivateRoute from "./components/Routes/PrivateRoute";
function App() {
  useEffect(() => {
    activate("en");
  }, []);

  return (
    <div className="container">
      <I18nProvider i18n={i18n}>
        <PrivateRoute />
      </I18nProvider>
    </div>
  );
}

export default App;
