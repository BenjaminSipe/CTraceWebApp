import React from "react";
import { Image, Button, Header, Menu } from "grommet";
import Logo from "../Logo_V2.svg";
export default function AppHeader() {
  return (
    <Header background="brand">
      <Button
        href="/"
        hoverIndicator
        style={{
          borderStyle: "solid",
          borderColor: "#aD7CfB",
          borderRadius: "15px",
        }}
      >
        {" "}
        <Image
          fit="contain"
          src={Logo}
          style={{ padding: "5px", width: "140px" }}
        ></Image>
      </Button>

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
