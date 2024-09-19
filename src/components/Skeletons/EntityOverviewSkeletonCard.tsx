import React from 'react';
import { Flex, Skeleton } from '@mantine/core';

const EntityOverviewSkeleton = () => {
  return (
    <Flex
      direction="column"
      w="100%"
      h="100%"
      style={{borderRadius: '10px', overflow: "hidden", cursor: "pointer"}}
    >
      <Skeleton height={300} style={{ borderRadius: '10px 10px' }} />
    </Flex>
  );
};

export default EntityOverviewSkeleton;
