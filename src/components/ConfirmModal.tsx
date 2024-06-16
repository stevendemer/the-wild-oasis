import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

const ConfirmModal = ({
  onConfirm,
  disabled,
  resource,
  isOpen,
  onClose,
}: {
  onConfirm: () => void;
  disabled: boolean;
  resource: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal defaultOpen={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete {resource}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col p-2">
          Are you sure you want to delete {resource} ?
          <span className="flex items-center p-8 justify-center space-x-2">
            <Button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              variant="destructive"
              disabled={disabled}
            >
              Confirm
            </Button>
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
