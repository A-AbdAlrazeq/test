import * as z from "zod";

class UserDto {
    constructor(user) {
        const plain = typeof user?.toJSON === 'function' ? user.toJSON() : user || {};
        const { id, _id, name, email, createdAt, updatedAt } = plain;

        this.id = id ?? (_id ? _id.toString() : undefined);
        this.name = name;
        this.email = email;
        this.createdAt = createdAt ?? null;
        this.updatedAt = updatedAt ?? null;
    }

    // Validation schema for the DTO shape (after mapping from model)
    static schema = z.object({
        id: z.string().optional(),
        name: z.string().min(1),
        email: z.string().email(),
        createdAt: z.date().nullable().optional(),
        updatedAt: z.date().nullable().optional(),
    });

    static fromModel(user) {
        if (!user) return null;
        return new UserDto(user);
    }

    static fromModels(users = []) {
        return users.map((u) => UserDto.fromModel(u));
    }

    // Validate a plain object against the DTO schema
    static validate(dto) {
        return UserDto.schema.parse(dto);
    }
}

export { UserDto };
export default UserDto;