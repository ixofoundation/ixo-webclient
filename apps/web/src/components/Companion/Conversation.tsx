import { Box, Flex, ScrollArea } from '@mantine/core';
import { useCompanion } from 'hooks/useCompanion';
import { ReactComponent as AssistantIcon } from 'assets/images/icon-assistant.svg';
import Markdown from 'react-markdown';
import { useEffect } from 'react';
import { MessageBox } from './MessageBox';

const Conversation = () => {
  const { messages, newChat, assistant, sendMessage } = useCompanion();

  useEffect(() => {
    if(assistant){
      newChat();
    }
  }, [assistant, newChat]);


  return (
    <Flex bg="black" h="100%" w="100%" align="center" direction="column">
      <ScrollArea style={{ height: '100%', width: '100%', flex: 1, }}>
        <Flex w="100%" mt={0}  direction="column" align="center">
          <Flex w="750px" mt={150} direction="column">
            {messages.map((message) => {
              if (message.role === 'assistant') {
                return (
                  <Flex key={message.content} align="flex-start" justify="flex-start">
                    <Box mt={10} mr={10}>
                      <AssistantIcon fill="white" stroke="white" />
                    </Box>
                    <Flex mt={8} direction="column">
                      <Markdown>{message.content}</Markdown>
                    </Flex>
                  </Flex>
                );
              }
              return (
                <Flex key={message.content} justify="flex-end">
                  {message.content}
                </Flex>
              );
            })}
          </Flex>
        </Flex>
      </ScrollArea>
      <MessageBox sendMessage={sendMessage}/>
    </Flex>
  );
};

export default Conversation;
