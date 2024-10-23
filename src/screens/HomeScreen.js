import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen() {
    return (
        <View>
            <Icon name="rocket" size={30} color="#900" />
            <Text>Home</Text>
        </View>
    )
}