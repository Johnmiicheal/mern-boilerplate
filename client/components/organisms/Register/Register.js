import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import R from 'ramda';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
// import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons/faTriangleExclamation';

// import Box from 'react-bulma-companion/lib/Box';
// import Button from 'react-bulma-companion/lib/Button';
// import Title from 'react-bulma-companion/lib/Title';
// import Field from 'react-bulma-companion/lib/Field';
// import Control from 'react-bulma-companion/lib/Control';
// import Icon from 'react-bulma-companion/lib/Icon';
// import Input from 'react-bulma-companion/lib/Input';
// import Label from 'react-bulma-companion/lib/Label';
// import Help from 'react-bulma-companion/lib/Help';

import useKeyPress from '_hooks/useKeyPress';
import { postCheckUser, postCheckPhoneNumber } from '_api/users';
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateAdminName,
} from '_utils/validation';
import { attemptRegister } from '_thunks/auth';

import BodyLayout from '_organisms/BodyLayout';

import {
  Box,
  Flex,
  Text,
  Center,
  Image,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  InputLeftAddon,
  InputGroup,
  Link,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

import NextLink from 'next/link';
import { useRouter } from 'next/router';
import styles from './Register.module.css';

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminName, setAdminName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [adminNameMessage, setAdminNameMessage] = useState('');
  const [phoneNumberMessage, setPhoneNumberMessage] = useState('');

  const [emailAvailable, setEmailAvailable] = useState(false);
  const [phoneNumberAvailable, setPhoneNumberAvailable] = useState(false);

  const [passwordValid, setPasswordValid] = useState(false);
  const [adminNameValid, setAdminNameValid] = useState(false);

  const checkPassword = (newEmail, newPassword) => {
    const { valid, message } = validatePassword(newEmail, newPassword);
    setPasswordValid(valid);
    setPasswordMessage(message);
  };

  const checkAdminName = (newAdminName) => {
    const { valid, message } = validateAdminName(newAdminName);
    setAdminNameValid(valid);
    setAdminNameMessage(message);
  };

  const checkPhoneNumber = (newPhoneNumber) => {
    const { valid, message } = validatePhoneNumber(newPhoneNumber);
    if (valid) {
      setPhoneNumberMessage('Checking email...');
      setPhoneNumberAvailable(false);

      postCheckPhoneNumber(newPhoneNumber)
        .then((res) => {
          setPhoneNumberAvailable(res.available);
          setPhoneNumberMessage(res.message);
        })
        .catch(R.identity);
    } else {
      setPhoneNumberAvailable(valid);
      setPhoneNumberMessage(message);
    }
  };

  const checkEmail = (newEmail) => {
    const { valid, message } = validateEmail(newEmail);

    if (valid) {
      setEmailMessage('Checking email...');
      setEmailAvailable(false);

      postCheckUser(newEmail)
        .then((res) => {
          setEmailAvailable(res.available);
          setEmailMessage(res.message);
        })
        .catch(R.identity);
    } else {
      setEmailAvailable(valid);
      setEmailMessage(message);
    }
  };

  const updateEmail = (newEmail) => {
    setEmail(newEmail);
    checkPassword(newEmail, password);
  };

  const updatePhoneNumber = (newPhoneNumber) => {
    setPhoneNumber(newPhoneNumber);
    checkPhoneNumber(newPhoneNumber, phoneNumber);
  };

  const handlePhoneNumberChange = (e) => {
    updatePhoneNumber(e.target.value);
    checkPhoneNumber(e.target.value);
  };

  const handleAdminNameChange = (e) => {
    setAdminName(e.target.value);
    checkAdminName(e.target.value);
  };

  const handleEmailChange = (e) => {
    updateEmail(e.target.value);
    checkEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkPassword(email, e.target.value);
  };

  const register = () => {
    if (
      emailAvailable
      && passwordValid
      && phoneNumberAvailable
      && adminNameValid
    ) {
      const newUser = {
        email,
        password,
        adminName,
        phoneNumber,
      };

      dispatch(attemptRegister(newUser)).catch(R.identity);
    }
  };

  useKeyPress('Enter', register);

  return (
  // <Box className={styles.root}>
  //   <Title size="3">
  //     Sign Up
  //   </Title>
  //   <hr className="separator" />
  //   <p className="has-space-below">
  //     Already a member?&nbsp;
  //     <Link to="/login">
  //       Login
  //     </Link>
  //   </p>
  //   <Field>
  //     <Label htmlFor="email">
  //       email
  //     </Label>
  //     <Control iconsRight>
  //       <Input
  //         id="email"
  //         placeholder="email"
  //         color={email ? (emailAvailable ? 'success' : 'danger') : undefined}
  //         value={email}
  //         onChange={handleEmailChange}
  //       />
  //       {email && (
  //         <Icon
  //           size="small"
  //           align="right"
  //           color={emailAvailable ? 'success' : 'danger'}
  //         >
  //           <FontAwesomeIcon
  //             icon={emailAvailable ? faCheck : faTriangleExclamation}
  //           />
  //         </Icon>
  //       )}
  //     </Control>
  //     {email && (
  //       <Help color={emailAvailable ? 'success' : 'danger'}>
  //         {emailMessage}
  //       </Help>
  //     )}
  //   </Field>
  //   <Field>
  //     <Label htmlFor="password">
  //       Password
  //     </Label>
  //     <Control iconsRight>
  //       <Input
  //         id="password"
  //         placeholder="Password"
  //         type="password"
  //         color={password ? (passwordValid ? 'success' : 'danger') : undefined}
  //         value={password}
  //         onChange={handlePasswordChange}
  //       />
  //       {password && (
  //         <Icon
  //           size="small"
  //           align="right"
  //           color={passwordValid ? 'success' : 'danger'}
  //         >
  //           <FontAwesomeIcon
  //             icon={passwordValid ? faCheck : faTriangleExclamation}
  //           />
  //         </Icon>
  //       )}
  //     </Control>
  //     {password && (
  //       <Help color={passwordValid ? 'success' : 'danger'}>
  //         {passwordMessage}
  //       </Help>
  //     )}
  //   </Field>
  //   <hr className="separator" />
  //   <div className="has-text-right">
  //     <Button color="success" onClick={register} disabled={!passwordValid || !emailAvailable}>
  //       Create Account
  //     </Button>
  //   </div>
  // </Box>

    <BodyLayout>
      <div className={styles.rewavy}>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          justify={{ lg: 'space-between' }}
          align="center"
          px={{ base: 3, md: 10, lg: 40 }}
        >
          <Flex
            direction="column"
            justify="center"
            bg="white"
            w={{ base: 'full', md: '500px', lg: '600px' }}
            pb={5}
            px={{ base: 2, md: 5, lg: 10 }}
            mr={20}
            h="100vh"
          >
            <Image src="/images/grayfull.png" alt="grayfull" w={40} />
            <Text mt={2} fontSize={16} fontWeight={500}>
              Register to GrayBook
            </Text>
            <Flex>
              <Text
                color="gray.500"
                fontSize={12}
                fontWeight={500}
                mt={5}
                mb={4}
              >
                Already have an account?
                {' '}
                <NextLink href="/login" passHref>
                  <Link color="#F4B95F">Login Here</Link>
                </NextLink>
              </Text>
            </Flex>
            <Button
              leftIcon={<FcGoogle size={20} />}
              alignItems="center"
              variant="outline"
              colorScheme="gray"
              fontSize={14}
            >
              Register with Google
            </Button>

            <Flex direction="column" mt={10} justify="center">
              <FormControl>
                <FormLabel fontSize={14}>Admin Name</FormLabel>
                <Input
                  placeholder="Admin Name"
                  type="text"
                  variant="outline"
                  mb={2}
                  focusBorderColor="#F4B95F"
                />
                <FormErrorMessage>
                  {adminNameMessage}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel fontSize={14}>Email Address</FormLabel>
                <Input
                  placeholder="Email"
                  type="email"
                  variant="outline"
                  mb={2}
                  focusBorderColor="#F4B95F"
                />
                <FormErrorMessage>
                  {emailMessage}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel fontSize={14}>Phone Number</FormLabel>
                <InputGroup>
                  <InputLeftAddon>+234</InputLeftAddon>
                  <Input type="tel" placeholder="phone number" variant="outline" mb={2} focusBorderColor="#F4B95F" />
                </InputGroup>
                <FormErrorMessage>
                  {phoneNumberMessage}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel fontSize={14}>Password</FormLabel>
                <Input
                  placeholder="Password"
                  type="password"
                  variant="outline"
                  focusBorderColor="#F4B95F"
                />
                <FormErrorMessage>
                  {passwordMessage}
                </FormErrorMessage>
              </FormControl>
              <Button
                mt={4}
                w="full"
                bg="#F4B95F"
                color="white"
                _hover={{ bg: '#DAA65D' }}
                onClick={() => router.push('/onboarding')}
                type="submit"
              >
                Continue
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
