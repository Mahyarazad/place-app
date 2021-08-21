import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import {AntDesign} from '@expo/vector-icons';


const CustomHeaderButton = props => {
    return <HeaderButton IconComponent={AntDesign} iconSize={props.size} {...props}/>
}

export default CustomHeaderButton