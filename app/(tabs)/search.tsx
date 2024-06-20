import * as React from "react";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import {
  Image,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import { View, Text } from "@/app/components/Themed";
import { Brand, DUMMY_BRANDS, DUMMY_USER, User } from "../lib/types";
import { useState } from "react";
import Avatar from "../components/Avatar";
import FollowButton from "../components/FollowButton";

const BrandsList = () => {
  const [text, onChangeText] = useState("");
  const router = useRouter();

  const onGoToBrandProfile = (brand: Brand) => {
    router.navigate({
      pathname: "/screens/brand",
      params: brand,
    });
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <TextInput
        onChangeText={onChangeText}
        value={text}
        className="w-full h-10 p-2 bg-gray-200 rounded-lg"
        placeholder="Search brands..."
      />
      <View className="mt-2">
        {DUMMY_BRANDS.map((brand: Brand, i: number) => (
          <View key={i} className="flex-row items-center py-2">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => onGoToBrandProfile(brand)}
            >
              <Image src={brand.logo} className="w-8 h-8 mr-2 rounded" />
              <View>
                <Text className="font-semibold">{brand.name}</Text>
              </View>
            </TouchableOpacity>
            <View className="!ml-auto flex-row items-center items-end space-x-2">
              <FontAwesome name="plus-circle" size={20} />
              <FontAwesome name="bookmark-o" size={20} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const MembersList = () => {
  const [text, onChangeText] = useState("");

  return (
    <View className="flex-1 p-4 bg-white">
      <TextInput
        onChangeText={onChangeText}
        value={text}
        className="w-full h-10 p-2 bg-gray-200 rounded-lg"
        placeholder="Search brands..."
      />
      <View className="mt-2">
        {DUMMY_USER.map((user: User, i: number) => (
          <View key={i} className="flex-row items-center justify-between py-2">
            <TouchableOpacity className="flex-row items-center">
              <Avatar src={user.avatar} size="sm" />
              <View className="ml-2">
                <Text className="font-semibold">{user.name}</Text>
                <Text className="text-sm text-muted">{user.username}</Text>
              </View>
            </TouchableOpacity>

            <FollowButton />
          </View>
        ))}
      </View>
    </View>
  );
};

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

const renderScene = SceneMap({
  brands: BrandsList,
  members: MembersList,
});

const Search = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "brands", title: "Brands" },
    { key: "members", title: "Members" },
  ]);

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
