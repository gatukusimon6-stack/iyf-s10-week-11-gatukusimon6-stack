const store = require('../data/store');
const { ApiError } = require('../middleware/errorHandler');

const getAllPosts = (req, res) => {
    const { author, sort, search, page = 1, limit = 10 } = req.query;

    let result = [...store.posts];

    if (author) {
        result = result.filter(post =>
            post.author.toLowerCase().includes(author.toLowerCase())
        );
    }

    if (search) {
        result = result.filter(post =>
            post.title.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (sort === 'newest') {
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'popular') {
        result.sort((a, b) => b.likes - a.likes);
    }

    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedResult = result.slice(startIndex, endIndex);

    res.json({
        posts: paginatedResult,
        total: result.length,
        page: parseInt(page),
        limit: parseInt(limit)
    });
};

const getPostById = (req, res) => {
    const post = store.posts.find(p => p.id === parseInt(req.params.id));
    
    if (!post) {
        throw new ApiError('Post not found', 404);
    }
    
    res.json(post);
};

const createPost = (req, res) => {
    const { title, content, author } = req.body;

    const newPost = {
        id: store.nextId++,
        title,
        content,
        author,
        createdAt: new Date().toISOString(),
        likes: 0
    };

    store.posts.push(newPost);
    res.status(201).json(newPost);
};

const updatePost = (req, res) => {
    const id = parseInt(req.params.id);
    const postIndex = store.posts.findIndex(p => p.id === id);

    if (postIndex === -1) {
        throw new ApiError('Post not found', 404);
    }

    const { title, content } = req.body;

    store.posts[postIndex] = {
        ...store.posts[postIndex],
        title: title || store.posts[postIndex].title,
        content: content || store.posts[postIndex].content,
        updatedAt: new Date().toISOString()
    };

    res.json(store.posts[postIndex]);
};

const deletePost = (req, res) => {
    const id = parseInt(req.params.id);
    const postIndex = store.posts.findIndex(p => p.id === id);

    if (postIndex === -1) {
        throw new ApiError('Post not found', 404);
    }

    store.posts.splice(postIndex, 1);
    res.status(204).send();
};

const likePost = (req, res) => {
    const post = store.posts.find(p => p.id === parseInt(req.params.id));

    if (!post) {
        throw new ApiError('Post not found', 404);
    }

    post.likes++;
    res.json(post);
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    likePost
};