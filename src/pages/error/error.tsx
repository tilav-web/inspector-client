import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-6">
      <div className="max-w-md">
        <AlertTriangle className="mx-auto h-24 w-24 text-destructive mb-6" />
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Xatolik yuz berdi
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Kechirasiz, kutilmagan xatolik yuz berdi. Iltimos, sahifani yangilang yoki keyinroq qayta urinib ko'ring.
        </p>
        <Button 
          onClick={() => navigate("/")} 
          size="lg"
        >
          Bosh sahifaga qaytish
        </Button>
      </div>
    </div>
  );
}