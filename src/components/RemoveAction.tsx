import React from "react";
import { TrailingActions, SwipeAction } from "react-swipeable-list";
import { MdDelete } from "react-icons/md";
import "react-swipeable-list/dist/styles.css";

type Props = {
  onRemove: () => void;
};

export const RemoveAction = ({ onRemove }: Props) => {
  return (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={onRemove}>
        <div className="grid place-items-center bg-red-600 px-4 text-white">
          <MdDelete size={24} />
        </div>
      </SwipeAction>
    </TrailingActions>
  );
};
