export interface ComboBoxSelectInterface {
  readOnly?: true
  optionsList: "single"
  label?: string
  options: { id: number; display_name: string; is_disabled?: boolean }[]
  width?: number
  required?: boolean
  backError?: boolean
  backErrorMessage?: string
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end"
  onChange: (
    value?: { id: number; display_name: string; is_disabled?: boolean }[],
  ) => void
  activeOptions?: { id: number; display_name: string; is_disabled?: boolean }[]
  placeholder?: string
}

export interface ComboBoxSelectGroupInterface {
  readOnly?: true
  label?: string
  optionsList: "grouped"
  concatenateChips?: boolean
  options: {
    group_title?: string
    group_id: number
    grouped_options: {
      id: number
      display_name: string
      is_disabled?: boolean
    }[]
  }[]
  width?: number
  required?: boolean
  backError?: boolean
  backErrorMessage?: string
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end"
  onChange: (
    value?: {
      group_title?: string
      group_id: number
      grouped_options: {
        id: number
        display_name: string
        is_disabled?: boolean
      }[]
    }[],
  ) => void
  activeOptions?: {
    group_title?: string
    group_id: number
    grouped_options: {
      id: number
      display_name: string
    }[]
  }[]
}

export interface GroupInterface {
  group_title?: string
  group_id: number
  grouped_options: {
    id: number
    display_name: string
  }[]
}

export type ComboBoxSelectType =
  | ComboBoxSelectInterface
  | ComboBoxSelectGroupInterface
