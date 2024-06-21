import React from "react";
import { TouchableOpacity, TextInput } from "react-native";

import { View, Text } from "@/app/components/Themed";

export const Step2 = ({
  cancelModal,
  nextStep,
}: {
  cancelModal: () => void,
  nextStep: (step: number, value: any) => void,
}) => {
  const [name, onChangeName] = React.useState("");
  const [description, onChangeDes] = React.useState("");

  const onNextStep = () => {
    const value = {
      name,
      description,
    };
    nextStep(3, value);
  };

  const checkIsRequired = () => !!name && !! description;

  return (
    <>
      <View>
        <View className="flex-row justify-between items-end">
          <View>
            <Text className="text-xs font-semibold text-gray-700">STEP 2 OF 4</Text>
            <Text className="text-lg font-semibold">Describe this product</Text>
          </View>
          <TouchableOpacity onPress={cancelModal}>
            <Text className="text-sm font-semibold text-gray-700">Cancel</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-sm text-gray-700 mt-4">Name</Text>
        <TextInput
          onChangeText={onChangeName}
          placeholder="Enter name here"
          value={name}
          className="w-full h-10 p-2 bg-gray-200 rounded-lg"
        />
        <Text className="text-sm text-gray-700 mt-4">Description</Text>
        <TextInput
          onChangeText={onChangeDes}
          placeholder="Type here..."
          numberOfLines={4}
          multiline
          maxLength={40}
          editable
          value={description}
          className="w-full h-20 p-2 bg-gray-200 rounded-lg"
        />
      </View>
      <TouchableOpacity
        className="items-center content-center p-2 rounded-lg mt-5"
        style={{backgroundColor: !checkIsRequired() ? "#86b1f7" : "#0065FF"}}
        onPress={onNextStep}
        disabled={!checkIsRequired()}
      >
        <Text className="text-white text-sm font-semibold">Next</Text>
      </TouchableOpacity>
    </>
  );
};
