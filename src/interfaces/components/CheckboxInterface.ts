interface CheckboxInterface {
  checked?: boolean
  iconCheck?: string
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void
  idParam: string
  isDisabled?: boolean
  ownState?: boolean
  hasEvent?: boolean
  //   ref?: any
}

export default CheckboxInterface
