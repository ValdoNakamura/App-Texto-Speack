import { View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StyleSheet } from "react-native"
import Boton from "../components/Boton"


export default function Roads() {

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Boton title='Ir al Explorador' onPress={()=> navigation.navigate("RouteExplorer")}/>
        </View>
    )
}

const  styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E2022'
    }
})