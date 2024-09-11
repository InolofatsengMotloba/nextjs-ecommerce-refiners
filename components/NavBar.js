import Link from "next/link";

export default function NavBar() {
  return (
    <header className="bg-[#9296938e] text-white py-4">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold">Logo goes here</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
