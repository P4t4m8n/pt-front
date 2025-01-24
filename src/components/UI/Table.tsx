import React from "react";
import Button from "./Button";
import NavLinkCmp from "./Link";

interface Action<T> {
  label: React.ReactNode;
  onClick?: (item: T) => void;
  to?: string;
}
// // Enforce at least one of `onClick` or `href` must be present
// type ValidAction<T> = Action<T> &
//   (Required<Pick<Action<T>, "onClick">> | Required<Pick<Action<T>, "href">>);

interface Props<T> {
  header: string[];
  items: T[];
  actions?: Action<T>[];
}

export default function Table<T>({ items, actions }: Props<T>) {
  return (
    <ul
      className={`grid grid-cols-${
        Object.keys(items[0] as string[]).length + (actions ? 1 : 0)
      }`}
    >
      {/* Table Headers */}
      <li>
        {Object.keys(items[0] as string[]).map((key) => (
          <p key={key}>{key}</p>
        ))}
        {actions && <p>Actions</p>}
      </li>

      {/* Table Rows */}
      {items.map((item, index) => (
        <li key={index}>
          {Object.values(item as unknown[]).map((value, index) => (
            <p key={index}>{value as string}</p>
          ))}
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
                    <NavLinkCmp
                      styleMode="none"
                      styleSize="none"
                      to={action.to}
                    >
                      {action.label}
                    </NavLinkCmp>
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
