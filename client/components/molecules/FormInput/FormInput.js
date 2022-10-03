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
}) {
  return (
    (
      <FormControl className={className}>
        <FormLabel>{label}</FormLabel>
        <InputGroup>
        <InputLeftElement pointerEvents="none">
            <Icon as={leftIcon} />
          </InputLeftElement>
          <Input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
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
};

FormInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  leftIcon: PropTypes.func,
  type: PropTypes.string,
};
