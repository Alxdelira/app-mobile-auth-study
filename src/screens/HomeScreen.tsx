import { Button, StyleSheet, Text, View } from 'react-native'
import React, { Component, useContext } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import { AuthContext } from '../context/AuthContext'

export default function HomeScreen() {
    const { userInfo, isLoading, logout} = useContext(AuthContext)
    return (
        <View style={styles.container}>
            <Spinner visible={false} />
            <Text>Bem - Vindo {userInfo.usuario.nome}</Text>
            <Button title="Sair" onPress={logout} />
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
});