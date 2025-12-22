"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DeliveryAddressDialog() {
  const [address, setAddress] = useState("Add Location");
  const [temp, setTemp] = useState(address);

  const save = () => setAddress(temp);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-9 rounded-full gap-2 border-zinc-300 bg-white px-3 text-xs"
        >
          <span className="text-red-500 font-medium">Delivery address:</span>
          <span className="text-zinc-700">{address}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Delivery address
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            placeholder="Enter your address"
          />

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setTemp(address)}>
              Cancel
            </Button>
            <Button onClick={save}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
