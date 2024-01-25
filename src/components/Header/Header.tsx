import { Flex, Image } from "@chakra-ui/react";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
      <Flex justify="center">
          <Image h="24" src={logo} />
    </Flex>
  )
}

export default Header;