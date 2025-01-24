import React, { Fragment } from "react";

interface Props<T> {
  items: T[];
  renderItem: (item: T, idx?: number) => React.ReactNode;
  listStyle?: string;
}
export default function ItemList<T>({
  items,
  renderItem,
  listStyle,
}: Props<T>) {
  return (
    <ul className={listStyle}>
      {items.map((item, index) => (
        <Fragment key={generateRandomId()}>{renderItem(item, index)}</Fragment>
      ))}
    </ul>
  );
}

const generateRandomId = () => {
  return Math.random().toString(36).substring(7);
};
