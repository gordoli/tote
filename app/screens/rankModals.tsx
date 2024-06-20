import React, { useState } from "react";
import { Modalize } from "react-native-modalize";
import {
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import {
  FontAwesome,
  SimpleLineIcons,
  Entypo,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { View, Text } from "@/app/components/Themed";
import { DUMMY_PRODUCTS, Product, DUMMY_BRANDS } from "@/app/lib/types";
import { CATEGORIES, CATEGORY } from "../lib/const";

type RankBody = {
  category: CATEGORY;
  name: string;
  description: string;
  link: string;
  image: string;
  feeling: number;
};

const RankModals = ({
  cancelModal,
  modalizeRef,
}: {
  cancelModal: () => void;
  modalizeRef: any;
}) => {
  const [step, setStep] = useState(1);
  const [rankBody, setRankBody] = useState<RankBody>({
    category: CATEGORY.Shoes,
    name: "",
    description: "",
    link: "",
    image: "",
    feeling: 0,
  });

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
      <View className="justify-between w-full p-4 pb-10 bg-white flex-column rounded-2xl">
        {step === 1 && (
          <Step1
            cancelModal={handleCancelStep}
            nextStep={() => nextStepAction(2)}
            rankBody={rankBody}
            setRankBody={setRankBody}
          />
        )}
        {step === 2 && (
          <Step2
            cancelModal={handleCancelStep}
            nextStep={() => nextStepAction(3)}
            rankBody={rankBody}
            setRankBody={setRankBody}
          />
        )}
        {step === 3 && (
          <Step3
            cancelModal={handleCancelStep}
            nextStep={() => nextStepAction(4)}
            rankBody={rankBody}
            setRankBody={setRankBody}
          />
        )}
        {step === 4 && (
          <Step4
            cancelModal={handleCancelStep}
            nextStep={() => nextStepAction(5)}
            product={DUMMY_PRODUCTS[0]}
            rankBody={rankBody}
            setRankBody={setRankBody}
          />
        )}
        {step === 5 && <Step5 cancelModal={handleCancelStep} />}
      </View>
    </Modalize>
  );
};

export default RankModals;

// Step 1: Choose a category
const Step1 = ({
  cancelModal,
  nextStep,
  rankBody,
  setRankBody,
}: {
  cancelModal: () => void;
  nextStep: (step: number) => void;
  rankBody: RankBody;
  setRankBody: (rankBody: RankBody) => void;
}) => {
  const onNext = (category: CATEGORY) => {
    setRankBody({ ...rankBody, category });
    nextStep(2);
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
        <ScrollView className="flex pt-4">
          <View className="flex-row flex-wrap justify-start">
            {CATEGORIES.map((category: CATEGORY, i: number) => (
              <TouchableOpacity
                key={i}
                className="p-2 mb-3 mr-3 border-2 border-gray-300 rounded-lg"
                onPress={() => onNext(category)}
              >
                <Text className="text-sm font-semibold text-gray-500">
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      {/* <TouchableOpacity
        className="items-center content-center p-2 rounded-lg"
        style={{ backgroundColor: "#0065FF" }}
        onPress={() => nextStep(2)}
      >
        <Text className="text-sm font-semibold text-white">Next</Text>
      </TouchableOpacity> */}
    </>
  );
};

// Step 2: Describe this product (name, description)
const Step2 = ({
  cancelModal,
  nextStep,
  rankBody,
  setRankBody,
}: {
  cancelModal: () => void;
  nextStep: (step: number) => void;
  rankBody: RankBody;
  setRankBody: (rankBody: RankBody) => void;
}) => {
  const [name, onChangeName] = React.useState("");
  const [description, onChangeDes] = React.useState("");

  const onNext = () => {
    setRankBody({ ...rankBody, name, description });
    nextStep(3);
  };
  return (
    <>
      <View>
        <View className="flex-row items-end justify-between">
          <View>
            <Text className="text-xs font-semibold text-gray-700">
              STEP 2 OF 4
            </Text>
            <Text className="text-lg font-semibold">Describe this product</Text>
          </View>
          <TouchableOpacity onPress={cancelModal}>
            <Text className="text-sm font-semibold text-gray-700">Cancel</Text>
          </TouchableOpacity>
        </View>
        <Text className="mt-4 text-sm text-gray-700">Name</Text>
        <TextInput
          onChangeText={onChangeName}
          placeholder="Enter name here"
          value={name}
          className="w-full h-10 p-2 bg-gray-200 rounded-lg"
        />
        <Text className="mt-4 text-sm text-gray-700">Description</Text>
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
        className="items-center content-center p-2 mt-5 rounded-lg"
        style={{ backgroundColor: "#0065FF" }}
        onPress={() => onNext()}
      >
        <Text className="text-sm font-semibold text-white">Next</Text>
      </TouchableOpacity>
    </>
  );
};

// Step 3: More information about this product (link and image)
const Step3 = ({
  cancelModal,
  nextStep,
  rankBody,
  setRankBody,
}: {
  cancelModal: () => void;
  nextStep: (step: number) => void;
  rankBody: RankBody;
  setRankBody: (rankBody: RankBody) => void;
}) => {
  const [link, setLink] = React.useState("");
  const onNext = () => {
    setRankBody({ ...rankBody, link });
    nextStep(4);
  };
  return (
    <>
      <View>
        <View className="flex-row items-end justify-between">
          <View className="w-3/4">
            <Text className="text-xs font-semibold text-gray-700">
              STEP 3 OF 4
            </Text>
            <Text className="text-lg font-semibold">
              More information about this product
            </Text>
          </View>
          <TouchableOpacity onPress={cancelModal}>
            <Text className="text-sm font-semibold text-gray-700">Cancel</Text>
          </TouchableOpacity>
        </View>
        <Text className="mt-4 text-sm text-gray-700">Product link</Text>
        <TextInput
          onChangeText={setLink}
          placeholder="Enter product link here"
          value={link}
          className="w-full h-10 p-2 bg-gray-200 rounded-lg"
        />
        <Text className="mt-4 text-sm text-gray-700">Upload image</Text>
        <View className="flex-row items-center justify-between p-3 border border-gray-300 rounded-lg">
          <View className="flex-row">
            <View className="p-2 mr-2 bg-gray-300 rounded">
              <FontAwesome name="camera" size={18} color="gray" />
            </View>
            <View>
              <Text className="text-sm">Upload product's image</Text>
              <Text className="text-xs text-gray-400">Max. size 3MB</Text>
            </View>
          </View>
          <TouchableOpacity className="p-2 bg-gray-200 border-2 border-gray-200 rounded-lg">
            <Text className="text-sm font-semibold text-gray-500">Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        className="items-center content-center p-2 mt-5 rounded-lg"
        style={{ backgroundColor: "#0065FF" }}
        onPress={() => onNext()}
      >
        <Text className="text-sm font-semibold text-white">Next</Text>
      </TouchableOpacity>
    </>
  );
};

// Step 4: How do you feel about this product?
const Step4 = ({
  cancelModal,
  nextStep,
  product,
  rankBody,
  setRankBody,
}: {
  cancelModal: () => void;
  nextStep: (step: number) => void;
  product: Product;
  rankBody: RankBody;
  setRankBody: (rankBody: RankBody) => void;
}) => {
  const onNext = (feeling: number) => {
    setRankBody({ ...rankBody, feeling });
    alert(JSON.stringify(rankBody));
    nextStep(5);
  };

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
        <View className="flex-row items-center p-3 mt-4 bg-gray-200 border border-gray-200 rounded-lg">
          <Image src={product.image} className="w-10 h-10 mr-3 rounded-lg" />
          <View>
            <Text className="text-sm font-semibold">{product.name}</Text>
            <Text className="text-xs text-gray-500">{`${product.brand.name} . ${product.category}`}</Text>
          </View>
        </View>
      </View>
      <View
        className="flex-row justify-between flex-swap"
        style={styles.selectionContainer}
      >
        <TouchableOpacity
          style={[styles.likedSelection, styles.selectionItem]}
          onPress={() => onNext(1)}
        >
          <SimpleLineIcons name="emotsmile" size={24} color="white" />
          <Text className="pt-1 text-sm text-white">I liked it!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-gray-200"
          style={[styles.fineSelection, styles.selectionItem]}
          onPress={() => onNext(0)}
        >
          <FontAwesome6 name="face-meh" size={24} color="black" />
          <Text className="pt-1 text-sm">It was fine</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dislikeSelection, styles.selectionItem]}
          onPress={() => onNext(-1)}
        >
          <Entypo name="emoji-sad" size={24} color="white" />
          <Text className="pt-1 text-sm text-white">I don't like it!</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const Step5 = ({ cancelModal }: { cancelModal: () => void }) => {
  const renderItem = (item: Product) => {
    return (
      <View
        className="items-center p-5 mr-3 border-2 border-gray-300 rounded-lg"
        style={{ width: "12.5%" }}
      >
        <Image src={item.image} className="w-10 h-10 mr-3 rounded-lg" />
        <View>
          <Text className="text-sm font-semibold text-center">{item.name}</Text>
          <Text className="text-xs text-center text-gray-500">
            {item.brand.name}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <>
      <View>
        <View className="flex-row items-end justify-between">
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
        <TouchableOpacity
          className="bg-gray-300 rounded-lg"
          style={styles.buttonSelectPrefer}
        >
          <MaterialCommunityIcons
            name="arrow-left-top"
            size={20}
            color="gray"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center justify-center p-2 rounded-lg"
          onPress={cancelModal}
          style={styles.shuffleButton}
        >
          <Text className="text-sm font-semibold text-white">Shuffle</Text>
          <MaterialIcons name="shuffle" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-gray-300 rounded-lg"
          style={styles.buttonSelectPrefer}
        >
          <MaterialCommunityIcons
            name="arrow-right-top"
            size={20}
            color="gray"
          />
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
    backgroundColor: "#0065FF",
    width: "65%",
  },
});
