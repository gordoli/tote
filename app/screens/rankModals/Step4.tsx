import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { SimpleLineIcons, Entypo, FontAwesome6 } from "@expo/vector-icons";

import styles from "./styles";
import { View, Text } from "@/app/components/Themed";
import { Product, RankingData } from "@/app/lib/types";

export const Step4 = ({
  cancelModal,
  nextStep,
  data,
}: {
  cancelModal: () => void;
  nextStep: (step: number, value: any) => void;
  data: RankingData;
}) => {
  return (
    <>
      <View>
        <View className="flex-row items-end justify-between">
          <View className="w-3/4">
            <Text className="text-xs font-semibold text-gray-700">
              STEP 4 OF 4
            </Text>
            <Text className="text-lg font-semibold">
              How do you feel about this?
            </Text>
          </View>
          <TouchableOpacity onPress={cancelModal}>
            <Text className="text-sm font-semibold text-gray-700">Cancel</Text>
          </TouchableOpacity>
        </View>
        {/*  */}
      </View>
      <View
        className="flex-row justify-between flex-swap"
        style={styles.selectionContainer}
      >
        <TouchableOpacity
          style={[styles.likedSelection, styles.selectionItem]}
          onPress={() => nextStep(5, 1)}
        >
          <SimpleLineIcons name="emotsmile" size={24} color="white" />
          <Text className="pt-1 text-sm text-white">I liked it!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-gray-200"
          style={[styles.fineSelection, styles.selectionItem]}
          onPress={() => nextStep(5, 2)}
        >
          <FontAwesome6 name="face-meh" size={24} color="black" />
          <Text className="pt-1 text-sm">It was fine</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dislikeSelection, styles.selectionItem]}
          onPress={() => nextStep(5, 3)}
        >
          <Entypo name="emoji-sad" size={24} color="white" />
          <Text className="pt-1 text-sm text-white">I don't like it!</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
