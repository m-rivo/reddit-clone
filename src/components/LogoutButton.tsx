"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { pb } from "@/lib/pocketbase";
import Cookies from "js-cookie";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    pb.authStore.clear(); // client
    Cookies.remove("pb_auth"); // server

    router.push("/login");
    router.refresh();
  };

  return (
    <Button onClick={handleLogout} variant="destructive">
      Logout <LogOut />
    </Button>
  );
}
