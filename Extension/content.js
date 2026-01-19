console.log("content.js loaded");

let lastItems = "";

setInterval(() => {
    console.log("yo");

  const tables = document.querySelectorAll("#storecheckouttable");
  if (!tables.length) return;
  console.log(tables);

  const items = [];

  tables.forEach(table => {
    table.querySelectorAll("tbody tr").forEach(row => {
      var partNumber = "";
      const cells = row.querySelectorAll("td");
      const partNumberData = cells[2].querySelector(".cartpartnumber a")
      if (partNumberData) {
        partNumber = partNumberData.innerHTML;
      }else{
        return;
      }
      const quantityData = cells[4].querySelector(".centered input");
      const quantity = quantityData.value;
      console.log("quantity", quantity, "part number", partNumber);

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
