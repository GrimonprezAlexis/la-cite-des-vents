/*
  # Fix RLS Policies - Allow Anonymous Operations

  1. Changes
    - Drop existing restrictive policies
    - Create permissive policies that allow anonymous operations
    - This is needed because the app doesn't use Supabase Auth yet
    - All operations are allowed for development/testing

  2. Security Note
    - These policies are permissive for development
    - In production, implement proper authentication
*/

DROP POLICY IF EXISTS "Anyone can read opening hours" ON opening_hours;
DROP POLICY IF EXISTS "Authenticated users can insert opening hours" ON opening_hours;
DROP POLICY IF EXISTS "Authenticated users can update opening hours" ON opening_hours;
DROP POLICY IF EXISTS "Authenticated users can delete opening hours" ON opening_hours;

DROP POLICY IF EXISTS "Anyone can read menu items" ON menu_items;
DROP POLICY IF EXISTS "Authenticated users can insert menu items" ON menu_items;
DROP POLICY IF EXISTS "Authenticated users can update menu items" ON menu_items;
DROP POLICY IF EXISTS "Authenticated users can delete menu items" ON menu_items;

DROP POLICY IF EXISTS "Anyone can read menu files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload menu files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update menu files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete menu files" ON storage.objects;

CREATE POLICY "Allow all operations on opening_hours"
  ON opening_hours
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on menu_items"
  ON menu_items
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on menu storage"
  ON storage.objects
  FOR ALL
  USING (bucket_id = 'menus')
  WITH CHECK (bucket_id = 'menus');
