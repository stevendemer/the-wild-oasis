import { useTodayActivity } from "@/hooks/useTodayActivity";
import Spinner from "./Spinner";
import TodayItem from "./TodayItem";

const TodayActivity = () => {
  const { activities, isLoading } = useTodayActivity();

  return (
    <div className="p-6 h-full dark:bg-gray-800 bg-gray-50 rounded-lg gap-4">
      <h1 className="text-lg sm:text-xl p-2 font-bold">Today</h1>
      {!isLoading ? (
        activities?.length > 0 ? (
          <div className="flex flex-col items-center">
            {activities?.map((act) => (
              <TodayItem key={act.id} activity={act} />
            ))}
          </div>
        ) : (
          <p className="text-lg font-semibold">No activity today...</p>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default TodayActivity;
