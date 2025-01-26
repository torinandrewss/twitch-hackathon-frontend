import { useState, useCallback } from 'react';
import { dataParse } from '../utils/JSONhelpers';
import { getChat } from '../api/twitchCalls';
import analyzeSentiments from '../utils/sentimentAnalysis';

const useHomeSection = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [parsedJson, setParsedJson] = useState(null);
  const [url, setUrl] = useState('');

  const downloadChatLog = useCallback(async (videoId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

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

        const comments = response[0]?.data?.video?.comments?.edges || [];
        allComments = allComments.concat(comments.map((edge) => edge.node));
        nextCursor = comments[comments.length - 1]?.cursor || null;
      } while (nextCursor);

      const parsedData = dataParse(allComments);
      const sentimentData = analyzeSentiments(parsedData);

      setParsedJson(sentimentData);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching the chat log.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { downloadChatLog, loading, error, success, parsedJson, url, setUrl };
};

export default useHomeSection;
