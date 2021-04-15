import React from "react";
import { Grommet, Image, Button, Header, Menu } from "grommet";
import Logo from "../Logo_V2.svg";
export default function AppHeader(props) {
  return (
    <Grommet theme={props.theme}>
      <Header background="accent-1">
        <Button
          href="/"
          primary
          hoverIndicator={{
            color: "accent-1",
          }}
          // style={{
          //   border: "hidden",
          //   // borderColor: props.theme.global.colors.iconBorder,
          //   borderRadius: "15px",
          // }}
        >
          <Image
            fit="contain"
            src={Logo}
            style={{ padding: "5px", width: "140px" }}
          ></Image>
        </Button>

        <Menu label="account" items={[{ label: "logout" }]} />
      </Header>
    </Grommet>
  );
}
