import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function RegionAddDialog() {
  const [full_name, setFullName] = useState<string>("");
  const [short_name, setShortName] = useState<string>("");

  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={`flex-shrink-0 h-12 px-4 transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white shadow-md cursor-pointer`}
          >
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span className="font-medium whitespace-nowrap">Viloyat</span>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Yangi viloyat qo'shish</DialogTitle>
            <DialogDescription>
              Yangi viloyat ma'lumotlarini kiriting. To'liq nom va qisqa nomni
              yozing.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="full_name" className="text-right">
                To'liq nomi
              </Label>
              <Input
                id="full_name"
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
                className="col-span-3"
                placeholder="Masalan: Toshkent viloyati"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="short_name" className="text-right">
                Qisqa nomi
              </Label>
              <Input
                id="short_name"
                value={short_name}
                onChange={(e) => setShortName(e.target.value)}
                className="col-span-3"
                placeholder="Masalan: Toshkent"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline">
              Bekor qilish
            </Button>
            <Button
              type="submit"
              disabled={!full_name.trim() || !short_name.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Qo'shish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
