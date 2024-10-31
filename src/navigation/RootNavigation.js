import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigate from './TabNavigate';

export default function RootNavigation() {
    return (
        <NavigationContainer>
            <TabNavigate />
        </NavigationContainer>
    );
}
