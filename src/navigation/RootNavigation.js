import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '../../data/AuthContext';

import MainNav from './main/MainNav';


export default function RootNavigation() {
    

    return (
        <AuthProvider>
            <NavigationContainer>
                <MainNav/>
            </NavigationContainer>
        </AuthProvider>
    );
}