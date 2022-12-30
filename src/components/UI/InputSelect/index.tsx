import React, { useState } from "react"
import Icon from "components/UI/Assets/Icon"
import {
  InputContainer,
  Label,
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
  onClick?: (value?: { id?: number; display_name?: string }) => void
}

function InputSelect({
  label,
  options,
  width,
  required,
  onClick,
}: InputSelectInterface) {
  const [openSelect, setOpenSelect] = useState<boolean>(false)
  const [optionSelected, setOptionSelected] = useState<{
    id: number
    value: string
  }>(options[0])

  return (
    <InputContainer width={width}>
      <Label htmlFor="input">
        {label}
        {required && "*"}
      </Label>
      <Select width={width}>
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
    </InputContainer>
  )
}

export default InputSelect
