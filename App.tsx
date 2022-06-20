import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, View, Dimensions } from "react-native";
import MainRoutes from "./navigation/MainRoutes";
import Splash from "./components/Splash";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

export default function App() {
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View>
        <Image
          source={require("./assets/images/bg.png")}
          style={{
            width: "100%",
            height: Dimensions.get("window").height,
            position: "absolute",
            zIndex: -100000000,
          }}
        ></Image>
      </View>

      <StatusBar animated style="dark" hidden />

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Splash>
            <MainRoutes></MainRoutes>
          </Splash>
        </PersistGate>
      </Provider>
    </View>
  );
}
