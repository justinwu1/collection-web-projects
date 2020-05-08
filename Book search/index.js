createAutocomplete({
    root: document.querySelector('.autocomplete'),
    renderOption(book) {
        let imgSrc = typeof (book.volumeInfo.imageLinks) === "undefined" ? " " : book.volumeInfo.imageLinks.smallThumbnail;
        return `
        <img src = ${imgSrc} width = "50px" height = "50px" >
        ${book.volumeInfo.title} (${book.volumeInfo.authors})
        `
            ;
    },
    onOptionSelect(book) {
        onBookSelect(book);
    },
    inputValue(book) {
        return book.volumeInfo.title;
    },
    //Fetch the google book api
    async fetchData(searchTerm) {
        const responese = await axios.get('https://www.googleapis.com/books/v1/volumes?', {
            params: {
                key: 'AIzaSyB0r1cvJ4ulJNxnzfn92M1ue3BQVt8d--U',
                q: searchTerm
            }
        });
        if (responese.data.totalItems === 0) {
            return [];
        }
        return responese.data.items;
    }
});
    // Follow up request with an id
const onBookSelect = async book => {
    const url = 'https://www.googleapis.com/books/v1/volumes/'.concat(book.id);
    const responese = await axios.get(url, {
        params: {
            key: 'AIzaSyB0r1cvJ4ulJNxnzfn92M1ue3BQVt8d--U'

        }
    });
    console.log(responese.data);
    document.querySelector('#info').innerHTML = bookTemplate(responese.data);
    enable(document.querySelector('#pdf'));
    enable(document.querySelector('#epub'));
    enable(document.querySelector('#buy'));
    enable(document.querySelector('#preview'));
}
    // Check if there is links for buttons
const enable = (buttons) =>{
    if(buttons.getAttribute("href") !== "#"){
        buttons.removeAttribute("disabled");
    }
}

// Return a book template after the user clicked on it
const bookTemplate = bookDetail => {
    const volInfo = bookDetail.volumeInfo;
    let imgSrc = typeof (bookDetail.volumeInfo.imageLinks) === "undefined" ? "N/A" : bookDetail.volumeInfo.imageLinks.small;
    let buyLink = typeof(bookDetail.saleInfo.buyLink) === "undefined"?"#":bookDetail.saleInfo.buyLink;
    let downloadEpubLink = typeof(bookDetail.accessInfo.epub.acsTokenLink) === "undefined"?"#":bookDetail.accessInfo.epub.acsTokenLink;
    let downloadPdfLink = typeof(bookDetail.accessInfo.pdf.acsTokenLink) === "undefined"?"#":bookDetail.accessInfo.pdf.acsTokenLink;
    let previewLink = typeof(volInfo.previewLink) === "undefined"?"#":volInfo.previewLink;
    return `
    <article class = "media">
        <figure class = "media-left">
        <p class = "image">
            <img src = "${imgSrc}"/>
        </p>
        </figure>
        <div class = "media-content">
            <div class = "content">
                <h1>
                ${volInfo.title}
                <a class = "button is-danger is-outlined" id = 'buy' href = ${buyLink} title = "Disabled button" disabled  >Buy</a>
                <a class = "button is-info is-outlined" id = 'epub'  href = ${downloadEpubLink} title = "Disabled button" disabled>Download Epub</a>
                <a class = "button is-info is-outlined" id = 'pdf' href = ${downloadPdfLink} title = "Disabled button" disabled>Download Pdf</a>
                <a class = "button is-success is-outlined" id = 'preview' href = ${previewLink} title = "Disabled button" disabled>Preview</a>
                </h1>
                <h4>Authors: ${volInfo.authors}</h4>
                <p>${volInfo.description}</p>
            </div>
        </div>
        </article>
        <article class = "notification is-link">
            <p class = "title">${volInfo.categories}</p>
            <p class = "subtitle">Categories</p>
        </article>
        <article class = "notification is-link">
            <p class = "title">${volInfo.publisher}</p>
            <p class = "subtitle">Publisher</p>
        </article>
        <article class = "notification is-link">
            <p class = "title">${volInfo.publishedDate}</p>
            <p class = "subtitle">Published Dates</p>
        </article>
        <article class = "notification is-link">
            <p class = "title">${volInfo.pageCount}</p>
            <p class = "subtitle">page count</p>
        </article>
        <article class = "notification is-link">
            <p class = "title">${volInfo.averageRating}</p>
            <p class = "subtitle">The average Rating</p>
        </article>
        <article class = "notification is-link">
            <p class = "title">${volInfo.ratingsCount}</p>
            <p class = "subtitle">The number of ratings</p>
        </article>
        
    `;
};