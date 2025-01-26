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
    map,
    freqMap,
  };
};

export const generateTimeURL = (url, time_start) => {
  const hours = Math.floor(time_start / 3600);
  const minutes = Math.floor((time_start % 3600) / 60);
  const seconds = time_start % 60;

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const timeString = `${formattedHours}h${formattedMinutes}m${formattedSeconds}s`;

  return `${url}?t=${timeString}`;
};

export const parseSentimentWithData = (data) => {
  const map = data.map;
  const freqMap = data.freqMap;
  const newMap = {};

  for (const [key, value] of Object.entries(map)) {
    let compoundSum = 0;
    let validEntries = 0;
    for (let i = 0; i < value.length; i++) {
      const sentiment = value[i]?.sentiment;
      if (sentiment && typeof sentiment.compound === 'number') {
        compoundSum += Math.abs(sentiment.compound) + 1;
        validEntries++;
      }
    }

    if (validEntries > 0) {
      newMap[key] = (freqMap[key] * compoundSum) / validEntries;
    } else {
      newMap[key] = 0;
    }
  }

  return {
    newMap,
  };
};

export const getTopXPoints = (data, num, buffer, time_window) => {
  let entries = Object.entries(data.newMap);

  entries.sort((a, b) => b[1] - a[1]);
  const topXValues = entries.slice(0, num);
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
