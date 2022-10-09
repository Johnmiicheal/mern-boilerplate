/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import {
  Flex,
  Text,
  Icon,
  Center,
  Modal,
  Select,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { IoPersonAddOutline } from 'react-icons/io5';
import { AiOutlineFileSearch } from 'react-icons/ai';

import GrayLayout from '_organisms/GrayLayout';
import Header from '_organisms/Header';
import BodyLayout from '_organisms/BodyLayout';

import { useDispatch, useSelector } from 'react-redux';
import { push } from 'redux-first-history';
import R from 'ramda';

import { fakedb, fakecase, fakegender } from './fakedata';

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));
  const { school } = useSelector(R.pick(['school']));

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push('/login'));
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
            Welcome,
            {' '}
            {user.adminName}
          </Text>
          <Text fontSize={18} fontWeight={400} color="black" mt={2}>
            Try registering a student to start a database for
            {' '}
            {school.schoolName}
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
              onClick={onOpen}
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

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a case</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>First Name</FormLabel>
              <Input ref={initialRef} placeholder="First Name" focusBorderColor="#F4B95F" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input placeholder="Last Name" focusBorderColor="#F4B95F" />
            </FormControl>

            <Flex direction="row">

              <FormControl mt={4} isRequired>
                <FormLabel>Age</FormLabel>
                <NumberInput w={40}>
                  <NumberInputField placeholder="15" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Gender</FormLabel>
                <Select placeholder="Select Gender" w={40} focusBorderColor="#F4B95F">
                  {fakegender.map((p, i) => (
                    <option key={`g${i}`}>{p}</option>
                  ))}
                </Select>
              </FormControl>

            </Flex>

            <Flex direction="row">
              <FormControl mt={4} isRequired>
                <FormLabel>Grade Class</FormLabel>
                <Select placeholder="Select Grade" w={40} focusBorderColor="#F4B95F">
                  {fakedb.map((p) => (
                    <option key={p.grade}>
                      Grade
                      {p.grade}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Graybook Case</FormLabel>
                <Select placeholder="Select Case" w={40} focusBorderColor="#F4B95F">
                  {fakecase.map((p, i) => (
                    <option key={i}>{p}</option>
                  ))}
                </Select>
              </FormControl>

            </Flex>
            <Flex direction="row" justify="end" mt={10}>
              <Button
                bg="#F4B95F"
                color="white"
                _hover={{ bg: '#DAA65D' }}
                mr={3}
                type="submit"
              >
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </Flex>

          </ModalBody>
        </ModalContent>
      </Modal>

    </BodyLayout>
  );
}
