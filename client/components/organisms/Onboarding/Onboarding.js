import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import R from 'ramda';

import {
  Flex,
  Image,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  Textarea,
  Button,
  Input,
  InputGroup,
  Select,
} from '@chakra-ui/react';

import { validateName, validateRCNumber } from '_utils/validation';
import { attemptCreateSchool } from '_thunks/school';
import BodyLayout from '_organisms/BodyLayout';
import useKeyPress from '_hooks/useKeyPress';

export default function Onboarding() {
  const dispatch = useDispatch();

  const [schoolName, setSchoolName] = useState('');
  const [address, setAddress] = useState('');
  const [rcNumber, setRcNumber] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const [schoolNameEdited, setSchoolNameEdited] = useState(false);
  const [addressEdited, setAddressEdited] = useState(false);
  const [rcNumberEdited, setRcNumberEdited] = useState(false);
  const [stateEdited, setStateEdited] = useState(false);
  const [countryEdited, setCountryEdited] = useState(false);

  const updateSchoolName = (e) => {
    if (validateName(e.target.value)) {
      setSchoolName(e.target.value);
      setSchoolNameEdited(true);
    }
  };

  const updateRcNumber = (e) => {
    if (validateRCNumber(e.target.value)) {
      setRcNumber(e.target.value);
      setRcNumberEdited(true);
    }
  };

  const updateState = (e) => {
    setState(e.target.value);
    setStateEdited(true);
  };

  const updateCountry = (e) => {
    setCountry(e.target.value);
    setCountryEdited(true);
  };

  const updateAddress = (e) => {
    setAddress(e.target.value);
    setAddressEdited(true);
  };

  //   const updateProfileImg = (e) => {
  //     setProfileImg(e.target.value);
  //     setProfileImgEdited(true);
  //   };

  //   const refresh = () =>
  //     dispatch(attemptGetSchool()).then(resetState).catch(R.identity);

  const edited = schoolNameEdited || rcNumberEdited || stateEdited || countryEdited || addressEdited;
  const create = () => {
    if (updateSchoolName && updateRcNumber && updateState && updateCountry && updateAddress) {
      const newSchool = {
        schoolName,
        rcNumber,
        state,
        country,
        address,
      };
      dispatch(attemptCreateSchool(newSchool)).catch(R.identity);
    }
  };

  const charactersRemaining = 240 - address.length;

  useKeyPress('Enter', create);

  return (
    <BodyLayout>
      <Flex
        bg="white"
        borderRadius="md"
        w="500px"
        px={5}
        py={3}
        direction="column"
        justify="center"
        align="center"
        mt={5}
      >
        <Image src="/images/grayfull.png" alt="grayfull" w={40} mb={5} />
        <Text fontWeight={500} fontSize={20}>
          Setup your School Profile
        </Text>

        <Flex direction="column" mt={10} w="full" px={10} pb={10}>
          <Flex direction="column" mt={10} justify="center">
            <FormControl>
              <FormLabel fontSize={14}>Name of Institution</FormLabel>
              <Input
                placeholder="Name of Institution"
                type="text"
                variant="outline"
                mb={2}
                focusBorderColor="#F4B95F"
                onChange={updateSchoolName}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize={14}>Address</FormLabel>
              <Textarea
                placeholder="Address"
                type="text"
                variant="outline"
                mb={2}
                focusBorderColor="#F4B95F"
                onChange={updateAddress}
              />
              <FormHelperText>{`Characters remaining: ${charactersRemaining}`}</FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel fontSize={14}>RC Number</FormLabel>
              <InputGroup>
                <Input
                  type="number"
                  placeholder="RC Number"
                  variant="outline"
                  mb={2}
                  focusBorderColor="#F4B95F"
                  onChange={updateRcNumber}
                />
              </InputGroup>
            </FormControl>

            <Flex direction="row" mb={2}>
              <FormControl isRequired>
                <FormLabel fontSize={14}>State</FormLabel>
                <Select
                  placeholder="Select State"
                  name="state"
                  mb={2}
                  w={40}
                  onChange={updateState}
                >
                  <option value="option1">State 1</option>
                  <option value="option2">State 2</option>
                  <option value="option3">State 3</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize={14}>Country</FormLabel>
                <Select
                  placeholder="Select Country"
                  name="country"
                  mb={2}
                  w={40}
                  onChange={updateCountry}
                >
                  <option value="option1">Country 1</option>
                  <option value="option2">Country 2</option>
                  <option value="option3">Country 3</option>
                </Select>
              </FormControl>
            </Flex>

            <Button
              mt={4}
              w="full"
              bg="#F4B95F"
              color="white"
              _hover={{ bg: '#DAA65D' }}
              onClick={create}
              type="submit"
              isDisabled={!edited}
            >
              Continue
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </BodyLayout>
  );
}
