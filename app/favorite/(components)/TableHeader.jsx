import { Table } from "@radix-ui/themes";

function TableHeader() {
  return (
    <Table.Header className="text-lg ">
      <Table.Row>
        <Table.ColumnHeaderCell>
          <p className="text-center">Your list</p>
        </Table.ColumnHeaderCell>
       
      </Table.Row>
    </Table.Header>
  );
}

export default TableHeader;
