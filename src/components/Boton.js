import { Text, View, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from '../styles';

export default function Boton({ title=null, icon=null,  onPress = () => {} }) {

    const [pressed, setPressed] = useState(false);

    return (
        <View style={styles.main}>
            <Pressable
                onPressIn={() => setPressed(true)}
                onPressOut={() => setPressed(false)}
                style={({ pressed }) => [
                    styles.btnGrande,
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
                <Text style={styles.textoBtn}>{title}</Text>
            </Pressable>
        </View>
    )
}