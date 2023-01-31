import { EmptyState, Layout, LoadingIndicator } from "@/components";
import { Calendar, MonthSwitcher } from "@/events";
import { t } from "@/locales";
import { appName, api, Routes } from "@/utils";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  endOfMonth,
  isBefore,
  isSameDay,
  isToday,
  startOfMonth,
  startOfToday,
} from "date-fns";
import { EventItem } from "@/events/components/EventItem";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
};

const Home: NextPage = () => {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState<Date>(today);
  const [selectedMonth, setSelectedMonth] = useState(startOfMonth(today));

  const { data, isFetching } = api.event.getAllBetween.useQuery({
    startDate: startOfMonth(selectedMonth),
    endDate: endOfMonth(selectedMonth),
  });

  const eventsOfSelectedDay = data?.filter((event) =>
    isSameDay(selectedDay, event.date)
  );

  const handleChangeDay = (day: Date) => {
    setSelectedDay(day);
  };

  const handleChangeMonth = (date: Date) => {
    setSelectedMonth(date);
    setSelectedDay(startOfMonth(date));
  };

  const hasEventOnDate = (date: Date) => {
    const event = data?.find((event) => isSameDay(date, event.date));
    return event ? true : false;
  };

  return (
    <Layout title={t.signIn.title}>
      <Head>
        <title>{`${appName} - ${t.common.homePage}`}</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <main className="flex flex-grow flex-col gap-8 p-4">
        <MonthSwitcher
          month={selectedMonth}
          onChange={(date) => handleChangeMonth(date)}
        />
        <Calendar month={selectedMonth}>
          {(day) => (
            <button
              onClick={() => handleChangeDay(day)}
              className={`text-gray-400 ${
                isToday(day) ? " bg-secondary bg-opacity-50" : ""
              }${isSameDay(day, selectedDay) ? " border border-black" : ""}${
                hasEventOnDate(day) ? " text-black" : ""
              } flex h-8 w-8 items-center justify-center rounded-full text-center`}
            >
              {day.getDate()}
            </button>
          )}
        </Calendar>
        {isFetching ? (
          <LoadingIndicator />
        ) : eventsOfSelectedDay?.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-grow flex-col gap-2"
          >
            {eventsOfSelectedDay?.map((event) => (
              <motion.div variants={item} key={event.id}>
                <Link href={`${Routes.EVENTS}/${event.id}?title=${event.name}`}>
                  <EventItem
                    event={event}
                    showAttendees={
                      isBefore(event.date, today) ||
                      isSameDay(today, event.date)
                    }
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <EmptyState text={t.signIn.emptyText} />
        )}
      </main>
    </Layout>
  );
};

export default Home;
