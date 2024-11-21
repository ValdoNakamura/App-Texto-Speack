import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ActivityIndicator, Text, Pressable } from 'react-native';
import { FireBase_Auth, FireBase_DB } from '../../data/FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();
    const auth = FireBase_Auth;

    const singIn = async () => {
        if (!email.trim() || !password.trim()) {
            alert('Por favor, llena ambos campos.');
            return;
        }
    
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            const user = response.user;
    

            if (!user.emailVerified) {
                alert(
                    'Tu correo no ha sido verificado. Por favor, revisa tu bandeja de entrada.'
                );
                await sendEmailVerification(user);
                return;
            }
    
            alert('Inicio de sesión exitoso');
        } catch (error) {
            console.log(error.message);
            setErrorMessage('Inicio de sesión fallido: ' + error.message);
        } finally {
            setLoading(false);
        }
    };    

const singUp = async () => {
    if (!email.trim() || !password.trim()) {
        alert('Por favor, llena ambos campos.');
        return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;

        await sendEmailVerification(user);
        alert(
            'Cuenta creada con éxito. Por favor, verifica tu correo antes de iniciar sesión.'
        );

        const uid = user.uid;
        await setDoc(doc(FireBase_DB, 'usuarios', uid), {
            email: email,
            createdAt: new Date().toISOString(),
        });

        navigation.replace('inicio');
    } catch (error) {
        console.log(error);
        setErrorMessage('Registro fallido: ' + error.message);
    } finally {
        setLoading(false);
    }
};

    return (
        <View style={styles.container}>
            <TextInput
                value={email}
                style={styles.input}
                placeholder='Email'
                autoCapitalize='none'
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                value={password}
                style={styles.input}
                placeholder='Password'
                autoCapitalize='none'
                secureTextEntry
                onChangeText={(pass) => setPassword(pass)}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View style={styles.containerBtnLogin}>
                    <Pressable style={styles.btnLogin} onPress={singIn}>
                        <Text style={styles.textBtnLogin}>Login</Text>
                    </Pressable>
                    <Pressable style={styles.btnLogin} onPress={singUp}>
                        <Text style={styles.textBtnLogin}>Create Account</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
    },
    containerBtnLogin: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnLogin:{
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: '#404040'
    },
    textBtnLogin: {
        fontSize: 20,
        color: '#fff'
    },
    error: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
});