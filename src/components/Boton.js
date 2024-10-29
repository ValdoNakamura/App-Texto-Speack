import { Text, View, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import Icon from "react-native-vector-icons/Ionicons";

export default function Boton({ title = 'None', icon=null,  onPress = () => {}, style = styles.btnGrande, styleText = styles.textoBtn }) {

    const [pressed, setPressed] = useState(false);

    return (
        <View style={styles.main}>
            <Pressable
                onPressIn={() => setPressed(true)}
                onPressOut={() => setPressed(false)}
                style={({ pressed }) => [
                    style,
                    { opacity: pressed ? 0.6 : 1.0 }    // Cambia la opacidad dependiendo del estado
                ]}
                onPress={onPress}
                >
                <Icon
                    name={icon}
                    size={80}
                    color="#fff"
                />
            <Text style={styleText}>{title}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnGrande: {
        width: 360,
        height: 500,
        marginBottom: 20,
        borderRadius: 45,
        backgroundColor: '#87ceeb',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    textoBtn: {
        fontSize: 26,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 10
    }
})