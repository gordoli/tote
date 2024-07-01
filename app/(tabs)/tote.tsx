import { View, Text } from "@/app/components/Themed";
import { useWindowDimensions } from "react-native";
import ToteTitle from "../components/ToteTitle";
import { FontAwesome } from "@expo/vector-icons";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useState } from "react";
import { useTote } from "../hooks/useTote";
import ProductList from "../components/product/ProductList";
import { useWishlist } from "../hooks/useWishlist";
import { useProductList } from "../hooks/useProductList";

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "#0065FF" }}
    style={{ backgroundColor: "white" }}
    renderLabel={({ route, focused, color }) => (
      <View className="flex-row items-center justify-between">
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
  // const { data, loading: toteLoading, error: toteError } = useTote();
  const { products, loading: toteLoading, error: toteError } = useProductList();
  const {
    wishlistProducts,
    loading: wishlistLoading,
    error: wishlistError,
  } = useWishlist(true);

  const renderScene = SceneMap({
    myProducts: () => <ProductList products={products} />,
    myWishlist: () => <ProductList products={wishlistProducts} />,
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
