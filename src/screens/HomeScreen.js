import { View, StyleSheet, Button } from 'react-native';
import * as Speech from 'expo-speech';
import { useEffect } from 'react';


export default function HomeScreen() {
    
    useEffect(() => {
        const thingToSay = 'testing';

        Speech.speak(thingToSay, {
            language: 'es',
            pitch: 1,
            rate: 1
        });
    })

    return (
        <View style={styles.container}>
            <Button title="Press to hear some words" onPress={speak} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    },
});
