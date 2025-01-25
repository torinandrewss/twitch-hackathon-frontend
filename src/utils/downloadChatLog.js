import { getChat } from '../api/twitchCalls';

// TODO: Add the hash as env var?
export const downloadChatLog = async (videoId) => {
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

  return allComments;
};
