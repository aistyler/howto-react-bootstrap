import { StoreProvider } from "@howto/hydro-store"
import React from "react";

export const wrapper = ({ children }: any) => ( 
  <StoreProvider> {children} </StoreProvider>
);
