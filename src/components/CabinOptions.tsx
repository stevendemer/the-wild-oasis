import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";

const CabinOptions = () => {
  return (
    <div className="flex items-center flex-1 justify-between space-x-8">
      <Select>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="All"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="no-discount">No discount</SelectItem>
            <SelectItem value="with-discount">With discount</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Sort by name (A-Z)"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="name-asc">Sort by name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Sort by name (Z-A)</SelectItem>
            <SelectItem value="regularPrice-asc">
              Sort by price (low first)
            </SelectItem>
            <SelectItem value="regularPrice-desc">
              Sort by price (high first)
            </SelectItem>
            <SelectItem value="maxCapacity-asc">
              Sort by capacity (low first)
            </SelectItem>
            <SelectItem value="maxCapacity-desc">
              Sort by capacity (high first)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CabinOptions;
