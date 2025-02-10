import { TToast, TToastType } from "../types/app.type";
import { appUtil } from "./app.util";

type TListener<T> = (data: T) => void;
type TListenersMap<T> = Record<string, TListener<T>[]>;

export const SHOW_MSG = "show-msg";

export const createToastEmitter = (): {
  on<T>(evName: string, listener: TListener<T>): () => void;
  emit<T>(evName: string, data: T): void;
} => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const listenersMap: TListenersMap<any> = {};

  return {
    on<T>(evName: string, listener: TListener<T>) {
      if (!listenersMap[evName]) listenersMap[evName] = [];
      listenersMap[evName].push(listener);

      return () => {
        listenersMap[evName] = listenersMap[evName].filter(
          (func) => func !== listener
        );
      };
    },

    emit<T>(evName: string, data: T) {
      if (!listenersMap[evName]) return;
      listenersMap[evName].forEach((listener) => listener(data));
    },
  };
};

export const eventBus = createToastEmitter();

export const showUserMsg = (massage: string, type: TToastType) => {
  const id = appUtil.generateRandomId();
  const date = new Date();
  eventBus.emit<TToast>(SHOW_MSG, {
    id,
    message: massage,
    type,
    createdAt: date,
  });
};
