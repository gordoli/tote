import React, { useState } from "react";
import { Modalize } from "react-native-modalize";
import {
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";

import { View, Text } from "@/app/components/Themed";
import { Brand, Request } from "@/app/lib/types";

const RequestModals = ({
  cancelModal,
  modalizeRef,
  onDoneRequest,
}: {
  cancelModal: () => void;
  modalizeRef: any;
  onDoneRequest: (request: Request) => void;
}) => {
  const [step, setStep] = useState(1);
  const [brandSelected, setBrandSelected] = useState<Brand | null>(null);

  const nextStepAction = (num: number) => {
    setStep(num);
  };

  const handleDoneRequest = (description: string) => {
    const newRequest: Request = {
      user: DUMMY_USER[0],
      brand: brandSelected,
      note: description,
      createdTime: new Date(),
    };
    onDoneRequest(newRequest);
    handleCancelStep();
  };

  const handleCancelStep = () => {
    setStep(1);
    cancelModal && cancelModal();
  };

  const onSelectBrand = (item: Brand) => {
    if (item && item.id === brandSelected?.id) {
      setBrandSelected(null);
    } else {
      setBrandSelected(item);
    }
  };

  return (
    <Modalize
      ref={modalizeRef}
      handlePosition="inside"
      adjustToContentHeight
      closeOnOverlayTap={false}
    >
      <View className="justify-between w-full p-4 bg-white flex-column rounded-2xl">
        {step === 1 && (
          <Step1
            cancelModal={handleCancelStep}
            nextStep={() => nextStepAction(2)}
            selectBrand={onSelectBrand}
            brandSelected={brandSelected}
          />
        )}
        {step === 2 && (
          <Step2
            cancelModal={handleCancelStep}
            finishStep={handleDoneRequest}
          />
        )}
      </View>
    </Modalize>
  );
};

export default RequestModals;

const Step1 = ({
  cancelModal,
  nextStep,
  selectBrand,
  brandSelected,
}: {
  cancelModal: () => void;
  nextStep: (step: number) => void;
  selectBrand: (brand: Brand) => void;
  brandSelected: Brand | null;
}) => {
  return (
    <>
      <View>
        <View className="flex-row items-end justify-between">
          <View>
            <Text className="text-xs font-semibold text-gray-700">
              STEP 1 OF 2
            </Text>
            <Text className="text-lg font-semibold">Choose a category</Text>
          </View>
          <TouchableOpacity onPress={cancelModal}>
            <Text className="text-sm font-semibold text-gray-700">Cancel</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className="flex pt-4">
          <View className="flex-row flex-wrap justify-start">
            {DUMMY_BRANDS.map((item: Brand) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => selectBrand(item)}
                className="p-2 mb-3 mr-3 border-2 rounded-lg"
                style={
                  brandSelected && brandSelected.id === item.id
                    ? styles.itemBrandSelected
                    : styles.itemBrand
                }
              >
                <Text
                  className="text-sm font-semibold"
                  style={
                    brandSelected && brandSelected.id === item.id
                      ? styles.itemBrandNameSelected
                      : styles.itemBrandName
                  }
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity
        className="items-center content-center p-2 rounded-lg"
        style={{ backgroundColor: "#0065FF" }}
        onPress={() => nextStep(2)}
      >
        <Text className="text-sm font-semibold text-white">Next</Text>
      </TouchableOpacity>
    </>
  );
};

const Step2 = ({
  cancelModal,
  finishStep,
}: {
  cancelModal: () => void;
  finishStep: (des: string) => void;
}) => {
  const [description, onChangeDes] = React.useState("");
  return (
    <>
      <View>
        <View className="flex-row items-end justify-between pb-3">
          <View>
            <Text className="text-xs font-semibold text-gray-700">
              STEP 2 OF 2
            </Text>
            <Text className="text-lg font-semibold">
              What are you looking for?
            </Text>
          </View>
          <TouchableOpacity onPress={cancelModal}>
            <Text className="text-sm font-semibold text-gray-700">Cancel</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          onChangeText={onChangeDes}
          placeholder="Type here..."
          numberOfLines={4}
          multiline
          maxLength={40}
          editable
          value={description}
          className="w-full h-40 p-2 bg-gray-200 rounded-lg"
        />
      </View>
      <TouchableOpacity
        className="items-center content-center p-2 mt-5 rounded-lg"
        style={{ backgroundColor: "#0065FF" }}
        onPress={() => finishStep(description)}
      >
        <Text className="text-sm font-semibold text-white">Done</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  itemBrandSelected: {
    borderColor: "#0065FF",
    backgroundColor: "#0065ff1f",
  },
  itemBrand: {
    borderColor: "#091e4214",
    backgroundColor: "white",
  },
  itemBrandName: {
    color: "#5D6B82",
  },
  itemBrandNameSelected: {
    color: "#0065FF",
  },
});
