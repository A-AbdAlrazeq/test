import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    is_deleted: { type: Boolean, default: false },
    deleted_at: { type: Date }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
