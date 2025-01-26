/**
 * Generate a color for sentiment, dynamically scaling between min and max sentiment values.
 * @param {number} sentiment - The sentiment value for the current data point.
 * @param {number} minSentiment - The minimum sentiment value in the dataset.
 * @param {number} maxSentiment - The maximum sentiment value in the dataset.
 * @returns {string} - The RGB color string (red to green).
 */
export const getColorForSentiment = (sentiment, minSentiment, maxSentiment) => {
  // Normalize the sentiment value to a 0-1 range based on the min and max
  const normalizedSentiment =
    (sentiment - minSentiment) / (maxSentiment - minSentiment);

  const red = Math.floor(255 * (1 - normalizedSentiment)); // Full red for minSentiment
  const green = Math.floor(255 * normalizedSentiment); // Full green for maxSentiment

  return `rgb(${red}, ${green}, 0)`; // Pure red to pure green gradient
};

/**
 * Helper function to process chat data into 20 intervals
 * @param {Object} data - The chat data containing `map` and `freqMap`
 * @returns {Array} - Array of 20 objects, each containing `totalMessages` and `averageSentiment`
 */
export const processChartData = (data) => {
  const { map, freqMap } = data;
  const keys = Object.keys(freqMap).map(Number); // Get all time interval keys as numbers
  const totalIntervals = 40;
  const maxKey = Math.max(...keys); // Max time offset key
  const intervalSize = Math.ceil(maxKey / totalIntervals);

  // Initialize intervals
  const intervals = Array.from({ length: totalIntervals }, (_, i) => ({
    start: i * intervalSize,
    end: Math.min((i + 1) * intervalSize, maxKey + 1), // Ensure last interval ends at maxKey
    totalMessages: 0,
    totalSentiment: 0,
    averageSentiment: 0,
  }));

  // Calculate total messages and sentiment for each interval
  keys.forEach((key) => {
    const matchingIntervalIndex = Math.min(
      Math.floor(key / intervalSize),
      totalIntervals - 1 // Ensure index is within bounds
    );

    const messages = map[key] || [];
    const totalMessagesInKey = freqMap[key] || 0;
    const totalCompoundSentiment = messages.reduce(
      (sum, msg) => sum + (msg.sentiment?.compound || 0),
      0
    );

    // Safely update the interval
    if (intervals[matchingIntervalIndex]) {
      intervals[matchingIntervalIndex].totalMessages += totalMessagesInKey;
      intervals[matchingIntervalIndex].totalSentiment += totalCompoundSentiment;
    }
  });

  // Compute average sentiment for each interval
  intervals.forEach((interval) => {
    if (interval.totalMessages > 0) {
      interval.averageSentiment =
        interval.totalSentiment / interval.totalMessages;
    }
  });

  return intervals;
};
