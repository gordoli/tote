import React, { useState } from "react";
import {Modalize} from 'react-native-modalize';
import { FontAwesome } from "@expo/vector-icons";
import Accordion from 'react-native-collapsible/Accordion';
import { Image, Text, View, ViewStyle, StyleSheet } from "react-native";

import Avatar from "../components/Avatar";
import RatingCircle from "../components/RatingCircle";
import { DUMMY_USER, User } from "@/app/lib/types";

const FriendsSuggestedModals = ({
  modalizeRef,
}: {
  modalizeRef: any,
}) => {
  const [activeSections, setActiveSections] = useState<number[] | []>([]);

  const isSelected = (value: User) => activeSections && activeSections.length > 0 && DUMMY_USER[activeSections[0]].id === value.id;

  const renderHeader = (section: User, index: number) => {
    return (
      <View className="flex-row items-center justify-between py-3" style={index === 0 ? {} : styles.friendSuggestedItem}>
        <View className="flex-row items-center">
          <Avatar src={section.avatar} size="sm" />
          <Text className="text-gray font-semibold text-sm pl-2">{section.name}</Text>
        </View>
        <FontAwesome name={isSelected(section) ? "angle-up" : "angle-down"} size={22} color="gray" />
      </View>
    );
  };

  const renderContent = (section: User) => {
    return (
      <View className="bg-gray-200 px-3 rounded-lg mb-2">
        {section.products.map((item) => (
          <View className="flex-row items-center justify-between py-3" key={`${item.brand.id}-${item.name}`}>
            <View className="flex-row items-center">
              <Image src={item.image} className="w-8 h-8 rounded-lg" />
              <View className="pl-3">
                <Text className="text-sm">{item.name}</Text>
                <Text className="text-sm text-gray-600">{item.brand.name}</Text>
              </View>
            </View>
              <RatingCircle rating={item.rating} radius={15} numberStyles={styles.ratingNumber} />
          </View>
        ))}
      </View>
    );
  };

  const updateSections = (indexs: number[]) => {
    setActiveSections(indexs);
  };

  return (
    <Modalize
      ref={modalizeRef}
      handlePosition="inside"
      adjustToContentHeight
    >
      <View className="bg-white w-full flex-column justify-between p-4 rounded-2xl">
        <View className="flex-row justify-between items-end">
          <View>
            <Text className="text-lg font-semibold">Your Friends suggested</Text>
          </View>
        </View>
        <Accordion
          sections={DUMMY_USER}
          activeSections={activeSections}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={updateSections}
          underlayColor="#F5F5F5"
          renderAsFlatList
        />
      </View>
    </Modalize>
  );
}

export default FriendsSuggestedModals;

const styles = StyleSheet.create({
  ratingNumber: {
    fontSize: 11,
  } as ViewStyle,
  friendSuggestedItem: {
    borderTopWidth: 1,
    borderTopColor: "#C8C8C8"
  },
});