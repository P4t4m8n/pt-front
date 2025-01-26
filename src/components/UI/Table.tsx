import React from "react";
import Button from "./Button";
import LinkCmp from "./Link";

interface Action<T extends { id?: string }> {
  label: React.ReactNode;
  onClick?: (item: T) => void;
  to?: string;
}
// // Enforce at least one of `onClick` or `href` must be present
// type ValidAction<T> = Action<T> &
//   (Required<Pick<Action<T>, "onClick">> | Required<Pick<Action<T>, "href">>);

interface Props<T extends { id?: string }> {
  items: T[];
  actions?: Action<T>[];
}

export default function Table<T extends { id?: string }>({
  items,
  actions,
}: Props<T>) {
  const gridCols =
    Object.keys(items[0] as unknown as string[]).length + (actions ? 1 : 0);
  return (
    <ul className="flex flex-col gap-4">
      {/* Table Headers */}
      <li className={`grid grid-cols-${gridCols} pb-2 border-b`}>
        {Object.keys(items[0]).map(
          (key) => key !== "id" && <p key={key}>{key}</p>
        )}
        {actions && <p>Actions</p>}
      </li>

      {/* Table Rows */}
      {items.map((item, index) => (
        <li key={index} className={`grid grid-cols-${gridCols}`}>
          {Object.entries(item).map(
            ([key, value], index) =>
              key !== "id" && <p key={index}>{value as string}</p>
          )}
          {actions && (
            <div>
              {actions.map((action, actionIndex) => (
                <div key={actionIndex}>
                  {action.onClick && (
                    <Button
                      onClick={() => action.onClick!(item)}
                      className=""
                      styleMode="none"
                      styleSize="none"
                    >
                      {action.label}
                    </Button>
                  )}
                  {action.to && (
                    <LinkCmp
                      styleMode="none"
                      styleSize="none"
                      to={action.to + item.id}
                    >
                      {action.label}
                    </LinkCmp>
                  )}
                </div>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
