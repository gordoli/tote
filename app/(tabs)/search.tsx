import * as React from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useWindowDimensions } from "react-native";

import { Text } from "@/app/components/Themed";
import { useState } from "react";
import BrandList from "../components/brand/BrandList";
import UserList from "../components/user/UserList";
import { useBrandList } from "../hooks/useBrandList";
import { useUserList } from "../hooks/useUserList";

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
  const { users } = useUserList();

  const renderScene = SceneMap({
    brands: () => <BrandList brands={brands} />,
    users: () => <UserList users={users} />,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
};

export default Search;
