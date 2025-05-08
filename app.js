document.getElementById("serviceForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const month = document.getElementById("month").value;
    const service = document.getElementById("service").value;
    const amount = document.getElementById("amount").value;
    const cost = document.getElementById("cost").value;
    const paid = document.getElementById("paid").checked;
    const entry = { month, service, amount, cost, paid };
    let data = JSON.parse(localStorage.getItem("services") || "[]");
    data.push(entry);
    localStorage.setItem("services", JSON.stringify(data));
    renderTable();
    this.reset();
});

function renderTable() {
    const tbody = document.querySelector("#dataTable tbody");
    tbody.innerHTML = "";
    const data = JSON.parse(localStorage.getItem("services") || "[]");
    data.forEach((entry, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry.month}</td>
            <td>${entry.service}</td>
            <td>${entry.amount}</td>
            <td>${entry.cost}</td>
            <td>${entry.paid ? "Taip" : "Ne"}</td>
            <td><button onclick="editEntry(${index})">Redaguoti</button></td>
        `;
        tbody.appendChild(row);
    });
}

function editEntry(index) {
    const data = JSON.parse(localStorage.getItem("services") || "[]");
    const entry = data[index];
    document.getElementById("month").value = entry.month;
    document.getElementById("service").value = entry.service;
    document.getElementById("amount").value = entry.amount;
    document.getElementById("cost").value = entry.cost;
    document.getElementById("paid").checked = entry.paid;
    data.splice(index, 1);
    localStorage.setItem("services", JSON.stringify(data));
    renderTable();
}

renderTable();
