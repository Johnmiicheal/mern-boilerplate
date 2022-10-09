import React, { useEffect } from 'react';
import {
  Flex,
  Text,
  Icon,
} from '@chakra-ui/react';
import { IoPersonAddOutline } from 'react-icons/io5';
import { AiOutlineFileSearch } from 'react-icons/ai';

import GrayLayout from '_organisms/GrayLayout';
import Header from '_organisms/Header';
import BodyLayout from '_organisms/BodyLayout';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'redux-first-history';
import R from 'ramda';

export default function WelcomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));

  useEffect(() => {
    if (!R.isEmpty(user)) {
      dispatch(push('/home'));
    }
  }, [dispatch, user]);

  return (
    <BodyLayout>
      <Flex direction="column" minH="100vh">
        <Flex direction="row">
          <Flex justify="start">
            <GrayLayout />
          </Flex>
          <Flex ml="130px">
            <Header />
          </Flex>
        </Flex>
        <Flex
          direction="column"
          w={{ base: '960px', lg: '1160px' }}
          justify={{ base: 'center', lg: 'start' }}
          minH="full"
          mt="5"
          bg="gray.300"
          borderRadius="20px"
          ml={{ base: '220px', lg: '160px' }}
          py={5}
          px={10}
        >
          <Text fontSize={24} fontWeight={600} color="black">
            Dashboard
          </Text>
          <Text fontSize={18} fontWeight={500} color="black" mt={10}>
            Welcome to GrayBook
          </Text>
          <Text fontSize={18} fontWeight={400} color="black" mt={2}>
            Try registering a student to start a database.
          </Text>
          <Text fontSize={18} fontWeight={400} color="black" mt={2}>
            You can also search for a student, if they have a graybook
            case
          </Text>
          <Flex direction={{ base: 'column', lg: 'row' }} justify={{ base: 'center', lg: 'start' }} mt={10}>
            <Flex
              bg="white"
              mb={{ base: 10, lg: 0 }}
              px={4}
              py={10}
              h="100px"
              w="300px"
              borderRadius="md"
              align="center"
              cursor="pointer"
              role="group"
              _hover={{ borderWidth: '1px', borderColor: '#F4B95F' }}
              onClick={dispatch(push('/login'))}
            >
              <Flex
                color="#8E6930"
                bg="#FFCE83"
                borderRadius="full"
                p={3}
                mr={1}
              >
                <Icon as={IoPersonAddOutline} w={7} h={7} />
              </Flex>
              <Text fontSize="16px">Register a Student</Text>
            </Flex>

            <Flex
              bg="white"
              ml={{ base: 0, lg: 10 }}
              px={4}
              py={10}
              h="100px"
              w="300px"
              borderRadius="md"
              align="center"
              cursor="pointer"
              role="group"
              _hover={{ borderWidth: '1px', borderColor: '#F4B95F' }}
            >
              <Flex
                color="#343434"
                bg="#979797"
                borderRadius="full"
                p={3}
                mr={1}
              >
                <Icon as={AiOutlineFileSearch} w={7} h={7} />
              </Flex>
              <Text fontSize="16px">Search Database</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </BodyLayout>
  );
}
