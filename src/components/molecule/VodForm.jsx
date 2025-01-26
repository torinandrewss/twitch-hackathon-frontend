import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../atomic/Button';

const VodForm = ({ onSubmit }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url);
      setUrl(''); // Clear the input field after submission
    }
  };

  return (
    <Container>
      <Title>Enter a URL</Title>
      <form onSubmit={handleSubmit}>
        <InputField
          type="url"
          placeholder="Enter URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <Button
          text="Submit"
          variant="fill"
          type="submit"
          disabled={!url.trim()}
        />
      </form>
    </Container>
  );
};

export default VodForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const InputField = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #007bff;
  }
`;
