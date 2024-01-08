import { User } from "@/types/user";

export default function getUser(): User | undefined {
  const data = localStorage.getItem("user");
  if (data) {
    const dataParse = JSON.parse(data) as User;
    return dataParse;
  }
  return undefined;
}
