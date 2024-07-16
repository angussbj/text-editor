document.addEventListener("DOMContentLoaded", setup);

let currentPage;
let cursor;
let cursorIndex = -1;
let maxIndex = 0;

function setup() {
    document.addEventListener("keypress", handleKeypress);
    document.addEventListener("keydown", handleKeydown);
    currentPage = document.getElementsByClassName("page").item(0);
    cursor = document.getElementById("cursor");
    updateCursor();
    window.addEventListener("resize", updateCursor)
}

function handleKeypress(e) {
    if (e.ctrlKey || e.metaKey) return;

    console.log(e);
    e.preventDefault();
    const characterElement = document.createElement("pre");
    characterElement.innerText = e.key;
    characterElement.classList.add("char");
    characterElement.onclick = handleCharacterClick;
    const insertionPoint = currentPage.children.item(cursorIndex + 1);
    currentPage.insertBefore(characterElement, insertionPoint);
    cursorIndex += 1;
    maxIndex += 1;
    updateCursor();
}

function handleKeydown(e) {
    console.log(e);
    switch (e.key) {
        case "ArrowLeft":
            if (cursorIndex > 0) {
                cursorIndex -= 1;
                updateCursor();
            }
            break;
        case "ArrowRight":
            if (cursorIndex < maxIndex) {
                cursorIndex += 1;
                updateCursor();
            }
            break;
        case "Backspace":
            cursorIndex -= 1;
            maxIndex -= 1;
            currentPage.getElementsByTagName("*").item(cursorIndex + 1).remove();
            updateCursor();
    }
}

function updateCursor() {
    if (cursorIndex < 0) {
        console.log(currentPage.style)
        cursor.style.top = currentPage.offsetTop + 80;
        cursor.style.left = currentPage.offsetLeft + 80;
        return;
    }
    const priorCharacter = currentPage.getElementsByTagName("*").item(cursorIndex);
    cursor.style.top = priorCharacter.offsetTop;
    cursor.style.left = priorCharacter.offsetLeft + priorCharacter.offsetWidth;
}

function handleCharacterClick(e) {
    const rounding = e.offsetX > e.target.offsetWidth / 2 ? 0 : -1;
    cursorIndex = indexInParent(e.target) + rounding;
    updateCursor();
}

function indexInParent(node) {
    return Array.prototype.indexOf.call(node.parentNode.children, node);
}