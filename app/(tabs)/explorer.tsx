import { useState, useRef } from "react";
import { useRouter } from "expo-router";
import { FontAwesome, Entypo, Octicons, Feather } from "@expo/vector-icons";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { FlatList, ViewStyle, TextInput, TouchableOpacity, Image, useWindowDimensions, Dimensions } from "react-native";

import ToteTitle from "../components/ToteTitle";
import { Brand, DUMMY_BRANDS, Request } from "../lib/types";
import { View, Text } from "@/app/components/Themed";
import RatingCircle from "../components/RatingCircle";
import RequestModals from "../screens/requestModals";
import FriendsSuggestedModals from "../screens/friendsSuggestedModals";

const { width } = Dimensions.get("screen");

const BrandsTab = () => {
  const [text, onChangeText] = useState("");
  const router = useRouter();

  const onGoToBrandProfile = (brand: Brand) => {
    router.navigate({
      pathname: "/screens/brand",
      params: brand,
    });
  };
  
  const renderItem = ({item} : {item: Brand}) => {
    return (
      <TouchableOpacity
        onPress={() => onGoToBrandProfile(item)}
        style={styles.brandItemsContainer}
        className="items-center bg-gray-100 border-gray-300 border rounded-lg p-5 mb-3"
      >
        <Image src={item.logo} className="w-10 h-10 rounded-lg" />
        <Text className="text-base font-semibold py-2">{item.name}</Text>
        <View className="flex-row justify-around w-full bg-gray-100">
          <View className="bg-gray-100">
            <RatingCircle rating={item.overallRating} radius={17} numberStyles={styles.ratingNumber} />
            <Text className="text-xs text-gray-800 pt-1">Overall</Text>
          </View>
          <View className="bg-gray-100">
            <RatingCircle rating={item.friendsRating} radius={17} numberStyles={styles.ratingNumber} />
            <Text className="text-xs text-gray-800 pt-1">Friends</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder="Search for a brand, items, etc."
        className="w-full h-10 p-2 bg-gray-200 rounded-lg"
        placeholderTextColor={"#787878"}
      />
      <View className="pb-10 pt-5">
        <FlatList
          data={DUMMY_BRANDS}
          keyExtractor={(item: Brand) => item.id}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
        />
      </View>
    </View>
  );
};

const RequestsTab = () => {
  const router = useRouter();
  const modalizeCreateRequestModal = useRef(null);
  const modalizeShowFriendsModal = useRef(null);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "myrequests", title: "My Requests" },
    { key: "friendsrequests", title: "Friends Requests" },
  ]);
  const [requests, setRequests] = useState<Request[] | []>([]);

  const openCreateRequestModal = () => {
    modalizeCreateRequestModal.current?.open();
  };

  const cancelCreateRequestModal = () => {
    modalizeCreateRequestModal.current?.close();
  };

  const openShowFriendsModal = () => {
    modalizeShowFriendsModal.current?.open();
  };

  const renderTabBarRequests = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "transparent" }}
      style={styles.requestsTabbar}
      tabStyle={{ width: "auto" }}
      renderLabel={({ route, focused }) => (
        <View
          style={{
            position: "relative",
            backgroundColor: focused ? "#0065ff1f" : "#091e4214",
          }}
          className="p-2 px-3 rounded-2xl mt-3"
        >
          <Text
            className="font-semibold text-sm"
            style={{
              color: focused ? "#0065FF" : "#5D6B82"
            }}
          >
            {route.title}
          </Text>
          {route.key === "friendsrequests" && (
            <View
              className="rounded-full w-7 h-7"
              style={styles.friendsRequestsNotifNum}
            >
              <Text className="text-white font-semibold">3</Text>
            </View>
          )}
        </View>
      )}
    />
  );
  
  const renderSceneRequests = SceneMap({
    myrequests: () => myRequestsTab(),
    friendsrequests: () => friendsRequestsTab(),
  });

  const onCreateNewRequest = (data: Request) => {
    setRequests([...requests, data]);
  };

  const renderRequestItem = ({item} : {item: Request}) => {
    return (
      <View className="flex-row items-center justify-between bg-gray-200 px-4" style={styles.requestItemContainer}>
        <TouchableOpacity
          style={styles.requestItemContent}
          className="bg-gray-200"
          onPress={openShowFriendsModal}
        >
          <Text className="text-base text-gray-800">
            You requested
            <Text className="text-base font-semibold">{` ${item.brand?.name}`}</Text>
          </Text>
          <Text className="text-sm text-gray-600">{item.note}</Text>
        </TouchableOpacity>
        <View className="flex-row items-center justify-between bg-gray-200" style={styles.requestItemActions}>
          <Octicons name="pencil" size={22} color="gray" />
          <Feather name="trash-2" size={22} color="gray" />
        </View>
      </View>
    );
  };

  const myRequestsTab = () => {
    return (
      <View className="flex-1 py-4 bg-white">
        {requests.length === 0 ? (
          <View className="flex-1 justify-center px-4">
            <Text className="text-base text-gray-700 text-center pb-3">You don't have any requests yet</Text>
            <TouchableOpacity
              className="flex-row justify-center items-center rounded-lg py-2"
              style={styles.createRequest}
              onPress={openCreateRequestModal}
            >
              <Text className="text-base text-white font-semibold">Create Request</Text>
              <Entypo name="plus" size={22} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={requests}
            keyExtractor={(item: Request) => `${item.createdTime}`}
            renderItem={renderRequestItem}
          />
        )}
        <RequestModals
          cancelModal={cancelCreateRequestModal}
          modalizeRef={modalizeCreateRequestModal}
          onDoneRequest={onCreateNewRequest}
        />
        <FriendsSuggestedModals
          modalizeRef={modalizeShowFriendsModal}
        />
      </View>
    );
  };
  
  const friendsRequestsTab = () => {
    return (
      <View>
        <Text>my request</Text>
      </View>
    );
  };
  
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderSceneRequests}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBarRequests}
    />
  );
};

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "#0065FF" }}
    style={{ backgroundColor: "white" }}
    renderLabel={({ route, focused, color }) => (
      <Text
        className="font-semibold text-sm"
        style={{
          color: focused ? "#0065FF" : "#5D6B82"
        }}
      >
        {route.title}
      </Text>
    )}
  />
);

