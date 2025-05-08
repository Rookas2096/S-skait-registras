
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const tableBody = document.querySelector("#data-table tbody");

    let editIndex = null;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const entry = {};
        formData.forEach((value, key) => {
            entry[key] = key === "apmoketa" ? form.elements[key].checked : value;
        });

        if (editIndex !== null) {
            updateRow(editIndex, entry);
            editIndex = null;
        } else {
            addRow(entry);
        }

        form.reset();
    });

    function addRow(data) {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${data.menuo}</td>
            <td>${data.elektra} (${data.elektra_suma})</td>
            <td>${data.karstas} (${data.karstas_suma})</td>
            <td>${data.saltas} (${data.saltas_suma})</td>
            <td>${data.siluma} (${data.siluma_suma})</td>
            <td>${data.dujos} (${data.dujos_suma})</td>
            <td>${data.administravimas}</td>
            <td>${data.siuksles}</td>
            <td>${calculateTotal(data)}</td>
            <td>${data.apmoketa ? "Taip" : "Ne"}</td>
            <td>
                <button onclick="editRow(this)">Redaguoti</button>
                <button onclick="deleteRow(this)">Ištrinti</button>
            </td>
        `;
    }

    window.editRow = function (button) {
        const row = button.closest("tr");
        const cells = row.children;
        form.menuo.value = cells[0].innerText;
        form.elektra.value = cells[1].innerText.split(" ")[0];
        form.elektra_suma.value = cells[1].innerText.split(" ")[1].slice(1, -1);
        form.karstas.value = cells[2].innerText.split(" ")[0];
        form.karstas_suma.value = cells[2].innerText.split(" ")[1].slice(1, -1);
        form.saltas.value = cells[3].innerText.split(" ")[0];
        form.saltas_suma.value = cells[3].innerText.split(" ")[1].slice(1, -1);
        form.siluma.value = cells[4].innerText.split(" ")[0];
        form.siluma_suma.value = cells[4].innerText.split(" ")[1].slice(1, -1);
        form.dujos.value = cells[5].innerText.split(" ")[0];
        form.dujos_suma.value = cells[5].innerText.split(" ")[1].slice(1, -1);
        form.administravimas.value = cells[6].innerText;
        form.siuksles.value = cells[7].innerText;
        form.apmoketa.checked = cells[9].innerText === "Taip";
        editIndex = row.rowIndex - 1;
    };

    window.deleteRow = function (button) {
        const row = button.closest("tr");
        tableBody.deleteRow(row.rowIndex - 1);
    };

    function updateRow(index, data) {
        const row = tableBody.rows[index];
        row.cells[0].innerText = data.menuo;
        row.cells[1].innerText = `${data.elektra} (${data.elektra_suma})`;
        row.cells[2].innerText = `${data.karstas} (${data.karstas_suma})`;
        row.cells[3].innerText = `${data.saltas} (${data.saltas_suma})`;
        row.cells[4].innerText = `${data.siluma} (${data.siluma_suma})`;
        row.cells[5].innerText = `${data.dujos} (${data.dujos_suma})`;
        row.cells[6].innerText = data.administravimas;
        row.cells[7].innerText = data.siuksles;
        row.cells[8].innerText = calculateTotal(data);
        row.cells[9].innerText = data.apmoketa ? "Taip" : "Ne";
    }

    function calculateTotal(data) {
        const sumFields = ["elektra_suma", "karstas_suma", "saltas_suma", "siluma_suma", "dujos_suma", "administravimas", "siuksles"];
        return sumFields.reduce((acc, key) => acc + (parseFloat(data[key]) || 0), 0).toFixed(2);
    }
});
