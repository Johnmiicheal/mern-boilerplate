/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable quotes */
/* eslint-disable no-alert */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import R from "ramda";

// import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
// import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';

// import Box from 'react-bulma-companion/lib/Box';
// import Block from 'react-bulma-companion/lib/Block';
// import Title from 'react-bulma-companion/lib/Title';
// import Control from 'react-bulma-companion/lib/Control';
// import Button from 'react-bulma-companion/lib/Button';
// import Checkbox from 'react-bulma-companion/lib/Checkbox';

import useKeyPress from "_hooks/useKeyPress";
import { attemptLogin } from "_thunks/auth";

import { IoPersonOutline, IoLockClosedOutline } from "react-icons/io5";

import { FcGoogle } from "react-icons/fc";

// New Imports
import {
  Flex,
  Text,
  Button,
  Link,
  Image,
  FormControl,
  FormLabel,
  Input,
  InputLeftElement,
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import BodyLayout from "_organisms/BodyLayout";
import styles from "./Login.module.css";

// EndLine

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setEmail(email);
    }
  }, []);

  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const login = () => {
    const userCredentials = { email, password };
    dispatch(attemptLogin(userCredentials)).catch(R.identity);
  };

  useKeyPress("Enter", login);

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <BodyLayout>
      <div className={styles.wavy}>
        <Flex
          direction="row"
          w="full"
          align="center"
          px={40}
          zIndex={2}
          mt={20}
        >
          <Flex
            direction="column"
            justify="center"
            bg="white"
            w="600px"
            py={5}
            px={10}
            borderRadius="md"
            mt={10}
          >
            <Image
              src="/images/grayfull.png"
              alt="grayfull"
              w={40}
              pointerEvents="none"
            />
            <Text mt={2} fontSize={20} fontWeight={500}>
              Login to GrayBook
            </Text>
            <Button
              mt={10}
              leftIcon={<FcGoogle size={20} />}
              alignItems="center"
              variant="outline"
              colorScheme="gray"
            >
              Login with Google
            </Button>

            <Flex direction="column" mt={10} justify="center">
              <FormControl>
                <FormLabel fontSize={14}>Email Address</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={IoPersonOutline} w={5} h={5} mt={1} />
                  </InputLeftElement>
                  <Input
                    placeholder="Email"
                    type="email"
                    variant="outline"
                    mb={2}
                    focusBorderColor="#F4B95F"
                    onChange={updateEmail}
                  />
                </InputGroup>
              </FormControl>

                <FormControl>
                <FormLabel fontSize={14}>Password</FormLabel>
                <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={IoLockClosedOutline} w={5} h={5} mt={1} />
                </InputLeftElement>
                  <Input
                    placeholder="Password"
                    type={show ? 'text' : 'password'}
                    variant="outline"
                    focusBorderColor="#F4B95F"
                    onChange={updatePassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Flex justify="start">
                <Link
                  color="#F4B95F"
                  fontSize={12}
                  fontWeight={500}
                  mt={2}
                  mb={14}
                  href="/recovery"
                >
                  Forgot Password?
                </Link>
                <Text
                  color="gray.500"
                  fontSize={12}
                  fontWeight={500}
                  mt={2}
                  mb={14}
                  ml={6}
                >
                  Don't have an account?{" "}
                  <Link color="#F4B95F" href="/register">
                    Register Here
                  </Link>
                </Text>
              </Flex>

              <Button
                mt={4}
                w="full"
                bg="#F4B95F"
                color="white"
                _hover={{ bg: "#DAA65D" }}
                onClick={login}
                type="submit"
              >
                Login
              </Button>
            </Flex>
          </Flex>

          <Flex justify="end">
            <Image
              src="/images/grayart.png"
              alt="gray2art"
              w="70%"
              pointerEvents="none"
            />
          </Flex>
        </Flex>
      </div>
    </BodyLayout>
  );
}
