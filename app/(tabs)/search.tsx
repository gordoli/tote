import { View, Text } from "@/app/components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { Image, TextInput, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Avatar from "../components/Avatar";
import { Brand, DUMMY_BRANDS } from "../lib/types";

const FirstRoute = () => {
  const [text, onChangeText] = React.useState("Useless Text");
  return (
    <View className="flex-1 p-4 bg-white">
      <TextInput
        onChangeText={onChangeText}
        value={text}
        className="w-full h-10 p-2 bg-gray-200 rounded-lg"
      />
      <View className="mt-2">
        {DUMMY_BRANDS.map((brand: Brand, i: number) => (
          <View key={i} className="flex-row items-center py-2">
            <Image src={brand.logo} className="w-8 h-8 mr-2 rounded" />
            <View>
              <Text className="font-semibold">{brand.name}</Text>
              {/* <Text className="text-sm text-muted">1.2k followers</Text> */}
            </View>

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

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "black" }}
    style={{ backgroundColor: "white" }}
    renderLabel={({ route, focused, color }) => (
      <Text style={{ color: "black", margin: 8 }}>{route.title}</Text>
    )}
  />
);

const renderScene = SceneMap({
  brands: FirstRoute,
  members: SecondRoute,
});

const Search = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
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
