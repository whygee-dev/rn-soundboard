import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { useSelector } from "../redux/hooks";
import { selectActiveSamples, setActiveSamples } from "../redux/slices/samplesSlice";
import { DEFAULT_SAMPLES, MAX_COLUMNS, MAX_ROWS } from "../tools/constants";
import { useDispatch } from "react-redux";

const Splash = ({ children }: { children?: any }) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const samples = useSelector(selectActiveSamples);
  const dispatch = useDispatch();

  const startAsync = async () => {
    await Font.loadAsync({ "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf") });

    //if (samples.length === MAX_ROWS * MAX_COLUMNS) {
    console.log("Using default samples");
    dispatch(setActiveSamples(DEFAULT_SAMPLES));
    //}
  };

  if (!appIsReady) {
    return <AppLoading startAsync={startAsync} onFinish={() => setAppIsReady(true)} onError={console.warn} />;
  }

  return <>{children}</>;
};

export default Splash;
