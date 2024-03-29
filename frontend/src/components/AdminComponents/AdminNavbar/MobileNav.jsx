import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FiBell, FiChevronDown, FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../../redux/AdminLogin/adminLogin.action";
import { json, Navigate } from "react-router-dom";

//Images
import logo from '../../../Assets/Dobiri.png';

const MobileNav = ({ onOpen }) => {
  const { isAuth, data } = useSelector((store) => store.adminAuth);
  // const { admin } = data;
  const admin = JSON.parse(localStorage.getItem("AdminData")) || {};
  // console.log(data);
  const dispatch = useDispatch();
  const handleLoginClick = () => {
    if (isAuth) {
      dispatch(adminLogout());
    } else {
      Navigate("/admin");
    }
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={"black"}
      borderBottomWidth="1px"
      borderBottomColor={"gray.200"}
      color={"white"}
      justifyContent={{ base: "space-between", md: "flex-end" }}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Box
        display={{ base: "none", lg: "flex", md: "none", sm: "none" }}
        margin={"auto"}
        justifyContent={"center"}
      >
        <Image
          src={logo}
          width={"60%"}
        />
      </Box>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          color={"#eb5e28"}
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={data.avtar || admin[0].avtar} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">
                    {data.first_name || admin[0].first_name}
                    {data.last_name || admin[0].last_name}
                  </Text>
                  <Text fontSize="xs" color="white">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex", lg: "none" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg={"white"} borderColor={"gray.200"}>
              <MenuItem color={"black"}>Profile</MenuItem>
              <MenuItem color={"black"}>Settings</MenuItem>
              <MenuDivider />
              <MenuItem color={"black"} onClick={handleLoginClick}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
