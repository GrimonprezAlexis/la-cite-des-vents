'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdminGuard } from '@/components/admin-guard';
import { AdminNav } from '@/components/admin-nav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Phone, Mail, Megaphone, Save, RefreshCw, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import confetti from 'canvas-confetti';

interface ContactSettings {
  phone: string;
  email: string;
  announcement: string;
  announcement_active: boolean;
}

function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#d3cbc2', '#b8af9f', '#22c55e', '#ffffff'],
  });
}

function AdminContactContent() {
  const [settings, setSettings] = useState<ContactSettings>({
    phone: '',
    email: '',
    announcement: '',
    announcement_active: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/contact-settings', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch('/api/contact-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Échec de la mise à jour');
      }

      triggerConfetti();

      toast({
        title: 'Succès',
        description: 'Paramètres mis à jour avec succès',
      });
    } catch (error: any) {
      console.error('Error updating settings:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Échec de la mise à jour',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        <AdminNav />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Phone className="w-8 h-8 text-[#d3cbc2]" />
                <h1 className="text-3xl font-bold text-gray-900">Paramètres de Contact</h1>
              </div>
              <p className="text-gray-600">Gérez les informations de contact et les annonces</p>
            </div>
            <Button
              onClick={fetchSettings}
              variant="outline"
              size="sm"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#d3cbc2]" />
              <p className="text-gray-600 mt-4">Chargement...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Contact Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-[#d3cbc2]" />
                    Informations de Contact
                  </CardTitle>
                  <CardDescription>
                    Ces informations seront affichées sur tout le site
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Numéro de téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="022 797 10 70"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    />
                    <p className="text-sm text-gray-500">
                      Ce numéro sera affiché dans le header, footer, et toutes les pages de contact.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email de réception
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@lacitedesvents.ch"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    />
                    <p className="text-sm text-gray-500">
                      Les messages du formulaire de contact seront envoyés à cette adresse.
                      {!settings.email && ' (Utilise CONTACT_EMAIL par défaut)'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Announcement Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-[#d3cbc2]" />
                    Bandeau d&apos;annonce
                  </CardTitle>
                  <CardDescription>
                    Affichez un message important en haut de toutes les pages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Activer le bandeau</Label>
                      <p className="text-sm text-gray-500">
                        Le message sera visible par tous les visiteurs
                      </p>
                    </div>
                    <Switch
                      checked={settings.announcement_active}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, announcement_active: checked })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="announcement">Message d&apos;annonce</Label>
                    <Textarea
                      id="announcement"
                      placeholder="Ex: Fermeture exceptionnelle du 24 au 26 décembre. Joyeuses fêtes !"
                      value={settings.announcement}
                      onChange={(e) => setSettings({ ...settings, announcement: e.target.value })}
                      rows={3}
                    />
                  </div>

                  {settings.announcement_active && settings.announcement && (
                    <Alert className="bg-[#d3cbc2]/20 border-[#d3cbc2]">
                      <Info className="h-4 w-4 text-[#b8af9f]" />
                      <AlertDescription>
                        <strong>Aperçu :</strong> {settings.announcement}
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button
                  onClick={handleSave}
                  className="bg-[#d3cbc2] hover:bg-[#b8af9f] text-gray-900"
                  disabled={saving}
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Enregistrer les modifications
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminGuard>
  );
}

export default function AdminContactPage() {
  return <AdminContactContent />;
}
