import React, { useState } from "react"
import Icon from "components/UI/Assets/Icon"
import { ErrorMessage, Label, InputContainer } from "components/UI/sharedStyles"
import {
  Select,
  Option,
  OptionsContainer,
  Input,
  IconContainer,
} from "./styles"

interface InputSelectInterface {
  label: string
  options: { id: number; value: string }[]
  width?: number
  required?: boolean
  onClick?: (value: { id: number; value: string }) => void
  error?: boolean
  errorMessage?: string
}

function InputSelect({
  label,
  options,
  width,
  required,
  onClick,
  error,
  errorMessage,
}: InputSelectInterface) {
  const [openSelect, setOpenSelect] = useState<boolean>(false)
  const [optionSelected, setOptionSelected] = useState<{
    id: number
    value: string
  }>(options[0])

  return (
    <InputContainer width={width}>
      <Label htmlFor="input" error={error}>
        {label}
        {required && "*"}
      </Label>
      <Select width={width} error={error}>
        <Input>
          {optionSelected.value}
          <IconContainer onClick={() => setOpenSelect(!openSelect)}>
            <Icon icon="SingleArrow" />
          </IconContainer>
        </Input>
        {openSelect && (
          <OptionsContainer width={width}>
            {options.map((option: { id: number; value: string }) => (
              <Option
                key={option.id}
                onClick={() => {
                  setOpenSelect(false)
                  setOptionSelected(option)
                  if (onClick !== undefined) {
                    onClick(option)
                  }
                }}
                data-title={option.value}
                data-id={option.id}
              >
                {option.value}
              </Option>
            ))}
          </OptionsContainer>
        )}
      </Select>
      {error && errorMessage !== "" && (
        <ErrorMessage width={width}>{errorMessage}</ErrorMessage>
      )}
    </InputContainer>
  )
}

export default InputSelect
