import React from 'react';
import { Stack } from 'expo-router';

const commonOptions = {
  headerBackTitleVisible: false,
  headerBackVisible: false,
};

const ScreensLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="brand"
        options={{...commonOptions}}
      />
      <Stack.Screen
        name="userProfile"
        options={{...commonOptions}}
      />
    </Stack>
  );
};

export default ScreensLayout;