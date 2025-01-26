import vader from 'vader-sentiment';

/**
 * Analyzes sentiment for all messages in the parsed data object.
 * @param {Object} parsedData - The JSON object returned by `dataParse`.
 * @returns {Object} - A new JSON object with sentiment scores added.
 */
const analyzeSentiments = (parsedData) => {
  const { map, freqMap } = parsedData;

  // Add sentiment scores to the map (grouped messages by time window)
  const analyzedMap = {};
  for (const key in map) {
    analyzedMap[key] = map[key].map((dataPoint) => {
      const sentimentScore = vader.SentimentIntensityAnalyzer.polarity_scores(
        dataPoint.messageContent
      );
      return {
        ...dataPoint,
        sentiment: sentimentScore, // Add sentiment scores to each message
      };
    });
  }

  return {
    map: analyzedMap,
    freqMap,
  };
};

export default analyzeSentiments;
