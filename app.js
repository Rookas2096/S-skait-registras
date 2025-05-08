let entries = JSON.parse(localStorage.getItem('entries')) || [];
const form = document.getElementById('data-form');
const tableBody = document.querySelector('#data-table tbody');
const summary = document.getElementById('summary');
const searchInput = document.getElementById('search');
const chartCanvas = document.getElementById('summaryChart');
let chart;

form.addEventListener('submit', e => {
  e.preventDefault();
  const month = document.getElementById('month').value;
  const service = document.getElementById('service').value;
  const value = parseFloat(document.getElementById('value').value);
  const paid = document.getElementById('paid').checked;

  entries.push({ month, service, value, paid });
  localStorage.setItem('entries', JSON.stringify(entries));
  form.reset();
  renderTable();
  updateSummary();
});

function renderTable(filter = '') {
  tableBody.innerHTML = '';
  entries.filter(entry =>
    entry.service.toLowerCase().includes(filter.toLowerCase())
  ).forEach((entry, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.month}</td>
      <td>${entry.service}</td>
      <td>${entry.value.toFixed(2)}</td>
      <td><input type="checkbox" ${entry.paid ? 'checked' : ''} onchange="togglePaid(${index})" /></td>
      <td><button onclick="editEntry(${index})">Redaguoti</button></td>
    `;
    tableBody.appendChild(row);
  });
}

function editEntry(index) {
  const entry = entries[index];
  document.getElementById('month').value = entry.month;
  document.getElementById('service').value = entry.service;
  document.getElementById('value').value = entry.value;
  document.getElementById('paid').checked = entry.paid;
  entries.splice(index, 1);
  localStorage.setItem('entries', JSON.stringify(entries));
  renderTable(searchInput.value);
  updateSummary();
}

function togglePaid(index) {
  entries[index].paid = !entries[index].paid;
  localStorage.setItem('entries', JSON.stringify(entries));
  updateSummary();
}

function updateSummary() {
  const totals = {};
  entries.forEach(e => {
    const key = e.month;
    if (!totals[key]) totals[key] = 0;
    totals[key] += e.value;
  });

  summary.innerHTML = '<h3>Mėnesio suvestinė</h3>' +
    Object.entries(totals).map(([month, total]) =>
      `<p>${month}: ${total.toFixed(2)} €</p>`
    ).join('');

  if (chart) chart.destroy();
  chart = new Chart(chartCanvas, {
    type: 'bar',
    data: {
      labels: Object.keys(totals),
      datasets: [{
        label: 'Suma (€)',
        data: Object.values(totals),
        backgroundColor: '#007bff'
      }]
    }
  });
}

searchInput.addEventListener('input', () => {
  renderTable(searchInput.value);
});

window.addEventListener('load', () => {
  renderTable();
  updateSummary();
});