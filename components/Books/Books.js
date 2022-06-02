class Books {
    constructor() {
        this.classNameActive = 'books-element__btn_active';
        this.labelAdd = 'Добавить в Хочу прочитать}';
        this.labelRemove = 'Удалить из Хочу прочитать';
    }

    handleSetLocationStorage(element, id) {
        const { pushBook, books } = localStorageUtil.putBooks(id);
        
        if (pushBook) {
            element.classList.add(this.classNameActive);
            element.innerHTML = this.labelRemove;
        } else {
            element.classList.remove(this.classNameActive);
            element.innerHTML = this.labelAdd;
        }
    }

    render() {
        const booksStore = localStorageUtil.getBooks();
        let htmlCatalog = '';

        CATALOG.forEach(({ id, name, price, img }) => {
            let activeClass = '';
            let activeText = '';

            if (booksStore.indexOf(id) === -1) {
                activeText = this.labelAdd;
            } else {
                activeClass = ' '+this.classNameActive;
                activeText = this.labelRemove;
            }

            htmlCatalog += `
                <li class="books-element">
                    <span class="books-element__name">${name}</span>
                    <img class="books-element__img" src="${img}" />
                    <span class="books-element__price">
                         ${price.toLocaleString()} ₽
                    </span>
                    <button class="books-element__btn${activeClass}" onclick="booksPage.handleSetLocationStorage(this, '${id}');">
                        ${activeText}
                    </button>
                </li>
            `;
        });

        const html = `
            <ul class="books-container">
                ${htmlCatalog}
            </ul>
        `;

        ROOT_BOOKS.innerHTML = html;
    }
}

const booksPage = new Books();
booksPage.render();