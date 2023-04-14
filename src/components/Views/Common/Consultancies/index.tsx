/* eslint-disable no-console */
import React, { useState, useEffect } from "react"
import Header from "components/Views/Common/Header"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { FaCalendarWeek } from "react-icons/fa"
import getCalendarMonth from "helpers/dates/getCalendarMonth"
import compareDates from "helpers/dates/compareDates"
import months from "const/months"
import {
  Container,
  Calendar,
  DateInfo,
  CalendarInfo,
  NavigateButtons,
  ScheduleConsultancy,
  CalendarDisplay,
  DateView,
  Days,
} from "./styles"

function ConsultanciesView() {
  const today = new Date()

  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth() + 1)
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear())

  const [dates, setDates] = useState<Date[]>(
    getCalendarMonth(today.getFullYear(), today.getMonth() + 1),
  )

  const formateDateToCompare = (index: number) => {
    const day =
      dates[index].getDate() > 9
        ? dates[index].getDate()
        : `0${dates[index].getDate()}`
    const month =
      dates[index].getMonth() + 1 > 9
        ? dates[index].getMonth() + 1
        : `0${dates[index].getMonth() + 1}`

    return `${day}-${month}-${currentYear}`
  }

  useEffect(() => {
    setDates(getCalendarMonth(currentYear, currentMonth))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth])

  return (
    <>
      <Header />
      <Container>
        <Calendar>
          <CalendarInfo>
            <DateInfo>
              <NavigateButtons>
                <button
                  type="button"
                  onClick={() => {
                    if (currentMonth === 1) {
                      setCurrentMonth(12)
                      setCurrentYear(currentYear - 1)
                    } else {
                      setCurrentMonth(currentMonth - 1)
                    }
                  }}
                >
                  <FiChevronLeft />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (currentMonth === 12) {
                      setCurrentMonth(1)
                      setCurrentYear(currentYear + 1)
                    } else {
                      setCurrentMonth(currentMonth + 1)
                    }
                  }}
                >
                  <FiChevronRight />
                </button>
              </NavigateButtons>
              <p>
                {
                  months.filter(
                    (monthItem: { id: number; name: string }) =>
                      monthItem.id === currentMonth,
                  )[0].name
                }
                <span>{currentYear}</span>
              </p>
            </DateInfo>

            <ScheduleConsultancy>
              <FaCalendarWeek />
              Solicitar asesoria
            </ScheduleConsultancy>
          </CalendarInfo>
          <Days>
            <p>DOM</p>
            <p>LUN</p>
            <p>MAR</p>
            <p>MIE</p>
            <p>JUE</p>
            <p>VIE</p>
            <p>SAB</p>
          </Days>
          <CalendarDisplay>
            {dates.map((date, index) => (
              <DateView past={!compareDates(formateDateToCompare(index))}>
                <p>{date.getDate()}</p>
              </DateView>
            ))}
          </CalendarDisplay>
        </Calendar>
      </Container>
    </>
  )
}

export default ConsultanciesView
