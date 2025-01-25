import React, { Fragment } from "react";

interface Props<T extends { id?: string }> {
  items: T[];
  renderItem: (item: T, idx?: number) => React.ReactNode;
  listStyle?: string;
}
export default function ItemList<T extends { id?: string }>({
  items,
  renderItem,
  listStyle,
}: Props<T>) {
  return (
    <ul className={listStyle}>
      {items.map((item, index) => (
        <Fragment key={item?.id || index}>{renderItem(item, index)}</Fragment>
      ))}
    </ul>
  );
}
