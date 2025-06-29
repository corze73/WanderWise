import { supabase } from '../lib/supabase';
import { destinationData } from '../data/destinations';

export class DestinationImporter {
  async importDestinations() {
    if (!supabase) {
      console.error('Supabase not initialized');
      return { success: false, error: 'Database not available' };
    }

    try {
      console.log('Starting destination import...');
      
      // Check if destinations already exist
      const { data: existingDestinations, error: checkError } = await supabase
        .from('destinations')
        .select('name, country')
        .limit(1);

      if (checkError) {
        throw checkError;
      }

      if (existingDestinations && existingDestinations.length > 0) {
        console.log('Destinations already exist, skipping import');
        return { success: true, message: 'Destinations already imported' };
      }

      // Import destinations in batches
      const batchSize = 10;
      let imported = 0;
      
      for (let i = 0; i < destinationData.length; i += batchSize) {
        const batch = destinationData.slice(i, i + batchSize);
        
        const { error: insertError } = await supabase
          .from('destinations')
          .insert(batch);

        if (insertError) {
          console.error('Error inserting batch:', insertError);
          throw insertError;
        }

        imported += batch.length;
        console.log(`Imported ${imported}/${destinationData.length} destinations`);
      }

      console.log('Destination import completed successfully');
      return { 
        success: true, 
        message: `Successfully imported ${imported} destinations` 
      };

    } catch (error) {
      console.error('Error importing destinations:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async importSampleHotels() {
    if (!supabase) return { success: false, error: 'Database not available' };

    try {
      // Get some destinations to link hotels to
      const { data: destinations } = await supabase
        .from('destinations')
        .select('id, name, city, country')
        .limit(10);

      if (!destinations || destinations.length === 0) {
        return { success: false, error: 'No destinations found' };
      }

      const sampleHotels = destinations.map((dest, index) => ({
        name: `Grand Hotel ${dest.name}`,
        destination_id: dest.id,
        address: `${100 + index} Main Street`,
        city: dest.city,
        country: dest.country,
        description: `Luxury hotel in the heart of ${dest.name} with world-class amenities and service.`,
        image_urls: [`https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800`],
        star_rating: 4 + (index % 2),
        average_rating: 4.2 + (index * 0.1),
        total_reviews: 150 + (index * 50),
        price_per_night: 150 + (index * 50),
        currency: 'USD',
        amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym'],
        room_types: ['Standard', 'Deluxe', 'Suite'],
        latitude: -33.8688 + (index * 0.1),
        longitude: 151.2093 + (index * 0.1)
      }));

      const { error } = await supabase
        .from('hotels')
        .insert(sampleHotels);

      if (error) throw error;

      return { success: true, message: `Imported ${sampleHotels.length} sample hotels` };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async importSampleTours() {
    if (!supabase) return { success: false, error: 'Database not available' };

    try {
      const { data: destinations } = await supabase
        .from('destinations')
        .select('id, name')
        .limit(10);

      if (!destinations || destinations.length === 0) {
        return { success: false, error: 'No destinations found' };
      }

      const tourCategories = ['cultural', 'adventure', 'food', 'historical', 'nature'];
      const sampleTours = [];

      destinations.forEach((dest, destIndex) => {
        tourCategories.forEach((category, catIndex) => {
          sampleTours.push({
            title: `${category.charAt(0).toUpperCase() + category.slice(1)} Tour of ${dest.name}`,
            destination_id: dest.id,
            description: `Experience the best ${category} attractions and activities in ${dest.name}.`,
            image_urls: [`https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800`],
            duration_hours: 4 + (catIndex * 2),
            max_participants: 15 + (catIndex * 5),
            price_per_person: 50 + (catIndex * 25),
            currency: 'USD',
            difficulty_level: ['easy', 'moderate', 'challenging'][catIndex % 3],
            category: category,
            includes: ['Guide', 'Transportation', 'Entry fees'],
            excludes: ['Meals', 'Personal expenses'],
            meeting_point: `Central ${dest.name} Tourist Office`,
            average_rating: 4.0 + (catIndex * 0.2),
            total_reviews: 25 + (catIndex * 15),
            available_dates: ['2024-07-01', '2024-07-15', '2024-08-01'],
            guide_name: `Local Guide ${destIndex + 1}`,
            guide_languages: ['English', 'Local Language']
          });
        });
      });

      const { error } = await supabase
        .from('tours')
        .insert(sampleTours);

      if (error) throw error;

      return { success: true, message: `Imported ${sampleTours.length} sample tours` };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async importSampleFlights() {
    if (!supabase) return { success: false, error: 'Database not available' };

    try {
      const airlines = ['British Airways', 'easyJet', 'Ryanair', 'Lufthansa', 'Emirates'];
      const airports = [
        { code: 'LHR', city: 'London' },
        { code: 'CDG', city: 'Paris' },
        { code: 'FCO', city: 'Rome' },
        { code: 'BCN', city: 'Barcelona' },
        { code: 'AMS', city: 'Amsterdam' }
      ];

      const sampleFlights = [];
      
      for (let i = 0; i < airports.length; i++) {
        for (let j = 0; j < airports.length; j++) {
          if (i !== j) {
            const departure = airports[i];
            const arrival = airports[j];
            const airline = airlines[i % airlines.length];
            
            sampleFlights.push({
              airline: airline,
              flight_number: `${airline.substring(0, 2).toUpperCase()}${1000 + i * 10 + j}`,
              departure_airport: departure.code,
              arrival_airport: arrival.code,
              departure_city: departure.city,
              arrival_city: arrival.city,
              departure_time: new Date(Date.now() + (i * 24 * 60 * 60 * 1000) + (8 * 60 * 60 * 1000)).toISOString(),
              arrival_time: new Date(Date.now() + (i * 24 * 60 * 60 * 1000) + (10 * 60 * 60 * 1000)).toISOString(),
              duration_minutes: 120 + (j * 30),
              price: 150 + (i * 50) + (j * 25),
              currency: 'USD',
              available_seats: 50 + (i * 10),
              aircraft_type: 'Boeing 737',
              class_type: 'economy'
            });
          }
        }
      }

      const { error } = await supabase
        .from('flights')
        .insert(sampleFlights);

      if (error) throw error;

      return { success: true, message: `Imported ${sampleFlights.length} sample flights` };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async importAllSampleData() {
    console.log('Starting comprehensive data import...');
    
    const results = {
      destinations: await this.importDestinations(),
      hotels: await this.importSampleHotels(),
      tours: await this.importSampleTours(),
      flights: await this.importSampleFlights()
    };

    const allSuccessful = Object.values(results).every(result => result.success);
    
    return {
      success: allSuccessful,
      results,
      message: allSuccessful 
        ? 'All sample data imported successfully!' 
        : 'Some imports failed. Check individual results.'
    };
  }
}

export const destinationImporter = new DestinationImporter();