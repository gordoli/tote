import React from 'react';
import { Stack } from 'expo-router';
import {ActivityIndicator, StyleSheet} from 'react-native';

import { View } from "@/app/components/Themed";

const LoadingScreen = () => (
  <View style={styles.container}>
    <Stack.Screen
      options={{
      title: "",
      headerLeft: () => null,
      headerShadowVisible: false,
      }}
    />
    <ActivityIndicator size="small" color="#0C66E4" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default LoadingScreen;