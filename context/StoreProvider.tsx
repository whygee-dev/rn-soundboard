import { Provider } from "react-redux";
import React from "react";
import { store } from "../redux/store";

const StoreProvider = ({ children }: any) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
