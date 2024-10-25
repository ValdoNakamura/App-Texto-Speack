import { View } from "react-native"
import { useNavigation } from "@react-navigation/native"

import Boton from "../components/Boton"


export default function Roads() {

    const navigation = useNavigation()

    return (
        <View>
            <Boton 
                onPress={()=> navigation.navigate("Page Roads")}
            />
        </View>
    )
}