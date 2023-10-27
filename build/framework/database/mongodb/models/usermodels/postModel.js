"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    likes: [],
    comments: [],
    report: [
        {
            userId: {
                type: String,
                required: true,
            },
            reason: {
                type: String,
                required: true,
            },
        },
    ],
    post: [],
    adminDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const Post = (0, mongoose_1.model)('Post', postSchema);
exports.default = Post;
