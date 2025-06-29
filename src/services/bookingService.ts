import { 
  FlightBookingData, 
  HotelBookingData, 
  TourBookingData, 
  BookingResult,
  BookingProvider 
} from '../types/booking';
import { flightProviders, hotelProviders, tourProviders } from './bookingProviders';
import { supabase } from '../lib/supabase';

class BookingService {
  private generateSecureUrl(provider: BookingProvider, params: URLSearchParams): string {
    // Add security parameters and tracking
    params.append('ref', 'wanderwise');
    params.append('utm_source', 'wanderwise');
    params.append('utm_medium', 'referral');
    
    return `${provider.baseUrl}/search?${params.toString()}`;
  }

  async searchFlights(data: FlightBookingData): Promise<BookingResult[]> {
    const results: BookingResult[] = [];

    for (const provider of flightProviders) {
      const params = new URLSearchParams();
      
      switch (provider.id) {
        case 'british-airways':
          params.append('departurePoint', data.departure);
          params.append('arrivalPoint', data.arrival);
          params.append('departureDate', data.departureDate);
          if (data.returnDate) params.append('returnDate', data.returnDate);
          params.append('passengers', data.passengers.toString());
          params.append('cabinClass', data.classType);
          break;
          
        case 'easyjet':
          params.append('origin', data.departure);
          params.append('destination', data.arrival);
          params.append('outboundDate', data.departureDate);
          if (data.returnDate) params.append('inboundDate', data.returnDate);
          params.append('adults', data.passengers.toString());
          break;
          
        case 'ryanair':
          params.append('dateOut', data.departureDate);
          if (data.returnDate) params.append('dateIn', data.returnDate);
          params.append('origin', data.departure);
          params.append('destination', data.arrival);
          params.append('adt', data.passengers.toString());
          break;
          
        case 'lufthansa':
          params.append('origin', data.departure);
          params.append('destination', data.arrival);
          params.append('outboundDate', data.departureDate);
          if (data.returnDate) params.append('returnDate', data.returnDate);
          params.append('passengers', data.passengers.toString());
          params.append('class', data.classType);
          break;
      }

      results.push({
        provider,
        searchUrl: this.generateSecureUrl(provider, params),
        availability: true
      });
    }

    return results;
  }

  async searchHotels(data: HotelBookingData): Promise<BookingResult[]> {
    const results: BookingResult[] = [];

    for (const provider of hotelProviders) {
      const params = new URLSearchParams();
      
      switch (provider.id) {
        case 'booking-com':
          params.append('ss', data.destination);
          params.append('checkin', data.checkIn);
          params.append('checkout', data.checkOut);
          params.append('group_adults', data.guests.toString());
          params.append('no_rooms', data.rooms.toString());
          break;
          
        case 'expedia':
          params.append('destination', data.destination);
          params.append('startDate', data.checkIn);
          params.append('endDate', data.checkOut);
          params.append('rooms', data.rooms.toString());
          params.append('adults', data.guests.toString());
          break;
          
        case 'hotels-com':
          params.append('q-destination', data.destination);
          params.append('q-check-in', data.checkIn);
          params.append('q-check-out', data.checkOut);
          params.append('q-rooms', data.rooms.toString());
          params.append('q-room-0-adults', data.guests.toString());
          break;
          
        case 'agoda':
          params.append('city', data.destination);
          params.append('checkIn', data.checkIn);
          params.append('checkOut', data.checkOut);
          params.append('rooms', data.rooms.toString());
          params.append('adults', data.guests.toString());
          break;
      }

      results.push({
        provider,
        searchUrl: this.generateSecureUrl(provider, params),
        availability: true
      });
    }

    return results;
  }

  async searchTours(data: TourBookingData): Promise<BookingResult[]> {
    const results: BookingResult[] = [];

    for (const provider of tourProviders) {
      const params = new URLSearchParams();
      
      switch (provider.id) {
        case 'viator':
          params.append('destination', data.destination);
          params.append('startDate', data.date);
          params.append('travelers', data.travelers.toString());
          if (data.category) params.append('category', data.category);
          break;
          
        case 'getyourguide':
          params.append('q', data.destination);
          params.append('date', data.date);
          params.append('travelers', data.travelers.toString());
          break;
          
        case 'klook':
          params.append('city', data.destination);
          params.append('date', data.date);
          params.append('pax', data.travelers.toString());
          break;
          
        case 'tripadvisor':
          params.append('geo', data.destination);
          params.append('date', data.date);
          params.append('travelers', data.travelers.toString());
          break;
      }

      results.push({
        provider,
        searchUrl: this.generateSecureUrl(provider, params),
        availability: true
      });
    }

    return results;
  }

  // Save booking attempt to database for tracking
  async saveBookingAttempt(userId: string, provider: BookingProvider, searchData: any) {
    if (!supabase) return;
    
    try {
      await supabase.from('booking_attempts').insert({
        user_id: userId,
        provider_id: provider.id,
        provider_name: provider.name,
        booking_type: provider.type,
        search_data: searchData,
        created_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to save booking attempt:', error);
    }
  }
}

export const bookingService = new BookingService();