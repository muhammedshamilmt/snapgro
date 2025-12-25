import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function TestSupabase() {
  const { user, session, loading } = useAuth();
  const [connectionStatus, setConnectionStatus] = useState('Testing...');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1);
      
      if (error) {
        setConnectionStatus(`Connected! (Expected error: ${error.message})`);
      } else {
        setConnectionStatus('Connected successfully!');
      }
    } catch (err: any) {
      setConnectionStatus(`Connection failed: ${err.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Supabase Connection Test</Text>
      <Text style={styles.status}>Status: {connectionStatus}</Text>
      <Text style={styles.info}>Loading: {loading ? 'Yes' : 'No'}</Text>
      <Text style={styles.info}>User: {user ? user.email : 'Not logged in'}</Text>
      <Text style={styles.info}>Session: {session ? 'Active' : 'None'}</Text>
      
      <TouchableOpacity style={styles.button} onPress={testConnection}>
        <Text style={styles.buttonText}>Test Connection</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  status: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  info: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
    color: '#666',
  },
  button: {
    backgroundColor: '#2bee6c',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});