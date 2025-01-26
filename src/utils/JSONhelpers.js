const dataParse = (data) => {
  const finalArr = [];
  let map = {};
  let freqMap = {};
  const window = 40; // seconds

  for (let i = 0; i < data.length; i++) {
    const timeOffset = data[i].contentOffsetSeconds;
    const messageContent = data[i].message.fragments[0].text;
    const key = Math.floor(timeOffset / window);
    const dataPoint = { timeOffset, messageContent };

    if (key in map) {
      map[key].push(dataPoint);
    } else {
      map[key] = [dataPoint];
    }

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

export default dataParse;
