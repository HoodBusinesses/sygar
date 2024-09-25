"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import Image from "next/image";
import images from "@/public/images";

// Define the schema for form validation using Zod
const schema = z.object({
	email: z.string().email("Please enter a valid email address"),
});

export default function ResetPassword() {
	// State management for the form
	const [loading, setLoading] = useState(false);
	const [emailSent, setEmailSent] = useState(false);
	const [redirecting, setRedirecting] = useState(false);
	const logo = images.logo;

	// Initialize router for page navigation
	const router = useRouter();

	// Initialize the form using react-hook-form with Zod schema validation
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		resolver: zodResolver(schema),
	});

	// Simulate form submission and different states (loading, success, redirect)
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setLoading(true);
		console.log("data ::", data);

		setTimeout(() => {
			setLoading(false);
			setEmailSent(true);

			setTimeout(() => {
				setRedirecting(true);
				// Redirect to the login page after 2 seconds
				router.push("/login"); // Redirect to the login page
			}, 2000); // After 2 seconds, simulate redirecting state
		}, 1500); // Simulate email sending delay
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
			<Image src={logo} width={120} height={120} alt="logo" className="mb-4 " />

			{/* Main card for the reset password form */}
			<Card className="w-full max-w-md p-8 mt-6">
				{!redirecting ? (
					<>
						<h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
							Reset your password
						</h2>
						<p className="text-center text-gray-600 mb-4">
							To reset your password, enter the email address you use to sign in
							to Sygafor.
						</p>

						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="mb-4">
								<Label htmlFor="email">Email</Label>
								<Input
									type="email"
									id="email"
									placeholder="Enter your email"
									{...register("email")}
									disabled={loading || emailSent}
								/>
								{errors.email && (
									<p className="text-red-500 text-sm mt-1">
										{errors.email.message?.toString()}
									</p>
								)}
							</div>

							<div>
								{!emailSent ? (
									<Button
										type="submit"
										className="w-full bg-blue-600 hover:bg-blue-900 flex justify-center items-center"
										disabled={loading}
									>
										{loading ? (
											<FiLoader className="animate-spin text-white w-6 h-6" />
										) : (
											// <div className="w-6 h-6 border-4 border-t-4 border-t-transparent border-white rounded-full animate-spin"></div>
											"Get the reset link"
										)}
									</Button>
								) : (
									<Button className="w-full bg-green-600 text-white" disabled>
										Mail sent successfully
									</Button>
								)}
							</div>
						</form>
					</>
				) : (
					<div className="text-center">
						<h2 className="text-2xl font-bold text-gray-800 mb-4">
							Redirecting to the login page
						</h2>
						<p className="text-gray-600">
							We will redirect you to the login page
						</p>
						{/* <div className="w-8 h-8 border-4 border-t-4 border-t-transparent border-gray-800 rounded-full animate-spin mt-4 mx-auto"></div> */}
						<FiLoader className="animate-spin text-white w-6 h-6" />
					</div>
				)}
			</Card>
			<hr />
		</div>
	);
}
