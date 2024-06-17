import { cn } from "@/lib/utils";
import { ReactElement } from "react";

const Stat = ({
  icon,
  title,
  value,
  color,
}: {
  icon: ReactElement;
  title: string;
  value: number | string;
  color: string;
}) => {
  return (
    <div className="grid  dark:bg-gray-800 bg-gray-50 p-6 rounded-lg w-full grid-cols-[6.4rem_1fr] gap-16">
      <span className="flex items-center gap-4">
        <span className={cn(`${color} rounded-full p-2 font-bold w-12 h-12`)}>
          {icon}
        </span>
        <div className="flex flex-col whitespace-nowrap">
          <h1 className="text-sm font-sans text-muted-foreground  uppercase font-bold ">
            {title}
          </h1>
          <span className="leading-4 text-sm font-bold">{value}</span>
        </div>
      </span>
    </div>
  );
};

export default Stat;
