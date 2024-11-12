import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStackNavigator from '../AuthNavigation'; 
import TabNavigate from '../TabNavigate'; 
import { useAuth } from '../../../data/AuthContext';


const Stack = createNativeStackNavigator();

export default function MainNav() {
    const { isAuthenticated } = useAuth();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                <Stack.Screen name='inicio' component={TabNavigate}/>
            ) : (
                <Stack.Screen name='Auth' component={AuthStackNavigator} />
            )}
        </Stack.Navigator>
    );
}