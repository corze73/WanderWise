/*
  # Seed Sample Data for Travel Booking Platform

  1. Sample Data
    - Popular destinations around the world
    - Sample hotels for each destination
    - Sample tours and experiences
    - Sample flight routes

  2. Purpose
    - Provide realistic data for development and testing
    - Demonstrate the platform's capabilities
    - Enable immediate functionality testing
*/

-- Insert sample destinations
INSERT INTO destinations (name, country, city, description, image_url, latitude, longitude, popular_months) VALUES
('Paris, France', 'France', 'Paris', 'City of Light with iconic landmarks and romantic charm', 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=800', 48.8566, 2.3522, ARRAY['April', 'May', 'June', 'September', 'October']),
('Tokyo, Japan', 'Japan', 'Tokyo', 'Modern metropolis blending tradition with innovation', 'https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-temple-161401.jpeg?auto=compress&cs=tinysrgb&w=800', 35.6762, 139.6503, ARRAY['March', 'April', 'May', 'October', 'November']),
('Santorini, Greece', 'Greece', 'Santorini', 'Stunning sunsets and white-washed cliff-top villages', 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800', 36.3932, 25.4615, ARRAY['May', 'June', 'July', 'August', 'September']),
('Bali, Indonesia', 'Indonesia', 'Bali', 'Tropical paradise with temples, beaches, and culture', 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800', -8.3405, 115.0920, ARRAY['April', 'May', 'June', 'July', 'August', 'September']),
('New York City, USA', 'United States', 'New York', 'The city that never sleeps with endless attractions', 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=800', 40.7128, -74.0060, ARRAY['April', 'May', 'June', 'September', 'October']),
('Rome, Italy', 'Italy', 'Rome', 'Eternal city with ancient history and incredible cuisine', 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800', 41.9028, 12.4964, ARRAY['April', 'May', 'June', 'September', 'October']);

-- Insert sample hotels
INSERT INTO hotels (name, destination_id, address, city, country, description, image_urls, star_rating, price_per_night, amenities, room_types, latitude, longitude) VALUES
('Hotel des Invalides', (SELECT id FROM destinations WHERE city = 'Paris'), '129 Rue de Grenelle, 75007 Paris', 'Paris', 'France', 'Luxury hotel near the Eiffel Tower with elegant rooms and exceptional service', ARRAY['https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800'], 5, 450.00, ARRAY['WiFi', 'Spa', 'Restaurant', 'Bar', 'Concierge', 'Room Service'], ARRAY['Standard', 'Deluxe', 'Suite'], 48.8566, 2.3522),
('Tokyo Grand Hotel', (SELECT id FROM destinations WHERE city = 'Tokyo'), '1-1-1 Marunouchi, Chiyoda City, Tokyo', 'Tokyo', 'Japan', 'Modern luxury hotel in the heart of Tokyo with stunning city views', ARRAY['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800'], 5, 380.00, ARRAY['WiFi', 'Fitness Center', 'Restaurant', 'Bar', 'Business Center'], ARRAY['Standard', 'Executive', 'Suite'], 35.6762, 139.6503),
('Santorini Sunset Villa', (SELECT id FROM destinations WHERE city = 'Santorini'), 'Oia, Santorini 84702', 'Santorini', 'Greece', 'Boutique hotel with infinity pool and breathtaking sunset views', ARRAY['https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800'], 4, 320.00, ARRAY['WiFi', 'Pool', 'Restaurant', 'Spa', 'Terrace'], ARRAY['Standard', 'Sea View', 'Suite'], 36.3932, 25.4615),
('Bali Beach Resort', (SELECT id FROM destinations WHERE city = 'Bali'), 'Jl. Pantai Kuta, Kuta, Bali', 'Bali', 'Indonesia', 'Tropical resort with private beach access and traditional Balinese architecture', ARRAY['https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800'], 4, 180.00, ARRAY['WiFi', 'Pool', 'Beach Access', 'Spa', 'Restaurant', 'Bar'], ARRAY['Garden View', 'Ocean View', 'Villa'], -8.3405, 115.0920),
('Manhattan Plaza Hotel', (SELECT id FROM destinations WHERE city = 'New York'), '391 7th Ave, New York, NY 10001', 'New York', 'United States', 'Modern hotel in Times Square with easy access to Broadway shows', ARRAY['https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=800'], 4, 280.00, ARRAY['WiFi', 'Fitness Center', 'Restaurant', 'Bar', 'Business Center'], ARRAY['Standard', 'Deluxe', 'Suite'], 40.7128, -74.0060),
('Roma Heritage Hotel', (SELECT id FROM destinations WHERE city = 'Rome'), 'Via del Corso, 126, 00186 Roma RM', 'Rome', 'Italy', 'Historic hotel near the Pantheon with classic Italian elegance', ARRAY['https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800'], 4, 220.00, ARRAY['WiFi', 'Restaurant', 'Bar', 'Concierge', 'Terrace'], ARRAY['Classic', 'Superior', 'Junior Suite'], 41.9028, 12.4964);

-- Insert sample tours
INSERT INTO tours (title, destination_id, description, image_urls, duration_hours, max_participants, price_per_person, category, includes, excludes, meeting_point, guide_name, guide_languages) VALUES
('Eiffel Tower & Seine River Cruise', (SELECT id FROM destinations WHERE city = 'Paris'), 'Skip-the-line access to Eiffel Tower with romantic Seine river cruise', ARRAY['https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=800'], 4, 15, 89.00, 'city_tour', ARRAY['Skip-the-line tickets', 'River cruise', 'Professional guide', 'Audio headsets'], ARRAY['Food and drinks', 'Hotel pickup'], 'Eiffel Tower South Pillar', 'Marie Dubois', ARRAY['English', 'French', 'Spanish']),
('Tokyo Food & Culture Walking Tour', (SELECT id FROM destinations WHERE city = 'Tokyo'), 'Explore authentic Tokyo neighborhoods with local food tastings', ARRAY['https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-temple-161401.jpeg?auto=compress&cs=tinysrgb&w=800'], 6, 12, 95.00, 'food_drink', ARRAY['Food tastings', 'Local guide', 'Cultural insights', 'Small group'], ARRAY['Additional food', 'Transportation'], 'Shibuya Station Hachiko Exit', 'Takeshi Yamamoto', ARRAY['English', 'Japanese']),
('Santorini Sunset Photography Tour', (SELECT id FROM destinations WHERE city = 'Santorini'), 'Capture the perfect sunset shots at the most scenic locations', ARRAY['https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800'], 3, 8, 75.00, 'photography', ARRAY['Professional photographer guide', 'Photography tips', 'Best viewpoints', 'Small group'], ARRAY['Camera equipment', 'Transportation'], 'Oia Castle Ruins', 'Nikos Papadopoulos', ARRAY['English', 'Greek']),
('Bali Temple & Rice Terrace Adventure', (SELECT id FROM destinations WHERE city = 'Bali'), 'Discover ancient temples and stunning rice terraces with local insights', ARRAY['https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800'], 8, 16, 65.00, 'cultural', ARRAY['Temple entrance fees', 'Local guide', 'Traditional lunch', 'Transportation'], ARRAY['Personal expenses', 'Tips'], 'Ubud Central Parking', 'Made Sutrisna', ARRAY['English', 'Indonesian']),
('Central Park & Museums Tour', (SELECT id FROM destinations WHERE city = 'New York'), 'Explore Central Park and visit world-famous museums', ARRAY['https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=800'], 5, 20, 85.00, 'city_tour', ARRAY['Museum tickets', 'Professional guide', 'Park highlights', 'Audio system'], ARRAY['Food and drinks', 'Hotel pickup'], 'Central Park South Entrance', 'Sarah Johnson', ARRAY['English', 'Spanish']),
('Rome Colosseum & Ancient History Tour', (SELECT id FROM destinations WHERE city = 'Rome'), 'Step back in time with skip-the-line access to ancient Roman sites', ARRAY['https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800'], 4, 18, 79.00, 'historical', ARRAY['Skip-the-line tickets', 'Expert historian guide', 'Colosseum access', 'Roman Forum'], ARRAY['Food and drinks', 'Transportation'], 'Colosseum Metro Station Exit', 'Marco Rossi', ARRAY['English', 'Italian', 'French']);

-- Insert sample flights
INSERT INTO flights (airline, flight_number, departure_airport, arrival_airport, departure_city, arrival_city, departure_time, arrival_time, duration_minutes, price, available_seats, aircraft_type, class_type) VALUES
('Air France', 'AF1234', 'JFK', 'CDG', 'New York', 'Paris', '2024-03-15 20:30:00+00', '2024-03-16 09:45:00+00', 435, 650.00, 45, 'Boeing 777', 'economy'),
('Japan Airlines', 'JL5678', 'LAX', 'NRT', 'Los Angeles', 'Tokyo', '2024-03-20 11:15:00+00', '2024-03-21 15:30:00+00', 675, 890.00, 32, 'Boeing 787', 'economy'),
('Aegean Airlines', 'A3901', 'ATH', 'JTR', 'Athens', 'Santorini', '2024-04-10 14:20:00+00', '2024-04-10 15:15:00+00', 55, 120.00, 78, 'Airbus A320', 'economy'),
('Garuda Indonesia', 'GA234', 'CGK', 'DPS', 'Jakarta', 'Bali', '2024-04-05 08:30:00+00', '2024-04-05 11:45:00+00', 135, 180.00, 56, 'Boeing 737', 'economy'),
('Delta Airlines', 'DL567', 'LAX', 'JFK', 'Los Angeles', 'New York', '2024-03-25 06:00:00+00', '2024-03-25 14:30:00+00', 330, 420.00, 67, 'Airbus A330', 'economy'),
('Alitalia', 'AZ890', 'FCO', 'JFK', 'Rome', 'New York', '2024-04-12 10:45:00+00', '2024-04-12 14:20:00+00', 515, 720.00, 23, 'Boeing 777', 'economy');