import type { Category, Event, Member } from "@prisma/client";
import React from "react";
import { motion } from "framer-motion";

type Props = {
  className?: string;
  event: Partial<Event> & {
    attendees?: Member[];
    Category?: Category;
  };
  showAttendees?: boolean;
};

export const EventItem = ({
  className,
  event,
  showAttendees = false,
}: Props) => {
  const { rgb } = JSON.parse(event.Category?.color);

  //TODO: Replace motion component with Button

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className={`${
        className ?? ""
      } flex items-center justify-between rounded-lg p-3`}
      style={{
        backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`,
      }}
    >
      <div>
        <h3 className="text-body">{event.name}</h3>
        <p className="text-small">{event.Category?.name}</p>
      </div>
      {showAttendees && (
        <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-white">
          {event.attendees?.length}
        </div>
      )}
    </motion.div>
  );
};
