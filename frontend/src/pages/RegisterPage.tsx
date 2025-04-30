import React, { useState } from 'react';
import { Grid, Box, TextField, Button, Paper, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from "axios";

const RegisterPage = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (senha !== confirmSenha) {
      setErro('As senhas não correspondem!');
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/cadastro", {
        nome,
        cpf,
        email,
        senha,
      });
      console.log(response.data);
    
      navigate('/login');
      // Faça algo com a resposta, como redirecionar ou exibir uma mensagem
    } catch (err: any) {
      setErro(err.response?.data?.erro || "Erro no cadastro");
    }
  };

  const styles = {
    imageContainer: {
      height: '100vh',
      width: '50vw',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      display: 'block',
    },
    formContainer: {
      height: '100vh',
      width: '50vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
    },
    formBox: {
      width: '100%',
      maxWidth: 500,
      px: { xs: 2, sm: 4 },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    logo: {
      width: 500,
      marginBottom: 30,
    },
    button: {
      mt: 3,
      mb: 2,
      backgroundColor: '#1c5d25',
      '&:hover': {
        backgroundColor: '#174b1e',
      },
    },
  };

  return (
    <Grid container sx={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Lado esquerdo com imagem */}
      <Grid item xs={12} md={6} sx={styles.imageContainer}>
        <img
          src="/images/i1.png"
          alt="Imagem ilustrativa"
          style={styles.image}
        />
      </Grid>

      {/* Lado direito com formulário */}
      <Grid
        item
        xs={12}
        md={6}
        component={Paper}
        elevation={6}
        square
        sx={styles.formContainer}
      >
        <Box sx={styles.formBox}>
          <img
            src="/images/i2.png"
            alt="Logo da EASYDOSSIE"
            style={styles.logo}
          />
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
            {/* Campos do Formulário */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              name="name"
              label="Nome"
              autoFocus
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="cpf"
              name="cpf"
              label="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmar senha"
              type="password"
              id="confirmPassword"
              value={confirmSenha}
              onChange={(e) => setConfirmSenha(e.target.value)}
            />
            {erro && <div style={{ color: 'red' }}>{erro}</div>}
            <Button type="submit" fullWidth variant="contained" sx={styles.button}>
              CADASTRAR-SE
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link component={RouterLink} to="/login" variant="body2" sx={{ textDecoration: 'none' }}>
                Já possui uma conta?
              </Link>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;

