import { View, Text } from "@/app/components/Themed";
import { DUMMY_PRODUCTS, Product } from "../lib/types";
import { Image, useWindowDimensions } from "react-native";
import ProductView from "../components/ProductView";
import RatingCircle from "../components/RatingCircle";
import { ScrollView } from "react-native";
import ToteTitle from "../components/ToteTitle";
import { FontAwesome } from "@expo/vector-icons";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import ProductCard from "../components/ProductCard";

// Tote Tabs
const MyProducts = () => {
  const [text, onChangeText] = useState("");

  return (
    <ScrollView>
      <View className="px-6 pt-6">
        <TextInput
          onChangeText={onChangeText}
          value={text}
          className="w-full h-10 p-2 bg-gray-200 rounded-lg"
          placeholder="Search products..."
        />
      </View>

      {DUMMY_PRODUCTS.map((product, i: number) => (
        <ProductCard key={i} product={product} />
      ))}
    </ScrollView>
  );
};

const MyWishlist = () => {
  const [text, onChangeText] = useState("");

  return (
    <ScrollView>
      <View className="px-6 pt-6">
        <TextInput
          onChangeText={onChangeText}
          value={text}
          className="w-full h-10 p-2 bg-gray-200 rounded-lg"
          placeholder="Search your wishlist..."
        />
      </View>

      {DUMMY_PRODUCTS.map((product, i: number) => (
        <ProductCard key={i} product={product} />
      ))}
    </ScrollView>
  );
};

const renderScene = SceneMap({
  myProducts: MyProducts,
  myWishlist: MyWishlist,
});

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "#0065FF" }}
    style={{ backgroundColor: "white" }}
    renderLabel={({ route, focused, color }) => (
      <View className="flex-row items-center justify-between">
        {/* {route.key === "myProducts" ? (
          <FontAwesome
            name="shopping-bag"
            color={focused ? "#0065FF" : "#787878"}
            size={20}
          />
        ) : (
          <FontAwesome
            name={focused ? "bookmark" : "bookmark-o"}
            color={focused ? "#0065FF" : "#787878"}
            size={16}
          />
        )} */}
        <Text
          style={{ color: focused ? "#0065FF" : "#787878", margin: 8 }}
          className="text-base font-semibold"
        >
          {route.title}
        </Text>
      </View>
    )}
  />
);

const Tote = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "myProducts", title: "My Products" },
    { key: "myWishlist", title: "Wishlist" },
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

export default Tote;

export const ToteScreenHeader = ({ side }: { side: string }) => {
  return (
    <>
      {side === "left" && (
        <View className="flex-row items-center px-4">
          <ToteTitle />
        </View>
      )}

      {side === "right" && (
        <View className="flex-row items-center px-4 space-x-2">
          {/* <FontAwesome name="plus-circle" size={20} /> */}
          <FontAwesome name="bell-o" size={20} />
        </View>
      )}
    </>
  );
};
