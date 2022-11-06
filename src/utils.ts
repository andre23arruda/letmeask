const mainTitle = 'Title'

function title(document: Document, pageTitle: string) {
    document.title = `${ mainTitle } | ${ pageTitle }`
}

export { title }
