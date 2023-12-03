import React from 'react';
import { BrowserRouter } from "react-router-dom";
import RoutesBlocks from "../src/routing";
import { Provider } from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react';
import {store, persist} from "./redux/store";

function App () {
  return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persist}>
              <BrowserRouter>
                  <RoutesBlocks/>
              </BrowserRouter>
          </PersistGate>
      </Provider>
  );
}

export default App;
