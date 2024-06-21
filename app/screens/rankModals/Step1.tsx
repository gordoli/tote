import React, { useState } from "react";
import { TouchableOpacity, TextInput, ScrollView } from "react-native";

import { useDebounce } from '../../hooks/useDebounce';
import { Category } from "@/app/lib/types";
import { View, Text } from "@/app/components/Themed";
import styles from "./styles";

export const Step1 = ({
  cancelModal,
  nextStep,
  data,
}: {
  cancelModal: () => void,
  nextStep: (step: number, value: any) => void,
  data: Category[],
}) => {
  const [categories, setCategories] = useState<Category[]>(data);
  const [text, onChangeText] = useState("");
  const [itemSelected, setItemSelected] = useState<number>(0);

  useDebounce(
    () => {
      setCategories(
        data.filter((d) => d.name.toLowerCase().includes(text.toLowerCase()))
      );
    },
    [data, text],
    800
  );

  const handleSelectCategory = (id: number) => {
    setItemSelected(id);
  };

  return (
    <>
      <View>
        <View className="flex-row justify-between items-end">
          <View>
            <Text className="text-xs font-semibold text-gray-700">STEP 1 OF 4</Text>
            <Text className="text-lg font-semibold">Choose a category</Text>
          </View>
          <TouchableOpacity onPress={cancelModal}>
            <Text className="text-sm font-semibold text-gray-700">Cancel</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Search for a category"
          onChangeText={onChangeText}
          value={text}
          className="w-full h-10 p-2 bg-gray-200 rounded-lg mt-4"
        />
        <ScrollView className="flex pt-4">
          <View className="flex-wrap flex-row justify-start">
            {categories.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="border-2 mr-3 mb-3 p-2 rounded-lg"
                onPress={() => handleSelectCategory(item.id)}
                style={itemSelected !== item.id ? styles.category : styles.categorySelected}
              >
                <Text className="text-sm text-gray-500 font-semibold">{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity
        className="items-center content-center p-2 rounded-lg"
        style={{backgroundColor: itemSelected === 0 ? "#86b1f7" : "#0065FF"}}
        onPress={() => nextStep(2, itemSelected)}
        disabled={itemSelected === 0}
      >
        <Text className="text-white text-sm font-semibold">Next</Text>
      </TouchableOpacity>
    </>
  );
};
