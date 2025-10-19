export interface Watch {
  id: number;
  name: string;
  brand: string;
  price: number;               // e.g. 1299.99
  movement: string;            // e.g. "Automatic"
  display: string;             // e.g. "Analog"
  caseMaterial: string;        // e.g. "Stainless Steel"
  glassMaterial: string;       // e.g. "Sapphire"
  style: string;               // e.g. "Dress"
  waterResistanceBar: number;  // e.g. 10 -> 100 m
  features: string[];          // e.g. ["Chronograph","Date","Lume"]
  imageUrl: string;            // http(s) image
}
