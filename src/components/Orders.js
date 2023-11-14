import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Text,
  Image,
  Divider,
} from "@chakra-ui/react";
import ShopContext from "../contexts/ShopContext";
function Orders() {
  const { itemBuy, setItemBuy } = useContext(ShopContext);

  const [orders, setOrders] = useState([]);

  const [totalAmount, setTotalAmount] = useState(0);

  const handleAddButton = (itemId) => {
    const updatedOrders = itemBuy.find((item) => item.id === itemId);
    if (!orders.some((item) => item.id === itemId)) {
      const updatedOrdersArray = [...orders, updatedOrders];
      setOrders(updatedOrdersArray);
      const updatedTotalAmount = updatedOrdersArray.reduce(
        (acc, order) => acc + (order.price * order.quantity),
        0
      );
      setTotalAmount(updatedTotalAmount);
    } else {
    }
  };

  const handleRemoveButton = (itemId) => {
    const updatedOrders = orders.filter((item) => item.id !== itemId);
    setOrders([...updatedOrders]);
    const updatedTotalAmount = updatedOrders.reduce(
      (acc, order) => acc + (order.price * order.quantity),
      0
    );
    setTotalAmount(updatedTotalAmount);
  };

  const handleOrderRemoveButton = (itemId) => {
    const updatedOrders = itemBuy.filter((item) => item.id !== itemId);
    setItemBuy([...updatedOrders]);
  };

  useEffect(() => {
    console.log("itemBuy :", itemBuy);
  }, [itemBuy]);

  useEffect(() => {
    console.log("orders :", orders);
  }, [orders]);
  return (
    <div>
      {itemBuy.length === 0 && (
        <Alert status="warning">
          <AlertIcon />
          <AlertTitle>you don't have an order</AlertTitle>
        </Alert>
      )}
      <Text
        m={"50px 0"}
        textAlign={"center"}
        fontSize={"25px"}
        fontWeight={"700"}
      >
        Orders Page
      </Text>
      <Box m={"2% 10%"} h={"100vh"}>
        {itemBuy.length !== 0
          ? itemBuy.map((item, index) => (
              <Flex
                key={index}
                m={"20px 0"}
                bg={"#222834"}
                p={"10px"}
                borderRadius={"md"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  w={"35%"}
                >
                  <Image src={item.image} w={"100px"} mr={"10px"} />
                  <Text fontWeight={700}>{item.name} |</Text>
                  <Text>{item.description}</Text>
                </Flex>
                <Flex w={"25%"} justifyContent={"space-between"}>
                  <Text>{`Price: ${item.price} $`}</Text>
                  <Text>{`Quantity: ${item.quantity}`}</Text>
                </Flex>
                <Flex>
                  <Button mr={"20px"} onClick={() => handleAddButton(item.id)}>
                    Add
                  </Button>
                  <Button onClick={() => handleRemoveButton(item.id)}>
                    Remove
                  </Button>
                </Flex>
                <Button
                  onClick={() => {
                    handleOrderRemoveButton(item.id);
                    handleRemoveButton(item.id);
                  }}
                >
                  <i className="fi fi-rs-trash"></i>
                </Button>
              </Flex>
            ))
          : ""}
        {itemBuy.length !== 0 ? (
          <>
            <Divider></Divider>
            <Flex p={"10px 0"} justifyContent={"space-between"}>
              <ul>
                {orders.map((order, index) => (
                  <li key={index}>
                    <Text>{order.name}</Text>
                  </li>
                ))}
              </ul>
              <Text fontWeight={700}>{`Total Amount: ${totalAmount}$`}</Text>
            </Flex>
          </>
        ) : (
          ""
        )}
      </Box>
    </div>
  );
}

export default Orders;
