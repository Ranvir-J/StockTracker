console.log("content.js loaded");

let lastItems = "";

setInterval(() => {
    console.log("yo");

  const tables = document.querySelectorAll(".orderitemsummarytable");
  if (!tables.length) return;
  console.log(tables);

  const items = [];

  tables.forEach(table => {
    table.querySelectorAll("tbody tr").forEach(row => {
      const cells = row.querySelectorAll("td");
      const partNumber = cells[1]?.innerText.trim();
      const quantity = parseInt(row.querySelector(".centered")?.innerText, 10);

      if (partNumber && !isNaN(quantity)) {
        items.push({ partNumber, quantity });
      }
    });
  });
  console.log(items);

  const serialized = JSON.stringify(items);
  if (serialized !== lastItems) {
    lastItems = serialized;
    chrome.runtime.sendMessage({
      type: "STOCK_UPDATE",
      payload: items
    });
  }
}, 1000);
