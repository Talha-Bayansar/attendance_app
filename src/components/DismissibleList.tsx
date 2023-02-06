import React, { type ReactNode } from "react";
import { SwipeableListItem, SwipeableList, Type } from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { RemoveAction } from ".";

type Item = {
  id: string;
};

type Props<T extends Item> = {
  data: T[];
  onRemove: (id: string) => void;
  children: (item: T) => ReactNode;
};

export const DismissibleList = <T extends Item>({
  data,
  onRemove,
  children,
}: Props<T>) => {
  return (
    <SwipeableList
      className="overflow-visible-custom flex flex-col gap-4"
      fullSwipe
      type={Type.IOS}
      destructiveCallbackDelay={300}
    >
      {data.map((item) => (
        <SwipeableListItem
          key={item.id}
          trailingActions={<RemoveAction onRemove={() => onRemove(item.id)} />}
          className="overflow-visible"
        >
          {children(item)}
        </SwipeableListItem>
      ))}
    </SwipeableList>
  );
};
