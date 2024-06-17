"use client";
import React, { useEffect, useState } from "react";
import { authCallback } from "../actions";
import { useSearchParams } from "next/navigation";
import BarLoader from "react-spinners/BarLoader";

const AuthCallback = () => {
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await authCallback(code || "");
        setMessage(
          "Successfully authenticated! 🎉 You can now close this tab. 😅",
        );
      } catch (error) {
        setMessage("An error occurred while fetching the data.");
      }
    };

    if (code) {
      fetchData();
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
      {message ? (
        <p>{message}</p>
      ) : (
        <p>
          <BarLoader color="black" />
        </p>
      )}
    </div>
  );
};

export default AuthCallback;
