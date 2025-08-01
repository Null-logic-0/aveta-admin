import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/auth-slice";
import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { signin } from "../util/http";
import { queryClient } from "../constants/query-client.constants";
import type { SignInRequest } from "../interfaces/auth-api.interface";
import type { SignInFormErrors } from "../interfaces/error-response.interface";
import type { AxiosError } from "axios";

type ErrorField = keyof SignInFormErrors;

function isErrorField(field: string): field is ErrorField {
  return ["email", "password"].includes(field);
}

export function useSignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<SignInFormErrors>({
    email: "",
    password: "",
  });

  const { mutate, isPending, isError, error, data } = useMutation({
    mutationFn: (data: SignInRequest) => {
      return signin(data);
    },
    onSuccess: (response) => {
      const { tokens } = response.data;

      dispatch(
        setAuth({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        })
      );
      queryClient.invalidateQueries({ queryKey: ["me"] });
      setFormErrors({ email: "", password: "" });

      navigate("/");
    },
    onError: (error: AxiosError<{ message: string[] }>) => {
      const messages = error.response?.data?.message;

      if (Array.isArray(messages)) {
        const newErrors: SignInFormErrors = {
          email: "",
          password: "",
        };

        messages.forEach((msg) => {
          const field = msg.split(" ")[0];
          if (isErrorField(field)) {
            newErrors[field] += newErrors[field] ? `\n${msg}` : msg;
          }
        });

        setFormErrors(newErrors);
      }
      toast.error(error.message || "Failed to create character");
    },
  });

  return { mutate, isPending, isError, error, data, formErrors };
}
