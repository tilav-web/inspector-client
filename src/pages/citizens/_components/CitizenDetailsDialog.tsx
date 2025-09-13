import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import type { ICitizen } from "@/interfaces/citizen.interface";
import { DetailItem } from "./DetailItem";
import {
  User,
  Cake,
  Phone,
  MapPin,
  Building,
  Home,
  Fingerprint,
  CreditCard,
  Flag,
  Briefcase,
  GraduationCap,
  Shield,
  Users,
  HeartHandshake,
} from "lucide-react";

interface CitizenDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  citizen: ICitizen | null;
}

export const CitizenDetailsDialog = ({
  isOpen,
  onOpenChange,
  citizen,
}: CitizenDetailsDialogProps) => {
  if (!citizen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[750px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-300 shadow-md">
              <img
                src={citizen.photo}
                alt={`${citizen.first_name} ${citizen.last_name}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {citizen.first_name} {citizen.last_name}
              </p>
              <DialogDescription className="text-md">
                {citizen.middle_name}
              </DialogDescription>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 max-h-[60vh] overflow-y-auto px-2 custom-scrollbar">
          {/* --- Shaxsiy ma'lumotlar --- */}
          <DetailItem
            label="Jinsi"
            value={citizen.gender === "male" ? "Erkak" : "Ayol"}
            icon={<User size={18} />}
          />
          <DetailItem
            label="Tug'ilgan sana"
            value={citizen.birthday}
            icon={<Cake size={18} />}
          />
          <DetailItem
            label="Telefon"
            value={citizen.phone}
            icon={<Phone size={18} />}
          />
          <DetailItem
            label="Millati"
            value={citizen.nationality}
            icon={<Flag size={18} />}
          />
          <DetailItem
            label="JSHSHIR (PINFL)"
            value={citizen.pinfl}
            icon={<Fingerprint size={18} />}
          />
          <DetailItem
            label="Pasport"
            value={`${citizen.passport_series} ${citizen.passport_number}`}
            icon={<CreditCard size={18} />}
          />

          {/* --- Yashash joyi --- */}
          <div className="col-span-full text-lg font-semibold text-blue-800 mt-4 border-b-2 border-blue-100 pb-2 mb-2">
            Yashash joyi
          </div>
          <DetailItem
            label="Viloyat"
            value={citizen.region}
            icon={<MapPin size={18} />}
          />
          <DetailItem
            label="Tuman/Shahar"
            value={citizen.district}
            icon={<Building size={18} />}
          />
          <DetailItem
            label="Mahalla"
            value={citizen.neighborhood}
            icon={<Users size={18} />}
          />
          <DetailItem
            label="Uy"
            value={citizen.house}
            icon={<Home size={18} />}
          />

          {/* --- Ijtimoiy holati --- */}
          <div className="col-span-full text-lg font-semibold text-blue-800 mt-4 border-b-2 border-blue-100 pb-2 mb-2">
            Ijtimoiy holati
          </div>
          <DetailItem
            label="Nogironligi"
            value={citizen.disability ? "Mavjud" : "Yo'q"}
            icon={<HeartHandshake size={18} />}
          />
          <DetailItem
            label="Bandlik holati"
            value={citizen.employment_status}
            icon={<Briefcase size={18} />}
          />
          <DetailItem
            label="Oilaviy holati"
            value={citizen.marital_status}
            icon={<Users size={18} />}
          />
          <DetailItem
            label="Ma'lumoti"
            value={citizen.education_level}
            icon={<GraduationCap size={18} />}
          />
          {citizen.gender === "male" && (
            <DetailItem
              label="Harbiy xizmat"
              value={citizen.military_status}
              icon={<Shield size={18} />}
            />
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Yopish
          </Button>
          <Button>Profilga o'tish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
