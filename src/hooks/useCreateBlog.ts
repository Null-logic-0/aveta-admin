import { useState } from "react";
import { useAuth } from "./useAuth";
import type { AxiosError } from "axios";
import { createBlog } from "../util/http";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../constants/query-client.constants";
import type { BlogFieldsInterface } from "../interfaces/blog.interface";

import toast from "react-hot-toast";

type ErrorField = keyof BlogFieldsInterface;

function isErrorField(field: string): field is ErrorField {
  return ["media", "title", "excerpt"].includes(field);
}

export function useCreateBlog() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<BlogFieldsInterface>({
    media: "",
    title: "",
    excerpt: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: BlogFieldsInterface) => {
      if (!token) throw new Error("Invalid credentials");
      return createBlog(token, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog has been created successfully!");
      navigate("/blogs");
    },
    onError: (error: AxiosError<{ message: string[] }>) => {
      const messages = error.response?.data?.message;

      if (Array.isArray(messages)) {
        const newErrors: BlogFieldsInterface = {
          media: "Media is Required",
          title: "",
          excerpt: "",
        };

        messages.forEach((msg) => {
          const field = msg.split(" ")[0].toLocaleLowerCase();
          if (isErrorField(field)) {
            newErrors[field] += newErrors[field] ? `\n${msg}` : msg;
          }
        });

        setFormErrors(newErrors);
      }
      toast.error(error.message || "Failed to sign in!");
    },
  });

  return { mutate, isPending, formErrors };
}
