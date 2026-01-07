"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSubmit: (name: string) => void;
};

export default function CategoryFormDialog({ open, onOpenChange, onSubmit }: Props) {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (open) setName("");
  }, [open]);

  const handleSave = () => {
    const next = name.trim();
    if (!next) return;
    onSubmit(next);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Add new category</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="grid gap-2">
            <label className="text-xs font-medium text-neutral-700">Category name</label>
            <input
              className="h-10 rounded-lg border px-3 text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type category name"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSave}>
              Add category
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
