import { signOut } from "@/auth";

export default function Footer() {
  const date = new Date();

  const currentDate = date.getFullYear();

  return (
    <footer className="bg-gray-50 mt-12 py-6 h-16">
      <div className="container mx-auto text-center text-gray-600">
        Copyright © {currentDate} - All rights reserved.
      </div>
    </footer>
  );
}
