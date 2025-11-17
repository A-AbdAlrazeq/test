import Post from "../models/post.model.js";

export const getPosts = async (req, res) => {
  try {
   /*  const posts = await Post.find({
    $or: [
      { is_deleted: false },
      { is_deleted: { $exists: false } }
    ]
  })
    res.json(posts);
  } */
 let page =1;
 if (req.query.page) {
  page = req.query.page;
 }
 let limit=0
  if (req.query.limit) {
  limit = req.query.limit;
 }
 let skip =(page-1)*limit;
  const posts = await Post.find().sort({
    createdAt: -1
  }).or([
    { is_deleted: false },
    { is_deleted: { $exists: false } }
  ]).limit(limit).skip(skip);
    res.json(posts);
}
   catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.is_deleted = true;
    post.deleted_at = new Date();
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { getPosts, createPost, getPostById,updatePost,deletePost };
