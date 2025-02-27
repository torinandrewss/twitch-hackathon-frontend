import React, { useState } from 'react';
import { dataParse } from '../../utils/JSONhelpers';
import { getChat } from '../../api/twitchCalls';
import analyzeSentiments from '../../utils/sentimentAnalysis';
import { parseSentimentWithData } from '../../utils/JSONhelpers';
import { getTopXPoints } from '../../utils/JSONhelpers';
import FreqMapGraph from './BarGraph';

const DownloadChatLog = () => {
  const [videoId, setVideoId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [parsedJson, setJson] = useState(null);
  const [time_window, setWindow] = useState(1);

  const downloadChatLog = async () => {
    setLoading(true);
    setError(null);

    const baseQuery = JSON.stringify([
      {
        operationName: 'VideoCommentsByOffsetOrCursor',
        variables: {},
        extensions: {
          persistedQuery: {
            version: 1,
            sha256Hash:
              'b70a3591ff0f4e0313d126c6a1502d79a1c02baebb288227c582044aa76adf6a',
          },
        },
      },
    ]);

    let nextCursor = null;
    let allComments = [];

    try {
      do {
        const queryVariables = [
          `"videoID":"${videoId}"`,
          nextCursor ? `"cursor":"${nextCursor}"` : '"contentOffsetSeconds":0',
        ];

        const response = await getChat(
          'https://gql.twitch.tv/gql',
          baseQuery.replace(
            '"variables":{}',
            `"variables":{${queryVariables.join(',')}}`
          )
        );

        nextCursor = null;
        const comments = response[0]?.data?.video?.comments?.edges || [];
        allComments = allComments.concat(comments.map((edge) => edge.node));
        nextCursor = comments[comments.length - 1]?.cursor;
      } while (nextCursor);
      const time_window = 1;
      setWindow(time_window);
      const buffer = 20;
      const parsedJson = dataParse(allComments, time_window);

      const sentimentJson = analyzeSentiments(parsedJson);

      console.log('Sentiment JSON: ', sentimentJson);
      const anomalyData = parseSentimentWithData(sentimentJson);

      console.log('F(x_i): ', anomalyData);

      const startEndPoints = getTopXPoints(
        anomalyData,
        10,
        buffer,
        time_window
      );
      console.log('Top Points : ', startEndPoints);

      setJson(anomalyData);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Twitch Chat Log Downloader</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="videoId">Video ID: </label>
        <input
          id="videoId"
          type="text"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          style={{ padding: '5px', width: '300px' }}
        />
        <button
          onClick={downloadChatLog}
          style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer' }}
        >
          Download
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {success && (
        <>
          <FreqMapGraph freqMap={parsedJson.newMap} time_window={time_window} />
        </>
      )}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default DownloadChatLog;
