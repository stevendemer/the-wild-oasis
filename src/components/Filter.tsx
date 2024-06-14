import { useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const Filter = ({
  filterField,
  options,
}: {
  filterField: string;
  options: { value: string }[];
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0)?.value;

  function onClick(value: string) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  console.log("Current filter is ", currentFilter);

  return (
    <div className="items-center space-x-2 relative right-10 hidden sm:flex">
      {options?.map((option) => (
        <div key={option.value}>
          <Button
            variant="outline"
            className={cn(
              "capitalize",
              option.value === currentFilter && "bg-indigo-600 text-gray-100"
            )}
            onClick={() => onClick(option.value)}
          >
            {option.value.split("-").join(" ")}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Filter;
