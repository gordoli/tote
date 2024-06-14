import AsyncStorage from "@react-native-async-storage/async-storage";

const Storage = {
  getItem: async function (key: string) {
    const item: any = await AsyncStorage.getItem(key);
    return JSON.parse(item);
  },
  setItem: async function (key: string, value: any) {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async function (key: string) {
    return await AsyncStorage.removeItem(key);
  },
};

export default Storage;
