import React, { useContext } from "react";
import {
  Flex,
  Box,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function ThemeSwitcher() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box ml={5} pt={"3px"} fontSize={20} onClick={toggleColorMode}>
      {colorMode === "light" ? (
        <i className="fi fi-rr-brightness"></i> // eklenecek
      ) : (
        <i className="fi fi-rr-moon"></i> // eklenecek
      )}
    </Box>
  );
}

function Header() {
  const navigate = useNavigate();

  const { isLogin, setIsLogin, userData } = useContext(UserContext);

  const handleLogoutClick = () => {
    setIsLogin(false);
  };
  return (
    <>
      <Flex
        justifyContent={"space-between"}
        p={"15px 40px"}
        backgroundColor={"#72a0bd"}
        color={"black"}
        boxShadow={"0 0 5px black"}
      >
        <Box onClick={() => navigate("/")} fontSize={"20px"}>
          <code>E-commerce</code>
        </Box>
        <Box>
          <Flex>
            <Box maxH={"30px"} pt={"4px"} onClick={() => navigate("/Shopping")}>
              <i className="fi fi-rr-shopping-cart"></i>
            </Box>
            <Box
              maxH={"30px"}
              m={"0 10px"}
              pt={"4px"}
              onClick={() => navigate("/Profile")}
            >
              <i className="fi fi-rr-user"></i>
            </Box>
            {isLogin ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<i className="fi fi-rr-angle-small-down"></i>}
                >
                  <Avatar maxW={"35px"} maxH={"35px"}></Avatar>
                </MenuButton>
                <MenuList>
                  <MenuItem>{`User : ${userData.username}`}</MenuItem>
                  <MenuItem onClick={() => navigate("/Orders")}>
                    My Orders
                  </MenuItem>
                  <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              ""
            )}
            <ThemeSwitcher></ThemeSwitcher>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

export default Header;
