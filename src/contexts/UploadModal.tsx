import { createContext, useState, useContext } from "react";

interface IContext {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>> | null;
}

export const UploadModalContext = createContext<IContext>({
  visible: false,
  setVisible: null,
});

export const UploadModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <UploadModalContext.Provider value={{ visible, setVisible }}>
      {children}
    </UploadModalContext.Provider>
  );
};

export const useVisible = () => {
  const { visible, setVisible } = useContext(UploadModalContext);

  return { visible, setVisible };
};
