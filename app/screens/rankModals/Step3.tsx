import React from "react";
import { TouchableOpacity, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from "expo-image-picker";

import { View, Text } from "@/app/components/Themed";
import styles from "./styles";

export const Step3 = ({
  cancelModal,
  nextStep,
}: {
  cancelModal: () => void;
  nextStep: (step: number, value: any) => void;
}) => {
  const [link, setLink] = React.useState("");
  const [image, setImage] = React.useState<ImagePicker.ImagePickerAsset | null>(
    null
  );
  const [error, setError] = React.useState("");

  const handlePasteLink = async () => {
    const text = await Clipboard.getStringAsync();
    setLink(text);
  };

  const onNextStep = () => {
    const value = {
      link,
      image: "",
    };
    nextStep(4, value);
  };

  const validateLink = () => {
    const regex =
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    return regex.test(link);
  };

  const checkIsRequired = () => !!link && !!image;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const bytesToSize = (bytes: number): string => {
    const sizes: string[] = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "n/a";
    const i: number = parseInt(
      Math.floor(Math.log(bytes) / Math.log(1024)).toString()
    );
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
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
              Additional Information
            </Text>
          </View>
          <TouchableOpacity onPress={cancelModal}>
            <Text className="text-sm font-semibold text-gray-700">Cancel</Text>
          </TouchableOpacity>
        </View>
        <Text className="mt-4 text-sm text-gray-700">Product link</Text>
        <View className="w-full">
          <TextInput
            onChangeText={setLink}
            placeholder="Enter product link here"
            value={link}
            className="w-full h-10 p-2 bg-gray-200 rounded-lg"
          />
          {!!link ? (
            <TouchableOpacity
              onPress={() => setLink("")}
              style={styles.pasteButton}
            >
              <FontAwesome name="close" size={18} color="gray" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handlePasteLink}
              style={styles.pasteButton}
            >
              <Text className="text-sm font-semibold" style={styles.pasteText}>
                Paste
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <Text className="mt-4 text-sm text-gray-700">Upload image</Text>
        <View className="flex-row items-center justify-between p-3 border border-gray-300 rounded-lg">
          <View className="flex-row">
            <View className="p-2 mr-2 bg-gray-300 rounded">
              <FontAwesome name="camera" size={18} color="gray" />
            </View>
            <View>
              <Text className="text-sm">
                {image ? image.uri.split("/").pop() : "Upload product's image"}
              </Text>
              <Text className="text-xs text-gray-400">
                {image && image.fileSize
                  ? bytesToSize(image.fileSize)
                  : "Max. size 3MB"}
              </Text>
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
        onPress={onNextStep}
        disabled={!checkIsRequired()}
      >
        <Text className="text-sm font-semibold text-white">Next</Text>
      </TouchableOpacity>
    </>
  );
};
