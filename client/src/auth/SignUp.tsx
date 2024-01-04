import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from './authActions';
import { useAppDispatch } from '../hooks/redux';

export const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(signUp({ name, email, password })).then(() => navigate('/games'));
  };

  return (
    <Form onSubmit={onSubmit}>
      <legend>Sign Up</legend>

      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" onChange={onNameChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={onEmailChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={onPasswordChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>

      <div className="mt-3">
        <p className="mb-0  text-center">
          Already have an account?
          {' '}
          <Link to="/sign-in">Sign In</Link>
        </p>
      </div>
    </Form>
  );
};
