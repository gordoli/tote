import React from 'react';
import { Stack } from 'expo-router';

import BaseScreenHeader from "../../components/BaseScreenHeader";

const commonOptions = {
  headerBackTitleVisible: false,
  headerBackVisible: false,
};

const SearchLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="search"
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
    </Stack>
  );
};

export default SearchLayout;