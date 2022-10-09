/* eslint-disable no-unused-vars */
import { Flex, Icon, Text, Image } from '@chakra-ui/react';
import React from 'react';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { RiContactsBookFill, RiContactsBookLine } from 'react-icons/ri';
import { useRouter } from 'next/router';

export default function GrayLayout() {
  const router = useRouter();
  return (
    <Flex
      direction="column"
      bg="#212121"
      minH="full"
      w="130px"
      pos="absolute"
      mx="auto"
      px={5}
      py={4}
      align="center"
      justify="start"
      zIndex="3"
    >
      <Image src="/images/grayaxis.png" alt="grayaxis" minW="80px" />

      <Flex
        direction="column"
        mt={10}
        w="full"
        py={2}
        align="center"
        role="group"
        _hover={{ color: '#8E6930', bg: '#FFCE83' }}
        borderRadius="md"
        cursor="pointer"
        color="#FFCE83"
        onClick={() => router.push('/home')}
      >
        <Icon as={AiFillHome} w={6} h={6} mb={2} />
        <Text fontSize={13} fontWeight={500}>
          {' '}
          Home
          {' '}
        </Text>
      </Flex>

      <Flex
        direction="column"
        mt={10}
        w="full"
        py={2}
        align="center"
        role="group"
        _hover={{ color: '#8E6930', bg: '#FFCE83' }}
        borderRadius="md"
        cursor="pointer"
        color="gray.200"
        onClick={() => router.push('/login')}
      >
        <Icon as={RiContactsBookLine} w={6} h={6} mb={2} />
        <Text fontSize={13} fontWeight={400}>
          {' '}
          My Database
          {' '}
        </Text>
      </Flex>
    </Flex>
  );
}
