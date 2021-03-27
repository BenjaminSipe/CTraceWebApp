import { Paragraph, Box, Text } from "grommet";
export default function LineItem(props) {
  return (
    <Box>
      <Paragraph>
        <Text style={{ fontWeight: "bold" }}>{props.test}</Text>
        {props.value}
      </Paragraph>
    </Box>
  );
}
