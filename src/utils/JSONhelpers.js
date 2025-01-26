import { analyzeSentiments } from './sentimentAnalysis';

export const dataParse = (data, time_window) => {
  const finalArr = [];
  let map = {};
  let freqMap = {};
  const window = time_window; // seconds

  for (let i = 0; i < data.length; i++) {
    const timeOffset = data[i].contentOffsetSeconds;
    const messageContent = data[i].message.fragments[0].text;
    const key = Math.floor(timeOffset / window);
    const dataPoint = { timeOffset, messageContent };

    // Generate lst mapping
    if (key in map) {
      map[key].push(dataPoint);
    } else {
      map[key] = [dataPoint];
    }
    // Generate frequency mapping
    if (key in freqMap) {
      freqMap[key] += 1;
    } else {
      freqMap[key] = 1;
    }

    finalArr.push(dataPoint);
  }

  return {
    map, // Grouped messages by time window
    freqMap, // Frequency of messages in each time window
  };
};

export const parseSentimentWithData = (data) => {
  const map = data.map;
  const freqMap = data.freqMap;
  const newMap = {};

  for (const [key, value] of Object.entries(map)) {
    var compoundSum = 1;
    for (let i = 0; i < value.length; i++) {
      compoundSum += Math.abs(value[i]['sentiment']['compound']) + 1;
    }
    newMap[key] = (freqMap[key] * compoundSum) / value.length;
  }

  return {
    newMap,
  };
};

export const getTopXPoints = (data, num, buffer, time_window) => {
  let entries = Object.entries(data.newMap);

  entries.sort((a, b) => b[1] - a[1]);
  console.log(entries);
  const topXValues = entries.slice(0, num);
  console.log(topXValues);
  const startAndEndPoints = [];

  for (const [key, value] of topXValues) {
    // Key is the time stamp value
    startAndEndPoints.push({
      start: Number(key) * time_window - buffer,
      end: Number(key) * time_window + buffer,
    });
  }

  return startAndEndPoints;
};
