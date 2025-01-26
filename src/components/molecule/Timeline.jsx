import React from 'react';
import styled from 'styled-components';
import {
  dataParse,
  parseSentimentWithData,
  getTopXPoints,
  generateTimeURL,
} from '../../utils/JSONhelpers';

/**
 * Timeline Component
 * @param {Object} props
 * @param {Array} props.blocks - An array of objects, each containing start and end times for the blocks.
 */
const Timeline = ({ commentResponse, url }) => {
  const parsedData = dataParse(commentResponse, 1);

  const { freqMap } = parsedData;
  const keys = Object.keys(freqMap).map(Number);
  const maxKey = Math.max(...keys);

  const parsedSentiment = parseSentimentWithData(parsedData);
  const top10Points = getTopXPoints(parsedSentiment, 10, 1, 60);

  const calculatePosition = (time) => (time / maxKey) * 100;

  return (
    <TimelineContainer>
      <Line>
        {top10Points.map((block, index) => {
          const left = calculatePosition(block.start);
          const width = calculatePosition(block.end) - left;

          const generatedURL = generateTimeURL(url, block.start);

          return (
            <Block
              key={index}
              style={{
                left: `${left}%`,
                width: `${width * 30}%`,
              }}
              onClick={() => window.open(generatedURL, '_blank')}
            />
          );
        })}
      </Line>
      <Labels>
        <Label>0s</Label>
        <Label>{Math.floor(maxKey / 60)}m</Label>
      </Labels>
    </TimelineContainer>
  );
};

export default Timeline;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
`;

const Line = styled.div`
  position: relative;
  width: 100%;
  height: 1.5rem;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
`;

const Block = styled.div`
  position: absolute;
  height: 100%;
  background-color: #4caf50;
  border-radius: 5px;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: #388e3c;
  }
`;

const Labels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;
