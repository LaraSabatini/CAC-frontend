import React, { useState, useRef, useEffect } from "react"
import InputMessages from "strings/inputMessages.json"
import ErrorMessage from "components/UI/ErrorMessage"
import Scroll from "components/UI/Scroll"
import Icon from "components/UI/Assets/Icon"
import Checkbox from "components/UI/Checkbox"
import Tooltip from "components/UI/Tooltip"
import Chip from "./ComboChip"
import {
  SelectWrapper,
  SelectLabel,
  SelectContainer,
  ChipsContainer,
  ReadOnlyChipsContainer,
  ToggleContainer,
  ErrorMessageContainer,
  DropdownList,
  DisabledMask,
  OptionWrapper,
  GroupTitle,
  GroupContainer,
  ClickableContainer,
} from "./styles"

interface ComboBoxSelectInterface {
  readOnly?: true
  optionsList: "single"
  label?: string
  options: { id: number; display_name: string; is_disabled?: boolean }[]
  width?: number
  required?: boolean
  backError?: boolean
  backErrorMessage?: string
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end"
  onChange?: (
    value?: { id: number; display_name: string; is_disabled?: boolean }[],
  ) => void
  activeOptions?: { id: number; display_name: string; is_disabled?: boolean }[]
}

interface ComboBoxSelectGroupInterface {
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
  onChange?: (
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

interface GroupInterface {
  group_title?: string
  group_id: number
  grouped_options: {
    id: number
    display_name: string
  }[]
}

type ComboBoxSelectType = ComboBoxSelectInterface | ComboBoxSelectGroupInterface

const ComboBoxSelect = React.forwardRef<HTMLInputElement, ComboBoxSelectType>(
  (props, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState<
      { id: number; display_name: string }[]
    >(
      props.activeOptions !== undefined && props.optionsList === "single"
        ? props.activeOptions
        : [],
    )
    const [groupSelectedOptions, setGroupSelectedOptions] = useState<
      GroupInterface[]
    >([])
    const [idsOnChips, setIdsOnChips] = useState<string[]>([])
    const [error, setError] = useState(false)
    const requiredMessage = InputMessages.isRequired
    const nonMatches = InputMessages.no_coincidences

    const toggleOpen = () => {
      if (
        props.optionsList === "single" &&
        isOpen &&
        selectedOptions.length === 0 &&
        props.required
      ) {
        setError(true)
      } else if (
        props.optionsList === "grouped" &&
        isOpen &&
        groupSelectedOptions.length === 0 &&
        props.required
      ) {
        setError(true)
      }

      setIsOpen(!isOpen)
    }

    /* Set initial data for the state in case the data has to persist ----------------------- */
    useEffect(() => {
      if (
        props.optionsList === "single" &&
        props.activeOptions !== undefined &&
        props.activeOptions !== selectedOptions
      ) {
        setSelectedOptions(props.activeOptions)
      }
      if (
        props.optionsList === "grouped" &&
        props.activeOptions !== undefined &&
        props.activeOptions !== groupSelectedOptions
      ) {
        const idsOfOptions: string[] = []
        props.activeOptions.map(group =>
          group.grouped_options.map(option =>
            idsOfOptions.push(`${group.group_id}${option.id}`),
          ),
        )
        setIdsOnChips(idsOfOptions)
        setGroupSelectedOptions(props.activeOptions)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.activeOptions])
    /* -------------------------------------------------------------------------------------- */

    /* This function controls the visibility of the dropdown list when it's open and the user */
    /* clicks anywhere outside the component ------------------------------------------------ */
    const clickRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const checkIfClickedOutside = (e: any) => {
        if (
          isOpen &&
          clickRef.current &&
          !clickRef.current.contains(e.target)
        ) {
          if (props.optionsList === "single") {
            if (selectedOptions.length === 0 && props.required) {
              setError(true)
            }
            setIsOpen(false)
          } else {
            if (groupSelectedOptions.length === 0 && props.required) {
              setError(true)
            }
            setIsOpen(false)
          }
        }
      }
      document.addEventListener("mousedown", checkIfClickedOutside)
      return () => {
        document.removeEventListener("mousedown", checkIfClickedOutside)
      }
    }, [
      isOpen,
      selectedOptions,
      props.required,
      groupSelectedOptions,
      props.optionsList,
    ])
    /* -------------------------------------------------------------------------------------- */

    /* Dropdown options logic --------------------------------------------------------------- */
    // function to set filters selected
    const pushOptions = (
      id: number,
      display_name: string,
      idGroup?: number,
      nameGroup?: string,
    ) => {
      if (props.optionsList === "single") {
        const verifyOption = selectedOptions?.find(selection => {
          return selection.id === id
        })

        if (verifyOption?.id !== id || verifyOption?.id === undefined) {
          setSelectedOptions([...selectedOptions, { id, display_name }])

          if (props.required) {
            setError(false)
          }

          if (props.onChange !== undefined) {
            props.onChange([...selectedOptions, { id, display_name }])
          }
        } else {
          const removeSelection = selectedOptions.filter(
            object => object.id !== id,
          )
          setSelectedOptions(removeSelection)

          if (removeSelection.length === 0 && props.required) {
            setError(true)
          }

          if (props.onChange !== undefined) {
            props.onChange(removeSelection)
          }
        }
      } else {
        const indexGroupMatched = groupSelectedOptions?.findIndex(
          group => group.group_id === idGroup,
        )
        const verifyOption = groupSelectedOptions[
          indexGroupMatched
        ]?.grouped_options?.findIndex(selection => selection.id === id)

        if (indexGroupMatched === -1) {
          // to add the whole group
          setGroupSelectedOptions([
            ...groupSelectedOptions,
            {
              group_id: idGroup as number,
              group_title: nameGroup,
              grouped_options: [
                {
                  id,
                  display_name,
                },
              ],
            },
          ])
          setIdsOnChips([...idsOnChips, `${idGroup}${id}`])
          if (props.required) {
            setError(false)
          }

          if (props.onChange !== undefined) {
            props.onChange([
              ...groupSelectedOptions,
              {
                group_id: idGroup as number,
                group_title: nameGroup,
                grouped_options: [
                  {
                    id,
                    display_name,
                  },
                ],
              },
            ])
          }
        } else if (verifyOption === -1) {
          // add an option to a allready created group
          const newGroup = {
            group_id: idGroup,
            group_title: nameGroup,
            grouped_options: [
              ...groupSelectedOptions[indexGroupMatched].grouped_options,
              { id, display_name },
            ],
          }
          const newState = groupSelectedOptions.filter(
            group => group.group_id !== idGroup,
          )
          newState.push(newGroup as GroupInterface)

          setIdsOnChips([...idsOnChips, `${idGroup}${id}`])
          setGroupSelectedOptions(newState)
          if (props.required) {
            setError(false)
          }
          if (props.onChange !== undefined) {
            props.onChange(newState)
          }
        } else if (indexGroupMatched !== -1 && verifyOption !== -1) {
          // delete option of a existing group
          const newOptionsOfGroup = groupSelectedOptions[
            indexGroupMatched
          ].grouped_options.filter(opt => opt.id !== id)
          // no options so delete the entire group
          if (newOptionsOfGroup.length === 0) {
            const newGroups = groupSelectedOptions.filter(
              group =>
                group.group_id !==
                groupSelectedOptions[indexGroupMatched].group_id,
            )
            setGroupSelectedOptions(newGroups)
            if (props.required) {
              if (newGroups.length) {
                setError(false)
              } else {
                setError(true)
              }
            }
            if (props.onChange !== undefined) {
              props.onChange(newGroups)
            }
          } else {
            // delete only the option on the group
            const newGroups = groupSelectedOptions.filter(
              group =>
                group.group_id !==
                groupSelectedOptions[indexGroupMatched].group_id,
            )
            newGroups.push({
              group_title: nameGroup,
              group_id: idGroup as number,
              grouped_options: newOptionsOfGroup,
            })
            setGroupSelectedOptions(newGroups)
            if (props.required) {
              setError(false)
            }
            if (props.onChange !== undefined) {
              props.onChange(newGroups)
            }
          }
          const newIds = idsOnChips.filter(
            idChip => idChip !== `${idGroup}${id}`,
          )

          setIdsOnChips(newIds)
        }
      }
    }
    /* -------------------------------------------------------------------------------------- */
    const verifyChecked = (id: number, idGroup: number): boolean => {
      const indexGroupMatched = groupSelectedOptions.findIndex(
        group => group.group_id === idGroup,
      )
      if (indexGroupMatched !== -1) {
        const indexMatched = groupSelectedOptions[
          indexGroupMatched
        ].grouped_options.findIndex(opt => opt.id === id)
        if (indexMatched !== -1) {
          return true
        }
        return false
      }
      return false
    }
    /* -------------------------------------------------------------------------------------- */

    /* Load validation messages and handle other functions ---------------------------------- */

    const handleOnBlur = () => {
      if (props.required) {
        if (
          props.optionsList === "single" &&
          (selectedOptions?.length === undefined ||
            selectedOptions?.length === 0)
        ) {
          setError(true)
        } else if (
          props.optionsList === "grouped" &&
          (groupSelectedOptions?.length === undefined ||
            groupSelectedOptions?.length === 0)
        ) {
          setError(true)
        }
      }
    }

    /* -------------------------------------------------------------------------------------- */

    /* Chips container ---------------------------------------------------------------------- */

    const TotalChips = () => {
      let chipSet: any
      if (
        props.optionsList === "single" &&
        selectedOptions?.length >= 1 &&
        selectedOptions?.length <= 6
      ) {
        chipSet = selectedOptions?.map(
          (optionChip: { id: number; display_name: string }) => (
            <Chip
              key={optionChip.id.toString()}
              display_name={optionChip.display_name}
              onClick={() =>
                pushOptions(optionChip.id, optionChip.display_name)
              }
            />
          ),
        )
      } else if (
        props.optionsList === "single" &&
        selectedOptions?.length > 6
      ) {
        chipSet = (
          <>
            {selectedOptions?.map(
              (optionChip: { id: number; display_name: string }, i: number) => {
                return (
                  i <= 5 && (
                    <Chip
                      key={optionChip.id.toString()}
                      display_name={optionChip.display_name}
                      onClick={() =>
                        pushOptions(optionChip.id, optionChip.display_name)
                      }
                    />
                  )
                )
              },
            )}
            <Tooltip title={`+${selectedOptions?.length - 6}`} placement="top">
              <Chip display_name={<Icon icon="IconSeeMore" />} />
            </Tooltip>
          </>
        )
      } else if (
        props.optionsList === "grouped" &&
        idsOnChips?.length >= 1 &&
        idsOnChips?.length <= 6
      ) {
        chipSet = (
          <>
            {groupSelectedOptions?.map(
              (group: {
                group_title?: string
                group_id: number
                grouped_options: {
                  id: number
                  display_name: string
                }[]
              }) => (
                <React.Fragment key={`${group.group_id}`}>
                  {group.grouped_options.length &&
                    group.grouped_options.map(
                      (optionChip: { id: number; display_name: string }) => (
                        <Chip
                          key={`${optionChip.id}${group.group_id}`}
                          display_name={
                            props.concatenateChips
                              ? `${group.group_title} ${optionChip.display_name}`
                              : optionChip.display_name
                          }
                          onClick={() =>
                            pushOptions(
                              optionChip.id,
                              optionChip.display_name,
                              group.group_id,
                              group.group_title,
                            )
                          }
                        />
                      ),
                    )}
                </React.Fragment>
              ),
            )}
          </>
        )
      } else if (props.optionsList === "grouped" && idsOnChips?.length > 6) {
        chipSet = (
          <>
            {groupSelectedOptions.length &&
              groupSelectedOptions?.map(
                (group: {
                  group_title?: string
                  group_id: number
                  grouped_options: {
                    id: number
                    display_name: string
                  }[]
                }) => (
                  <React.Fragment key={`${group.group_id}`}>
                    {group.grouped_options.length &&
                      group.grouped_options.map(
                        (
                          optionChip: { id: number; display_name: string },
                          i: number,
                        ) => {
                          return (
                            i <= 5 && (
                              <Chip
                                key={`${optionChip.id}${group.group_id}`}
                                display_name={
                                  props.concatenateChips
                                    ? `${group.group_title} ${optionChip.display_name}`
                                    : optionChip.display_name
                                }
                                onClick={() =>
                                  pushOptions(
                                    optionChip.id,
                                    optionChip.display_name,
                                    group.group_id,
                                    group.group_title,
                                  )
                                }
                              />
                            )
                          )
                        },
                      )}
                  </React.Fragment>
                ),
              )}
            <Tooltip title={`+${idsOnChips?.length - 6}`} placement="top">
              <Chip display_name={<Icon icon="IconSeeMore" />} />
            </Tooltip>
          </>
        )
      }
      return chipSet
    }

    const ReadOnlyTotalChips = () => {
      let chipSet: any
      if (
        props.optionsList === "single" &&
        props.options?.length >= 1 &&
        props.options?.length <= 6
      ) {
        chipSet = props.options?.map(
          (optionChip: { id: number; display_name: string }) => (
            <Chip
              key={optionChip.id.toString()}
              display_name={optionChip.display_name}
            />
          ),
        )
      } else if (props.optionsList === "single" && props.options?.length > 6) {
        chipSet = (
          <>
            {props.options?.map(
              (optionChip: { id: number; display_name: string }, i: number) => {
                return (
                  i <= 5 && (
                    <Chip
                      key={optionChip.id.toString()}
                      display_name={optionChip.display_name}
                    />
                  )
                )
              },
            )}
            <Tooltip title={`+${props.options?.length - 6}`} placement="top">
              <Chip display_name={<Icon icon="IconSeeMore" />} />
            </Tooltip>
          </>
        )
      }
      if (props.optionsList === "grouped" && props.options.length) {
        const idsOfOptions: number[] = []
        props.options?.map(group =>
          group.grouped_options.map(option => idsOfOptions.push(option.id)),
        )
        if (idsOfOptions.length >= 1 && idsOfOptions.length <= 6) {
          chipSet = props.options?.map(
            (group: {
              group_title?: string
              group_id: number
              grouped_options: {
                id: number
                display_name: string
                is_disabled?: boolean
              }[]
            }) => (
              <React.Fragment key={`${group.group_id}`}>
                {group.grouped_options.length &&
                  group.grouped_options.map(
                    (optionChip: { id: number; display_name: string }) => (
                      <Chip
                        key={optionChip.id.toString()}
                        display_name={
                          props.concatenateChips
                            ? `${group.group_title} ${optionChip.display_name}`
                            : optionChip.display_name
                        }
                      />
                    ),
                  )}
              </React.Fragment>
            ),
          )
        } else if (idsOfOptions.length > 6) {
          chipSet = (
            <>
              {props.options?.map(
                (group: {
                  group_title?: string
                  group_id: number
                  grouped_options: {
                    id: number
                    display_name: string
                    is_disabled?: boolean
                  }[]
                }) => (
                  <React.Fragment key={`${group.group_id}`}>
                    {group.grouped_options.length &&
                      group.grouped_options.map(
                        (
                          optionChip: { id: number; display_name: string },
                          i: number,
                        ) => {
                          return (
                            i <= 5 && (
                              <Chip
                                key={optionChip.id.toString()}
                                display_name={
                                  props.concatenateChips
                                    ? `${group.group_title} ${optionChip.display_name}`
                                    : optionChip.display_name
                                }
                              />
                            )
                          )
                        },
                      )}
                    <Tooltip
                      title={`+${idsOfOptions.length - 6}`}
                      placement="top"
                    >
                      <Chip display_name={<Icon icon="IconSeeMore" />} />
                    </Tooltip>
                    )
                  </React.Fragment>
                ),
              )}
            </>
          )
        }
      }
      return chipSet
    }

    /* -------------------------------------------------------------------------------------- */

    if (props.readOnly) {
      return (
        <SelectWrapper ref={clickRef}>
          <SelectLabel error={error} backError={props.backError ?? false}>
            {props.required ? `${props.label}*` : props.label}
          </SelectLabel>
          <SelectContainer
            width={props.width}
            error={error}
            backError={props.backError ?? false}
          >
            <ReadOnlyChipsContainer
              htmlFor="chips-container"
              width={props.width ?? 300}
              error={error}
              backError={props.backError ?? false}
            >
              <input
                type="text"
                id="chips-container"
                ref={ref}
                data-selection={selectedOptions}
              />
              <div className="chips-wrapper">
                {props.options.length ? <ReadOnlyTotalChips /> : ""}
              </div>
            </ReadOnlyChipsContainer>
          </SelectContainer>
          <ErrorMessageContainer width={props.width}>
            {!props.backError && error && (
              <ErrorMessage message={requiredMessage} />
            )}
            {props.backError && !error && (
              <ErrorMessage message={props.backErrorMessage ?? ""} />
            )}
            {props.backError && error && (
              <ErrorMessage message={props.backErrorMessage ?? ""} />
            )}
          </ErrorMessageContainer>
        </SelectWrapper>
      )
    }

    return (
      <SelectWrapper ref={clickRef}>
        <SelectLabel error={error} backError={props.backError ?? false}>
          {props.required ? `${props.label}*` : props.label}
        </SelectLabel>
        <SelectContainer
          width={props.width}
          isOpen={isOpen}
          error={error}
          backError={props.backError ?? false}
        >
          <ChipsContainer
            htmlFor="chips-container"
            isOpen={isOpen}
            width={props.width ?? 273}
            error={error}
            backError={props.backError ?? false}
          >
            <input
              type="text"
              id="chips-container"
              onBlur={handleOnBlur}
              ref={ref}
              data-selection={selectedOptions}
              data-error={error}
            />
            <div className="chips-wrapper">
              {props.optionsList === "single" && selectedOptions.length ? (
                <TotalChips />
              ) : (
                <></>
              )}
              {props.optionsList === "grouped" &&
              groupSelectedOptions.length ? (
                <TotalChips />
              ) : (
                <></>
              )}
            </div>
          </ChipsContainer>
          <ClickableContainer onClick={toggleOpen}>
            <ToggleContainer isOpen={isOpen} onClick={toggleOpen}>
              <Icon icon="IconSingleArrow" />
            </ToggleContainer>
          </ClickableContainer>
        </SelectContainer>
        <ErrorMessageContainer width={props.width}>
          {!props.backError && error && (
            <ErrorMessage message={requiredMessage} />
          )}
          {props.backError && !error && (
            <ErrorMessage message={props.backErrorMessage ?? ""} />
          )}
          {props.backError && error && (
            <ErrorMessage message={props.backErrorMessage ?? ""} />
          )}
        </ErrorMessageContainer>
        {isOpen && (
          <DropdownList
            width={props.width ?? 312}
            placement={props.placement ?? "bottom-start"}
          >
            {!props.options?.length ? (
              <ul className="combobox-select-list">
                <li className="combobox-select-option">{nonMatches}</li>
              </ul>
            ) : (
              <>
                {props.options?.length <= 8 ? (
                  <ul className="combobox-select-list">
                    {props.optionsList === "single" &&
                      props.options?.length &&
                      props.options.map(
                        (option: {
                          id: number
                          display_name: string
                          is_disabled?: boolean
                        }) => (
                          <OptionWrapper
                            key={option.id.toString()}
                            disabled={option.is_disabled}
                          >
                            {option?.is_disabled !== undefined &&
                              option?.is_disabled && <DisabledMask />}
                            <Checkbox
                              onChange={() =>
                                pushOptions(option.id, option.display_name)
                              }
                              // create a random id to prevent duplicated checkboxes
                              idParam={`${Math.floor(
                                Math.random() * (999 - 100 + 1) + 100,
                              )}_${option.id}`}
                              ownState
                              checked={
                                selectedOptions?.find(
                                  element => element.id === option.id,
                                ) !== undefined
                              }
                            />
                            <li className="combobox-select-option">
                              {option.display_name}
                            </li>
                          </OptionWrapper>
                        ),
                      )}
                    {props.optionsList === "grouped" &&
                      props.options?.length &&
                      props.options.map(
                        (
                          group: {
                            group_title?: string
                            group_id: number
                            grouped_options: {
                              id: number
                              display_name: string
                              is_disabled?: boolean
                            }[]
                          },
                          index: number,
                        ) => (
                          <GroupContainer
                            isTheLast={props.options.length - 1 === index}
                            key={group.group_id.toString()}
                          >
                            <GroupTitle>{group.group_title}</GroupTitle>
                            {group.grouped_options.length &&
                              group.grouped_options.map(
                                (option: {
                                  id: number
                                  display_name: string
                                  is_disabled?: boolean
                                }) => (
                                  <OptionWrapper
                                    disabled={option.is_disabled}
                                    key={`${group.group_id}${option.id}`}
                                  >
                                    {option?.is_disabled !== undefined &&
                                      option?.is_disabled && <DisabledMask />}
                                    <Checkbox
                                      onChange={() =>
                                        pushOptions(
                                          option.id,
                                          option.display_name,
                                          group.group_id,
                                          group.group_title,
                                        )
                                      }
                                      // create a random id to prevent duplicated checkboxes

                                      idParam={`${Math.floor(
                                        Math.random() * (999 - 100 + 1) + 100,
                                      )}_${option.id}`}
                                      ownState
                                      checked={verifyChecked(
                                        option.id,
                                        group.group_id,
                                      )}
                                    />
                                    <li className="combobox-select-option">
                                      {option.display_name}
                                    </li>
                                  </OptionWrapper>
                                ),
                              )}
                          </GroupContainer>
                        ),
                      )}
                  </ul>
                ) : (
                  <Scroll height={314}>
                    <ul className="combobox-select-list">
                      {props.optionsList === "single" &&
                        props.options?.length &&
                        props.options.map(
                          (option: {
                            id: number
                            display_name: string
                            is_disabled?: boolean
                          }) => (
                            <OptionWrapper
                              key={option.id}
                              disabled={option.is_disabled}
                            >
                              {option?.is_disabled !== undefined &&
                                option?.is_disabled && <DisabledMask />}
                              <Checkbox
                                onChange={() => {
                                  pushOptions(option.id, option.display_name)
                                }}
                                // create a random id to prevent duplicated checkboxes
                                idParam={`${Math.floor(
                                  Math.random() * (999 - 100 + 1) + 100,
                                )}_${option.id}`}
                                ownState
                                checked={
                                  selectedOptions?.find(
                                    element => element.id === option.id,
                                  ) !== undefined
                                }
                              />
                              <li className="combobox-select-option">
                                {option.display_name}
                              </li>
                            </OptionWrapper>
                          ),
                        )}
                      {props.optionsList === "grouped" &&
                        props.options?.length &&
                        props.options.map(
                          (
                            group: {
                              group_title?: string
                              group_id: number
                              grouped_options: {
                                id: number
                                display_name: string
                                is_disabled?: boolean
                              }[]
                            },
                            index: number,
                          ) => (
                            <GroupContainer
                              isTheLast={props.options.length - 1 === index}
                              key={group.group_id.toString()}
                            >
                              <GroupTitle>{group.group_title}</GroupTitle>
                              {group.grouped_options.length &&
                                group.grouped_options.map(
                                  (option: {
                                    id: number
                                    display_name: string
                                    is_disabled?: boolean
                                  }) => (
                                    <OptionWrapper
                                      disabled={option.is_disabled}
                                      key={`${group.group_id}${option.id}`}
                                    >
                                      {option?.is_disabled !== undefined &&
                                        option?.is_disabled && <DisabledMask />}
                                      <Checkbox
                                        onChange={() => {
                                          pushOptions(
                                            option.id,
                                            option.display_name,
                                            group.group_id,
                                            group.group_title,
                                          )
                                        }}
                                        // create a random id to prevent duplicated checkboxes
                                        idParam={`${Math.floor(
                                          Math.random() * (999 - 100 + 1) + 100,
                                        )}_${option.id}`}
                                        ownState
                                        checked={verifyChecked(
                                          option.id,
                                          group.group_id,
                                        )}
                                      />
                                      <li className="combobox-select-option">
                                        {option.display_name}
                                      </li>
                                    </OptionWrapper>
                                  ),
                                )}
                            </GroupContainer>
                          ),
                        )}
                    </ul>
                  </Scroll>
                )}
              </>
            )}
          </DropdownList>
        )}
      </SelectWrapper>
    )
  },
)

export default ComboBoxSelect
