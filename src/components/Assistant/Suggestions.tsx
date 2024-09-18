import React from 'react';
import { Flex } from '@mantine/core';
import SuggestionButton from './SuggestionButton';

type Props = {
  sendMessage: (message: string) => void;
  messages: string[];
  isOpen: boolean;
};

const Suggestions: React.FC<Props> = ({ sendMessage, messages, isOpen }) => {
  return (
    <Flex
      direction="column"
      align="flex-start"
      gap="4px"

      pos="absolute"
      top="calc(-100% - 50px)"
      h="100px"
      w="100%"
      style={{
        opacity: isOpen ? 1 : 0,
        zIndex: isOpen ? 1 : -1,
        transition: 'opacity 0.3s ease',
      }}
    >
      {messages.map((message) => (
        <SuggestionButton key={message} onClick={() => sendMessage(message)}>
          {message}
        </SuggestionButton>
      ))}
    </Flex>
  );
};

export default Suggestions;
