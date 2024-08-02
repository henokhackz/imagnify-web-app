import { model, models, Schema } from "mongoose";

export interface IImage extends Document {
  title: string;
  transformationType: string;
  publicId: string;
  secureUrl: string;
  height?: number;
  width?: number;
  config?: Record<string, any>;
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  author?: {
    __id: string;
    firstName?: string;
    lastName?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const imageSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  transformationType: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  secureUrl: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
  },
  width: {
    type: Number,
  },
  config: { type: Object },
  aspectRatio: {
    type: String,
  },
  color: {
    type: String,
  },
  prompt: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 * 24 * 60 * 60 * 1000, // 30 days
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Image = models?.Image || model("Image", imageSchema);

export default Image;
