import * as z from "zod";

class PostDto {
    constructor(post) {
        const plain = typeof post?.toJSON === 'function' ? post.toJSON() : post || {};
        const {
            id,
            _id,
            title,
            content,
            author,
            authorId,
            is_deleted,
            deleted_at,
            createdAt,
            updatedAt,
        } = plain;

        this.id = id ?? (_id ? _id.toString() : undefined);
        this.title = title;
        this.content = content;

        const rawAuthor = authorId ?? author;
        if (rawAuthor && typeof rawAuthor === 'object' && rawAuthor._id) {
            this.authorId = rawAuthor._id.toString();
        } else {
            this.authorId = rawAuthor ?? null;
        }

        this.isDeleted = is_deleted ?? false;
        this.deletedAt = deleted_at ?? null;
        this.createdAt = createdAt ?? null;
        this.updatedAt = updatedAt ?? null;
    }

    // Validation schema for the DTO shape
    static schema = z.object({
        id: z.string().optional(),
        title: z.string().min(1),
        content: z.string().min(1),
        authorId: z.union([z.string(), z.number()]).nullable().optional(),
        isDeleted: z.boolean().optional(),
        deletedAt: z.date().nullable().optional(),
        createdAt: z.date().nullable().optional(),
        updatedAt: z.date().nullable().optional(),
    });

    static fromModel(post) {
        if (!post) return null;
        return new PostDto(post);
    }

    static fromModels(posts = []) {
        return posts.map((p) => PostDto.fromModel(p));
    }

    static validate(dto) {
        return PostDto.schema.parse(dto);
    }
}

export { PostDto };
export default PostDto;
