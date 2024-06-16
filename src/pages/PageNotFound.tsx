import { Button } from "@/components/ui/button";
import { useMoveBack } from "@/hooks/useMoveBack";

const PageNotFound = () => {
  const moveBack = useMoveBack();
  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="flex items-center justify-center flex-col">
        <h2 className="text-center p-8 text-xl font-semibold font-mono">
          The page you are looking for could not be found 🤔
        </h2>
        <Button variant="outline" size="lg" onClick={moveBack}>
          &larr; Move back
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
