
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("entryForm");
    const tbody = document.querySelector("#irasai tbody");
    const monthFilter = document.getElementById("filterMonth");

    function loadEntries() {
        tbody.innerHTML = "";
        const entries = JSON.parse(localStorage.getItem("irasai")) || [];
        entries.forEach((entry, index) => addRow(entry, index));
    }

    function addRow(entry, index) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry.menuo}</td>
            <td>${entry.komunaline}</td>
            <td>${entry.kiekis}</td>
            <td>${entry.suma}</td>
            <td>${entry.apmoketa ? "Taip" : "Ne"}</td>
            <td><button onclick="editEntry(${index})">Redaguoti</button> <button onclick="deleteEntry(${index})">Šalinti</button></td>
        `;
        tbody.appendChild(row);
    }

    function saveEntry(entry) {
        const entries = JSON.parse(localStorage.getItem("irasai")) || [];
        entries.push(entry);
        localStorage.setItem("irasai", JSON.stringify(entries));
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const entry = {
            menuo: document.getElementById("menuo").value,
            komunaline: document.getElementById("komunaline").value,
            kiekis: document.getElementById("kiekis").value,
            suma: document.getElementById("suma").value,
            apmoketa: document.getElementById("apmoketa").checked
        };
        saveEntry(entry);
        loadEntries();
        form.reset();
    });

    window.filterEntries = function () {
        const selectedMonth = monthFilter.value;
        const entries = JSON.parse(localStorage.getItem("irasai")) || [];
        tbody.innerHTML = "";
        entries.forEach((entry, index) => {
            if (!selectedMonth || entry.menuo === selectedMonth) {
                addRow(entry, index);
            }
        });
    };

    window.editEntry = function (index) {
        const entries = JSON.parse(localStorage.getItem("irasai")) || [];
        const entry = entries[index];
        document.getElementById("menuo").value = entry.menuo;
        document.getElementById("komunaline").value = entry.komunaline;
        document.getElementById("kiekis").value = entry.kiekis;
        document.getElementById("suma").value = entry.suma;
        document.getElementById("apmoketa").checked = entry.apmoketa;
        entries.splice(index, 1);
        localStorage.setItem("irasai", JSON.stringify(entries));
        loadEntries();
    };

    window.deleteEntry = function (index) {
        const entries = JSON.parse(localStorage.getItem("irasai")) || [];
        entries.splice(index, 1);
        localStorage.setItem("irasai", JSON.stringify(entries));
        loadEntries();
    };

    loadEntries();
});

    window.exportToPDF = function () {
        const entries = JSON.parse(localStorage.getItem("irasai")) || [];
        const doc = new jsPDF();
        doc.text("Sąskaitų registras", 10, 10);

        let y = 20;
        entries.forEach((entry, index) => {
            doc.text(`${index + 1}. ${entry.menuo} | ${entry.komunaline} | ${entry.kiekis} | ${entry.suma} € | ${entry.apmoketa ? "Apmokėta" : "Neapmokėta"}`, 10, y);
            y += 10;
        });

        doc.save("saskaitu_registras.pdf");
    };
