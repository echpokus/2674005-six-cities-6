export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Location;
};

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  image?: string; // For compatibility with components
  images?: string[]; // Gallery images for detail page
  goods?: string[]; // What's inside (amenities)
  description?: string;
  bedrooms?: number;
  maxAdults?: number;
  host?: Host;
};
