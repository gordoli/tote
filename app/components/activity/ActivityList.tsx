import { FeedActivity, Product } from "../../lib/types";

import LoadingScreen from "../LoadingScreen";
import EmptyState from "../EmptyState";
import { ScrollView } from "../Themed";
import ActivityCard from "./ActivityCard";

const ActivityList = ({
  activities,
}: {
  activities: FeedActivity[] | null;
}) => {
  if (!activities) {
    return <LoadingScreen />;
  }

  return !activities || activities.length === 0 ? (
    <EmptyState label="No products found" />
  ) : (
    <ScrollView className="h-screen">
      {activities &&
        activities.map((activity: FeedActivity, i: number) => (
          <></>
          // <ActivityCard key={i} item={activity} />
        ))}
    </ScrollView>
  );
};

export default ActivityList;
