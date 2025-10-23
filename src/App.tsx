import React from 'react';
import { Button, Typography, Container } from '@mui/material';

function App() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        ¡Hola, Material UI!
      </Typography>
      <Button variant="contained" color="primary">
        Presióname
      </Button>
    </Container>
  );
}

export default App;
