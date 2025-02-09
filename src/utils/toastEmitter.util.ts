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
      console.log(
        "Registered listener for:",
        evName,
        "Total listeners:",
        listenersMap[evName].length
      ); // Debug
      return () => {
        listenersMap[evName] = listenersMap[evName].filter(
          (func) => func !== listener
        );
        console.log("Listener removed for:", evName);
      };
    },
    
    emit<T>(evName: string, data: T) {
      console.log("evName:", evName);
      console.log("listenersMap:", listenersMap[evName]);
      if (!listenersMap[evName]) return;
      listenersMap[evName].forEach((listener) => listener(data));
    },
  };
};

export const eventBus = createToastEmitter();

export const showUserMsg = (msg: string) => {
  eventBus.emit(SHOW_MSG, msg);
};
