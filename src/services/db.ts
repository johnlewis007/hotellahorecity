import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

export interface HotelInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  checkIn: string;
  checkOut: string;
  locationMapUrl?: string;
}

export interface Room {
  id: string;
  title: string;
  price: number;
  description: string;
  capacity: number;
  amenities: string[];
  images: string[];
  isFeatured: boolean;
}

export interface Facility {
  id: string;
  name: string;
  icon: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  message: string;
  date: string;
  read: boolean;
}

export interface DatabaseSchema {
  hotelInfo: HotelInfo;
  rooms: Room[];
  facilities: Facility[];
  reviews: Review[];
  gallery: string[];
  bookings: {
    bookingDotCom: string;
    agoda: string;
  };
  inquiries: Inquiry[];
}

export const getDb = async (): Promise<DatabaseSchema> => {
  try {
    const data = await fs.promises.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading DB:', error);
    throw new Error('Could not read database');
  }
};

export const saveDb = async (data: DatabaseSchema): Promise<void> => {
  try {
    await fs.promises.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing DB:', error);
    throw new Error('Could not write database');
  }
};
