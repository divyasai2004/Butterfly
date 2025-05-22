module.exports = function threatDetector(description) {
  const lowerDesc = description.toLowerCase();

  const highThreat = ["bomb", "explosive", "terrorist", "gun", "attack"];
  const mediumThreat = ["malware", "breach", "phishing"];
  const lowThreat = ["suspicious", "hacking", "alert"];

  for (const word of highThreat) {
    if (lowerDesc.includes(word)) return "High";
  }
  for (const word of mediumThreat) {
    if (lowerDesc.includes(word)) return "Medium";
  }
  for (const word of lowThreat) {
    if (lowerDesc.includes(word)) return "Low";
  }

  return "Low"; // default fallback
};
