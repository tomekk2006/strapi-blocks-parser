class Block {
    static heading(block) {
        const childrenElements = parseBlocks(block.children);
        const htmlString = `<h${block.level}>${childrenElements}</h${block.level}>`;
        return htmlString; // example output: <h1>Hello world!</h1>
    }
    static paragraph(block) {
        const childrenElements = parseBlocks(block.children);
        const htmlString = `<p>${childrenElements}</p>`;
        return htmlString; // example output: <p>Hello world!</p>
    }
    static text(block) {
        let text = encodeHtml(block.text)
        if (block.bold) text = "<b>"+text+"</b>";
        if (block.underline) text = "<u>"+text+"</u>";
        if (block.strikethrough) text = "<s>"+text+"</s>";
        if (block.italic) text = "<i>"+text+"</i>";
        if (block.code) text = "<code>"+text+"</code>";
        return text;
    }
    static link(block) {
        const childrenElements = parseBlocks(block.children);
        const htmlString = `<a href="${block.url}">${childrenElements}</a>`;
        return htmlString; // example output: <a href="/page">Hello world!</a>
    }
    static list(block) {
        const listItems = new Array();
        block.children.forEach((item) => {
            if (item.type === "list-item") {
                listItems.push("<li>"+parseBlocks(item.children)+"</li>");
            }
        });
        const htmlString = listItems.join("");
        if (block.format === "ordered") return "<ol>"+htmlString+"</ol>";
        if (block.format === "unordered") return "<ul>"+htmlString+"</ul>";
    }
    static codeBlock(block) {
        const childrenElements = parseBlocks(block.children);
        const htmlString = `<pre><code>${childrenElements}</code></pre>`;
        return htmlString; // example output: <pre><code>Hello world!</code></pre>
    }
    static image(block) {
        const htmlString = `<img src="${block.image.url}" alt="${block.image.alternativeText}">`;
        return htmlString; // example output: <img src="image.png" alt="alternative text">Hello world!</img>
    }
    static quote(block) {
        const childrenElements = parseBlocks(block.children);
        const htmlString = `<blockquote>${childrenElements}</blockquote>`;
        return htmlString; 
    }
}

function parseBlocks(blocks) {
    let htmlElements = new Array();
    blocks.forEach((block) => {
        switch (block.type) {
            case "heading":
                htmlElements.push(Block.heading(block));
                break;
            case "paragraph":
                htmlElements.push(Block.paragraph(block));
                break;
            case "text":
                htmlElements.push(Block.text(block));
                break;
            case "link":
                htmlElements.push(Block.link(block));
                break;
            case "list":
                htmlElements.push(Block.list(block));
                break;
            case "code":
                htmlElements.push(Block.codeBlock(block));
                break;
            case "image":
                htmlElements.push(Block.image(block));
                break;
            case "quote":
                htmlElements.push(Block.quote(block));
                break;
        }
    });
    const htmlString = htmlElements.join("\n");
    return htmlString;
}

function encodeHtml(string) {
    // https://www.w3schools.com/html/html_entities.asp
    const entities = {
        "<" :"&lt;",
        ">" :"&gt;",
        "&" :"&amp;",
    }
    let encodedString = "";
    // loop through each character
    for (let i = 0; i < string.length; i++) {
        // if character is found in the entities
        if (string[i] in entities) {
            // append entity to encoded string
            encodedString += entities[string[i]];
        }
        else {
            // otherwise append the character to the encoded string
            encodedString += string[i];
        }
    }
    return encodedString;
}

module.exports = {renderBlocks: parseBlocks, encodeHtml};