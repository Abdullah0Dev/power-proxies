"use client";
import React, { useState } from "react";
import { useAuth, useSignIn } from "@clerk/nextjs";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";

const InputField = ({
  label,
  type,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const ForgotPasswordPage: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    router.push("/");
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setSuccessfulCreation(true);
      setError("");
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || "An error occurred.");
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      if (result?.status === "needs_second_factor") {
        setSecondFactor(true);
        setError("");
      } else if (result?.status === "complete") {
        setActive({ session: result.createdSessionId });
        router.push("/");
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || "An error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen light:bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white dark:bg-black/30 rounded shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Forgot Password?
        </h1>
        <form
          className="flex flex-col gap-4"
          onSubmit={!successfulCreation ? handleCreate : handleReset}
        >
          {!successfulCreation && (
            <>
              <InputField
                label="Provide your email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. john@doe.com"
              />
              <button className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                Send Password Reset Code
              </button>
            </>
          )}

          {successfulCreation && (
            <>
              <InputField
                label="Enter your new password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputField
                label="Enter the password reset code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                Reset Password
              </button>
            </>
          )}

          {secondFactor && (
            <p className="text-sm text-red-600">
              2FA is required, but this UI does not handle that.
            </p>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
