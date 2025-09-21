import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInspectorStore } from "@/stores/inspector.store";
import {
  ArrowLeft,
  Building,
  Cake,
  Fingerprint,
  Flag,
  Hash,
  Phone,
  User,
  MapPin,
} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

// Helper component for displaying a detail item with an icon
const DetailItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-start gap-4 py-2">
    <div className="text-muted-foreground mt-1">{icon}</div>
    <div className="flex-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value || "Ma'lumot kiritilmagan"}</p>
    </div>
  </div>
);

export default function Profile() {
  const { inspector } = useInspectorStore();
  const navigate = useNavigate();

  // If not logged in, redirect to auth page
  if (!inspector) {
    return <Navigate to="/auth" />;
  }

  const currentWorkplace = inspector.workplaces?.find(
    (wp) => wp.status === true
  );
  const formattedBirthday = inspector.birthday
    ? new Date(inspector.birthday).toLocaleDateString("uz-UZ")
    : "";
  const genderText =
    inspector.gender === "male"
      ? "Erkak"
      : inspector.gender === "female"
      ? "Ayol"
      : "";

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Ortga
      </Button>

      {/* Profile Header Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-24 md:h-32" />
        <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6 pt-0">
          <Avatar className="-mt-12 md:-mt-16 w-24 h-24 md:w-32 md:h-32 border-4 border-background">
            <AvatarImage
              src={`http://localhost:3000/files/profile/photo/${inspector._id}.webp`}
              alt={`${inspector.first_name} ${inspector.last_name}`}
            />
            <AvatarFallback className="text-4xl bg-blue-100 text-blue-800">
              {inspector.first_name?.[0]}
              {inspector.last_name?.[0]}
            </AvatarFallback>
          </Avatar>

          <div className="text-center md:text-left flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {`${inspector.first_name || ""} ${
                    inspector.last_name || ""
                  } ${inspector.middle_name || ""}`}
                </h1>
                <p className="text-lg text-muted-foreground mt-1">
                  {inspector.rank}
                </p>
              </div>
            </div>

            {currentWorkplace && (
              <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{currentWorkplace.position}</span>
                <Badge variant="secondary" className="ml-2">
                  Faol
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Personal Details Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Shaxsiy ma'lumotlar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailItem
                icon={<User className="h-5 w-5" />}
                label="Jinsi"
                value={genderText}
              />
              <DetailItem
                icon={<Cake className="h-5 w-5" />}
                label="Tug'ilgan sana"
                value={formattedBirthday}
              />
              <DetailItem
                icon={<Flag className="h-5 w-5" />}
                label="Millati"
                value={inspector.nationality || ""}
              />
              <DetailItem
                icon={<Phone className="h-5 w-5" />}
                label="Telefon raqami"
                value={inspector.phone || ""}
              />
              <DetailItem
                icon={<Fingerprint className="h-5 w-5" />}
                label="Pasport"
                value={`${inspector.passport_series || ""} ${
                  inspector.passport_number || ""
                }`.trim()}
              />
              <DetailItem
                icon={<Hash className="h-5 w-5" />}
                label="PINFL"
                value={inspector.pinfl || ""}
              />
            </div>

            {/* Address Section */}
            {inspector.address && (
              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Manzil</h3>
                </div>
                <div className="grid grid-cols-1 gap-2 pl-7">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Viloyat: </span>
                    {inspector.address.region?.name}
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Tuman: </span>
                    {inspector.address.district?.name}
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">MFY: </span>
                    {inspector.address.neighborhood?.name}
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">
                      To'liq manzil:{" "}
                    </span>
                    {inspector.address.detail}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Work History Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Ish joylari</CardTitle>
            <Badge variant="outline">
              {inspector.workplaces?.length || 0} ta
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {inspector.workplaces?.length > 0 ? (
              inspector.workplaces.map((wp) => (
                <div
                  key={wp._id}
                  className={`p-4 rounded-lg border ${
                    wp.status ? "border-blue-200 bg-blue-50" : "border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{wp.position}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {wp.note}
                      </p>
                    </div>
                    {wp.status ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Faol
                      </Badge>
                    ) : (
                      <Badge variant="outline">Arxiv</Badge>
                    )}
                  </div>

                  <div className="mt-3 text-sm space-y-1">
                    <p className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      {wp.region?.name || "Viloyat"}
                    </p>
                    <p className="flex items-center gap-2">
                      <Building className="h-3 w-3" />
                      {wp.district?.name || "Tuman"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-4">
                Ish joylari haqida ma'lumot mavjud emas
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
