import { React, useState, useContext, useEffect } from "react";
import {
  Input,
  Container,
  Text,
  Flex,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import validations from "./validations";
import UserContext from "../contexts/UserContext";

function Profile() {
  const { userData, setIsLogin } = useContext(UserContext);
  const [usernameCheck, setUsernameCheck] = useState(true);
  const [passwdCheck, setPasswdCheck] = useState(true);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    console.log();
    if (
      userData.username === values.username &&
      userData.password === values.password
    ) {
      setIsLogin(true);
      navigate("/");
    } else {
      navigate("/Profile");
      setIsLogin(false);
    }
  };

  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    setTouched,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        // Simüle edilen asenkron işlem
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Kullanıcı girişini kontrol et
        if (touched.username && userData.username !== values.username) {
          setUsernameCheck(false);
        } else {
          setUsernameCheck(true);
        }
        if (touched.password && userData.password !== values.password) {
          setPasswdCheck(false);
        } else {
          setPasswdCheck(true);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },

    validationSchema: validations,
  });

  useEffect(() => {
    setTouched({
      username: false,
      password: false,
    });
  }, [setTouched]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        {!usernameCheck &&
        !passwdCheck &&
        touched.username &&
        touched.password ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Username and Password are not correct</AlertTitle>
          </Alert>
        ) : (
          <>
            {!usernameCheck && touched.username ? (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>Username is not correct</AlertTitle>
              </Alert>
            ) : null}
            {!passwdCheck && touched.password ? (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>Password is not correct</AlertTitle>
              </Alert>
            ) : null}
          </>
        )}

        <Container mt={"50px"} maxW={"350px"}>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Text mr={"10px"} w={"120px"} fontSize={"lg"}>
              Username
            </Text>
            <Input
              name="username"
              w={"100%"}
              h={"30px"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
          </Flex>
          <Flex alignItems={"center"} justifyContent={"center"} mt={"10px"}>
            <Text mr={"10px"} w={"120px"} fontSize={"lg"}>
              Password
            </Text>
            <Input
              name="password"
              value={values.password}
              w={"100%"}
              h={"30px"}
              onChange={handleChange}
            />
          </Flex>
          <Flex justifyContent={"flex-end"} p={"10px 0"}>
            <Button type="submit" size={"md"} onClick={handleButtonClick}>
              Submit
            </Button>
          </Flex>
        </Container>
      </form>
    </>
  );
}

export default Profile;
