const nodes = document.querySelectorAll('.node');
const canvas = document.getElementById('canvas');

nodes.forEach(node => {
    node.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', node.id);  // Store the node id in the dataTransfer object
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

    canvas.appendChild(clonedNode);

    makeNodeMovable(clonedNode);
});

function makeNodeMovable(node) {
    let isDragging = false;
    let offsetX, offsetY;

    node.addEventListener('mousedown', (e) => {
        isDragging = true;

        offsetX = e.clientX - node.offsetLeft;
        offsetY = e.clientY - node.offsetTop;

        node.style.cursor = 'move';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const xPos = e.clientX - offsetX;
            const yPos = e.clientY - offsetY;

            node.style.left = `${xPos}px`;
            node.style.top = `${yPos}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        node.style.cursor = 'grab';
    });
}
