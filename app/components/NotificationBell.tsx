import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const NotificationBell = ({ className }: { className?: string }) => {
  const router = useRouter();

  const onGoToBrandProfile = () => {
    router.navigate({
      pathname: "/screens/notifications",
    });
  };

  return (
    <FontAwesome
      name="bell-o"
      size={20}
      className={className}
      onPress={onGoToBrandProfile}
    />
  );
};

export default NotificationBell;
