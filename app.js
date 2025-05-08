
let entries = JSON.parse(localStorage.getItem("bills")) || [];
const form = document.getElementById("billForm");
const tableBody = document.querySelector("#entriesTable tbody");
const monthFilter = document.getElementById("monthFilter");

function saveEntries() {
    localStorage.setItem("bills", JSON.stringify(entries));
}

function renderEntries() {
    tableBody.innerHTML = "";
    const filter = monthFilter.value;
    entries.forEach((entry, index) => {
        if (filter && !entry.date.startsWith(filter)) return;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.service}</td>
            <td>${entry.quantity}</td>
            <td>${entry.amount}</td>
            <td>${entry.paid ? "Taip" : "Ne"}</td>
            <td>
                <button onclick="editEntry(${index})">Redaguoti</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

form.onsubmit = (e) => {
    e.preventDefault();
    const newEntry = {
        date: document.getElementById("date").value,
        service: document.getElementById("service").value,
        quantity: document.getElementById("quantity").value,
        amount: document.getElementById("amount").value,
        paid: document.getElementById("paid").checked
    };
    if (form.dataset.editing !== undefined) {
        entries[form.dataset.editing] = newEntry;
        delete form.dataset.editing;
    } else {
        entries.push(newEntry);
    }
    saveEntries();
    renderEntries();
    form.reset();
};

function editEntry(index) {
    const entry = entries[index];
    document.getElementById("date").value = entry.date;
    document.getElementById("service").value = entry.service;
    document.getElementById("quantity").value = entry.quantity;
    document.getElementById("amount").value = entry.amount;
    document.getElementById("paid").checked = entry.paid;
    form.dataset.editing = index;
}

monthFilter.oninput = renderEntries;

document.getElementById("exportPdf").onclick = () => {
    const rows = [["Data", "Paslauga", "Kiekis", "Suma", "Apmokėta"]].concat(
        entries.map(e => [e.date, e.service, e.quantity, e.amount, e.paid ? "Taip" : "Ne"])
    );
    const doc = new window.jspdf.jsPDF();
    doc.autoTable({ head: [rows[0]], body: rows.slice(1) });
    doc.save("saskaitos.pdf");
};

renderEntries();
