import React, { useState } from "react"
import InputInterface from "interfaces/components/InputInterface"
import response from "strings/inputMessages.json"
import Icon from "components/UI/Assets/Icon"
import { ErrorMessage, Label, InputContainer } from "components/UI/sharedStyles"
import {
  InputStyled,
  InputPassword,
  IconContainer,
  TextareaContainer,
  InputTextarea,
} from "./styles"

function Input({
  label,
  required,
  type,
  width,
  onChange,
  onBlur,
  keyDown,
  disabled,
  value,
  placeholder,
  backError,
  backErrorMessage,
  max,
  min,
  alphanumeric,
  alphabetic,
  specialCharacters,
  pattern,
  patternMessage,
  ref,
  height,
}: InputInterface) {
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [visibility, setVisibility] = useState(true)

  const frontValidation = error && errorMessage !== undefined
  const backValidation = backError && backErrorMessage !== undefined

  const alphanumericReg = /(^$)|[a-zA-ZÀ-ÿ-00f100d10-9\s]+(\s*[a-zA-ZÀ-ÿ-00f100d10-9\s]*)*[a-zA-ZÀ-ÿ-00f100d10-9\s]+$/
  const alphabeticReg = /(^$)|^[a-zA-ZÀ-ÿ00f100d1]+(\s*[a-zA-ZÀ-ÿ00f100d1]*)*[a-zA-ZÀ-ÿ00f100d1]+$/
  const numericReg = /(^$)|(^[0-9]+$)/
  const specialCharactersReg = /(^$)|[a-zA-ZÀ-ÿ-00f100d10-9$&+,:;=?@#_|"'´°<>.^*()%¡¿!/-{}\s]+$/
  const emailReg = /(^$)|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const checkInputs = (currentValue: string) => {
    if (required === true && currentValue.trim() === "") {
      setError(true)
      setErrorMessage(response.isRequired)
    } else if (max && currentValue.length > max && currentValue.trim() !== "") {
      setError(true)
      setErrorMessage(`${response.hasMaxLength} ${max}`)
    } else if (min && currentValue.length < min && currentValue.trim() !== "") {
      setError(true)
      setErrorMessage(`${response.hasMinLength} ${min}`)
    } else if (alphanumeric && !currentValue.match(alphanumericReg)) {
      setError(true)
      setErrorMessage(`${response.hasRegEx} ${response.alphanumeric}`)
    } else if (alphabetic && !currentValue.trim().match(alphabeticReg)) {
      setError(true)
      setErrorMessage(`${response.hasRegEx} ${response.alphabetic}`)
    } else if (type === "number" && !currentValue.match(numericReg)) {
      setError(true)
      setErrorMessage(`${response.hasRegEx} ${response.numeric}`)
    } else if (specialCharacters && !currentValue.match(specialCharactersReg)) {
      setError(true)
      setErrorMessage(`${response.hasRegEx} ${response.special_characters}`)
    } else if (pattern && !currentValue.match(pattern)) {
      setError(true)
      setErrorMessage(`${response.hasRegEx} ${patternMessage}`)
    } else if (type === "email" && !currentValue.match(emailReg)) {
      setError(true)
      setErrorMessage(`${response.email}`)
    } else {
      setError(false)
    }
  }

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault()
      checkInputs(e.currentTarget.value)
      if (keyDown !== undefined) {
        keyDown()
      }
    }
  }

  return (
    <>
      {type !== "password" && type !== "textarea" && (
        <InputContainer width={width}>
          <Label htmlFor="input" error={error || backError}>
            {label}
            {required && "*"}
          </Label>
          <InputStyled
            width={width}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            value={value}
            placeholder={placeholder}
            error={error || backError}
            data-error={error}
            type="text"
            autoComplete="off"
            onBlur={e => {
              checkInputs(e.currentTarget.value)
              if (onBlur) {
                onBlur(e)
              }
            }}
            ref={ref}
            pattern={pattern}
          />
          {(frontValidation || backValidation) && (
            <ErrorMessage width={width}>
              {frontValidation ? errorMessage : backErrorMessage}
            </ErrorMessage>
          )}
        </InputContainer>
      )}

      {type === "password" && (
        <InputPassword width={width}>
          <Label htmlFor="input" error={error || backError}>
            {label}
            {required && "*"}
          </Label>
          <div>
            <InputStyled
              pass="pass"
              data-error={error}
              type={visibility ? "password" : "text"}
              autoComplete="off"
              error={error || backError}
              value={value}
              disabled={disabled}
              width={width}
              required={required}
              onBlur={e => {
                checkInputs(e.currentTarget.value)
                if (onBlur) {
                  onBlur(e)
                }
              }}
              onChange={onChange}
              pattern={pattern}
              onKeyDown={handleKeyDown}
              ref={ref}
            />
            <IconContainer
              type="button"
              onClick={() => setVisibility(!visibility)}
              error={error || backError}
            >
              <Icon icon={visibility ? "PasswordHidden" : "PasswordVisible"} />
            </IconContainer>
          </div>
          {(frontValidation || backValidation) && (
            <ErrorMessage width={width}>
              {frontValidation ? errorMessage : backErrorMessage}
            </ErrorMessage>
          )}
        </InputPassword>
      )}
      {type === "textarea" && (
        <TextareaContainer width={width} height={height}>
          <Label htmlFor="input" error={error}>
            {label}
            {required && "*"}
          </Label>
          <InputTextarea
            width={width}
            height={height}
            autoComplete="off"
            error={error}
            value={value}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            onBlur={e => {
              checkInputs(e.currentTarget.value)
              if (onBlur) {
                onBlur(e)
              }
            }}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            ref={ref}
          />
        </TextareaContainer>
      )}
    </>
  )
}

export default Input
