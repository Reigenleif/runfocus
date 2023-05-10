import { createContext, useState, useCallback } from "react";

const PopupContext = createContext({
    isActive: false,
    content: <div/>,
    triggerPopup: (a: JSX.Element) => {},
    disablePopup: () => {},
  });
export default PopupContext;

export const PopupContextProvider = ({children} : {children: JSX.Element | JSX.Element[]}) => {
  const [content, setContent] = useState(<div/>);
  const [isActive, setIsActive] = useState(false);

  const triggerPopup = useCallback((inputContent: JSX.Element) => {
    setContent(inputContent);
    setIsActive(true);
    document.body.style.overflow = "hidden"
  }, []);

  const disablePopup = useCallback(() => {
    setContent(<div/>);
    setIsActive(false);
    document.body.style.overflow = "visible"
  }, []);

  return (
    <PopupContext.Provider
      value={{
        isActive: isActive,
        content: content,
        triggerPopup: triggerPopup,
        disablePopup: disablePopup,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};
