const nodes = document.querySelectorAll('.node');
const canvas = document.getElementById('canvas');

nodes.forEach(node => {
    node.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', node.id);
    });
});

canvas.addEventListener('dragover', (e) => {
    e.preventDefault();
});

canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    const nodeId = e.dataTransfer.getData('text/plain');
    const nodeElement = document.getElementById(nodeId);

    const clonedNode = nodeElement.cloneNode(true);
    const xPos = e.clientX - canvas.offsetLeft;
    const yPos = e.clientY - canvas.offsetTop;

    clonedNode.style.position = 'absolute';
    clonedNode.style.left = `${xPos}px`;
    clonedNode.style.top = `${yPos}px`;

    canvas.appendChild(clonedNode)
});