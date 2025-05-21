// server/utils/threatDetector.js

module.exports = function threatDetector(description) {
  const keywords = ["phishing", "hacking", "malware", "breach", "attack"];
  return keywords.some((word) => description.toLowerCase().includes(word));
};