const renderScene = SceneMap({
  brands: BrandsTab,
  requests: RequestsTab,
  aiconcierge: BrandsTab,
});

const Explorer = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "brands", title: "Brands For You" },
    { key: "requests", title: "Requests" },
    { key: "aiconcierge", title: "AI Concierge" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
};

export default Explorer;

export const ExplorerScreenHeader = ({ side }: { side: string }) => {
  return (
    <>
      {side === "left" && (
        <View className="flex-row items-center px-4">
          <ToteTitle />
        </View>
      )}

      {side === "right" && (
        <View className="flex-row items-center px-4 space-x-2">
          <FontAwesome name="bell-o" size={20} />
        </View>
      )}
    </>
  );
};

const styles = {
  brandItemsContainer: {
    width: "48%",
  } as ViewStyle,
  ratingNumber: {
    fontSize: 13,
  } as ViewStyle,
  friendsRequestsNotifNum: {
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E34935",
    position: "absolute",
    top: -10,
    right: -15,
  } as ViewStyle,
  requestsTabbar: {
    shadowOffset: { height: 0, width: 0 }, 
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    backgroundColor: "white",
    width: width,
  } as ViewStyle,
  createRequest: {
    width: "45%",
    alignSelf: "center",
    backgroundColor: '#0065FF',
  } as ViewStyle,
  requestItemContent: {
    width: "80%",
  } as ViewStyle,
  requestItemActions: {
    width: "15%",
  } as ViewStyle,
  requestItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#C8C8C8",
    paddingVertical: 10,
  } as ViewStyle,
};
