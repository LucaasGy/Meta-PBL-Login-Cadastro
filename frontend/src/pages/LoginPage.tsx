import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
  Paper
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from "axios";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const response = await axios.post("http://localhost:3000/login", {
        email,
        senha: password,
      });

      const data = response.data;
        // Se chegou aqui, a requisição deu certo (status 200)
      localStorage.setItem('token', data.token);
      navigate('/dashboard');

      }catch (err: any) {
      if (err.response && err.response.data && err.response.data.erro) {
        setErrorMessage(err.response.data.erro);
      } else {
        setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <Grid container sx={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Lado esquerdo com imagem */}
      <Grid 
        item 
        xs={12} md={6} 
        sx={{ 
          height: '100vh', 
          width: '50vw',
          overflow: 'hidden' 
        }}
      >
        <img 
          src="/images/i1.png" 
          alt="Imagem ilustrativa" 
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block' 
          }} 
        />
      </Grid>

      {/* Lado direito com formulário */}
      <Grid 
        item 
        xs={12} md={6} 
        component={Paper} 
        elevation={6} 
        square
        sx={{ 
          height: '100vh',
          width: '50vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 400,
            px: { xs: 2, sm: 4 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img 
            src="/images/i2.png" 
            alt="Logo da EASYDOSSIE" 
            style={{ width: 300, marginBottom: 30 }} 
          />
          <Typography variant="h5" gutterBottom>
            Entrar
          </Typography>

          {/* Exibir mensagem de erro, se houver */}
          {errorMessage && (
            <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
              {errorMessage}
            </Typography>
          )}

          <Box 
            component="form" 
            noValidate 
            onSubmit={handleSubmit}
            sx={{ width: '100%' }}
          >
            <TextField
              margin="normal"
              fullWidth
              required
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#1c5d25',
                '&:hover': {
                  backgroundColor: '#174b1e',
                },
              }}
            >
              Entrar
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link 
                variant="body2"
                sx={{ textDecoration: 'none' }}
              >
                Esqueceu sua senha?
              </Link>

              <Button
                component={RouterLink}
                to="/register"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#1976d2', 
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#115293',
                  },
                }}
              >
                Cadastre-se
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
