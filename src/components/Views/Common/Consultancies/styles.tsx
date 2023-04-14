import styled, { css } from "styled-components"
import theme from "theme"

const Container = styled.div`
  width: 95vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

const Calendar = styled.div`
  width: 96%;
  padding: 10px 25px;
  border-radius: 18px;
  background-color: ${theme.colors.white};

  display: flex;
  flex-direction: column;
`

const DateInfo = styled.p`
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
  /* border: 1px solid red; */
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

const ScheduleConsultancy = styled.button`
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
  /* height: 600px; */
  height: fit-content;
  width: 1246px;

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
`

const Days = styled.div`
  display: flex;
  padding-top: 15px;
  font-family: ${theme.fonts.extra};
  font-size: 15px;
  color: ${theme.colors.blue};

  p {
    width: 176px;
    text-align: center;
    border: 1px solid transparent;
    margin: 0;
  }
`

export {
  Container,
  Calendar,
  DateInfo,
  CalendarInfo,
  NavigateButtons,
  ScheduleConsultancy,
  CalendarDisplay,
  DateView,
  Days,
}
