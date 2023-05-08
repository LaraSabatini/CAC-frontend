import styled, { css } from "styled-components"
import theme from "theme"

const Container = styled.div`
  width: 95vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 1920px) {
    width: 1400px;
  }

  @media (max-width: 1366px) {
    width: 1300px;
  }

  @media (max-width: 1024px) {
    width: 1000px;
  }

  @media (max-width: 768px) {
    width: 700px;
  }

  @media (max-width: 414px) {
    width: 350px;
  }
`

const Calendar = styled.div`
  width: 96%;
  padding: 10px 25px;
  border-radius: 18px;
  background-color: white;

  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    width: 95%;
  }

  @media (max-width: 414px) {
    width: 90%;
    padding: 10px 17px;
  }
`

const DateInfo = styled.div`
  margin: 0;

  font-family: ${theme.fonts.titles};
  font-weight: ${theme.fontWeights.semiBold};
  color: ${theme.colors.blue};
  font-size: 16px;

  display: flex;
  align-items: center;
  gap: 10px;

  p {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  span {
    color: rgba(70, 105, 149, 0.8);
    font-size: 14px;
    font-weight: ${theme.fontWeights.regular};
  }
`

const CalendarInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;

  .admin-buttons {
    display: flex;
    align-items: center;
    cursor: pointer;

    flex-wrap: wrap;
  }

  @media (max-width: 414px) {
    flex-wrap: wrap;
    .admin-buttons {
      gap: 10px;
    }
  }
`

const NavigateButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    border: none;
    outline: none;
    background-color: transparent;
    color: ${theme.colors.blue};
    width: fit-content;
    cursor: pointer;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`

const ScheduleAdvisory = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  border: none;
  background-color: transparent;

  font-family: ${theme.fonts.titles};

  color: ${theme.colors.blue};

  text-decoration: underline;

  cursor: pointer;
`

const CalendarDisplay = styled.div`
  height: fit-content;
  justify-content: center;
  align-items: center;

  width: 100%;

  display: flex;
  flex-wrap: wrap;
  gap: 0;
`

const DateView = styled.div<{ past?: boolean }>`
  border: 1px solid rgba(70, 106, 149, 0.235);
  width: 176px;
  height: 100px;

  font-family: ${theme.fonts.extra};
  font-size: 14px;
  color: ${theme.colors.blue};

  text-align: center;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin: 0;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  ${({ past }) =>
    past &&
    css`
      p {
        opacity: 0.7;
      }
      background-color: #466a9519;
      cursor: not-allowed;
    `}

  @media (max-width: 1024px) {
    width: 120px;
  }

  @media (max-width: 768px) {
    width: 90px;
  }

  @media (max-width: 414px) {
    width: 40px;
    height: 90px;
  }
`

const Days = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 15px;
  font-family: ${theme.fonts.extra};
  font-size: 15px;
  color: ${theme.colors.blue};

  p {
    width: 176px;
    text-align: center;
    border: 1px solid transparent;
    margin: 0;

    @media (max-width: 1920px) {
    }
  }

  @media (max-width: 1024px) {
    p {
      width: 120px;
    }
  }

  @media (max-width: 768px) {
    p {
      width: 90px;
    }
  }

  @media (max-width: 414px) {
    p {
      width: 40px;
      font-size: 14px;
    }
  }

  @media (max-width: 414px) {
    margin-top: 70px;
  }
`

const AdvisoryEvent = styled.button<{
  eventType: "event" | "advisory"
  cancelled: boolean
}>`
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

    ${props =>
    props.cancelled &&
    css`
      opacity: 0.3;
      cursor: not-allowed;
    `}
`

const EventData = styled.div`
  background-color: white;

  width: 400px;
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
    justify-content: space-between;
    padding-top: 15px;
  }

  .admin-buttons {
    display: flex;
    align-items: center;
    gap: 20px;

    button {
      background-color: ${theme.colors.blue};
      border: none;

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

export {
  Container,
  Calendar,
  DateInfo,
  CalendarInfo,
  NavigateButtons,
  ScheduleAdvisory,
  CalendarDisplay,
  DateView,
  Days,
  AdvisoryEvent,
  EventData,
  EventContainer,
  EventDataEdit,
}
