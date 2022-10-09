import {
  Input,
  InputLeftElement,
  InputGroup,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import { IoSearch } from 'react-icons/io5';
import UserProfile from './UserProfile';

export default function Header() {
  return (
    <Flex
      display="flex"
      top="0"
      px="10"
      bg="white"
      position="sticky"
      h="20"
      alignItems="center"
      justifyContent="space-between"
      minW="1200px"
    >
      <Flex justify="flex-start">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
          >
            <IoSearch color="#7A7A7A" />
          </InputLeftElement>
          <Input type="text" placeholder="Search" _placeholder={{ color: '#7A7A7A' }} focusBorderColor="#F4B95F" />
        </InputGroup>
      </Flex>

      <Flex justify="flex-end">
        <UserProfile />
      </Flex>
    </Flex>
  );
}
