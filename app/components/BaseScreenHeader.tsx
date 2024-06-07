import { View } from "./Themed";
import ToteTitle from "./ToteTitle";
import NotificationBell from "./NotificationBell";

const BaseScreenHeader = ({ side }: { side: string }) => {
  return (
    <>
      {side === "left" && (
        <View className="flex-row items-center px-4">
          <ToteTitle />
        </View>
      )}

      {side === "right" && (
        <View className="flex-row items-center px-4 space-x-2">
          <NotificationBell />
        </View>
      )}
    </>
  );
};

export default BaseScreenHeader;
