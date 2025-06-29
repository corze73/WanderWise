export interface FlightBookingData {
  departure: string;
  arrival: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  classType: 'economy' | 'premium' | 'business' | 'first';
  tripType: 'roundtrip' | 'oneway' | 'multicity';
}

export interface HotelBookingData {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
}

export interface TourBookingData {
  destination: string;
  date: string;
  travelers: number;
  category: string;
}

export interface BookingProvider {
  id: string;
  name: string;
  type: 'flight' | 'hotel' | 'tour';
  logo: string;
  baseUrl: string;
  isSecure: boolean;
}

export interface BookingResult {
  provider: BookingProvider;
  searchUrl: string;
  price?: number;
  currency?: string;
  availability: boolean;
}