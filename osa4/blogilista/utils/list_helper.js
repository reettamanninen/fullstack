const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((
        sum, blog) =>
        sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    return blogs.reduce((favorite, current) => {
        if (current.likes > favorite.likes) {
            return current
        }
        return favorite
    }
    )
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const montako = blogs.reduce((lisaa, blog) => {
        const author = blog.author
        lisaa[author] = (lisaa[author] || 0) + 1 
        return lisaa
    }, {})

    let ennatysbloggaaja = null
    let most = 0

    for (const author in montako) {
        if (montako[author] > most){
            most = montako[author]
            ennatysbloggaaja = author
        }
    }
    return {
        author: ennatysbloggaaja,
        blogs: most
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const yhteensa = blogs.reduce((lisaa, blog) => {
        const author = blog.author
        lisaa[author] = (lisaa[author] || 0) + blog.likes 
        return lisaa
    }, {})

    let tykatyinAuthor = null
    let mostTykatty = 0

    for (const author in yhteensa) {
        if (yhteensa[author] > mostTykatty){
            mostTykatty = yhteensa[author]
            tykatyinAuthor = author
        }
    }
    return {
        author: tykatyinAuthor,
        likes: mostTykatty
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
