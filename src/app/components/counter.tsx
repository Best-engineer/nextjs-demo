
"use client";  // 클라이언트 컴포넌트로 표시
import { useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

export const Counter = () => {
    // const { isLoaded, userId, sessionId, getToken } = useAuth();
    const { isLoaded, isSignedIn } = useUser();
    console.log("Counter component");
    const [count, setCount] = useState(0);

    if (!isLoaded || !isSignedIn ) {
        return null;
    }

    return (
        <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
    );
};