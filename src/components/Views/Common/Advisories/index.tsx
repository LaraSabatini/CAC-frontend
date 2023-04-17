import React, { useState, useEffect, useContext } from "react"
import Header from "components/Views/Common/Header"
import { AdvisoriesContext } from "contexts/Advisories"
import { getAdvisories } from "services/advisories/advisories.service"
import { getEventsByMonth } from "services/advisories/events.service"
import { AiFillSchedule } from "react-icons/ai"
import formatDateToCompare, {
  stringToDate,
} from "helpers/dates/formatDateToCompare"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { FaCalendarWeek, FaCalendarPlus } from "react-icons/fa"
import getCalendarMonth from "helpers/dates/getCalendarMonth"
import compareDates from "helpers/dates/compareDates"
import months from "const/months"
import {
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
} from "./styles"

function AdvisoriesView() {
  const userData = JSON.parse(localStorage.getItem("userData") as string)
  const {
    advisoryList,
    setAdvisoryList,
    setPublicEventList,
    publicEventList,
  } = useContext(AdvisoriesContext)

  const today = new Date()

  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth() + 1)
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear())

  const [dates, setDates] = useState<Date[]>(
    getCalendarMonth(today.getFullYear(), today.getMonth() + 1),
  )

  const getAdvisoryList = async () => {
    const getAdvisoriesCall = await getAdvisories(
      userData?.id,
      currentMonth,
      userData?.type,
    )
    setAdvisoryList(getAdvisoriesCall.data)

    const hola = new Date(stringToDate(getAdvisoriesCall.data[0].date))
    const otra = new Date(dates[15])
    console.log(hola.getTime() === otra.getTime())

    const getEventsByMonthCall = await getEventsByMonth(currentMonth)
    setPublicEventList(getEventsByMonthCall.data)
  }

  const searchAdvisory = (index: number) => {
    const advisory = advisoryList.filter(
      advisoryEvent =>
        stringToDate(advisoryEvent.date).getTime() === dates[index].getTime(),
    )

    return advisory.length === 0
      ? null
      : {
          hour: advisory[0].hour,
          client: advisory[0].clientName,
        }
  }

  const searchEvent = (index: number) => {
    const event = publicEventList.filter(
      eventDate =>
        stringToDate(eventDate.date).getTime() === dates[index].getTime(),
    )

    return event.length === 0
      ? null
      : {
          hour: event[0].hour,
          title: event[0].title,
        }
  }

  useEffect(() => {
    setDates(getCalendarMonth(currentYear, currentMonth))
    getAdvisoryList()
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

            {userData?.type === "client" ? (
              <ScheduleAdvisory>
                <FaCalendarWeek />
                Solicitar asesoria
              </ScheduleAdvisory>
            ) : (
              <div className="admin-buttons">
                <ScheduleAdvisory>
                  <FaCalendarPlus />
                  Crear evento publico
                </ScheduleAdvisory>
                <ScheduleAdvisory>
                  <AiFillSchedule />
                  Agregar / Modificar disponibilidad
                </ScheduleAdvisory>
              </div>
            )}
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
              <DateView
                // eslint-disable-next-line react/no-array-index-key
                key={index + 1}
                past={
                  !compareDates(formatDateToCompare(dates[index], currentYear))
                }
              >
                <p>{date.getDate()}</p>
                {searchAdvisory(index) !== null ? (
                  <AdvisoryEvent type="button" eventType="advisory">
                    <div className="marker" />
                    <p>
                      {searchAdvisory(index)?.hour} asesoria con{" "}
                      <b>{searchAdvisory(index)?.client}</b>
                    </p>
                  </AdvisoryEvent>
                ) : (
                  <></>
                )}
                {searchEvent(index) !== null ? (
                  <AdvisoryEvent type="button" eventType="event">
                    <div className="marker" />
                    <p>
                      {searchEvent(index)?.hour}{" "}
                      <b>{searchEvent(index)?.title}</b>
                    </p>
                  </AdvisoryEvent>
                ) : (
                  <></>
                )}
              </DateView>
            ))}
          </CalendarDisplay>
        </Calendar>
      </Container>
    </>
  )
}

export default AdvisoriesView
