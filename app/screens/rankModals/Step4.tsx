import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { SimpleLineIcons, Entypo, FontAwesome6 } from "@expo/vector-icons";

import styles from "./styles";
import { View, Text } from "@/app/components/Themed";
import { Product, RankingData } from "@/app/lib/types";

export const Step4 = ({
  cancelModal,
  nextStep,
}: {
  cancelModal: () => void;
  nextStep: (step: number, value: any) => void;
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
        className="flex-row-reverse justify-around gap-1 mt-4"
        // style={styles.selectionContainer}
      >
        <TouchableOpacity
          className="items-center justify-center w-1/6 rounded-lg !bg-rateColor1 aspect-square"
          onPress={() => nextStep(5, 1)}
        >
          <Text className="text-3xl">😠</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center justify-center w-1/6 rounded-lg bg-rateColor2 aspect-square"
          onPress={() => nextStep(5, 2)}
        >
          <Text className="text-3xl">🙁</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center justify-center w-1/6 rounded-lg bg-rateColor3 aspect-square"
          onPress={() => nextStep(5, 3)}
        >
          <Text className="text-3xl">😐</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center justify-center w-1/6 rounded-lg bg-rateColor4 aspect-square"
          onPress={() => nextStep(5, 4)}
        >
          <Text className="text-3xl">🙂</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center justify-center w-1/6 rounded-lg bg-rateColor5 aspect-square"
          onPress={() => nextStep(5, 5)}
        >
          <Text className="text-3xl">😍</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={[styles.likedSelection, styles.selectionItem]}
          onPress={() => nextStep(5, 3)}
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
          onPress={() => nextStep(5, 1)}
        >
          <Entypo name="emoji-sad" size={24} color="white" />
          <Text className="pt-1 text-sm text-white">I don't like it!</Text>
        </TouchableOpacity> */}
      </View>
    </>
  );
};
