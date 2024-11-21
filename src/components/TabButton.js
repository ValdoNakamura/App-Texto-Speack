import { useEffect, useRef } from "react";
import { StyleSheet, Animated } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function TabButton({ item, accessibilityState, onPress }) {
    const translate = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0)).current;

    const selected = accessibilityState ? accessibilityState.selected : false;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(translate, {
                toValue: selected ? 1 : 0,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: selected ? 1 : 0,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start();
    }, [selected]);

    const translateStyles = {
        transform: [
            {
                translateY: translate.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 20],
                    extrapolate: "clamp",
                })
            }
        ]
    };

    const scaleStyles = {
        opacity: scale.interpolate({
            inputRange: [0.5, 1],
            outputRange: [0.5, 1],
            extrapolate: "clamp"
        }),
        transform: [
            {
                scale: scale
            }
        ]
    };

    return (
        <Animated.View style={[styles.button, translateStyles]} onPress={onPress}>
            <Animated.View style={[styles.circuloinvisible, scaleStyles]} />
            <Icon
                name={item.icon}
                size={30}
                color={selected ? "#fff" : "#1E2022"}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    circuloinvisible: {
        width: 50,
        height: 50,
        borderRadius: 100,
        position: "absolute",
        backgroundColor: "#1E2022",
    }
});