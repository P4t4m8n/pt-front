import { JSX, ReactNode } from "react";

export type TEntity = {
  id?: string;
};

/**
 * Represents a navigation link.
 * @typedef {Object} TNavLink
 * @property {string} href - The destination path of the link.
 * @property {JSX.Element} [icon] - An optional icon to display with the link.
 * @property {string} [text] - Optional text to display for the link.
 * @property {string} [style] - Optional style class for the link.
 */
export type TNavLink = {
  to: string;
  icon?: JSX.Element;
  text?: string;
  style?: string;
};

export type RouteConfig = {
  path: string;
  element: ReactNode;
  children?: RouteConfig[];
};

export interface TToast {
  id: number;
  message: string;
  type: TToastType;
}
export type TToastType = "success" | "error" | "warning" | "info";
