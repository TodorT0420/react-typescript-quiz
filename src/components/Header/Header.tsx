import { Flex, Image } from "@chakra-ui/react";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
      <Flex>
          <Image h="24" src={logo} alt="logo" />
    </Flex>
  )
}

export default Header;