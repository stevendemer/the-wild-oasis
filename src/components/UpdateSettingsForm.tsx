import { useSettings } from "@/hooks/useSettings";
import { useUpdateSetting } from "@/hooks/useUpdateSetting";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "./ui/skeleton";
import Spinner from "./Spinner";
import { ChangeEvent, ChangeEventHandler } from "react";

const UpdateSettingsForm = () => {
  const { isLoading, error, data: settings = {} } = useSettings();

  const { isUpdating, updateSettings } = useUpdateSetting();

  function onUpdate(e: ChangeEvent<HTMLInputElement>, field: string) {
    const { value } = e.currentTarget;
    if (!value) return;
    updateSettings({ [field]: value });
  }

  console.log(settings);

  const {
    breakfast_price,
    max_booking_length,
    max_per_booking,
    min_booking_length,
    id,
  } = settings;

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Card className="mx-auto w-full container bg-muted">
      <CardHeader>
        <CardTitle className="text-xl font-bold sm:text-3xl">
          Update hotel settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 items-center">
          <form className="grid grid-cols-2 items-center gap-6">
            <Label htmlFor="min-nights">Minimum nights/booking</Label>
            <Input
              defaultValue={min_booking_length}
              placeholder="4"
              type="number"
              disabled={isUpdating}
              id="min-nights"
              onBlur={(e) => onUpdate(e, "min_booking_length")}
            />

            <Label htmlFor="max-bookings">Maximum nights/booking</Label>
            <Input
              defaultValue={max_booking_length}
              placeholder="4"
              type="number"
              disabled={isUpdating}
              id="max-bookings"
              onBlur={(e) => onUpdate(e, "max_booking_length")}
            />

            <Label htmlFor="max-guests">Maximum guests/booking</Label>
            <Input
              defaultValue={max_per_booking}
              placeholder="4"
              type="number"
              disabled={isUpdating}
              id="max-guests"
              onBlur={(e) => onUpdate(e, "max_per_booking")}
            />

            <Label htmlFor="break-price">Breakfast price</Label>
            <Input
              defaultValue={breakfast_price}
              placeholder="4"
              type="number"
              disabled={isUpdating}
              id="break-price"
              onBlur={(e) => onUpdate(e, "breakfast_price")}
            />
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateSettingsForm;
