chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "STOCK_UPDATE") {
    console.log("background received cart update:", msg.payload);
  }
});
