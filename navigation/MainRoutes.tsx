import React from "react";
import TabNavigation from "./TabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigatorTheme } from "../theme/navigator";

const Stack = createNativeStackNavigator() as any;

type Props = {};

const MainRoutes = (props: Props) => {
  return (
    <NavigationContainer theme={navigatorTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabbed" component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRoutes;
