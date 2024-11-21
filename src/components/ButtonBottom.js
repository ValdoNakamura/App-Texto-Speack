import { Pressable, Text, View, StyleSheet } from 'react-native'
import { useState } from 'react'

export default function ButtomBottom({ title=null, onPress = () => {} }) {

    const [pressed, setPressed] = useState(false);


    return (
        <View style={styles.containerReturn}>
            <Pressable
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            style={({ pressed }) => [
                styles.btnReturn,
                { opacity: pressed ? 0.6 : 1.0 }   
            ]}
            onPress={onPress}
            >
                <Text style={styles.txtReturn}>{title}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    containerReturn: {
        position: 'absolute',
        width: '100%',
        height: 100,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E2022'
    },
    btnReturn: {
        width: '100%',
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'black'
    },
    txtReturn: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
})