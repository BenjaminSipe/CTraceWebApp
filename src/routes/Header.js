import React from "react";
import { Grommet, Box, Image, Button, Header, Menu } from "grommet";
import Logo from "../Logo_V2.svg";
export default function Header2() {
  return (
    <Header background="brand">
      <Button img={Logo} hoverIndicator />
      <Menu label="account" items={[{ label: "logout" }]} />
    </Header>
    // <Box
    //   direction="row"

    //   //   pad="medium"
    // >
    //   <Box width="small">
    //     <Image fit="contain" src={Logo} onClick={() => console.log("test")} />
    //   </Box>
    //   <Box pad="medium" fill="horizontal" background="light-3">
    //     <Button icon={Logo}></Button>
    //   </Box>
    // </Box>
  );
}
