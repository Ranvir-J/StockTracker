chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "STOCK_UPDATE") {
    console.log("background received cart update:", msg.payload);
    const jsonPayload = JSON.stringify(msg.payload);
    console.log(jsonPayload);
  }
});

let latestStockData = null;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "STOCK_UPDATE") {
    latestStockData = msg.payload;
  }

  if (msg.type === "GET_STOCK_DATA") {
    sendResponse(latestStockData);
  }
});

