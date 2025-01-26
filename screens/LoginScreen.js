import React, { useEffect } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import * as AuthSession from 'expo-auth-session';

const CLIENT_ID = '182265266677-u4ofarac9oa03td50v5ps1300fj7rii8.apps.googleusercontent.com';
const REDIRECT_URI = AuthSession.makeRedirectUri({ useProxy: true });
console.log('Redirect URI:', REDIRECT_URI);

export default function LoginScreen({ navigation }) {
    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: CLIENT_ID,
            redirectUri: REDIRECT_URI,
            scopes: ['profile', 'email'],
            responseType: 'code', // Use "code" for PKCE flow
        },
        { authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth' }
    );

    useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            console.log('Authorization Code:', code);

            // Exchange the authorization code for an access token
            fetch('https://oauth2.googleapis.com/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `code=${code}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&grant_type=authorization_code`,
            })
                .then((res) => res.json())
                .then((data) => {
                    Alert.alert('Login Successful!', `Access Token: ${data.access_token}`);
                    navigation.navigate('Main');
                })
                .catch((error) => {
                    console.error('Token Exchange Error:', error);
                    Alert.alert('Error', 'Failed to exchange the authorization code for a token.');
                });
        } else if (response?.type === 'error') {
            Alert.alert('Login Failed', 'An error occurred during login.');
        }
    }, [response]);

    return (
        <View style={styles.container}>
            <Button
                title="Login with Google"
                disabled={!request}
                onPress={() => {
                    console.log('Login button pressed!');
                    promptAsync();
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
});
