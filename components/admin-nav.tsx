"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { clearAdminSession } from "@/lib/auth";
import { LogOut, Menu as MenuIcon, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    clearAdminSession();
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
    router.push("/admin");
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-gray-900">
              Admin - La Cité des Vents
            </h1>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/admin/menu">
                <Button
                  variant={isActive("/admin/menu") ? "default" : "ghost"}
                  className={
                    isActive("/admin/menu")
                      ? "bg-[#d3cbc2] hover:bg-[#b8af9f] text-gray-900"
                      : ""
                  }
                >
                  <MenuIcon className="w-4 h-4 mr-2" />
                  Gestion Menu
                </Button>
              </Link>
              <Link href="/admin/horaires">
                <Button
                  variant={isActive("/admin/horaires") ? "default" : "ghost"}
                  className={
                    isActive("/admin/horaires")
                      ? "bg-[#d3cbc2] hover:bg-[#b8af9f] text-gray-900"
                      : ""
                  }
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Gestion Horaires
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm">
                Voir le site
              </Button>
            </Link>
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
