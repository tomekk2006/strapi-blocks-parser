class Render {
    static heading(block) {
        const childrenElements = renderBlocks(block.children);
        const htmlString = `<h${block.level}>${childrenElements}</h${block.level}>`;
        return htmlString; // example output: <h1>Hello world!</h1>
    }
    static paragraph(block) {
        const childrenElements = renderBlocks(block.children);
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
        const childrenElements = renderBlocks(block.children);
        const htmlString = `<a href="${block.url}">${childrenElements}</a>`;
        return htmlString; // example output: <a href="/page">Hello world!</a>
    }
    static list(block) {
        const listItems = new Array();
        block.children.forEach((item) => {
            if (item.type === "list-item") {
                listItems.push("<li>"+renderBlocks(item.children)+"</li>");
            }
        });
        const htmlString = listItems.join("");
        if (block.format === "ordered") return "<ol>"+htmlString+"</ol>";
        if (block.format === "unordered") return "<ul>"+htmlString+"</ul>";
    }
    static codeBlock(block) {
        const childrenElements = renderBlocks(block.children);
        const htmlString = `<pre><code>${childrenElements}</code></pre>`;
        return htmlString; // example output: <pre><code>Hello world!</code></pre>
    }
    static image(block) {
        const htmlString = `<img src="${block.image.url}" alt="${block.image.alternativeText}">`;
        return htmlString; // example output: <img src="image.png" alt="alternative text">Hello world!</img>
    }
    static quote(block) {
        const childrenElements = renderBlocks(block.children);
        const htmlString = `<blockquote>${childrenElements}</blockquote>`;
        return htmlString; 
    }
}

function renderBlocks(blocks) {
    let htmlElements = new Array();
    blocks.forEach((block) => {
        switch (block.type) {
            case "heading":
                htmlElements.push(Render.heading(block));
                break;
            case "paragraph":
                htmlElements.push(Render.paragraph(block));
                break;
            case "text":
                htmlElements.push(Render.text(block));
                break;
            case "link":
                htmlElements.push(Render.link(block));
                break;
            case "list":
                htmlElements.push(Render.list(block));
                break;
            case "code":
                htmlElements.push(Render.codeBlock(block));
                break;
            case "image":
                htmlElements.push(Render.image(block));
                break;
            case "quote":
                htmlElements.push(Render.quote(block));
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

module.exports = {renderBlocks, encodeHtml};