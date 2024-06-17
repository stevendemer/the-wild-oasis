import { Tables } from "@/types/database";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useCheckout } from "@/hooks/useCheckout";

const TodayItem = ({ activity }: { activity: Tables<"cabins"> }) => {
  console.log(activity);

  const { checkout, isCheckingOut } = useCheckout();

  const { id, status, guests, num_nights } = activity;

  return (
    <div className="grid p-4 gap-14 grid-cols-4 place-items-center max-w-lg">
      {status === "unconfirmed" && (
        <Badge className="text-md uppercase bg-green-500">Arriving</Badge>
      )}
      {status === "checked-in" && (
        <Badge className="text-md uppercase bg-blue-500">Departing</Badge>
      )}
      {/* <p className="">{guests.full_name}</p> */}
      <span className="flex items-center col-span-2 space-x-4 w-full">
        <img
          className="w-10 h-10 object-contain"
          src={guests.country_flag}
          alt={`Flag of ${guests.country}`}
        />

        <p className="text-sm">{guests.full_name}</p>
        <div className="whitespace-nowrap">{num_nights} nights</div>
      </span>
      {status === "unconfirmed" && (
        <Link to={`/checkin/${id}`}>
          <Button variant="outline">Check in</Button>
        </Link>
      )}
      {status === "checked-in" && (
        <Button
          disabled={isCheckingOut}
          variant="outline"
          onClick={() => checkout(id)}
        >
          Check out
        </Button>
      )}
    </div>
  );
};

export default TodayItem;
