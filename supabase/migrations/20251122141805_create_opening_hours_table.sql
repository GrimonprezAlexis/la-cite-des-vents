/*
  # Create opening_hours table

  1. New Tables
    - `opening_hours`
      - `id` (uuid, primary key)
      - `day_of_week` (text) - Nom du jour de la semaine (Lundi, Mardi, etc.)
      - `is_open` (boolean) - Si le restaurant est ouvert ce jour
      - `open_time` (text) - Heure d'ouverture (format HH:MM)
      - `close_time` (text) - Heure de fermeture (format HH:MM)
      - `special_note` (text) - Note spéciale optionnelle
      - `display_order` (integer) - Ordre d'affichage (0-6 pour Lundi-Dimanche)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `opening_hours` table
    - Add policy for public read access
    - Add policy for authenticated users to manage data

  3. Initial Data
    - Insert default opening hours for all 7 days of the week
*/

CREATE TABLE IF NOT EXISTS opening_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week text NOT NULL,
  is_open boolean DEFAULT true,
  open_time text DEFAULT '',
  close_time text DEFAULT '',
  special_note text DEFAULT '',
  display_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE opening_hours ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read opening hours"
  ON opening_hours
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert opening hours"
  ON opening_hours
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update opening hours"
  ON opening_hours
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete opening hours"
  ON opening_hours
  FOR DELETE
  TO authenticated
  USING (true);

INSERT INTO opening_hours (day_of_week, is_open, open_time, close_time, special_note, display_order) VALUES
  ('Lundi', false, '', '', '', 0),
  ('Mardi', true, '12:00', '22:00', '', 1),
  ('Mercredi', true, '12:00', '22:00', '', 2),
  ('Jeudi', true, '12:00', '22:00', '', 3),
  ('Vendredi', true, '12:00', '23:00', '', 4),
  ('Samedi', true, '12:00', '23:00', '', 5),
  ('Dimanche', true, '12:00', '21:00', '', 6)
ON CONFLICT DO NOTHING;
