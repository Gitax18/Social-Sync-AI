import { Request, Response } from 'express';
import ContentModel from '../models/content.model';

class ContentController {
  // Get one content item by its ID
  static async get(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = (req as any).user.id; // Assuming `req.user` contains the logged-in user info

    try {
      const content = await ContentModel.findOne({ _id: id, userId });
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      return res.status(200).json(content);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetching content", error: (error as any).message });
    }
  }

  // Get all content items for a user
  static async getAll(req: Request, res: Response): Promise<Response> {
    const userId = (req as any).user.id; // Assuming `req.user` contains the logged-in user info

    try {
      const contents = await ContentModel.find({ userId });
      return res.status(200).json(contents);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetching contents", error: (error as any).message });
    }
  }

  // Add new content for the logged-in user
  static async add(req: Request, res: Response): Promise<Response> {
    const { title, platform, content } = req.body;
    const userId = (req as any).user.id; // Assuming `req.user` contains the logged-in user info

    try {
      const newContent = new ContentModel({
        title,
        platform,
        content,
        userId, // Associate the content with the logged-in user
      });
      await newContent.save();
      return res.status(201).json({ message: "Content created successfully", data: newContent });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error adding content", error: (error as any).message });
    }
  }

  // Update content by its ID for the logged-in user
  static async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, platform, content } = req.body;
    const userId = (req as any).user.id; // Assuming `req.user` contains the logged-in user info

    try {
      const updatedContent = await ContentModel.findOneAndUpdate(
        { _id: id, userId }, // Ensure the content belongs to the logged-in user
        { title, platform, content },
        { new: true }
      );

      if (!updatedContent) {
        return res.status(404).json({ message: "Content not found or you are not authorized to edit this content" });
      }
      return res.status(200).json({ message: "Content updated successfully", data: updatedContent });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error updating content", error: (error as any).message });
    }
  }

  // Delete content by its ID for the logged-in user
  static async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = (req as any).user.id; // Assuming `req.user` contains the logged-in user info

    try {
      const deletedContent = await ContentModel.findOneAndDelete({ _id: id, userId });
      if (!deletedContent) {
        return res.status(404).json({ message: "Content not found or you are not authorized to delete this content" });
      }
      return res.status(200).json({ message: "Content deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error deleting content", error: (error as any).message });
    }
  }
}

export default ContentController;
