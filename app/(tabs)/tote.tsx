import React from "react";
import { View, Text } from "@/app/components/Themed";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import ToteTitle from "../components/ToteTitle";
import { FontAwesome } from "@expo/vector-icons";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useEffect, useState } from "react";
import ProductList from "../components/product/ProductList";
import { useWishlist } from "../hooks/useWishlist";
import { Product } from "../lib/types";
import { get } from "../lib/api";
import { CATEGORIES } from "@/constants/Categories";
import FilterPill from "../components/FilterPill";
import { Stack } from "expo-router";
import BaseScreenHeader from "../components/BaseScreenHeader";
import { useCurrentUser } from "../hooks/useCurrentUser";

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
  const { currUser } = useCurrentUser();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "myProducts", title: "My Products" },
    { key: "myWishlist", title: "Wishlist" },
  ]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categoriesSelected, setCategoriesSelected] = useState<number[]>([]);

  useEffect(() => {
    if (currUser) {
      const fetchData = async () => {
        try {
          const result = await get(`/products/?createdBy=${currUser.id}`);
          setProducts(result.data);
        } catch (err: any) {
          console.log(err);
        }
      };

      fetchData();
    }
  }, [currUser]);

  const { wishlistProducts } = useWishlist(true);
  const [wishlist, setWishlist] = useState<Product[] | null>(wishlistProducts);

  useEffect(() => {
    setWishlist(wishlistProducts);
  }, [wishlistProducts]);

  const toggleCategory = (categoryId: number) => {
    setCategoriesSelected((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filterProductsByCategory = (products: Product[]) => {
    if (categoriesSelected.length === 0) return products;
    return products.filter((product) =>
      categoriesSelected.includes(product.category?.id || 0)
    );
  };

  const renderScene = SceneMap({
    myProducts: () => (
      <ProductList products={filterProductsByCategory(products)} />
    ),
    myWishlist: () => (
      <ProductList products={filterProductsByCategory(wishlist || [])} />
    ),
  });

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BaseScreenHeader side="left" />,
        }}
      />
      <View className="flex-row flex-wrap justify-start gap-2 px-6">
        <Text className="self-center pt-2">Filter by:</Text>
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            onPress={() => toggleCategory(category.id)}
            className={`cursor-pointer px-4 py-2 bg-gray/20 rounded-full ${
              categoriesSelected.includes(category.id)
                ? "bg-blue/10 !text-blue !border-none"
                : "text-gray-800"
            }`}
          >
            <Text
              className={
                categoriesSelected.includes(category.id)
                  ? "text-blue"
                  : "text-gray-800"
              }
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
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
