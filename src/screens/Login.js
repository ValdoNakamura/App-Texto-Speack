import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ActivityIndicator, Text, Pressable } from 'react-native';
import { FireBase_Auth } from '../../data/FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../data/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();
    const auth = FireBase_Auth;

    const singIn = async () => {
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Inicio de sesión exitoso');
            navigation.replace('inicio');
        } catch (error) {
            console.log(error.message);
            setErrorMessage('Inicio de sesión fallido: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const singUp = async () => {
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Cuenta creada con éxito');
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
//<Button title='Login' onPress={singIn} />
//<Button title='Create Account' onPress={singUp} />

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