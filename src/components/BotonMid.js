import { Text, View, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import { stylesMain } from '../stylesMain.js';

export default function Boton({ title=null, icon=null, style, styleText, onPress = () => {} }) {

    const [pressed, setPressed] = useState(false);

    return (
        <View style={stylesMain.main}>
            <Pressable
                onPressIn={() => setPressed(true)}
                onPressOut={() => setPressed(false)}
                style={({ pressed }) => [
                    style,
                    { opacity: pressed ? 0.6 : 1.0 }   
                ]}
                onPress={onPress}
                >
                {
                    icon && (
                        <Icon
                    name={icon}
                    size={80}
                    color="#fff"
                />
                )}
                <Text style={styleText}>{title}</Text>
            </Pressable>
        </View>
    )
}