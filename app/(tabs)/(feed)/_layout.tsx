import React from 'react';
import { Stack } from 'expo-router';

import BaseScreenHeader from "../../components/BaseScreenHeader";

const commonOptions = {
  headerBackTitleVisible: false,
  headerBackVisible: false,
};

const FeedLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="feed"
        options={{
          headerLeft: () => <BaseScreenHeader side="left" />,
          headerTitle: () => <BaseScreenHeader side="center" />,
          headerRight: () => <BaseScreenHeader side="right" />,
          headerShadowVisible: false,
        }}
      />
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

export default FeedLayout;