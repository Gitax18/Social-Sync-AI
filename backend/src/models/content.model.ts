import mongoose, { Schema, Document } from 'mongoose';

// Interface for type safety of the document
export interface IContent extends Document {
  title: string;
  platform: string;
  content: string;
  userId: Schema.Types.ObjectId; // This references the user who created the post
}

// Creating the Content Schema
const contentSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    platform: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
  }
);

const ContentModel = mongoose.model<IContent>('Content', contentSchema);

export default ContentModel;
