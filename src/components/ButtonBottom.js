import { Pressable, Text, View, StyleSheet, Dimensions } from 'react-native'
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
        width: Dimensions.get('window').width,
        height: 100,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    btnReturn: {
        width: Dimensions.get('window').width - 10,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'black'
    },
    txtReturn: {
        color: 'white',
        fontSize: 20,
    }
})