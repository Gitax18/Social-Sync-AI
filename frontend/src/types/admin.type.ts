// Interface for the login request body
export interface IAuthBody {
    email: string;
    password: string;
  }
  
  // Interface for the response when logging in
  export interface IAuth {
    success: boolean;
    message: string;
    jwtToken: string;
    email: string;
    name: string;
  }
  
  // Interface for the registration request body
  export interface IRegisterBody {
    username: string;
    email: string;
    password: string;
  }
  
  // Interface for OTP verification request body
  export interface IVerifyOtpBody {
    email: string;
    otp: string;
  }
  