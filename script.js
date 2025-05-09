document.getElementById('invoiceForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const date = document.getElementById('date').value;
    const elektra_kwh = +document.getElementById('elektra_kwh').value || 0;
    const elektra_suma = +document.getElementById('elektra_suma').value || 0;
    const sildymas = +document.getElementById('sildymas').value || 0;
    const kvanduo_m3 = +document.getElementById('kvanduo_m3').value || 0;
    const kvanduo_suma = +document.getElementById('kvanduo_suma').value || 0;
    const svanduo_m3 = +document.getElementById('svanduo_m3').value || 0;
    const svanduo_suma = +document.getElementById('svanduo_suma').value || 0;
    const dujos_m3 = +document.getElementById('dujos_m3').value || 0;
    const dujos_suma = +document.getElementById('dujos_suma').value || 0;
    const adminas = +document.getElementById('adminas').value || 0;
    const siuksles = +document.getElementById('siuksles').value || 0;
    const apmoketa = document.getElementById('apmoketa').checked ? 'Taip' : 'Ne';

    const suma = elektra_suma + sildymas + kvanduo_suma + svanduo_suma + dujos_suma + adminas + siuksles;
    const row = `<tr>
        <td>${date}</td>
        <td>${elektra_kwh} kWh<br>${elektra_suma.toFixed(2)} €</td>
        <td>${sildymas.toFixed(2)} €</td>
        <td>${kvanduo_m3} m³<br>${kvanduo_suma.toFixed(2)} €</td>
        <td>${svanduo_m3} m³<br>${svanduo_suma.toFixed(2)} €</td>
        <td>${dujos_m3} m³<br>${dujos_suma.toFixed(2)} €</td>
        <td>${adminas.toFixed(2)} €</td>
        <td>${siuksles.toFixed(2)} €</td>
        <td>${suma.toFixed(2)} €</td>
        <td>${apmoketa}</td>
    </tr>`;
    document.querySelector('#dataTable tbody').insertAdjacentHTML('beforeend', row);
    this.reset();
});
