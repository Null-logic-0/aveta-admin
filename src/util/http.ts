import axios, { isAxiosError } from "axios";
import { buildApiError, buildValidationError } from "./api-error";
import { assertTokenExists } from "./assert-token";
import type {
  AuthResponse,
  ChangePassword,
  ForgotPassword,
  GoogleLoginResponse,
  SignInRequest,
} from "../interfaces/auth-api.interface";
import type { GetMeResponse } from "../interfaces/current-user-response.interface";
import { URL } from "../constants/url.constants";

export async function signin(data: SignInRequest): Promise<AuthResponse> {
  try {
    const response = await axios.post(`${URL}/auth/sign-in`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      if (err.response?.status === 400) {
        throw buildValidationError("Validation failed", 400, err.response.data);
      }
      throw buildApiError(`Sign in failed!`, 500, err.response?.data || err);
    }
    throw err;
  }
}

export async function googleSignIn({
  credential,
}: {
  credential: string;
}): Promise<GoogleLoginResponse> {
  try {
    const result = await axios.post(
      `${URL}/google-auth`,
      { token: credential },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result.data;
  } catch (err) {
    throw buildApiError("Google sign in failed!", 500, err);
  }
}

export async function signout(token: string) {
  assertTokenExists(token);
  try {
    const response = await axios.post(
      `${URL}/auth/sign-out`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (err) {
    throw buildApiError("Sign-out failed!", 500, err);
  }
}

export async function forgotPassword(data: ForgotPassword) {
  try {
    const response = await axios.post(`${URL}/auth/forgot-password`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response;
  } catch (err) {
    throw buildApiError("Failed to send email!", 500, err);
  }
}

export async function changePassword(data: ChangePassword, token: string) {
  assertTokenExists(token);
  try {
    const response = await axios.post(`${URL}/auth/reset-password`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    throw buildApiError("Failed to change password!", 500, err);
  }
}

// Users

export async function getMe(token: string): Promise<GetMeResponse> {
  assertTokenExists(token);
  try {
    const response = await axios.get(`${URL}/users/me/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response;
  } catch (err) {
    throw buildApiError("Failed to get user profile!", 500, err);
  }
}

export async function getSingleUser(token: string, id: number) {
  assertTokenExists(token);
  try {
    const response = await axios.get(`${URL}/users/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw buildApiError("Failed to get user profile!", 500, err);
  }
}
