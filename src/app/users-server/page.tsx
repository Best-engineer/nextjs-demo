// 사용자 정보를 담는 타입 정의 (TypeScript용)
type User = {
  id: number;         // 사용자 고유 ID
  name: string;       // 사용자 이름
  username: string;   // 사용자 계정명
  email: string;      // 사용자 이메일
  phone: string;      // 사용자 전화번호
};

// 서버 컴포넌트: async를 사용하여 서버에서 데이터를 직접 가져올 수 있음
export default async function UserServer() {
  
  // 2초간 인위적으로 기다리는 코드 (로딩 테스트용)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 외부 API에서 사용자 데이터를 가져옴 (비동기 fetch)
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  // 응답받은 JSON 데이터를 실제 JavaScript 객체로 변환
  const users = await response.json();

  // JSX 반환: 사용자 리스트를 화면에 출력
  return (
      <ul className="space-y-4 p-4">
          {/* 사용자 배열을 map으로 반복하며 각 사용자 출력 */}
          {users.map((user: User) => (
              <li
                  key={user.id}  // React에서 리스트 렌더링 시 key는 필수 (고유 값)
                  className="p-4 bg-white shadow-md rounded-lg text-gray-700"
              >
                  {/* 사용자 이름과 이메일을 출력 */}
                  {user.name} ({user.email})
              </li>
          ))}
      </ul>
  );
}
