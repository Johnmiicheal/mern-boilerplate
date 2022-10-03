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
import FormInput from "_molecules/FormInput";

import { IoPersonOutline, IoLockClosedOutline } from "react-icons/io5";

import { FcGoogle } from "react-icons/fc";

// New Imports
import {
  Flex,
  Text,
  Button,
  Checkbox,
  Link,
  Image,
  FormControl,
} from "@chakra-ui/react";
import BodyLayout from "_organisms/BodyLayout";
import styles from "./Login.module.css";

// EndLine

export default function Login() {
  const dispatch = useDispatch();

  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setRemember(true);
      setEmail(email);
    }
  }, []);

  const login = () => {
    const userCredentials = { email, password };

    if (remember) {
      localStorage.setItem("email", email);
    }

    dispatch(attemptLogin(userCredentials)).catch(R.identity);
  };

  useKeyPress("Enter", login);

  const rememberMe = () => {
    localStorage.removeItem("email");
    setRemember(!remember);
  };

  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

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

            <Flex direction="column" mt={10}>
              <FormControl>
                <FormInput
                  onChange={updateEmail}
                  placeholder="email"
                  value={email}
                  type="email"
                  leftIcon={IoPersonOutline}
                  label="Email"
                />
                <FormInput
                  onChange={updatePassword}
                  placeholder="Password"
                  value={password}
                  leftIcon={IoLockClosedOutline}
                  type="password"
                  label="Password"
                />
              </FormControl>

              <Flex justify="center">
                <Text
                  color="#F4B95F"
                  fontSize={12}
                  fontWeight={500}
                  mt={2}
                  mb={14}
                >
                  Forgot Password?
                </Text>
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
              <Checkbox defaultChecked={remember} onChange={rememberMe}>
                {" "}
                Remember Me{" "}
              </Checkbox>

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
            />
          </Flex>
        </Flex>
      </div>
    </BodyLayout>
  );
}
