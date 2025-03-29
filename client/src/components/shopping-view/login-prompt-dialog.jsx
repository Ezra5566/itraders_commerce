import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function LoginPromptDialog({ open, setOpen }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    setOpen(false);
    navigate("/auth/login");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login Required</DialogTitle>
          <DialogDescription>
            Please log in to add items to your cart. You can continue shopping without logging in, but you'll need to log in to make purchases.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Continue Shopping
          </Button>
          <Button onClick={handleLogin}>
            Log In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LoginPromptDialog; 