import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext, AuthContextType } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

export default function LoginScreen() {
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const val = useContext(AuthContext)
    const { isLoading,login } = useContext(AuthContext)
    return (        
        <View style={styles.container}>
            <Spinner visible={isLoading} />
            <View style={styles.wraper}>
                <TextInput
                    placeholder="Digite seu E-mail..."
                    style={styles.input}
                    value={email as string}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    placeholder="Digite sua senha"
                    style={styles.input}
                    value={senha as string}
                    onChangeText={(text) => setSenha(text)}
                    secureTextEntry
                />
                <Button title="Entrar" onPress={() => login({email, senha} as AuthContextType)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wraper: {
        width: '80%',
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,

    },
});