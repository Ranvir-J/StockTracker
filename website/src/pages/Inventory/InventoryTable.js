import InventoryRow from "./InventoryRow";

function InventoryTable({
  items,
  sortConfig,
  onSort,
  onUpdateQuantity,
  onRequestDelete
}) {
  const arrow = key =>
    sortConfig?.key === key
      ? sortConfig.direction === "asc" ? " ▲" : " ▼"
      : "";

  return (
    <table className="inventory-table">
      <thead>
        <tr>
          <th onClick={() => onSort("partNumber")}>Part Number{arrow("partNumber")}</th>
          <th onClick={() => onSort("manufacturer")}>Manufacturer{arrow("manufacturer")}</th>
          <th onClick={() => onSort("vehicle")}>Vehicle{arrow("vehicle")}</th>
          <th onClick={() => onSort("price")}>Price{arrow("price")}</th>
          <th onClick={() => onSort("quantity")}>Quantity{arrow("quantity")}</th>
          <th />
        </tr>
      </thead>

      <tbody>
        {items.map((item, index) => (
          <InventoryRow
            key={item.partNumber}
            item={item}
            index={index}
            onUpdateQuantity={onUpdateQuantity}
            onDelete={() => onRequestDelete(index)}
          />
        ))}
      </tbody>
    </table>
  );
}

export default InventoryTable;
