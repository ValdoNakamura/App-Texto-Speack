import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStackNavigator from '../AuthNavigation'; 
import TabNavigate from '../TabNavigate'; 
import { useAuth } from '../../../data/AuthContext';
import { useNavigation } from '@react-navigation/native';


export default function MainNav() {
    const navigation = useNavigation();
    const Stack = createNativeStackNavigator();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigation.navigate('Auth');
        }
    }, [isAuthenticated, navigation]);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                <Stack.Screen name='inicio' component={TabNavigate} />
            ) : (
                <Stack.Screen name='Auth' component={AuthStackNavigator} />
            )}
        </Stack.Navigator>
    );
}
