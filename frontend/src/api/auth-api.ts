import { IAuth, IAuthBody, IRegisterBody, IVerifyOtpBody } from "../types/admin.type";
import * as BaseApi from "./base-api";  // Assuming you have a base API utility

class AuthApiService {
  private url = (action: string) => "auth/" + action;

  // Register method: Sends user registration details to the backend
  public async register(body: IRegisterBody): Promise<any> {
    try {
      const response = await BaseApi._post({
        api: this.url("register"),
        data: body
      });
      return response;
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  // Verify OTP method: Verifies the OTP sent to the user's email during registration
  public async verifyOtp(body: IVerifyOtpBody): Promise<any> {
    try {
      const response = await BaseApi._post({
        api: this.url("verifyotp"),
        data: body
      });
      return response;
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  // Login method: Sends login credentials (email and password) to the backend
  public async login(body: IAuthBody): Promise<IAuth> {
    try {
      const response:IAuth = await BaseApi._post({
        api: this.url("login"),
        data: body
      });
      return response;
    } catch (error) {
      throw new Error((error as any).message);
    }
  }
}

const AuthApi = new AuthApiService();
export default AuthApi;
