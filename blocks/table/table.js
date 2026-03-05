function renderTable(sheet) {
  const wrapper = document.createElement('div');
  wrapper.className = 'table-wrapper';

  const table = document.createElement('table');

  const columns = Object.keys(sheet.data[0] || {});
  // HEADER
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  columns.forEach((col) => {
    const th = document.createElement('th');
    th.textContent = col;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);
  // BODY
  const tbody = document.createElement('tbody');
  sheet.data.forEach((row) => {
    const tr = document.createElement('tr');
    columns.forEach((col) => {
      const td = document.createElement('td');
      td.textContent = row[col];
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  wrapper.appendChild(table);
  return wrapper;
}
function renderSelectedSheet(json, sheetName, container) {
  container.innerHTML = '';
  const sheet = json[sheetName];
  container.appendChild(renderTable(sheet));
}
export default async function decorate(block) {
  const link = block.querySelector('a');
  if (!link) return;
  const response = await fetch(link.href);
  const json = await response.json();
  block.innerHTML = '';
  if (json[':type'] !== 'multi-sheet') {
    block.appendChild(renderTable(json));
    return;
  }
  // Dropdown
  const select = document.createElement('select');
  select.className = 'sheet-dropdown';

  json[':names'].forEach((name) => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name.toUpperCase();
    select.appendChild(option);
  });

  block.appendChild(select);

  const tableContainer = document.createElement('div');
  tableContainer.className = 'table-container';
  block.appendChild(tableContainer);

  // default sheet
  renderSelectedSheet(json, json[':names'][0], tableContainer);
  select.addEventListener('change', (e) => {
    renderSelectedSheet(json, e.target.value, tableContainer);
  });
}