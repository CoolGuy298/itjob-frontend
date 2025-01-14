import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

// Define the types
interface Notification {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

interface NotificationContextType {
  addNotification: (message: string, type?: "success" | "error" | "info", duration?: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

 const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((message: string, type: "success" | "error" | "info" = "success", duration = 3000) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, duration);
  }, []);

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
    
      <div className="fixed top-5 left-1/2 transform -translate-x-1/2 space-y-4 z-50">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`px-4 py-3 rounded shadow-md text-white text-sm ${
              n.type === "success" ? "bg-green-500" : n.type === "error" ? "bg-red-500" : "bg-blue-500"
            }`}
          >
            {n.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
export { NotificationProvider, useNotification };