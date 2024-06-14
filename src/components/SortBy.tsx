import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEvent } from "react";

const SortBy = ({
  options,
}: {
  options: { value: string; label: string }[];
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function onChange(value: string) {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }

  return (
    <div className="relative left-0">
      <Select onValueChange={onChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Sort by"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem value={option.value} key={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortBy;
