"use client"; 
// Next.js에서 클라이언트 컴포넌트임을 명시 (브라우저에서 실행되는 컴포넌트)

import { useState, useEffect } from "react"; 
// React의 훅들: 상태 관리(useState), 부수 효과 처리(useEffect)

type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
};
// 외부 API로부터 받아올 사용자 데이터의 타입 정의 (TypeScript용)

export default function UserClient() {
    // React 함수형 컴포넌트 정의. 이름은 UserClient

    const [users, setUsers] = useState<User[]>([]);
    // 사용자 목록 상태: 초기값은 빈 배열, 타입은 User 객체 배열

    const [loading, setLoading] = useState(true);
    // 로딩 상태: 데이터 로딩 중인지 여부, 초기값은 true

    const [error, setError] = useState("");
    // 에러 메시지를 저장하는 상태, 초기값은 빈 문자열

    useEffect(() => {
        // 컴포넌트가 처음 마운트될 때 실행되는 useEffect 훅

        async function fetchUsers() {
            // 비동기 함수로 사용자 데이터 가져오기

            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                );
                // 외부 API 호출 (가짜 유저 데이터를 제공하는 무료 API)

                if (!response.ok) throw new Error("Failed to fetch users");
                // HTTP 응답 코드가 성공(200~299)이 아니면 오류 발생

                const data = await response.json();
                // 응답 데이터를 JSON 형태로 파싱

                setUsers(data);
                // 상태에 사용자 데이터 저장
            } catch (err) {
                // 에러 발생 시 실행

                if (err instanceof Error) {
                    setError(`Failed to fetch users: ${err.message}`);
                    // 에러 메시지를 상태에 저장
                }
            } finally {
                setLoading(false);
                // 무조건 실행됨. 로딩 상태 false로 변경 (로딩 종료)
            }
        }

        fetchUsers(); 
        // 비동기 함수 실행 (한 번만 실행됨)
    }, []);
    // 두 번째 인자가 빈 배열이므로 이 useEffect는 처음 한 번만 실행됨

    if (loading) return <p>Loading...</p>;
    // 로딩 중일 때는 로딩 메시지만 표시하고 아래 JSX는 렌더링 안 됨

    if (error) return <p>{error}</p>;
    // 에러가 있을 경우 에러 메시지만 출력하고 JSX 렌더링 중단

    return (
        <ul className="space-y-4 p-4">
            {/* 사용자 목록을 리스트로 출력. Tailwind로 여백(padding), 간격 조절 */}
            
            {users.map((user) => (
                // users 배열을 순회하면서 각 사용자에 대해 <li> 생성

                <li
                    key={user.id}
                    className="p-4 bg-white shadow-md rounded-lg text-gray-700"
                >
                    {/* 각 사용자 정보 카드 스타일링: 패딩, 배경, 그림자, 둥근 모서리, 회색 텍스트 */}
                    {user.name} ({user.email})
                    {/* 사용자 이름과 이메일 출력 */}
                </li>
            ))}
        </ul>
    );
}
