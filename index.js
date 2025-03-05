function renderBlocks(children) {
    let elements = new Array();
    children.foreach((child) => {
        switch (child.type) {
            case "heading":
                elements.push(renderHeading(child));
                break;
            case "paragraph":
                elements.push(renderParagraph(child));
                break;
            case "text":
                elements.push(renderText(child));
                break;
            case "link":
                elements.push(renderLink(child));
                break;
            case "list":
                elements.push(renderList(child));
                break;
            case "code":
                elements.push(renderCodeBlock(child));
                break;
        }
    });
    elements.join("\n");
    return elements;
}

export {renderBlocks};