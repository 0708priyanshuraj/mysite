export default function decorate(block) {
  const items = [...block.children];

  items.forEach((row, index) => {
    const label = row.children[0];
    const body = row.children[1];

    // Create summary
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);

    // Style body
    body.className = 'accordion-item-body';

    // Create details
    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.append(summary, body);

    // Replace row
    row.replaceWith(details);

    // Open first item by default
    if (index === 0) {
      details.setAttribute('open', '');
    }

    // Close others when one opens
    details.addEventListener('toggle', () => {
      if (details.open) {
        block.querySelectorAll('.accordion-item').forEach((otherDetails) => {
          if (otherDetails !== details) {
            otherDetails.removeAttribute('open');
          }
        });
      }
    });
  });
}
