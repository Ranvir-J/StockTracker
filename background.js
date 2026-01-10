chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "CART_UPDATE") {
    console.log("📩 received cart update:", msg.payload);
  }
});
