import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { TableType } from "./types";

const GenerateTable = ({
  title,
  data,
  size,
  headerColor,
  headerColorVisible,
  borderRadius,
  maxHeight,
  onRowClick,
}: TableType): JSX.Element => {
  const theadProps = headerColorVisible
    ? { bgColor: headerColor || "gray.200" }
    : {};
  return (
    <Box
      border="1px"
      borderColor="gray.300"
      borderRadius={borderRadius || "lg"}
      p={2}
      maxHeight={maxHeight}
      overflowX="scroll"
    >
      {title ? title : <></>}
      <Table size={size} maxHeight={maxHeight}>
        <Thead {...theadProps}>
          <Tr>
            {data.columns.map((column, index) => (
              <Th key={index}>{column.name}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.data.map((row, rowIndex) => (
            <Tr
              key={rowIndex}
              _hover={{ backgroundColor: "gray.100" }}
              onClick={() => onRowClick?.(row)}
            >
              {data.columns.map((column, columnIndex) => (
                <Td key={columnIndex}>{row[column.key as keyof typeof row]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default GenerateTable;