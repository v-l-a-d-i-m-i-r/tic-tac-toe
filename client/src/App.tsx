import React from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useAppSelector } from './hooks/redux';
import { Router } from './router/Router';
import { globalSelector } from './store/store';

export const App: React.FC = () => {
  const { error } = useAppSelector(globalSelector);

  return (
    <Container className="mt-5">
      {error && <Alert variant="danger">{error}</Alert>}
      <Router />
    </Container>
  );
};
