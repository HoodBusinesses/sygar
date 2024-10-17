// components/ui/toast.tsx
import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";

export function Toast({ title, description }) {
    return (
        <ToastPrimitive.Root>
            <ToastPrimitive.Title>{title}</ToastPrimitive.Title>
            <ToastPrimitive.Description>{description}</ToastPrimitive.Description>
        </ToastPrimitive.Root>
    );
}
