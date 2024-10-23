import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function Boton(props) {
    return (
        <View style={styles.main}>
            <TouchableOpacity
            style={styles.btnGrande}
            >
                <Text style={styles.textoBtn }>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btnGrande: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#72000E',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    textoBtn: {
        fontSize: 26,
        color: '#fff',
        fontWeight: 'bold'
    }
})