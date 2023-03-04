import { useState, useCallback } from 'react';

export default function useValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const input = evt.target;
    const { name, value } = input;

    if (name === 'password') {
      if (value.length < 5) {
          input.setCustomValidity('Длина пароля должна быть 6 символов и больше');
      } else {
          input.setCustomValidity('');
      }
    }

    if (name === 'search') {
      if (value.length === 0) {
          input.setCustomValidity('Нужно ввести ключевое слово.');
      } else {
          input.setCustomValidity('');
      }
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest('form').checkValidity());
  };
  const valueForm = useCallback(
    (newValues = {}) => {
      setValues(newValues);
    },
    [setValues]
  );

  return { values, errors, isValid, handleChange, valueForm, setIsValid };
}