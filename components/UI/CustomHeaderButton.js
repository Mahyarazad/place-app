import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { AntDesign, Feather } from "@expo/vector-icons";

const CustomHeaderButton = (props) => {
	const iconName = () => {
		switch (props.iconName) {
			case "pluscircle":
				return AntDesign;
			case "save":
				return Feather;
			case "filter":
				return Feather;
		}
	};
	return (
		<HeaderButton IconComponent={iconName()} iconSize={props.size} {...props} />
	);
};

export default CustomHeaderButton;
