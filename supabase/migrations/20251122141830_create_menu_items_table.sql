/*
  # Create menu_items table

  1. New Tables
    - `menu_items`
      - `id` (uuid, primary key)
      - `title` (text) - Titre du menu
      - `description` (text) - Description du menu
      - `file_url` (text) - URL du fichier dans Supabase Storage
      - `file_type` (text) - Type MIME du fichier
      - `file_name` (text) - Nom du fichier original
      - `storage_path` (text) - Chemin dans le storage bucket
      - `display_order` (integer) - Ordre d'affichage
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `menu_items` table
    - Add policy for public read access
    - Add policy for authenticated users to manage menu items

  3. Storage Bucket
    - Create a storage bucket for menu files
    - Configure storage policies for public read and authenticated write
*/

CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  file_url text NOT NULL,
  file_type text NOT NULL,
  file_name text NOT NULL,
  storage_path text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read menu items"
  ON menu_items
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert menu items"
  ON menu_items
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update menu items"
  ON menu_items
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete menu items"
  ON menu_items
  FOR DELETE
  TO authenticated
  USING (true);

INSERT INTO storage.buckets (id, name, public) 
VALUES ('menus', 'menus', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can read menu files"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'menus');

CREATE POLICY "Authenticated users can upload menu files"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'menus');

CREATE POLICY "Authenticated users can update menu files"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'menus')
  WITH CHECK (bucket_id = 'menus');

CREATE POLICY "Authenticated users can delete menu files"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'menus');
