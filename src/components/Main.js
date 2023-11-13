import React, { useContext } from "react";
import {
  Box,
  Text,
  Card,
  Flex,
  CardBody,
  CardFooter,
  Image,
  Button,
  Heading,
  Stack,
} from "@chakra-ui/react";
import ShopContext from "../contexts/ShopContext";
import UserContext from "../contexts/UserContext";

function Main() {
  const { itemInfo, setItemInfo } = useContext(ShopContext);
  const { isLogin } = useContext(UserContext);
  const products = [
    {
      id: 1,
      name: "Living room Sofa",
      description: "This sofa is perfect",
      price: 450,
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: 2,
      name: "modern wood sofa",
      description: "This sofa is perfect your office",
      price: 350,
      image:
        "https://storage.googleapis.com/mobilya/model/141/m-mobilya-68439-62f62f290ea98.jpg",
    },
    {
      id: 3,
      name: "Living room big sofa",
      description: "This sofa is perfect for fresh room",
      price: 400,
      image:
        "https://media.architecturaldigest.com/photos/64de634d02916e5d018e0c81/2:1/w_1280,c_limit/AD1022_BERKUS_BRENT_7.jpg",
    },
  ];

  const handleBuyNow = (product) => {
    if (isLogin === true) {
      setTimeout(() => {}, 500);

      const existingProduct = itemInfo.find((p) => p.id === product.id);

      if (existingProduct) {
        // If product already exists, update the quantity
        const updatedProducts = itemInfo.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
        setItemInfo(updatedProducts);
      } else {
        // If product doesn't exist, add it to the list
        setItemInfo((prevProduct) => [
          ...prevProduct,
          { ...product, quantity: 1 },
        ]);
      }
    } else {
    }
  };

  return (
    <>
      <Box textAlign={"center"} p={"60px 0"}>
        <Text fontSize={"30px"}>Shop Center</Text>
      </Box>
      <Flex
        justifyContent={"space-around"}
        alignItems={"center"}
        m={"10px 100px"}
      >
        {products.map((product) => (
          <Card key={product.id} maxW="250px">
            <CardBody>
              <Image src={product.image} alt={product.name} borderRadius="lg" />
              <Stack mt="4">
                <Heading size={"md"}>{product.name}</Heading>
                <Text maxW={"250px"} fontSize={"15px"}>
                  {product.description}
                </Text>
              </Stack>
            </CardBody>
            <CardFooter p={"20px 10px"}>
              <Flex
                alignItems={"center"}
                justifyContent={"space-around"}
                w={"100%"}
              >
                <Text color="blue.600" fontSize="md">
                  ${product.price}
                </Text>
                <Button
                  variant="solid"
                  colorScheme="blue"
                  size={"md"}
                  onClick={() => handleBuyNow(product)}
                >
                  Buy now
                </Button>
              </Flex>
            </CardFooter>
          </Card>
        ))}
      </Flex>
    </>
  );
}

export default Main;
