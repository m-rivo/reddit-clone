import LogoutButton from "./LogoutButton";
import { cookies } from "next/headers";

export default async function Navbar() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("pb_auth");

  const isLogged = !!authCookie?.value;

  return (
    <nav>
      <span>Reddit Clone</span>
      {isLogged && <LogoutButton />}
    </nav>
  );
}
