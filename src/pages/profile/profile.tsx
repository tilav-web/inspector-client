
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
} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

// Helper component for displaying a detail item with an icon
const DetailItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) => (
  <div className="flex items-start gap-4">
    <div className="text-muted-foreground mt-1">{icon}</div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
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

  const currentWorkplace = inspector.workplaces.find(wp => wp.status === true);

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Ortga
        </Button>

      {/* Profile Header Card */}
      <Card className="overflow-hidden">
        <div className="bg-muted h-24 md:h-32" />
        <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6 pt-0">
          <Avatar className="-mt-12 md:-mt-16 w-24 h-24 md:w-32 md:h-32 border-4 border-background">
            <AvatarImage src={inspector.photo} alt={`${inspector.first_name} ${inspector.last_name}`} />
            <AvatarFallback className="text-4xl">{inspector.first_name[0]}{inspector.last_name[0]}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold">{`${inspector.first_name} ${inspector.last_name} ${inspector.middle_name}`}</h1>
            <p className="text-lg text-muted-foreground">{inspector.rank}</p>
            {currentWorkplace && (
              <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{currentWorkplace.position}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Personal Details Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Shaxsiy ma'lumotlar</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-6">
            <DetailItem icon={<User className="h-5 w-5" />} label="Jinsi" value={inspector.gender === 'male' ? 'Erkak' : 'Ayol'} />
            <DetailItem icon={<Cake className="h-5 w-5" />} label="Tug'ilgan sana" value={inspector.birthday} />
            <DetailItem icon={<Flag className="h-5 w-5" />} label="Millati" value={inspector.nationality} />
            <DetailItem icon={<Phone className="h-5 w-5" />} label="Telefon raqami" value={inspector.phone} />
            <DetailItem icon={<Fingerprint className="h-5 w-5" />} label="Pasport" value={`${inspector.passport_series} ${inspector.passport_number}`} />
            <DetailItem icon={<Hash className="h-5 w-5" />} label="PINFL" value={inspector.pinfl} />
          </CardContent>
        </Card>

        {/* Work History Card */}
        <Card>
          <CardHeader>
            <CardTitle>Ish joylari</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {inspector.workplaces.map((wp) => (
              <div key={wp.id} className="flex items-start gap-4">
                <div className="bg-muted p-3 rounded-lg">
                    <Building className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="font-semibold">{wp.position}</p>
                  <p className="text-sm text-muted-foreground">{`${wp.region}, ${wp.district}`}</p>
                  {wp.status ? (
                    <Badge className="mt-1">Hozirgi</Badge>
                  ) : (
                    <Badge variant="outline" className="mt-1">Sobiq</Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
