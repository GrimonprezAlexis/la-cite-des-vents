"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  checkAdminAuth,
  setAdminSession,
  isAdminAuthenticated,
} from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (isAdminAuthenticated()) {
      router.push("/admin/menu");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (checkAdminAuth(password)) {
      setAdminSession();
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans l'espace administrateur",
      });
      router.push("/admin/menu");
    } else {
      toast({
        title: "Erreur",
        description: "Mot de passe incorrect",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-[#d3cbc2] rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Espace Administrateur</CardTitle>
          <p className="text-gray-600 text-sm">La Cité des Vents</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez le mot de passe"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#d3cbc2] hover:bg-[#b8af9f] text-gray-900"
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
