import { useEffect, useRef } from "react";
import { StyleSheet, Animated, Pressable } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

export default ({ item, accessibilityState, onPress }) => {

    const translate = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(translate, {
                toValue: accessibilityState.selected ? 1 : 0,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: accessibilityState.selected ? 1 : 0,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start();
    }, [accessibilityState.selected]);

    const translateStyles = {
        transform: [
            {
                translateY: translate.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 30],
                    extrapolate: "clamp",
                })
            }
        ]
    };

    const scaleStyles = {
        opacity: scale.interpolate({
            inputRange: [.5, 1],
            outputRange: [.5, 1],
            extrapolate: 'clamp'
        }),
        transform: [
            {
                scale: scale
            }
        ]
    }

    return (
        <Pressable onPress={()=> onPress(item.screen) } style={styles.container}>
            <Animated.View style={[styles.button, translateStyles]}>
                <Animated.View style={[styles.circuloinvisible, scaleStyles]} />
                <Icon
                    name={item.icon}
                    size={30}
                    color={accessibilityState.selected ? "#fff" : "#72000E"}
                />
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 70,
        alignSelf: "stretch" 
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 4,
        borderColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    circuloinvisible: {
        width: 50,
        height: 50,
        borderRadius: 100,
        position: 'absolute',
        backgroundColor: '#72000E'
    },
    translate: {
        transform: [{ translateY: -30 }]
    },
    scale: {
        opacity: 1,
        transform: [{ scale: 1 }]
    }
});