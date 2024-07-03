import { User } from "../../lib/types";
import LoadingScreen from "../LoadingScreen";
import { ScrollView } from "../Themed";
import UserCard from "./UserCard";

const UserList = ({ users }: { users: User[] | null }) => {
  if (!users) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView>
      {users &&
        users.map((user: User, i: number) => <UserCard key={i} user={user} />)}
    </ScrollView>
  );
};

export default UserList;
