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
import type { UpdateUserRoleInterface } from "../interfaces/user.interface";
import type { BlogFieldsInterface } from "../interfaces/blog.interface";

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

export async function getAllUsers(token: string) {
  assertTokenExists(token);
  try {
    const response = await axios.get(`${URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw buildApiError("Failed to fetch all users!", 500, err);
  }
}

export async function updateUserRole(
  token: string,
  userId: number,
  data: UpdateUserRoleInterface
) {
  assertTokenExists(token);
  try {
    const response = await axios.patch(
      `${URL}/users/update-role/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw buildApiError("Failed to update user role!", 500, err);
  }
}

export async function toggleBlockUser(token: string, userId: number) {
  assertTokenExists(token);

  try {
    const response = await axios.patch(
      `${URL}/users/toggle-block-user/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    throw buildApiError(`Operation failed!`, 500, err);
  }
}

export async function deleteUser(token: string, userId: number) {
  assertTokenExists(token);
  try {
    return await axios.delete(`${URL}/users/delete-user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  } catch (err) {
    throw buildApiError(`Failed to delete user!`, 500, err);
  }
}

// Blogs

export async function createBlog(token: string, data: BlogFieldsInterface) {
  assertTokenExists(token);

  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("excerpt", data.excerpt);
  formData.append("media", data.media);

  try {
    const response = await axios.post(`${URL}/blogs`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      if (err.response?.status === 400) {
        throw buildValidationError("Validation failed", 400, err.response.data);
      }
      throw buildApiError(
        `Failed to create blog!`,
        500,
        err.response?.data || err
      );
    }
    throw err;
  }
}

export async function updateBlog(
  token: string,
  blogId: number,
  data: BlogFieldsInterface
) {
  assertTokenExists(token);

  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("excerpt", data.excerpt);
  formData.append("media", data.media);

  try {
    const response = await axios.patch(`${URL}/blogs/${blogId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      if (err.response?.status === 400) {
        throw buildValidationError("Validation failed", 400, err.response.data);
      }
      throw buildApiError(
        `Failed to update blog!`,
        500,
        err.response?.data || err
      );
    }
    throw err;
  }
}

export async function fetchAllBlogs(page?: number, limit?: number) {
  try {
    const response = await axios.get(`${URL}/blogs`, {
      params: { page, limit },
    });
    return response.data;
  } catch (err) {
    throw buildApiError(`Failed to fetch all blogs!`, 500, err);
  }
}

export async function fetchSingleBlog(blogId: number) {
  try {
    const response = await axios.get(`${URL}/blogs/${blogId}`);
    return response.data;
  } catch (err) {
    throw buildApiError(`Failed to fetch single blog!`, 500, err);
  }
}

export async function deleteBlog(token: string, blogId: number) {
  assertTokenExists(token);
  try {
    return await axios.delete(`${URL}/blogs/${blogId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  } catch (err) {
    throw buildApiError(`Failed to delete blog!`, 500, err);
  }
}
