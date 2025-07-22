import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/auth.service";
import { useInspectorStore } from "@/stores/inspector.store";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Auth() {
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const { setInspector } = useInspectorStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await authService.login({ uid, password });
      setInspector(data.inspector);
      toast.success("Login successful!");
      navigate("/");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 w-screen">
      <Toaster />
      <Card className="w-full max-w-md p-6 bg-white rounded-xl shadow-2xl border border-gray-200">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-4xl font-extrabold text-gray-900">
            Inspektor
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Tizimga kirish uchun malumotlaringizni to'ldiring!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="uid">UID</Label>
              <Input
                id="uid"
                type="text"
                placeholder="Foydalanuvchi ID kiriting..."
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                className="focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Parol</Label>
              <Input
                id="password"
                type="password"
                placeholder="Parol kiriting..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-200 ease-in-out cursor-pointer"
            >
              Tizimga kirish
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
