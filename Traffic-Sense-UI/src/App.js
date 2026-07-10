import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./redux/index";
import Router from "./router";
import colors from "./config/colors";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: colors.PRIMARY,
      },
      secondary: {
        main: colors.SECONDARY,
      },
      background: colors.BACKGROUND_WHITE,
    },
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
