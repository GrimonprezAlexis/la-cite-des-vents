import { db } from './firebase';
import { collection, getDocs, addDoc, query } from 'firebase/firestore';

export interface OpeningHourData {
  day_of_week: string;
  is_open: boolean;
  open_time: string;
  close_time: string;
  special_note: string;
  display_order: number;
}

const defaultHours: OpeningHourData[] = [
  {
    day_of_week: 'Lundi',
    is_open: false,
    open_time: '',
    close_time: '',
    special_note: '',
    display_order: 0,
  },
  {
    day_of_week: 'Mardi',
    is_open: true,
    open_time: '12:00',
    close_time: '22:00',
    special_note: '',
    display_order: 1,
  },
  {
    day_of_week: 'Mercredi',
    is_open: true,
    open_time: '12:00',
    close_time: '22:00',
    special_note: '',
    display_order: 2,
  },
  {
    day_of_week: 'Jeudi',
    is_open: true,
    open_time: '12:00',
    close_time: '22:00',
    special_note: '',
    display_order: 3,
  },
  {
    day_of_week: 'Vendredi',
    is_open: true,
    open_time: '12:00',
    close_time: '23:00',
    special_note: '',
    display_order: 4,
  },
  {
    day_of_week: 'Samedi',
    is_open: true,
    open_time: '12:00',
    close_time: '23:00',
    special_note: '',
    display_order: 5,
  },
  {
    day_of_week: 'Dimanche',
    is_open: true,
    open_time: '12:00',
    close_time: '21:00',
    special_note: '',
    display_order: 6,
  },
];

export async function initializeOpeningHours() {
  try {
    const q = query(collection(db, 'opening_hours'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('Initializing opening hours...');
      for (const hour of defaultHours) {
        await addDoc(collection(db, 'opening_hours'), {
          ...hour,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }
      console.log('Opening hours initialized successfully');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error initializing opening hours:', error);
    throw error;
  }
}
