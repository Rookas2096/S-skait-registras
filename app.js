
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('billForm');
    const chartCanvas = document.getElementById('chart');
    const tbody = document.querySelector('#entries tbody');
    const totalEl = document.getElementById('monthTotal');

    let entries = JSON.parse(localStorage.getItem('bills') || '[]');

    const update = () => {
        tbody.innerHTML = '';
        let total = 0;
        entries.forEach((entry, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${entry.month}</td>
                <td>${entry.service}</td>
                <td>${entry.amount.toFixed(2)}</td>
                <td>${entry.paid ? '✔️' : ''}</td>
                <td><button onclick="editEntry(${i})">Redaguoti</button></td>`;
            tbody.appendChild(tr);
            total += entry.amount;
        });
        totalEl.textContent = `2025 m. gegužė: ${total.toFixed(2)} €`;
        drawChart(entries);
    };

    const drawChart = (data) => {
        const ctx = chartCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(e => e.service),
                datasets: [{
                    label: 'Suma (€)',
                    data: data.map(e => e.amount),
                    backgroundColor: '#007bff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true },
                    title: { display: false }
                }
            }
        });
    };

    form.onsubmit = e => {
        e.preventDefault();
        entries.push({
            month: '2025-05',
            service: document.getElementById('service').value,
            amount: parseFloat(document.getElementById('amount').value),
            paid: document.getElementById('paid').checked
        });
        localStorage.setItem('bills', JSON.stringify(entries));
        form.reset();
        update();
    };

    update();
});

function editEntry(index) {
    alert("Redagavimas dar neįgyvendintas.");
}
