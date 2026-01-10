chrome.storage.local.get("cart", (data) => {
  const ul = document.getElementById("cart");
  (data.cart || []).forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} x${item.quantity}`;
    ul.appendChild(li);
  });
});
