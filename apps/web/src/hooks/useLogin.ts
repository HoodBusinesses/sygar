import { api } from "@/api";
import { errorToast } from "@/lib/toasts";
import { LoginParams } from "@repo/exapi";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export const useLogin = () => {
	const { data, isPending, isError, isSuccess, mutate, error } = useMutation({ mutationKey: ['login'], mutationFn: api.api().auth.login })

	// Open the custom URL when the request is successful
	useEffect(() => {
		if (isSuccess) {
			const token = data.data.token; // Assuming the response contains a token
			console.log(data)
			const customUrl = `sygar://anaas?token=${token}`;

			window.location.href = customUrl; // Open the custom scheme URL
		}
	}, [isSuccess, data]);

	if (isError) {
		errorToast(error.message);
	}

	return {
		data,
		isSuccess, isError, isPending,
		mutate
	}
}
