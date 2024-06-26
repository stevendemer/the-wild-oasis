import { useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const Filter = ({
  filterField,
  options,
}: {
  filterField: string;
  options: { value: string; label: string }[];
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0)?.value;

  function onClick(value: string) {
    searchParams.set(filterField, value);
    // avoids error when on last page, not enough records to fetch from DB
    if (searchParams.get("page")) searchParams.set("page", String(1));
    setSearchParams(searchParams);
  }

  return (
    <div className="items-center space-x-2 relative right-10 hidden sm:flex">
      {options?.map((option) => (
        <div key={option.value}>
          <Button
            variant="outline"
            className={cn(
              "capitalize",
              option.value === currentFilter && "bg-indigo-500 text-gray-100"
            )}
            onClick={() => onClick(option.value)}
            disabled={option.value === currentFilter}
          >
            {option.label}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Filter;
