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
      <Box minH="100vh" minW="full" bg="gray.300">

        <Flex justify="center">
          {children}
        </Flex>

      </Box>
    </Center>
  );
}

BodyLayout.propTypes = {
  children: PropTypes.object.isRequired,
};
