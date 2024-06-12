import React from 'react';
import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, TextField, Typography, ThemeProvider } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme } from '@mui/material/styles';

function SignUp() {
  const [isStudent, setIsStudent] = React.useState(false);
  const [isProfessor, setIsProfessor] = React.useState(false);

  const handleStudentChange = (event) => {
    setIsStudent(event.target.checked);
    setIsProfessor(false); // Desmarca a opção de professor
  };

  const handleProfessorChange = (event) => {
    setIsProfessor(event.target.checked);
    setIsStudent(false); // Desmarca a opção de estudante
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    const formData = {
      name: data.get('firstName'),
      email: data.get('email'),
      registration: data.get('registration'),
      type: isStudent ? 'STUDENT' : 'TEACHER',
      password: data.get('password'),
      phone: data.get('phone'),
    };
  
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to register');
      }
  
      console.log('Registered successfully');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="registration"
                  label="Registration"
                  name="registration"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                required
                fullWidth
                name="phone"
                label="Phone Number"
                id="phone"
                autoComplete="tel"
                inputProps={{ pattern: "[0-9]*" }} // Aceita apenas números
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={isStudent} onChange={handleStudentChange} />}
                  label="I am a student"
                />
                <FormControlLabel
                  control={<Checkbox checked={isProfessor} onChange={handleProfessorChange} />}
                  label="I am a TEACHER"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
