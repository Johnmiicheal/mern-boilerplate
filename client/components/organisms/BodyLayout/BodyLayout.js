/* eslint-disable no-undef */
import React from 'react';

import PropTypes from 'prop-types';

import {
  Box,
  Flex,
  Center,
} from '@chakra-ui/react';

export default function BodyLayout({ children }) {
  return (
    <Center>
      <Box minH="100vh" overflowY="hidden" minW="full" bg="white">

        <Flex justify="center" minH="full">
          {children}
        </Flex>

      </Box>
    </Center>
  );
}

BodyLayout.propTypes = {
  children: PropTypes.any.isRequired,
};
