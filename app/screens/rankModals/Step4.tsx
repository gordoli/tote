import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { SimpleLineIcons, Entypo, FontAwesome6 } from "@expo/vector-icons";

import styles from "./styles";
import { View, Text } from "@/app/components/Themed";
import { Product } from "@/app/lib/types";

export const Step4 = ({
  cancelModal,
  nextStep,
  product,
}: {
  cancelModal: () => void,
  nextStep: (step: number, value: any) => void,
  product: Product
}) => {

  return (
    <>
      <View>
        <View className="flex-row justify-between items-end">
          <View className="w-3/4">
            <Text className="text-xs font-semibold text-gray-700">STEP 4 OF 4</Text>
            <Text className="text-lg font-semibold">How do you feel about this?</Text>
          </View>
          <TouchableOpacity onPress={cancelModal}>
            <Text className="text-sm font-semibold text-gray-700">Cancel</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center border border-gray-200 bg-gray-200 rounded-lg p-3 mt-4">
          <Image src={product.image} className="h-10 w-10 rounded-lg mr-3" />
          <View className="bg-gray-200">
            <Text className="text-sm font-semibold">{product.name}</Text>
            <Text className="text-xs text-gray-500">{`${product.brand.name} . ${product.category}`}</Text>
          </View>
        </View>
      </View>
      <View className="flex-row flex-swap justify-between" style={styles.selectionContainer}>
        <TouchableOpacity style={[styles.likedSelection, styles.selectionItem]} onPress={() => nextStep(5, 1)}>
          <SimpleLineIcons name="emotsmile" size={24} color="white" />
          <Text className="text-sm pt-1 text-white">I liked it!</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-200" style={[styles.fineSelection, styles.selectionItem]} onPress={() => nextStep(5, 2)}>
          <FontAwesome6 name="face-meh" size={24} color="black" />
          <Text className="text-sm pt-1">It was fine</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.dislikeSelection, styles.selectionItem]} onPress={() => nextStep(5, 3)}>
          <Entypo name="emoji-sad" size={24} color="white" />
          <Text className="text-sm text-white pt-1">I don't like it!</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
