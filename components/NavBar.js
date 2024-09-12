import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <header className="bg-black text-white py-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Image src="/Logo2.png" alt="Logo" width={60} height={60} />
            <h1 className="text-4xl text-[#2d7942] font-nerko font-bold">
              Her Store
            </h1>
          </div>
        </Link>

        {/* Menu Items */}
        <nav className="flex-1">
          <ul className="flex justify-center space-x-8">
            <li>
              <Link href="/" className="text-lg hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-lg hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="text-lg hover:underline">
                Cart
              </Link>
            </li>
          </ul>
        </nav>

        {/* Login Button */}
        <div>
          <Link
            href="/login"
            className="text-white py-2 px-4 rounded hover:bg-gray-500"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
