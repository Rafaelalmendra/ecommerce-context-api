import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Input, InputLabel, InputAdornment } from '@material-ui/core';

import { UserContext } from 'commom/context/user';
import { Container, Titulo, InputContainer } from './styles';

export default function Login() {
  const history = useHistory();
  const { nome, setNome, saldo, setSaldo } = useContext(UserContext);

  return (
    <Container>
      <Titulo>Insira o seu nome</Titulo>
      <InputContainer>
        <InputLabel>Nome</InputLabel>
        <Input 
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          type="text"
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>Saldo </InputLabel>
        <Input
          value={saldo}
          onChange={(event) => setSaldo(event.target.value)}
          type="number"
          startAdornment={<InputAdornment position="start">R$ </InputAdornment>}
        />
      </InputContainer>
      <Button 
        variant="contained"
        color="primary"
        disabled={nome.length < 4 || saldo <= 0}
        onClick={() => history.push('/feira')}
      >
        Avançar
      </Button>
    </Container>
  )
};