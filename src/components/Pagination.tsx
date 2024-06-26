import { useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { PAGE_SIZE } from "@/utils/constants";
import { ChevronRight, ChevronLeft } from "lucide-react";

const TablePagination = ({ count }: { count: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", String(next));
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", String(prev));
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) {
    return null;
  }

  return (
    <div className="flex items-center flex-1 space-x-4 text-sm justify-between">
      <span>
        Showing <b> {(currentPage - 1) * PAGE_SIZE + 1} </b> to{" "}
        <b> {currentPage === pageCount ? count : currentPage * PAGE_SIZE}</b> of{" "}
        {count} results
      </span>
      <div className="relative right-0  items-center space-x-4 flex">
        <Button
          className="btn-frosted"
          disabled={currentPage === 1}
          onClick={() => prevPage()}
        >
          <ChevronLeft />
          Previous
        </Button>
        <Button
          className="bnt-frosted "
          disabled={currentPage === pageCount}
          onClick={() => nextPage()}
        >
          Next
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default TablePagination;
