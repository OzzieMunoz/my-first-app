import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

const MainScreen: React.FC = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Welcome to Seasonal Bites</Text>
            <Text style={styles.subtitle}>Discover what’s fresh and in season!</Text>
            <Button title="Browse Seasonal Foods" onPress={() => {}} />
            <Button title="View Saved Favorites" onPress={() => {}} />
            <Button title="Logout" onPress={() => {}} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default MainScreen;
