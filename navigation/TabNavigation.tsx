import React, { useEffect, useState } from "react";
import { Image, Keyboard } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Sampler";
import Library from "../screens/Library";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          left: 0,
          bottom: 0,
          right: 0,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          elevation: 0,
        },
        tabBarShowLabel: false,
        tabBarButton: isKeyboardVisible ? () => [] : undefined,
      })}
    >
      <Tab.Screen
        name="Sampler"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? require("../assets/icons/SamplerActive.png") : require("../assets/icons/Sampler.png")} />
          ),
        }}
      />

      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? require("../assets/icons/SequencerActive.png") : require("../assets/icons/Sequencer.png")} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
