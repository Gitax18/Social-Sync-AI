// Interface for a single content item
export interface IContent {
    _id: string;
    title: string;
    platform: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }
  
  // Interface for the content request body when adding or updating
  export interface IContentBody {
    title: string;
    platform: string;
    content: string;
  }
  