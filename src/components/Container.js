import React, { useContext } from "react";
import Header from "./Header";
import Main from "./Main";
import Shopping from "./Shopping";
import Profile from "./Profile";
import Orders from "./Orders";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Text, Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import UserContext, { UserProvider } from "../contexts/UserContext";
import { ShopProvider } from "../contexts/ShopContext";

export default function Container() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <ShopProvider>
            <Header />
            <Routes>
              <Route path="/" exec element={<Main></Main>} />
              <Route path="/Profile" element={<Profile></Profile>} />
              <Route path="/Shopping" element={<Shopping></Shopping>} />
              <Route path="/Orders" element={<OrderWrapper />} />
            </Routes>
          </ShopProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

function OrderWrapper() {
  const { isLogin } = useContext(UserContext);
  return isLogin ? (
    <Orders></Orders>
  ) : (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Log in to view orders</AlertTitle>
    </Alert>
  );
}
