import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder={`${options[0].label}`} />
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
