console.log("✅ content.js loaded");

function extractCartItems() {

  document.querySelectorAll(".orderitemsummarytable").forEach(table => {
    if (!tables.length) {
    console.log("cart table not found yet");
    return;
    }

    console.log(table);
    const items = [];


    table.querySelectorAll("tbody tr").forEach(row => {
        const cells = row.querySelectorAll("td")

        const partNumber = cells[1]?.innerText.trim()
        const quantity = parseInt(
            row.querySelector(".centered")?.innerText.trim()
        );

        items.push({partNumber, quantity});
    });
    console.log(items)
  });

  chrome.runtime.sendMessage({
    type: "CART_UPDATE",
    payload: items
  });
}

extractCartItems();

const observer = new MutationObserver(() => {
  extractCartItems();
});

observer.observe(document.querySelector("#container"), {
  childList: true,
  subtree: true
});
