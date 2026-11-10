export const STORE_CONFIG = {
  name: "Brothers Superstore",
  tagline: "Your Campus Neighborhood General Store",
  owners: {
    brother1: "Ramesh Sharma",
    brother2: "Suresh Sharma",
  },
  phoneNumbers: {
    primary: "+91 98765 43210",
    secondary: "+91 98765 43211",
  },
  whatsapp: {
    display: "+91 98765 43210",
    number: "919876543210",
  },
  upiId: "brotherssuperstore@oksbi",
  timings: {
    display: "Mon – Sun: 7:30 AM – 10:30 PM",
    openHour: 7,
    openMinute: 30,
    closeHour: 22,
    closeMinute: 30,
  },
  location: {
    address: "Shop No. 4 & 5, University Commercial Complex",
    landmark: "50 meters from College Main Gate, Opposite Central Library Road",
    city: "Vidyanagar, Campus Zone",
    pincode: "560001",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.001689269557!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjciTiA3N8KwMzUnNDAuNCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin",
    directionsUrl: "https://maps.google.com/?q=College+Main+Gate",
  },
  sections: {
    shopA: "Shop A: Daily Groceries & Snacks",
    shopB: "Shop B: Household & College Supplies",
  },
};

export const isStoreCurrentlyOpen = () => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = STORE_CONFIG.timings.openHour * 60 + STORE_CONFIG.timings.openMinute;
  const closeMinutes = STORE_CONFIG.timings.closeHour * 60 + STORE_CONFIG.timings.closeMinute;
  return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
};
