import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux';
import { signIn } from './authActions';

export const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(signIn({ email, password })).then(() => navigate('/games'));
  };

  return (
    <Form onSubmit={onSubmit}>
      <legend>Sign In</legend>

      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={onEmailChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={onPasswordChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>

      <div className="mt-3">
        <p className="mb-0  text-center">
          Don't have an account?
          {' '}
          <Link to="/sign-up">Sign Up</Link>
        </p>
      </div>
    </Form>
  );
};
