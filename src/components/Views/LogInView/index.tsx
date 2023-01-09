import React from "react"
import Input from "components/UI/Input"
import { Container, Title, InputContainer, URLContainer } from "./styles"

function LoginView() {
  return (
    <Container>
      <Title>Inicio de sesion</Title>
      <InputContainer>
        <Input
          width={290}
          label="Dirección de correo electrónico"
          required
          type="email"
        />
        <Input width={325} label="Contraseña" required type="password" />
      </InputContainer>
      <URLContainer>
        <a href="http://localhost:3000/login">¿Olvidaste tu contraseña?</a>
        <a href="http://localhost:3000/login">¿Todavía no estás asociado?</a>
      </URLContainer>
    </Container>
  )
}

export default LoginView
