import { AuthContextProvider } from "./authContext";
import { PopupContextProvider } from "./popupContext";

export default function ContextProviders({
  children,
}: {
  children: JSX.Element;
}) {
  return (
    <AuthContextProvider>
      <PopupContextProvider>{children}</PopupContextProvider>
    </AuthContextProvider>
  );
}
