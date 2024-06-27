import React, { useState } from "react";
import { TouchableOpacity, TextInput, ScrollView } from "react-native";

import { useDebounce } from "../../hooks/useDebounce";
import { Category } from "@/app/lib/types";
import { View, Text } from "@/app/components/Themed";
import styles from "./styles";
import { CATEGORIES } from "@/constants/Categories";

export const Step1 = ({
  cancelModal,
  nextStep,
}: {
  cancelModal: () => void;
  nextStep: (step: number, value: any) => void;
  data: Category[];
}) => {
  const [text, onChangeText] = useState("");
  const [itemSelected, setItemSelected] = useState<number>(0);

  const handleSelectCategory = (id: number) => {
    setItemSelected(id);
  };

  return (
    <>
      <View>
        <View className="flex-row items-end justify-between">
          <View>
            <Text className="text-xs font-semibold text-gray-700">
              STEP 1 OF 4
            </Text>
            <Text className="text-lg font-semibold">Choose a category</Text>
          </View>
          <TouchableOpacity onPress={cancelModal}>
            <Text className="text-sm font-semibold text-gray-700">Cancel</Text>
          </TouchableOpacity>
        </View>
        {/* <TextInput
          placeholder="Search for a category"
          onChangeText={onChangeText}
          value={text}
          className="w-full h-10 p-2 mt-4 bg-gray-200 rounded-lg"
        /> */}
        <ScrollView className="flex pt-4">
          <View className="flex-row flex-wrap justify-start">
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                className="p-2 mb-3 mr-3 border-2 rounded-lg"
                onPress={() => handleSelectCategory(category.id)}
                style={
                  itemSelected !== category.id
                    ? styles.category
                    : styles.categorySelected
                }
              >
                <Text className="text-sm font-semibold text-gray-500">
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity
        className="items-center content-center p-2 rounded-lg"
        style={{ backgroundColor: itemSelected === 0 ? "#86b1f7" : "#0065FF" }}
        onPress={() => nextStep(2, itemSelected)}
        disabled={itemSelected === 0}
      >
        <Text className="text-sm font-semibold text-white">Next</Text>
      </TouchableOpacity>
    </>
  );
};
