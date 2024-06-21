import React from "react";
import { TouchableOpacity, ScrollView, Image, Dimensions } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import styles from "./styles";
import { View, Text } from "@/app/components/Themed";
import { DUMMY_PRODUCTS, Product } from "@/app/lib/types";

const { width } = Dimensions.get("screen");

export const Step5 = ({
  cancelModal,
  handlRanking,
  handlSelectItem,
}: {
  cancelModal: () => void,
  handlRanking: () => void,
  handlSelectItem: (num: number, value: any) => void,
}) => {
  const renderItem = (item: Product) => {
    return (
      <TouchableOpacity
        key={item.name}
        className="border-2 border-gray-300 rounded-lg items-center p-5 mr-3"
        style={{width: width*0.4}}
        // onPress={() => handlSelectItem(6, null)}
      >
        <Image src={item.image} className="h-10 w-10 rounded-lg mr-3" />
        <View>
          <Text className="text-sm font-semibold text-center">{item.name}</Text>
          <Text className="text-xs text-gray-500 text-center">{item.brand.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View>
        <View className="flex-row justify-between items-end">
          <View className="w-3/4">
            <Text className="text-lg font-semibold">Which do you prefer?</Text>
          </View>
          <TouchableOpacity onPress={cancelModal}>
            <Text className="text-sm font-semibold text-gray-700">Cancel</Text>
          </TouchableOpacity>
        </View>
        <View className="pt-5">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {DUMMY_PRODUCTS.map((item) => renderItem(item))}
          </ScrollView>
        </View>
      </View>
      <View className="flex-row items-center justify-between w-full mt-5">
        <TouchableOpacity className="bg-gray-300 rounded-lg" style={styles.buttonSelectPrefer}>
          <MaterialCommunityIcons name="arrow-left-top" size={20} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center justify-center p-2 rounded-lg"
          onPress={handlRanking}
          style={styles.shuffleButton}
        >
          <Text className="text-white text-sm font-semibold">Shuffle</Text>
          <MaterialIcons name="shuffle" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-300 rounded-lg" style={styles.buttonSelectPrefer}>
          <MaterialCommunityIcons name="arrow-right-top" size={20} color="gray" />
        </TouchableOpacity>
      </View>
    </>
  );
};
