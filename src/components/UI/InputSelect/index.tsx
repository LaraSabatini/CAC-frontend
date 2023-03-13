import React, { useState } from "react"
import Icon from "components/UI/Assets/Icon"
import { ErrorMessage, Label, InputContainer } from "components/UI/sharedStyles"
import InputSelectInterface from "interfaces/components/InputSelectInterface"
import {
  Select,
  Option,
  OptionsContainer,
  Input,
  IconContainer,
} from "./styles"

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
          <p className="value">{optionSelected?.value}</p>
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
