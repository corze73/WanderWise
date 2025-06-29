import { BookingProvider } from '../types/booking';

export const flightProviders: BookingProvider[] = [
  {
    id: 'british-airways',
    name: 'British Airways',
    type: 'flight',
    logo: 'https://logos-world.net/wp-content/uploads/2020/03/British-Airways-Logo.png',
    baseUrl: 'https://www.britishairways.com',
    isSecure: true
  },
  {
    id: 'easyjet',
    name: 'easyJet',
    type: 'flight',
    logo: 'https://logos-world.net/wp-content/uploads/2020/03/EasyJet-Logo.png',
    baseUrl: 'https://www.easyjet.com',
    isSecure: true
  },
  {
    id: 'ryanair',
    name: 'Ryanair',
    type: 'flight',
    logo: 'https://logos-world.net/wp-content/uploads/2020/03/Ryanair-Logo.png',
    baseUrl: 'https://www.ryanair.com',
    isSecure: true
  },
  {
    id: 'lufthansa',
    name: 'Lufthansa',
    type: 'flight',
    logo: 'https://logos-world.net/wp-content/uploads/2020/03/Lufthansa-Logo.png',
    baseUrl: 'https://www.lufthansa.com',
    isSecure: true
  }
];

export const hotelProviders: BookingProvider[] = [
  {
    id: 'booking-com',
    name: 'Booking.com',
    type: 'hotel',
    logo: 'https://logos-world.net/wp-content/uploads/2020/11/Booking-Logo.png',
    baseUrl: 'https://www.booking.com',
    isSecure: true
  },
  {
    id: 'expedia',
    name: 'Expedia',
    type: 'hotel',
    logo: 'https://logos-world.net/wp-content/uploads/2020/11/Expedia-Logo.png',
    baseUrl: 'https://www.expedia.com',
    isSecure: true
  },
  {
    id: 'hotels-com',
    name: 'Hotels.com',
    type: 'hotel',
    logo: 'https://logos-world.net/wp-content/uploads/2020/11/Hotels-com-Logo.png',
    baseUrl: 'https://www.hotels.com',
    isSecure: true
  },
  {
    id: 'agoda',
    name: 'Agoda',
    type: 'hotel',
    logo: 'https://logos-world.net/wp-content/uploads/2020/11/Agoda-Logo.png',
    baseUrl: 'https://www.agoda.com',
    isSecure: true
  }
];

export const tourProviders: BookingProvider[] = [
  {
    id: 'viator',
    name: 'Viator',
    type: 'tour',
    logo: 'https://logos-world.net/wp-content/uploads/2020/11/Viator-Logo.png',
    baseUrl: 'https://www.viator.com',
    isSecure: true
  },
  {
    id: 'getyourguide',
    name: 'GetYourGuide',
    type: 'tour',
    logo: 'https://logos-world.net/wp-content/uploads/2020/11/GetYourGuide-Logo.png',
    baseUrl: 'https://www.getyourguide.com',
    isSecure: true
  },
  {
    id: 'klook',
    name: 'Klook',
    type: 'tour',
    logo: 'https://logos-world.net/wp-content/uploads/2020/11/Klook-Logo.png',
    baseUrl: 'https://www.klook.com',
    isSecure: true
  },
  {
    id: 'tripadvisor',
    name: 'TripAdvisor',
    type: 'tour',
    logo: 'https://logos-world.net/wp-content/uploads/2020/11/TripAdvisor-Logo.png',
    baseUrl: 'https://www.tripadvisor.com',
    isSecure: true
  }
];

export const getAllProviders = () => [
  ...flightProviders,
  ...hotelProviders,
  ...tourProviders
];