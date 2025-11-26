import { createContext, useContext, useState } from "react";

type DragContextType = {
  isDragging: boolean;
  setIsDragging: (value: boolean) => void;
};

const DragContext = createContext<DragContextType | null>(null);

export function DragProvider({ children }: { children: React.ReactNode }) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <DragContext.Provider value={{ isDragging, setIsDragging }}>
      {children}
    </DragContext.Provider>
  );
}

export function useDragContext() {
  const context = useContext(DragContext);
  if (!context) {
    throw new Error("useDragContext must be used within a DragProvider");
  }
  return context;
}
