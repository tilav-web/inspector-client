import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inspectorService } from "@/services/inspector.service";
import { useInspectorStore } from "@/stores/inspector.store";
import { handleStorage } from "@/utils/handle-storage";
import { AxiosError } from "axios";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setInspector, handleInspectorLoading, inspector_loading } =
    useInspectorStore();

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    handleInspectorLoading(true);
    try {
      const data = await inspectorService.login({ username, password });
      setInspector(data.inspector);
      handleStorage({ key: "access_token", value: data.access_token });
      switch (data.inspector?.auth.role) {
        case "state":
          navigate("/");
          break;
        case "region":
          navigate("/region");
          break;
        case "district":
          navigate("/district");
          break;
        case "neighborhood":
          navigate("/neighborhood");
          break;
        default:
          navigate("/auth");
          break;
      }
    } catch (error) {
      if (error instanceof AxiosError)
        return toast.error(error.response?.data.error, {
          description: error.response?.data.message,
        });
      toast.error("Xatolik", { description: "Nomalum xatolik" });
    } finally {
      handleInspectorLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="hidden bg-primary lg:block">
        <div className="flex flex-col justify-center items-center h-full text-primary-foreground p-12 text-center">
          <h1 className="text-5xl font-bold">Inspector</h1>
          <p className="mt-4 text-lg">Tizimga xush kelibsiz!</p>
          <p className="mt-2 text-sm text-primary-foreground/80">
            Ish faoliyatingizni boshlash uchun tizimga kiring.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Kirish</CardTitle>
              <CardDescription>
                Davom etish uchun hisob ma'lumotlaringizni kiriting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Foydalanuvchi nomi</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Parol</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  disabled={inspector_loading}
                  className="w-full cursor-pointer"
                  type="submit"
                >
                  Kirish
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
