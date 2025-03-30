import { IContent, IContentBody } from "../types/content.type";
import * as BaseApi from "./base-api"; // Assuming you have a base API utility

class ContentApiService {
  private url = (action: string) => "content/" + action;

  // Get one content item by ID
  public async get(id: string): Promise<IContent> {
    try {
      const response:IContent = await BaseApi._get({
        api: this.url(`${id}`),
        data:null
      });
      return response;
    } catch (error) {
      throw error
    }
  }

  // Get all content items
  public async getAll(): Promise<IContent[]> {
    try {
      const response:IContent[] = await BaseApi._get({
        api: this.url(""),
        data:null
      });
      return response;
    } catch (error) {
      throw error
    }
  }

  // Add new content
  public async add(body: IContentBody): Promise<IContent> {
    try {
      const response:IContent = await BaseApi._post({
        api: this.url(""),
        data: body
      });
      return response;
    } catch (error) {
      throw error
    }
  }

  // Update content by ID
  public async update(id: string, body: IContentBody): Promise<IContent> {
    try {
      const response:IContent = await BaseApi._put({
        api: this.url(`${id}`),
        data: body
      });
      return response;
    } catch (error) {
      throw error
    }
  }

  // Delete content by ID
  public async delete(id: string): Promise<void> {
    try {
      await BaseApi._delete({
        api: this.url(`${id}`),
        data:null
      });
    } catch (error) {
      throw error
    }
  }
}

const ContentApi = new ContentApiService();
export default ContentApi;
