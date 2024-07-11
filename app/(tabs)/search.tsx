import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useWindowDimensions } from "react-native";

import { Text, TextInput, View } from "@/app/components/Themed";
import { useEffect, useState } from "react";
import BrandList from "../components/brand/BrandList";
import UserList from "../components/user/UserList";
import { useBrandList } from "../hooks/useBrandList";
import { useUserList } from "../hooks/useUserList";
import { useSearchTerm } from "../hooks/useSearch";
import { Stack } from "expo-router";
import BaseScreenHeader from "../components/BaseScreenHeader";

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "#0065FF" }}
    style={{ backgroundColor: "white" }}
    renderLabel={({ route, focused, color }) => (
      <Text
        style={{ color: focused ? "#0065FF" : "#787878", margin: 8 }}
        className="text-base font-semibold"
      >
        {route.title}
      </Text>
    )}
  />
);

const Search = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "brands", title: "Brands" },
    { key: "users", title: "Users" },
  ]);

  const { brands } = useBrandList();
  const { users, handleGetUsers, searchTerm, setSearchTerm } = useSearchTerm();

  useEffect(() => {
    handleGetUsers();
  }, [searchTerm]);

  useEffect(() => {
    console.log(routes[index].key);
  }, [index]);

  const renderScene = SceneMap({
    brands: () => <BrandList brands={brands} />,
    users: () => <UserList users={users} />,
  });

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BaseScreenHeader side="left" />
        }}
      />
      <View className="px-6">
        <TextInput
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          className="w-full h-12 p-2 bg-gray-200 rounded-lg"
        />
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </>
  );
};

export default Search;
