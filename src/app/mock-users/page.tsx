import { revalidatePath } from "next/cache";
// 경로의 캐시를 무효화하여 새 데이터로 다시 렌더링하게 해주는 함수
import { auth, currentUser } from "@clerk/nextjs/server"

type MockUser = {
    id: number;     // 사용자 고유 ID
    name: string;   // 사용자 이름
};

export default async function MockUser() {
    // 서버 컴포넌트. 서버에서 fetch 실행 가능 (SSR 방식)

    const authObj = await auth();
    // Clerk 인증 객체
    const userObj = await currentUser();
    // 현재 사용
    console.log({ authObj, userObj });
    // 서버 콘솔에 디버깅 출력

    const res = await fetch("https://67e0cc9c58cc6bf78522eb98.mockapi.io/users");
    // 외부 API에서 사용자 데이터 가져오기

    const users = await res.json();
    // JSON 파싱 후 사용자 목록 배열로 저장

    async function addUser(formData: FormData) {
        "use server";
        // 서버 액션: 클라이언트에서 폼을 통해 호출 가능

        const name = formData.get("name");
        // 입력한 이름 추출

        const res = await fetch("https://67e0cc9c58cc6bf78522eb98.mockapi.io/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });
        // POST 요청으로 사용자 추가

        const newUser = await res.json();
        // 응답된 새 사용자 정보

        revalidatePath("/mock-users");
        // 이 페이지(`/mock-users`)의 캐시를 무효화하여 최신 사용자 목록을 다시 불러오게 함

        console.log(newUser);
        // 서버 콘솔에 디버깅 출력
    }

    return (
        <div className="py-10">
            <form action={addUser} className="mb-4">
                {/* 폼 전송 시 서버 액션 함수 실행 */}
                <input 
                    type="text" 
                    name="name" 
                    className="border p-2 mr-2 rounded" 
                />
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add User
                </button>
            </form>     

            <div className="grid grid-cols-4 gap-4 py-10">
                {/* 사용자 목록을 4열 그리드로 렌더링 */}
                {users.map((user: MockUser) => (
                    <div
                        key={user.id}
                        className="p-4 bg-white shadow-md rounded-lg text-gray-700"
                    >
                        {user.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
