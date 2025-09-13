import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  User,
  Cake,
  Flag,
  Phone,
  Fingerprint,
  Hash,
  Building,
  MapPin,
  Briefcase,
} from "lucide-react";
import { DetailItem } from "./DetailItem";
import type { IInspector } from "@/interfaces/inspector.interface";

interface InspectorDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  inspector: IInspector | null;
}

export const InspectorDetailsDialog = ({
  isOpen,
  onOpenChange,
  inspector,
}: InspectorDetailsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] md:max-w-[900px] lg:max-w-[1000px] bg-gradient-to-b from-blue-50 to-white border-blue-200">
        <DialogHeader className="border-b border-blue-100 pb-4">
          <div className="flex items-start gap-4">
            {inspector && (
              <div className="w-28 h-32 overflow-hidden border-4 border-blue-200">
                <img
                  src={inspector.photo}
                  alt={`${inspector.first_name} ${inspector.last_name}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="w-full h-full bg-blue-100 flex items-center justify-center"><svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg></div>';
                    }
                  }}
                />
              </div>
            )}
            <div>
              <DialogTitle className="text-xl font-semibold text-blue-900">
                Inspektor ma'lumotlari
              </DialogTitle>
              <DialogDescription className="text-blue-700">
                {inspector ? `${inspector.first_name} ${inspector.last_name} ${inspector.middle_name}` : 'Tanlangan inspektorning to\'liq ma\'lumotlari.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        {inspector && (
          <div className="grid gap-4 py-6 max-h-[60vh] md:max-h-[70vh] overflow-y-auto md:grid-cols-2">
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                Shaxsiy ma'lumotlar
              </h3>
              <div className="grid gap-3">
                <DetailItem
                  icon={<User className="h-4 w-4" />}
                  label="Ism Familiya"
                  value={`${inspector.first_name} ${inspector.last_name} ${inspector.middle_name}`}
                />
                <DetailItem
                  icon={<Cake className="h-4 w-4" />}
                  label="Tug'ilgan sana"
                  value={inspector.birthday || ""}
                />
                <DetailItem
                  icon={<Flag className="h-4 w-4" />}
                  label="Millati"
                  value={inspector.nationality || ""}
                />
                <DetailItem
                  icon={<User className="h-4 w-4" />}
                  label="Jinsi"
                  value={inspector.gender === "male" ? "Erkak" : "Ayol"}
                />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Aloqa ma'lumotlari
              </h3>
              <div className="grid gap-3">
                <DetailItem
                  icon={<Phone className="h-4 w-4" />}
                  label="Telefon raqami"
                  value={inspector.phone || ""}
                />
                <DetailItem
                  icon={<MapPin className="h-4 w-4" />}
                  label="Hudud"
                  value={`${inspector.region}, ${inspector.district}, ${inspector.neighborhood}`}
                />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <Fingerprint className="h-5 w-5" />
                Hujjat ma'lumotlari
              </h3>
              <div className="grid gap-3">
                <DetailItem
                  icon={<Fingerprint className="h-4 w-4" />}
                  label="Pasport"
                  value={`${inspector.passport_series} ${inspector.passport_number}`}
                />
                <DetailItem
                  icon={<Hash className="h-4 w-4" />}
                  label="PINFL"
                  value={inspector.pinfl || ""}
                />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <Building className="h-5 w-5" />
                Ish ma'lumotlari
              </h3>
              <div className="grid gap-3">
                <DetailItem
                  icon={<Building className="h-4 w-4" />}
                  label="Unvon"
                  value={inspector.rank || ""}
                />
                {inspector.workplace?.map((wp, index) => (
                  <DetailItem
                    key={wp.id || index}
                    icon={<Briefcase className="h-4 w-4" />}
                    label={`Ish joyi ${index + 1}`}
                    value={`${wp.position} (${
                      wp.status ? "Hozirgi" : "Sobiq"
                    })`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
