import styled, { css } from "styled-components"
import theme from "theme"

const EventContainer = styled.div`
  width: 100%;
  position: relative;

  .data {
    visibility: hidden;
    transition: 0.3s;
  }

  &:hover {
    .data {
      visibility: visible;
    }
  }
`

const EventData = styled.div`
  background-color: white;

  width: 450px;
  /* height: 200px; */
  border-radius: 18px;
  padding: 25px;

  display: flex;
  flex-direction: column;

  .description {
    font-family: ${theme.fonts.extra};
    color: ${theme.colors.blue};
    font-size: 14px;
    margin: 0;
    padding-top: 10px;
  }

  .buttons {
    display: flex;
    align-items: center;
    /* align-self: flex-end; */
    justify-content: space-between;
    padding-top: 15px;
  }

  .calendar-buttons {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .admin-buttons {
    display: flex;
    align-items: center;
    gap: 20px;

    button {
      background-color: ${theme.colors.blue};
      border: none;
      /* padding: 10px; */

      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 40px;
      border-radius: 5px;
      cursor: pointer;
    }

    svg {
      stroke: white;
    }

    .trash {
      background-color: ${theme.colors.red};
      svg {
        fill: white;
      }
    }

    svg {
      width: 20px;
      height: 20px;
      /* fill: ${theme.colors.blue};
      stroke: white; */
    }
  }

  span {
    font-family: ${theme.fonts.extra};
    color: ${theme.colors.blue};
    font-size: 14px;
    padding-top: 10px;

    display: flex;
    align-items: center;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  .title {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .close {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: none;
      background-color: transparent;

      cursor: pointer;

      svg {
        width: 25px;
        height: 25px;
      }
    }

    p {
      font-family: ${theme.fonts.titles};
      color: ${theme.colors.blue_dark};
      margin: 0;
      font-size: 15px;
    }
  }
`

const EventDataEdit = styled.div`
  background-color: ${theme.colors.white};
  width: 400px;
  border-radius: 18px;
  padding: 25px;
  display: flex;
  flex-direction: column;

  .input-container {
    padding-top: 20px;
  }

  .horizontal {
    padding-top: 65px;
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .required {
    color: ${theme.colors.red};
    margin: 0;
    font-family: ${theme.fonts.extra};
    font-size: 12px;
  }
`

const AdvisoryEvent = styled.button<{ eventType: "event" | "advisory" }>`
  display: flex;
  align-items: center;
  gap: 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  overflow: hidden;
  white-space: nowrap;
  width: 100%;

  .marker {
    height: 8px;
    border-radius: 50%;
    padding-left: 8px;
  }

  p {
    font-family: ${theme.fonts.extra};
    margin: 0;
    font-size: 12px;

    b {
      font-weight: ${theme.fontWeights.medium};
    }
  }

  ${props =>
    props.eventType === "advisory" &&
    css`
      .marker {
        background-color: ${theme.colors.orange};
      }
    `}

  ${props =>
    props.eventType === "event" &&
    css`
      .marker {
        background-color: ${theme.colors.blue};
      }
    `}
`
export { EventContainer, EventData, EventDataEdit, AdvisoryEvent }
