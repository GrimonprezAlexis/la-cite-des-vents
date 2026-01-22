'use client';

import { useState } from 'react';
import { AdminGuard } from '@/components/admin-guard';
import { AdminNav } from '@/components/admin-nav';
import { useMenuItems } from '@/hooks/use-menu-items';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FileText, Trash2, Plus, Upload, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import confetti from 'canvas-confetti';

function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#d3cbc2', '#b8af9f', '#22c55e', '#ffffff'],
  });
}

function AdminMenuContent() {
  const { menuItems, isLoading, mutate } = useMenuItems({ refreshInterval: 0 });
  const [uploading, setUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [preview, setPreview] = useState<{ url: string; type: string; name: string } | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null as File | null,
  });

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.file) {
      toast({
        title: 'Erreur',
        description: 'Veuillez sélectionner un fichier',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.title.trim()) {
      toast({
        title: 'Erreur',
        description: 'Veuillez entrer un titre',
        variant: 'destructive',
      });
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (formData.file.size > maxSize) {
      toast({
        title: 'Erreur',
        description: 'Le fichier est trop volumineux (max 10 MB)',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);

    try {
      // Upload file to S3 via API Route
      const uploadData = new FormData();
      uploadData.append('file', formData.file);

      const uploadRes = await fetch('/api/upload-menu', {
        method: 'POST',
        body: uploadData,
      });

      if (!uploadRes.ok) {
        const errorData = await uploadRes.json();
        throw new Error(errorData.error || "Échec de l'upload");
      }

      const { url: fileUrl, storagePath, fileName, fileType } = await uploadRes.json();

      // Save to Firestore via API Route
      const saveRes = await fetch('/api/menu-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description || '',
          file_url: fileUrl,
          file_type: fileType,
          file_name: fileName,
          storage_path: storagePath,
          display_order: menuItems.length,
        }),
      });

      if (!saveRes.ok) {
        throw new Error("Échec de l'enregistrement");
      }

      setFormData({ title: '', description: '', file: null });
      setIsDialogOpen(false);
      mutate(); // Revalidate SWR cache

      // Trigger confetti
      triggerConfetti();

      toast({
        title: 'Succès',
        description: 'Menu ajouté avec succès',
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Erreur',
        description: error.message || "Échec de l'upload du fichier",
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(item: { id: string; title: string; storage_path: string }) {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${item.title}" ?`)) {
      return;
    }

    try {
      // Delete file from S3 via API Route
      if (item.storage_path) {
        await fetch(`/api/delete-menu?key=${encodeURIComponent(item.storage_path)}`, {
          method: 'DELETE',
        }).catch((err) => {
          console.error('Storage deletion error:', err);
        });
      }

      // Delete from Firestore via API Route
      const deleteRes = await fetch(`/api/menu-items?id=${encodeURIComponent(item.id)}`, {
        method: 'DELETE',
      });

      if (!deleteRes.ok) {
        throw new Error('Échec de la suppression');
      }

      mutate(); // Revalidate SWR cache

      // Trigger confetti
      triggerConfetti();

      toast({
        title: 'Succès',
        description: 'Menu supprimé avec succès',
      });
    } catch (error: any) {
      console.error('Delete error:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Échec de la suppression',
        variant: 'destructive',
      });
    }
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        <AdminNav />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-8 h-8 text-[#d3cbc2]" />
                <h1 className="text-3xl font-bold text-gray-900">Gestion des Menus</h1>
              </div>
              <p className="text-gray-600">Gérez les menus du restaurant (PDF ou images)</p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#d3cbc2] hover:bg-[#b8af9f] text-gray-900">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un menu
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Ajouter un nouveau menu</DialogTitle>
                  <DialogDescription>
                    Téléchargez un fichier PDF ou une image du menu
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleUpload} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre *</Label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Ex: Menu du jour"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Description optionnelle"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file">Fichier (PDF ou Image) *</Label>
                    <Input
                      id="file"
                      type="file"
                      accept="application/pdf,image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setFormData({ ...formData, file });
                      }}
                      required
                      key={isDialogOpen ? 'dialog-open' : 'dialog-closed'}
                    />
                    <p className="text-xs text-gray-500">PDF ou image (max 10 MB)</p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#d3cbc2] hover:bg-[#b8af9f] text-gray-900"
                    disabled={uploading}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Upload en cours...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Télécharger
                      </>
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#d3cbc2]" />
              <p className="text-gray-600 mt-4">Chargement...</p>
            </div>
          ) : menuItems.length === 0 ? (
            <Card className="max-w-4xl">
              <CardContent className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Aucun menu</h2>
                <p className="text-gray-600 mb-6">
                  Commencez par ajouter votre premier menu
                </p>
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="bg-[#d3cbc2] hover:bg-[#b8af9f] text-gray-900"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un menu
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <FileText className="w-4 h-4" />
                      <span className="truncate">{item.file_name}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setPreview({
                            url: `/api/view-menu?key=${encodeURIComponent(item.storage_path)}`,
                            type: item.file_type,
                            name: item.file_name,
                          });
                        }}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Voir
                      </Button>
                      <Button
                        onClick={() => handleDelete(item)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Modal de prévisualisation */}
          <Dialog open={!!preview} onOpenChange={(open) => !open && setPreview(null)}>
            <DialogContent className="max-w-2xl w-full">
              <DialogHeader>
                <DialogTitle>Prévisualisation du menu</DialogTitle>
                <DialogDescription>{preview?.name}</DialogDescription>
              </DialogHeader>
              {preview?.type.startsWith('image/') ? (
                <img src={preview.url} alt={preview.name} className="w-full max-h-[70vh] object-contain rounded" />
              ) : preview?.type === 'application/pdf' ? (
                <iframe src={preview.url} title={preview.name} className="w-full min-h-[70vh] rounded" />
              ) : (
                <div className="text-center text-gray-500">Type de fichier non supporté</div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </AdminGuard>
  );
}

export default function AdminMenuPage() {
  return <AdminMenuContent />;
}
