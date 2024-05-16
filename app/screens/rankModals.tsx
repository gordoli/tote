import React, { useState } from "react";
import {Modalize} from 'react-native-modalize';
import { TouchableOpacity, Text, View, TextInput, ScrollView, Image, StyleSheet, FlatList } from "react-native";
import { FontAwesome, SimpleLineIcons, Entypo, FontAwesome6, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import { DUMMY_PRODUCTS, Product, DUMMY_BRANDS } from "@/app/lib/types";

const RankModals = ({
  cancelModal,
  modalizeRef,
}: {
  cancelModal: () => void,
  modalizeRef: any,
}) => {
  const [step, setStep] = useState(1);

  const nextStepAction = (num: number) => {
    setStep(num);
  };

  const handleCancelStep = () => {
    setStep(1);
    cancelModal && cancelModal();
  };

  const onClose = () => {
    modalizeRef.current.close();
  };

  return (
    <Modalize
      ref={modalizeRef}
      handlePosition="inside"
      adjustToContentHeight
      closeOnOverlayTap={false}
    >
      <View className="bg-white w-full flex-column justify-between p-4 pb-10 rounded-2xl">
        {step === 1 && <Step1 cancelModal={handleCancelStep} nextStep={() => nextStepAction(2)} />}
        {step === 2 && <Step2 cancelModal={handleCancelStep} nextStep={() => nextStepAction(3)} />}
        {step === 3 && <Step3 cancelModal={handleCancelStep} nextStep={() => nextStepAction(4)} />}
        {step === 4 && <Step4 cancelModal={handleCancelStep} nextStep={() => nextStepAction(5)} product={DUMMY_PRODUCTS[0]} />}
        {step === 5 && <Step5 cancelModal={handleCancelStep} />}
      </View>
    </Modalize>
  );
}

export default RankModals;


const Step1 = ({
  cancelModal,
  nextStep,
}: {
  cancelModal: () => void,
  nextStep: (step: number) => void,
}) => {
  const [text, onChangeText] = React.useState("");
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
            {DUMMY_BRANDS.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="border-2 border-gray-300 mr-3 mb-3 p-2 rounded-lg"
              >
                <Text className="text-sm text-gray-500 font-semibold">{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity
        className="items-center content-center p-2 rounded-lg"
        style={{backgroundColor: '#0065FF'}}
        onPress={() => nextStep(2)}
      >
        <Text className="text-white text-sm font-semibold">Next</Text>
      </TouchableOpacity>
    </>
  );
};

const Step2 = ({
  cancelModal,
  nextStep,
}: {
  cancelModal: () => void,
  nextStep: (step: number) => void,
}) => {
  const [name, onChangeName] = React.useState("");
  const [description, onChangeDes] = React.useState("");
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
        style={{backgroundColor: '#0065FF'}}
        onPress={() => nextStep(2)}
      >
        <Text className="text-white text-sm font-semibold">Next</Text>
      </TouchableOpacity>
    </>
  );
};

const Step3 = ({
  cancelModal,
  nextStep,
}: {
  cancelModal: () => void,
  nextStep: (step: number) => void,
}) => {
  const [link, setLink] = React.useState("");
  return (
    <>
      <View>
        <View className="flex-row justify-between items-end">
          <View className="w-3/4">
            <Text className="text-xs font-semibold text-gray-700">STEP 3 OF 4</Text>
            <Text className="text-lg font-semibold">More information about this product</Text>
          </View>
          <TouchableOpacity onPress={cancelModal}>
            <Text className="text-sm font-semibold text-gray-700">Cancel</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-sm text-gray-700 mt-4">Product link</Text>
        <TextInput
          onChangeText={setLink}
          placeholder="Enter product link here"
          value={link}
          className="w-full h-10 p-2 bg-gray-200 rounded-lg"
        />
        <Text className="text-sm text-gray-700 mt-4">Upload image</Text>
        <View className="flex-row justify-between items-center border border-gray-300 rounded-lg p-3">
          <View className="flex-row">
            <View className="bg-gray-300 p-2 rounded mr-2">
              <FontAwesome name="camera" size={18} color="gray" />
            </View>
            <View>
              <Text className="text-sm">Upload product's image</Text>
              <Text className="text-xs text-gray-400">Max. size 3MB</Text>
            </View>
          </View>
          <TouchableOpacity
            className="border-2 border-gray-200 p-2 rounded-lg bg-gray-200"
          >
            <Text className="text-sm text-gray-500 font-semibold">Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        className="items-center content-center p-2 rounded-lg mt-5"
        style={{backgroundColor: '#0065FF'}}
        onPress={() => nextStep(2)}
      >
        <Text className="text-white text-sm font-semibold">Next</Text>
      </TouchableOpacity>
    </>
  );
};

const Step4 = ({
  cancelModal,
  nextStep,
  product,
}: {
  cancelModal: () => void,
  nextStep: (step: number) => void,
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
          <View>
            <Text className="text-sm font-semibold">{product.name}</Text>
            <Text className="text-xs text-gray-500">{`${product.brand.name} . ${product.category}`}</Text>
          </View>
        </View>
      </View>
      <View className="flex-row flex-swap justify-between" style={styles.selectionContainer}>
        <TouchableOpacity style={[styles.likedSelection, styles.selectionItem]} onPress={nextStep}>
          <SimpleLineIcons name="emotsmile" size={24} color="white" />
          <Text className="text-sm pt-1 text-white">I liked it!</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-200" style={[styles.fineSelection, styles.selectionItem]} onPress={nextStep}>
          <FontAwesome6 name="face-meh" size={24} color="black" />
          <Text className="text-sm pt-1">It was fine</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.dislikeSelection, styles.selectionItem]} onPress={nextStep}>
          <Entypo name="emoji-sad" size={24} color="white" />
          <Text className="text-sm text-white pt-1">I don't like it!</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const Step5 = ({
  cancelModal,
}: {
  cancelModal: () => void,
}) => {
  const renderItem = (item: Product) => {
    return (
      <View className="border-2 border-gray-300 rounded-lg items-center p-5 mr-3" style={{width: '12.5%'}}>
        <Image src={item.image} className="h-10 w-10 rounded-lg mr-3" />
          <View>
            <Text className="text-sm font-semibold text-center">{item.name}</Text>
            <Text className="text-xs text-gray-500 text-center">{item.brand.name}</Text>
          </View>
      </View>
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
          <ScrollView horizontal>
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
          onPress={cancelModal}
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

const styles = StyleSheet.create({
  selectionContainer: {
    borderTopWidth: 1,
    borderTopColor: "#e6e6e6",
    marginTop: 15,
    paddingTop: 15,
  },
  selectionItem: {
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    padding: 7,
  },
  likedSelection: {
    width: "32%",
    backgroundColor: "#00b33c",
  },
  fineSelection: {
    width: "32%",

  },
  dislikeSelection: {
    width: "32%",
    backgroundColor: "#ff4d4d",
  },
  buttonSelectPrefer: {
    alignItems: "center",
    width: "15%",
    padding: 7,
  },
  shuffleButton: {
    backgroundColor: '#0065FF',
    width: "65%",
  },
});