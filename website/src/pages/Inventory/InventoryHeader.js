function InventoryHeader({ search, setSearch, onAdd }) {
  return (
    <div className="inventory-header">
      <h3>Inventory</h3>

      <input
        className="inventory-search"
        placeholder="Search inventory..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <button className="add-part-btn" onClick={onAdd}>
        Add Part
      </button>
    </div>
  );
}

export default InventoryHeader;
