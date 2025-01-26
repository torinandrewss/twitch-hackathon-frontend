/**
 * Helper function to get a color based on sentiment value
 * @param {number} sentiment - The compound sentiment value (-1 to 1)
 * @returns {string} - A color from red (negative) to green (positive)
 */
export const getColorForSentiment = (sentiment) => {
  const red = Math.max(255 * (1 - sentiment), 0); // More red for negative
  const green = Math.max(255 * (1 + sentiment), 0); // More green for positive
  return `rgb(${Math.floor(red)}, ${Math.floor(green)}, 0)`;
};

/**
 * Helper function to process chat data into 20 intervals
 * @param {Object} data - The chat data containing `map` and `freqMap`
 * @returns {Array} - Array of 20 objects, each containing `totalMessages` and `averageSentiment`
 */
export const processChartData = (data) => {
  const { map, freqMap } = data;
  const keys = Object.keys(freqMap).map(Number); // Get all time interval keys as numbers
  const totalIntervals = 20;
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
