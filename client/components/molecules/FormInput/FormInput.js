/* eslint-disable indent */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Input,
  FormControl,
  FormLabel,
  Icon,
  InputGroup,
  InputLeftElement,
}
from '@chakra-ui/react';

export default function FormInput({
  className,
  onChange,
  value,
  label,
  placeholder,
  type,
  leftIcon,
  size,
}) {
  return (
    (
      <FormControl className={className}>
        <FormLabel>{label}</FormLabel>
        <InputGroup justify="center">
        <InputLeftElement pointerEvents="none">
            <Icon as={leftIcon} w={5} h={5} mt={1} />
          </InputLeftElement>
          <Input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            focusBorderColor="#F4B95F"
            mb={2}
            size={size}
          />
        </InputGroup>
      </FormControl>
    )
  );
}

FormInput.defaultProps = {
  className: '',
  leftIcon: undefined,
  type: 'text',
  size: 'md',
};

FormInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  leftIcon: PropTypes.func,
  type: PropTypes.string,
  size: PropTypes.string,
};
