chrome.runtime.sendMessage(
  { type: "GET_STOCK_DATA" },
  (data) => {
    if (data) {
      extractData(data);
    }
  }
);

function extractData(data) {
    const table = document.querySelector("tbody");

    table.textContent = "";

    data.forEach(item => {
        const row = document.createElement("tr");

        const partNum = document.createElement("td");
        partNum.className = "data temporary";
        partNum.textContent = item.partNumber;

        const quantity = document.createElement("td");
        quantity.className = "data temporary";
        quantity.textContent = item.quantity;

        row.append(partNum, quantity);
        table.append(row);
    });
}

document.getElementById("view-stock-btn").addEventListener("click", () => {
    chrome.tabs.create({
      url: "https://google.com"
    });
  });
