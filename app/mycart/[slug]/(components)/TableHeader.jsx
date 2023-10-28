import { Table } from "@radix-ui/themes";

function TableHeader() {
  return (
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeaderCell>
          <p className="text-center">Product</p>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>
          <p className="text-center">Price</p>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>
          <p className="text-center">Quantity</p>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>
          <p className="text-center">Total</p>
        </Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
  );
}

export default TableHeader;
