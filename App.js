import React from 'react';
import { AuthProvider } from './data/AuthContext';  // Asegúrate de que la ruta sea correcta
import RootNavigation from './src/navigation/RootNavigation'; // Ruta hacia la navegación

export default function App() {
    return (
        <AuthProvider>
            <RootNavigation />
        </AuthProvider>
    );
}