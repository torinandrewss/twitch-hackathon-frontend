const dataParse = (data) => {
  // method to parse JSON response from Twitch VOD
  // RETURNS Array ([timeOffset, message])
  const finalArr = [];
  let map = {};
  let freqMap = {};
  const window = 10; // seconds
  for (let i = 0; i < data.length; i++) {
    const timeOffset = data[i].contentOffsetSeconds;
    const messageContent = data[i].message.fragments[0].text;
    var key = Math.floor(timeOffset / window);
    const dataPoint = [timeOffset, messageContent];
    if (key in map) {
      map[key].push(dataPoint);
    } else {
      map[key] = [];
      map[key].push(dataPoint);
    }
    if (key in freqMap) {
      freqMap[key] += 1;
    } else {
      freqMap[key] = 1;
    }

    finalArr.push(dataPoint);
  }
  console.log(map);
};

export default dataParse;
