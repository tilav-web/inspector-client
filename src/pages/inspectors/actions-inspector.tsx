import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock data for regions, districts, and neighborhoods
const MOCK_REGIONS = [
  { id: "1", name: "Toshkent shahri" },
  { id: "2", name: "Toshkent viloyati" },
  { id: "3", name: "Samarqand" },
  { id: "4", name: "Buxoro" },
];

const MOCK_DISTRICTS = [
  { id: "1", regionId: "1", name: "Yunusobod" },
  { id: "2", regionId: "1", name: "Mirzo Ulug'bek" },
  { id: "3", regionId: "2", name: "Chirchiq" },
  { id: "4", regionId: "2", name: "Angren" },
];

const MOCK_NEIGHBORHOODS = [
  { id: "1", districtId: "1", name: "Qorasuv MFY" },
  { id: "2", districtId: "1", name: "Bodomzor MFY" },
  { id: "3", districtId: "2", name: "Chig'atoy MFY" },
  { id: "4", districtId: "2", name: "Olmazor MFY" },
];

export default function ActionsInspector() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inspektor ma'lumotlari</CardTitle>
        <CardDescription>
          Yangi inspektor qo'shish uchun quyidagi formani to'ldiring
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <form className="space-y-6">
          {/* Auth Details Section */}
          <div className="space-y-4 mb-4">
            <h3 className="text-lg font-medium border-b pb-2">
              Autentifikatsiya ma'lumotlari
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Foydalanuvchi nomi *</Label>
                <Input id="username" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Parol *</Label>
                <Input id="password" type="password" required />
              </div>
            </div>
          </div>

          {/* Inspector Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">
              Shaxsiy ma'lumotlar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">Ism *</Label>
                <Input id="first_name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Familiya *</Label>
                <Input id="last_name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="middle_name">Otasining ismi</Label>
                <Input id="middle_name" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthday">Tug'ilgan sana *</Label>
                <Input id="birthday" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rank">Unvon *</Label>
                <Input id="rank" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Jinsi *</Label>
              <RadioGroup className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Erkak</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Ayol</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon raqami *</Label>
                <Input id="phone" type="tel" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Millati *</Label>
                <Input id="nationality" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="passport_series">Passport seriyasi *</Label>
                <Input id="passport_series" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passport_number">Passport raqami *</Label>
                <Input id="passport_number" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pinfl">PINFL *</Label>
              <Input id="pinfl" required />
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">
              Manzil ma'lumotlari
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="region">Viloyat/Shahar *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Viloyatni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_REGIONS.map((region) => (
                      <SelectItem key={region.id} value={region.id}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">Tuman *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Tumanni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_DISTRICTS.map((district) => (
                      <SelectItem key={district.id} value={district.id}>
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="neighborhood">MFY *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      MFY ni tanlang...
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="MFY qidirish..." />
                      <CommandList>
                        <CommandEmpty>MFY topilmadi.</CommandEmpty>
                        <CommandGroup>
                          {MOCK_NEIGHBORHOODS.map((neighborhood) => (
                            <CommandItem
                              key={neighborhood.id}
                              value={neighborhood.id}
                            >
                              <Check
                                className={cn("mr-2 h-4 w-4", "opacity-0")}
                              />
                              {neighborhood.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="detail">Manzil tafsilotlari *</Label>
                <Input id="detail" required />
              </div>
            </div>
          </div>

          {/* Workplace Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-lg font-medium">Ish joyi ma'lumotlari</h3>
              <Button type="button" variant="outline">
                + Yangi ish joyi qo'shish
              </Button>
            </div>

            <div className="p-4 border rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position-0">Lavozimi *</Label>
                  <Input id="position-0" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workplace-region-0">Viloyat/Shahar *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Viloyatni tanlang" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px] overflow-y-auto">
                      {MOCK_REGIONS.map((region) => (
                        <SelectItem key={region.id} value={region.id}>
                          {region.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workplace-district-0">Tuman *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tumanni tanlang" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px] overflow-y-auto">
                      {MOCK_DISTRICTS.map((district) => (
                        <SelectItem key={district.id} value={district.id}>
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workplace-neighborhood-0">MFY *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="MFY ni tanlang" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px] overflow-y-auto">
                      {MOCK_NEIGHBORHOODS.map((neighborhood) => (
                        <SelectItem
                          key={neighborhood.id}
                          value={neighborhood.id}
                        >
                          {neighborhood.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="note-0">Izoh</Label>
                <Input id="note-0" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status-0">Holati *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Holatni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Faol</SelectItem>
                    <SelectItem value="inactive">Faol emas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline">
              Bekor qilish
            </Button>
            <Button type="submit">Qo'shish</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
