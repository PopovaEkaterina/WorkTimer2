import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const ActionButtonStyles = StyleSheet.create({
    touchableStyle: {
        width:134,
        height:44,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    captionStyle: {
        fontSize: 24,
        textAlign: 'center',
        textTransform: 'lowercase'
    }

})

const ActionButton = ({label, textColor, backgroundColor, onPress}) => {
    return(
        <TouchableOpacity
            style={[{backgroundColor}, ActionButtonStyles.touchableStyle]}
            onPress={onPress}
        >
            <Text style={[ActionButtonStyles.captionStyle, {color: textColor}]}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default ActionButton