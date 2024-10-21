import React from 'react';
import Form from 'react-bootstrap/Form';
import { Path, FieldValues, UseFormRegister } from "react-hook-form";

type InputProps<TFieldValue extends FieldValues> = {
    label: string;
    name: Path<TFieldValue>;
    type?: string;
    register: UseFormRegister<TFieldValue>;
    error?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    formText?: string;
    success?: string;
    disabled?: boolean;
  };

const Input = <TFieldValue extends FieldValues>(
    {label,
    name,
    type = "text",
    register,
    error,
    onBlur,
    formText,
    success,
    disabled,
}: InputProps<TFieldValue>) => {
  return (
    <>
         <Form.Group className='mb-3'>
        <Form.Label>{label}</Form.Label>
        <Form.Control type={type} {...register(name)} isInvalid={error ? true : false}/>
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  )
}

export default Input
