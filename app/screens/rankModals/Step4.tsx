import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { SimpleLineIcons, Entypo, FontAwesome6 } from "@expo/vector-icons";

import styles from "./styles";
import { View, Text } from "@/app/components/Themed";
import { Product, RankingData } from "@/app/lib/types";
import LoadingScreen from "@/app/components/LoadingScreen";

export const Step4 = ({
  cancelModal,
  nextStep,
  loading,
}: {
  cancelModal: () => void;
  nextStep: (step: number, value: any) => void;
  loading?: boolean;
}) => {
  return (
    <>
      <View>
        <View className="flex-row items-end justify-between">
          <View className="w-4/5">
            <Text className="text-xs font-semibold text-gray-700">
              STEP 4 OF 4
            </Text>
            <Text className="text-lg font-semibold">
              How do you feel about this product?
            </Text>
          </View>
          <TouchableOpacity onPress={cancelModal}>
            <Text className="text-sm font-semibold text-gray-700">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <View className="h-[100px]">
          <LoadingScreen />
        </View>
      ) : (
        <View>
          <View className="flex-row-reverse items-center justify-around gap-1 mt-4 h-[100px]">
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
          </View>

          <View className="flex-row items-center justify-between px-5 -mt-2">
            <Text>Love!</Text>
            <Text>Meh</Text>
            <Text>Hate</Text>
          </View>
        </View>
      )}
    </>
  );
};
