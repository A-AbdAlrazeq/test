import { postService } from "../services/factory.js";
import PostDto from "../dto/post.dto.js";
import { logger } from "../middleware/Logging.js";

export const getPosts = async (req, res) => {
  try {
    logger.info('Getting all posts', { query: req.query });
    
 let page = 1;
 if (req.query.page) {
  page = Number(req.query.page);
 }
 let limit = 0
  if (req.query.limit) {
  limit = Number(req.query.limit);
 }
 let skip = 0;
 if (limit) {
  skip = (page - 1) * limit;
 }
 const posts = await postService.findAll({
  filter: { is_deleted: false },
  sort: { createdAt: -1 },
  limit,
  skip
 });
    const dtoPosts = PostDto.fromModels(posts);
    logger.info('Posts retrieved successfully', { count: dtoPosts.length });
    res.json(dtoPosts);
}
   catch (err) {
    logger.error('Error getting posts', { error: err.message });
    res.status(500).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    logger.info('Creating new post', { body: req.body });
    
    // validate payload against PostDto schema for creation
    const createSchema = PostDto.schema.pick({ title: true, content: true, authorId: true });
    const parsed = createSchema.parse(req.body);
    const post = await postService.create({
      title: parsed.title,
      content: parsed.content,
      author: parsed.authorId,
    });
    const dto = PostDto.fromModel(post);
    logger.info('Post created successfully', { postId: post.id });
    res.status(201).json(dto);
  } catch (err) {
    logger.error('Error creating post', { error: err.message });
    if (err.name === 'ZodError') {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ message: err.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    logger.info('Getting post by ID', { postId: req.params.id });
    
    const post = await postService.findById(req.params.id);
    if (!post) {
      logger.info('Post not found', { postId: req.params.id });
      return res.status(404).json({ message: 'Post not found' });
    }
    const dto = PostDto.fromModel(post);
    res.json(dto);
  } catch (err) {
    logger.error('Error getting post by ID', { postId: req.params.id, error: err.message });
    res.status(500).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    logger.info('Updating post', { postId: req.params.id, body: req.body });
    
    const updateSchema = PostDto.schema.partial();
    const parsed = updateSchema.parse(req.body);
    const patch = {
      ...(parsed.title !== undefined && { title: parsed.title }),
      ...(parsed.content !== undefined && { content: parsed.content }),
      ...(parsed.authorId !== undefined && { author: parsed.authorId }),
    };
    const post = await postService.update(req.params.id, patch);
    if (!post) {
      logger.info('Post not found for update', { postId: req.params.id });
      return res.status(404).json({ message: 'Post not found' });
    }
    const dto = PostDto.fromModel(post);
    logger.info('Post updated successfully', { postId: req.params.id });
    res.json(dto);
  } catch (err) {
    logger.error('Error updating post', { postId: req.params.id, error: err.message });
    if (err.name === 'ZodError') {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    logger.info('Deleting post', { postId: req.params.id });
    
    const post = await postService.findById(req.params.id);
    if (!post) {
      logger.info('Post not found for deletion', { postId: req.params.id });
      return res.status(404).json({ message: 'Post not found' });
    }
    const updated = await postService.update(req.params.id, {
      is_deleted: true,
      deleted_at: new Date(),
    });
    logger.info('Post deleted successfully', { postId: req.params.id });
    res.json(updated);
  } catch (err) {
    logger.error('Error deleting post', { postId: req.params.id, error: err.message });
    res.status(500).json({ message: err.message });
  }
};

export default { getPosts, createPost, getPostById, updatePost, deletePost };
