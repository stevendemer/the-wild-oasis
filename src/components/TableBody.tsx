import { Tables } from "@/types/database";
import { ReactNode } from "react";
import { TableBody } from "./ui/table";

const CabinTableBody = ({
  data,
  render,
}: {
  data?: Tables<"cabins">[];
  render: (item: Tables<"cabins">) => ReactNode;
}) => {
  if (!data?.length) {
    return (
      <div className="text-xl m-10 text-center font-semibold">
        No data found.
      </div>
    );
  }

  return <>{data.map(render)}</>;
};

export default CabinTableBody;
