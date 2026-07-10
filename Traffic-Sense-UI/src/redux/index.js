import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./combineReducers";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() =>
  console.log("Redux Data =>", JSON.parse(JSON.stringify(store.getState())))
);

export const persistor = persistStore(store);
export default store;
