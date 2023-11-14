import React, { useContext } from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Image,
  Divider,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import ShopContext from "../contexts/ShopContext";
import UserContext from "../contexts/UserContext";
function Shopping() {
  const { itemInfo, setItemInfo, itemBuy, setItemBuy } =
    useContext(ShopContext);
  const { isLogin } = useContext(UserContext);

  const handleDecreaseQuantity = (itemId) => {
    const updatedItemInfo = itemInfo.map((item) => {
      if (item.id === itemId && item.quantity >= 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setItemInfo(updatedItemInfo);
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedItemInfo = itemInfo.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setItemInfo(updatedItemInfo);
  };

  const handleDeleteItem = (itemId) => {
    const updatedItemInfo = itemInfo.filter((item) => item.id !== itemId);
    setItemInfo(updatedItemInfo);
  };

  const handleBuyButton = (itemId) => {
    if (!itemBuy.some((item) => item.id === itemId)) {
      const updatedItemInfo = itemInfo.find((item) => item.id === itemId);

      if (updatedItemInfo) {
        setItemBuy((prevItemBuy) => [...prevItemBuy, updatedItemInfo]);
      } else {
        // Eğer belirtilen itemId'ye sahip bir öğe bulunamazsa burada gerekli işlemleri yapabilirsiniz.
      }
    }
  };
  return (
    <>
      {itemInfo.length === 0 || !isLogin ? (
        <Alert status="warning">
          <AlertIcon />
          <AlertTitle>
            There are no items in the shopping cart or you are not logged in
          </AlertTitle>
        </Alert>
      ) : (
        ""
      )}
      <Box h={"100vh"} m={"1% 15%"}>
        <Heading textAlign={"center"} mb={"30px"}>
          Shopping Cart
        </Heading>
        {itemInfo.length === 0 || !isLogin
          ? ""
          : itemInfo.map((item, index) => (
              <>
                <hr />
                <Flex
                  key={index}
                  m={"50px 0"}
                  p={"10px"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  bg={"transparent"}
                  borderRadius={"md"}
                  border = {"1px solid black"}
                >
                  <Image
                    src={item.image}
                    alt="Green double couch with wooden legs"
                    h={"120px"}
                    borderRadius={"md"}
                  />
                  <Box>
                    <Text fontWeight={700} fontSize={"20px"}>
                      {item.name}
                    </Text>
                    <Divider bg={"#fff"} m={"5px 0"}></Divider>
                    <Text fontSize={"15px"}>{item.description}</Text>
                  </Box>
                  <Text fontSize={"20px"}>{`Price : ${item.price}$`}</Text>
                  <Flex alignItems={"center"}>
                    <Button onClick={() => handleDecreaseQuantity(item.id)}>
                      -
                    </Button>
                    <Text m={"0 10px"} fontSize={"20px"}>
                      {item.quantity}
                    </Text>
                    <Button onClick={() => handleIncreaseQuantity(item.id)}>
                      +
                    </Button>
                  </Flex>
                  <Box>
                    <Button
                      w={"80px"}
                      mr={"5px"}
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      w={"80px"}
                      ml={"5px"}
                      onClick={() => handleBuyButton(item.id)}
                    >
                      Buy
                    </Button>
                  </Box>
                </Flex>
              </>
            ))}
      </Box>
    </>
  );
}

export default Shopping;
