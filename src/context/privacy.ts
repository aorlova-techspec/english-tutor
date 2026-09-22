import { createContext, useContext } from "react";

export type PrivacyActions = { open: () => void; close: () => void };

export const PrivacyContext = createContext<PrivacyActions>({
  open: () => {},
  close: () => {},
});

export function usePrivacy() {
  return useContext(PrivacyContext);
}