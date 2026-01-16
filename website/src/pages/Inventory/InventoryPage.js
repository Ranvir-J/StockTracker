import { useState } from "react";
import InventoryHeader from "./InventoryHeader";
import InventoryTable from "./InventoryTable";
import AddPart from "./AddPart";
import ConfirmDelete from "./ConfirmDelete";
import "./Inventory.css";

function InventoryPage() {
  const [items, setItems] = useState([
    { partNumber: "2CAM0352", manufacturer: "Bosch", vehicle: "Honda Civic", price: 110.08, quantity: 71 },
    { partNumber: "2CRK0306", manufacturer: "Denso", vehicle: "Toyota Corolla", price: 46.05, quantity: 54 }
  ]);

  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const updateQuantity = (index, delta) => {
    setItems(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      )
    );
  };

  const confirmDelete = () => {
    setItems(prev => prev.filter((_, i) => i !== itemToDelete));
    setItemToDelete(null);
  };

  const handleSort = key => {
    setSortConfig(prev => {
      if (!prev || prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      return null;
    });
  };

  const sortedItems = [...items].sort((a, b) => {
    if (!sortConfig) return 0;
    const order = sortConfig.direction === "asc" ? 1 : -1;
    return typeof a[sortConfig.key] === "number"
      ? (a[sortConfig.key] - b[sortConfig.key]) * order
      : a[sortConfig.key].localeCompare(b[sortConfig.key]) * order;
  });

  const filteredItems = sortedItems.filter(item =>
    Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="inventory-page">
      <InventoryHeader
        search={search}
        setSearch={setSearch}
        onAdd={() => setShowAdd(true)}
      />

      <InventoryTable
        items={filteredItems}
        sortConfig={sortConfig}
        onSort={handleSort}
        onUpdateQuantity={updateQuantity}
        onRequestDelete={setItemToDelete}
      />

      {showAdd && (
        <AddPart
          onClose={() => setShowAdd(false)}
          onAdd={part => setItems(prev => [...prev, part])}
        />
      )}

      {itemToDelete !== null && (
        <ConfirmDelete
          onCancel={() => setItemToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

export default InventoryPage;
