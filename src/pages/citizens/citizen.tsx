import { useParams } from "react-router-dom";
import { MOCK_CITIZENS } from "@/const/mock.data";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
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
  PawPrint,
  HeartHandshake,
} from "lucide-react";
import type { ICitizen } from "@/interfaces/citizen.interface";

const DetailCard = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-lg font-bold text-gray-700">{title}</CardTitle>
      <div className="text-blue-500">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3 mt-2">{children}</div>
    </CardContent>
  </Card>
);

const InfoRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string | number;
  icon?: React.ReactNode;
}) => {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between border-b pb-2">
      <div className="flex items-center gap-3">
        {icon && <div className="text-gray-400">{icon}</div>}
        <p className="text-sm font-medium text-gray-600">{label}</p>
      </div>
      <p className="text-sm font-semibold text-gray-800 text-right">{value}</p>
    </div>
  );
};

export default function CitizenPage() {
  const { id } = useParams<{ id: string }>();
  const [citizen, setCitizen] = useState<ICitizen | null>(null);
  const [householdMembers, setHouseholdMembers] = useState<ICitizen[]>([]);

  useEffect(() => {
    const foundCitizen = MOCK_CITIZENS.find((c) => c.id === id);
    if (foundCitizen) {
      setCitizen(foundCitizen);
      const members = MOCK_CITIZENS.filter(
        (c) =>
          c.household.id === foundCitizen.household.id &&
          c.id !== foundCitizen.id
      );
      setHouseholdMembers(members);
    } else {
      setCitizen(null);
    }
  }, [id]);

  if (!citizen) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <Card className="w-full max-w-md text-center p-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-red-600">
              Fuqaro topilmadi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Bunday ID raqamiga ega fuqaro ma'lumotlar bazasida mavjud emas.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 lg:p-10 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="shadow-xl text-center p-6">
            <Avatar className="w-32 h-32 mx-auto border-4 border-blue-400 shadow-lg">
              <AvatarImage
                src={citizen.photo}
                alt={`${citizen.first_name} ${citizen.last_name}`}
              />
              <AvatarFallback className="text-4xl">
                {citizen.first_name[0]}
                {citizen.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold mt-4 text-gray-800">
              {citizen.first_name} {citizen.last_name}
            </h1>
            <p className="text-lg text-gray-500">{citizen.middle_name}</p>
            <div className="mt-4 flex justify-center gap-2">
              <Badge
                variant={citizen.gender === "male" ? "default" : "destructive"}
              >
                {citizen.gender === "male" ? "Erkak" : "Ayol"}
              </Badge>
              <Badge variant="secondary">{citizen.birthday}</Badge>
            </div>
          </Card>

          <DetailCard title="Aloqa ma'lumotlari" icon={<Phone size={24} />}>
            <InfoRow
              label="Telefon"
              value={citizen.phone}
              icon={<Phone size={16} />}
            />
            <InfoRow
              label="Viloyat"
              value={citizen.region}
              icon={<MapPin size={16} />}
            />
            <InfoRow
              label="Tuman"
              value={citizen.district}
              icon={<Building size={16} />}
            />
            <InfoRow
              label="Mahalla"
              value={citizen.neighborhood}
              icon={<Users size={16} />}
            />
            <InfoRow
              label="Uy"
              value={citizen.house}
              icon={<Home size={16} />}
            />
          </DetailCard>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Shaxsiy</TabsTrigger>
              <TabsTrigger value="household">Uy xo'jaligi</TabsTrigger>
              <TabsTrigger value="social">Ijtimoiy</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="mt-4">
              <DetailCard
                title="Shaxsiy va pasport ma'lumotlari"
                icon={<User size={24} />}
              >
                <InfoRow
                  label="JSHSHIR (PINFL)"
                  value={citizen.pinfl}
                  icon={<Fingerprint size={16} />}
                />
                <InfoRow
                  label="Pasport"
                  value={`${citizen.passport_series} ${citizen.passport_number}`}
                  icon={<CreditCard size={16} />}
                />
                <InfoRow
                  label="Millati"
                  value={citizen.nationality}
                  icon={<Flag size={16} />}
                />
              </DetailCard>
            </TabsContent>
            <TabsContent value="household" className="mt-4 space-y-6">
              <DetailCard
                title="Xonadon ma'lumotlari"
                icon={<Home size={24} />}
              >
                <InfoRow
                  label="Turi"
                  value={
                    citizen.household.type === "yard"
                      ? "Hovli"
                      : "Ko'p qavatli uy"
                  }
                />
                <InfoRow
                  label="Yer maydoni"
                  value={`${citizen.household.land_area} kv.m`}
                />
                <InfoRow
                  label="Egalik"
                  value={citizen.household.private ? "Shaxsiy" : "Ijara"}
                />
                {citizen.household.ownership && (
                  <InfoRow
                    label="Uy egasi"
                    value={`${citizen.household.ownership.first_name} ${citizen.household.ownership.last_name}`}
                  />
                )}
                <InfoRow
                  label="Oila soni"
                  value={citizen.household.families_count}
                />
              </DetailCard>
              <DetailCard title="Xonadon a'zolari" icon={<Users size={24} />}>
                {householdMembers.length > 0 ? (
                  householdMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2">
                          <AvatarImage src={member.photo} />
                          <AvatarFallback>
                            {member.first_name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">
                            {member.first_name} {member.last_name}
                          </p>
                          <p className="text-xs text-gray-500">Qarindosh</p>{" "}
                          {/** Static for now */}
                        </div>
                      </div>
                      <Badge variant="outline">{member.birthday}</Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center p-4">
                    Boshqa a'zolar topilmadi.
                  </p>
                )}
              </DetailCard>
              <DetailCard
                title="Mulk va hayvonlar"
                icon={<PawPrint size={24} />}
              >
                {Object.entries(citizen.household.details).map(
                  ([key, value]) =>
                    value.length > 0 && (
                      <InfoRow
                        key={key}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={value.join(", ")}
                      />
                    )
                )}
              </DetailCard>
            </TabsContent>
            <TabsContent value="social" className="mt-4">
              <DetailCard
                title="Ijtimoiy holati"
                icon={<Briefcase size={24} />}
              >
                <InfoRow
                  label="Nogironligi"
                  value={citizen.disability ? "Mavjud" : "Yo'q"}
                  icon={<HeartHandshake size={16} />}
                />
                <InfoRow
                  label="Bandlik holati"
                  value={citizen.employment_status}
                  icon={<Briefcase size={16} />}
                />
                <InfoRow
                  label="Oilaviy holati"
                  value={citizen.marital_status}
                  icon={<Users size={16} />}
                />
                <InfoRow
                  label="Ma'lumoti"
                  value={citizen.education_level}
                  icon={<GraduationCap size={16} />}
                />
                {citizen.gender === "male" && (
                  <InfoRow
                    label="Harbiy xizmat"
                    value={citizen.military_status}
                    icon={<Shield size={16} />}
                  />
                )}
              </DetailCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
