import { Request, Response, NextFunction } from 'express';
import { generateChatCompetion } from '../ai/util.ai';

class ChatGenerator {
  // The method to handle generating the chat response
  public static async generate(req: Request, res: Response, next: NextFunction): Promise<void> {
    const mediaType: string = req.params["mediaType"];
    console.log(mediaType);
    const { inspiration, description }: { inspiration: string; description: string } = req.body;
    console.log(description);

    try {
      // Assuming generateChatCompetion returns an object with choices
      const response = await generateChatCompetion(mediaType, description, inspiration);
      if(response)
      res.json(response.choices[0].message.content);
    } catch (e: any) {
      // Enhanced error handling with type safety
      res.json({
        error: "Error occurred while processing your request: " + e.message,
      });
    }
  }
}

export default ChatGenerator;
