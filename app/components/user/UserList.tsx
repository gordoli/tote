import { ScrollView } from "react-native";
import { User } from "../../lib/types";
import UserCard from "./UserCard";

const UserList = ({ users }: { users: User[] | null }) => {
  return (
    <ScrollView>
      {users &&
        users.map((user: User, i: number) => <UserCard key={i} user={user} />)}
    </ScrollView>
  );
};

export default UserList;
