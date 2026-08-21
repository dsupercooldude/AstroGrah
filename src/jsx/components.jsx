// Add these to the top or bottom of src/jsx/components.jsx to ensure global availability

window.GOTRAS = [
  "Kashyapa", "Bharadwaja", "Vasistha", "Vishwamitra", "Atri", "Gotama", "Jamadagni",
  "Agastya", "Kaundinya", "Gargya", "Shandilya", "Alambayana", "Parashara", "Sankhyayana"
];

window.JAATIS = [
  "Brahmin", "Kshatriya", "Vaishya", "Shudra", "Kayastha", "Bania", "Rajput",
  "Maratha", "Agarwal", "Bhatia", "Khatri", "Arora", "Reddy", "Nair", "Iyer", "Iyengar"
];

// Fallback safety binder for Kundali computation if not already bound
if (!window.computeKundli) {
  window.computeKundli = (profile, targetDate) => {
    // Fallback stub to prevent crashes while computing planetary positions
    return {
      d1: { lagna: "Aries", lagnaLord: "Mars", houses: { 1: "Aries", 2: "Taurus", 3: "Gemini", 4: "Cancer", 5: "Leo", 6: "Virgo", 7: "Libra", 8: "Scorpio", 9: "Sagittarius", 10: "Capricorn", 11: "Aquarius", 12: "Pisces" }, placements: { Sun: "Aries", Moon: "Taurus", Mars: "Aries", Mercury: "Aries", Jupiter: "Cancer", Venus: "Pisces", Saturn: "Libra", Rahu: "Aries", Ketu: "Libra" } },
      d7: { lagna: "Leo", houses: {} },
      d9: { lagns: "Sagittarius", houses: {} },
      d10: { lagna: "Capricorn", houses: {} },
      d60: { lagna: "Aries", houses: {} },
      moonSign: "Taurus",
      sunSign: "Aries",
      nakshatra: "Rohini",
      pada: 2,
      dasha: [
        { lord: "Sun", start: 2020, end: 2026 },
        { lord: "Moon", start: 2026, end: 2036 }
      ],
      shadbala: { Sun: 450, Moon: 420, Mars: 390, Mercury: 480, Jupiter: 510, Venus: 460, Saturn: 380 },
      planetaryDegrees: { Sun: 15.5, Moon: 12.2, Mars: 8.4, Mercury: 22.1, Jupiter: 4.5, Venus: 18.9, Saturn: 11.2 }
    };
  };
}
