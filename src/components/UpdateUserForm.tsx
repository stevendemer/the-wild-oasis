import { useUpdateUser } from "@/hooks/useUpdateUser";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useRef, useState } from "react";
import { useUser } from "@/hooks/useUser";

const UpdateUserForm = () => {
  const { user } = useUser();
  const { isUpdating, updateUser } = useUpdateUser();
  const [fullName, setFullName] = useState(
    user?.user_metadata?.full_name || ""
  );
  const [avatar, setAvatar] = useState(user?.user_metadata?.avatar || "");
  const fileRef = useRef(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!fullName) return;

    updateUser(
      {
        full_name: fullName,
        avatar: avatar,
      },
      {
        onSuccess: () => {
          setAvatar(null);
          setFullName("");
          setAvatar("");
          if (fileRef.current) {
            fileRef.current.value = "";
            fileRef.current.type = "file";
          }
        },
      }
    );
  }

  function handleCancel() {
    setFullName(user?.user_metadata.full_name || "");
    setAvatar(user?.user_metadata.avatar || "");
  }

  return (
    <Card className="mx-auto w-full container bg-muted">
      <CardHeader>
        <CardTitle className="text-xl font-bold sm:text-3xl  p-6">
          Update account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 items-center ">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2  items-center gap-6"
          >
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              value={fullName}
              disabled={isUpdating}
              onChange={(e) => setFullName(e.currentTarget.value)}
              type="text"
            />

            <Label htmlFor="avatar">Avatar</Label>
            <Input
              disabled={isUpdating}
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
              id="avatar"
              ref={fileRef}
            />

            <span className="flex items-center max-w-lg space-x-4">
              <Button
                className="flex justify-center my-10 flex-1 bg-indigo-700 text-slate-100 font-semibold"
                type="submit"
                disabled={isUpdating}
              >
                Update user
              </Button>
              <Button
                type="reset"
                onClick={handleCancel}
                disabled={isUpdating}
                className="flex justify-center my-10 flex-1 bg-yellow-700 text-slate-100 font-semibold"
              >
                Cancel
              </Button>
            </span>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateUserForm;
