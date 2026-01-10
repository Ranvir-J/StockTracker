console.log("✅ content.js loaded");

function extractCartItems() {
    const tables = document.querySelectorAll(".orderitemsummarytable");
    if (!tables.length) {
    console.log("cart table not found yet");
    return;
    }
    
    const items = [];

    tables.forEach(table => {
        console.log("table found:", table);

        table.querySelectorAll("tbody tr").forEach(row => {
            const cells = row.querySelectorAll("td")

            const partNumber = cells[1]?.innerText.trim()
            const quantity = parseInt(
                row.querySelector(".centered")?.innerText.trim()
            );
            if (partNumber && !isNaN(quantity)) {
                items.push({ partNumber, quantity });
            }
        });
        console.log("items found:", items)
    });

    chrome.runtime.sendMessage({
        type: "CART_UPDATE",
        payload: items
    });
}

// extractCartItems();

const observer = new MutationObserver(() => {
  extractCartItems();
});

const container = document.querySelector("#container") || document.body;

observer.observe(container, {
  childList: true,
  subtree: true
});
