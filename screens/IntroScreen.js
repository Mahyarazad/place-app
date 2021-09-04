import React from "react";
import { Image } from "react-native";

const IntroScreen = ({ item }) => {
    return (
        <Image source={item.image} resizeMode="stretch" style={{flex:1, width:'100%', height:'100%'}}/>
    );
  }

export default IntroScreen;
