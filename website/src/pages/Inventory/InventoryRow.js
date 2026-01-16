function InventoryRow({ item, index, onUpdateQuantity, onDelete }) {
  return (
    <tr>
      <td>{item.partNumber}</td>
      <td>{item.manufacturer}</td>
      <td>{item.vehicle}</td>
      <td>${item.price.toFixed(2)}</td>

      <td className="quantity-cell">
        <button onClick={() => onUpdateQuantity(index, -1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(index, 1)}>+</button>
      </td>

      <td className="delete-cell">
        <button className="delete-btn" onClick={onDelete}>✕</button>
      </td>
    </tr>
  );
}

export default InventoryRow;
