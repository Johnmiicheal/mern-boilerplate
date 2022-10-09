import {
  Avatar,
  Box,
  Flex,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuGroup,
  VStack,
  AvatarBadge,
  Button,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import {
  IoCaretDown,
} from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { RiContactsBookLine } from 'react-icons/ri';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import R from 'ramda';
import axios from 'axios';

import { attemptLogout } from '../../../store/thunks/auth';

export default function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(R.pick(['user']));
  const [show, setShow] = useState('');
  const [direct, setDirect] = useState('');
  const [school, setSchool] = useState(null);

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(setShow('none'));
      dispatch(setDirect('block'));
    } else {
      setDirect('none');
    }
  }, [dispatch, user]);

  useEffect(() => {
    axios.get('/api/school').then((response) => {
      setSchool(response.data.school[0]);
      console.log(response.data.school[0]);
    });
  }, []);

  if (!school) return 'null';

  const logout = () =>
    dispatch(attemptLogout())
      .catch(R.identity);

  return (
    <HStack spacing={{ base: '0', md: '3' }} ml={1}>
      <Flex>
        <Flex
          align="center"
          _hover={{ bg: '#EBD2FF', color: '#000a16' }}
          borderRadius="md"
          bg={{ base: 'none', md: 'none' }}
          minW={{ base: 0, md: 40 }}
          h={{ base: 0, md: 12 }}
          display={show}
        >
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack
                spacing="2"
                align="center"
                cursor="pointer"
                pr={2}
                display={{ base: 'none', md: 'flex' }}
              >
                <Avatar name={school.schoolName} size="sm" ml={1} mr={1}>
                  {' '}
                  <AvatarBadge boxSize="1.25em" bg="green.500" />
                  {' '}
                </Avatar>
                <VStack
                  flexDir="column"
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                >
                  <Text fontWeight={600} fontSize="0.9em">
                    {school.schoolName}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <IoCaretDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
                // fontSize="md"
              bg="white"
              color="gray.700"
              borderColor="gray.200"
              display={{ base: 'none', md: 'block' }}
              mt={-2}
            >
              <MenuGroup title="My School">
                <NextLink href="#" passHref>
                  <MenuItem icon={<CgProfile />}>Profile</MenuItem>
                </NextLink>
                <MenuItem icon={<RiContactsBookLine />}>My Database</MenuItem>
                <MenuItem icon={<FiSettings />}>Settings</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Help">
                <MenuItem>Docs</MenuItem>
                <MenuItem>FAQ</MenuItem>
              </MenuGroup>
              <MenuDivider />

              <MenuItem icon={<FiLogOut />} onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <Flex justify="space-between" display={direct}>
        <Button
          ml={3}
          mr={3}
          bg="#F4B95F"
          color="white"
          _hover={{ bg: '#DAA65D' }}
          borderRadius="md"
          size="sm"
          onClick={() => navigate('/login')}
        >
          Login
        </Button>

        <Button
          mr={3}
          color="#F4B95F"
          _hover={{ color: '#DAA65D' }}
          variant="ghost"
          borderRadius="md"
          size="sm"
          onClick={() => navigate('/register')}
        >
          Register
        </Button>
      </Flex>

      {/* Mobile View Avatar */}
      <Flex ml="auto" display={{ base: 'flex', md: 'none' }}>
        <HStack
          spacing="2"
          align="center"
          cursor="pointer"
          p={2}
          display={{ base: 'flex', md: 'none' }}
        >
          <Avatar name="School Name" size="sm" ml={1} mr={1}>
            {' '}
            <AvatarBadge boxSize="1.25em" bg="green.500" />
            {' '}
          </Avatar>
          <VStack
            flexDir="column"
              // ml={2}
              // mr={1}
            display={{ base: 'none', md: 'flex' }}
            alignItems="flex-start"
            spacing="1px"
          >
            <Text fontWeight={600} fontSize="0.9em">
              John Doe
            </Text>
            <Text fontSize="0.7rem">204 Points</Text>
          </VStack>
          <Box display={{ base: 'none', md: 'flex' }}>
            {/* <Badge colorScheme="green" ml={1} mr={4} variant="outline">
                      Fish
                    </Badge> */}
            <IoCaretDown />
          </Box>
        </HStack>
      </Flex>
    </HStack>
  );
}
