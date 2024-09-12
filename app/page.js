import Link from "next/link";

export default function Home() {
  return (
    <div
      className="relative bg-cover bg-center min-h-screen flex flex-col items-start justify-center text-white p-8"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Text content */}
      <div className="relative z-10 text-left px-4 max-w-5xl">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4 py-8">
          Welcome to HerStore: Your One-Stop Shop for Everything!
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          Discover an unbeatable selection of products that cater to all your
          needs. From trendy fashion and tech gadgets to home essentials and
          beauty must-haves, SwiftCart has it all. Shop with ease, enjoy
          exclusive deals, and experience fast, reliable delivery. Ready to
          elevate your shopping game? Start exploring today!
        </p>

        {/* Button */}
        <button className="bg-black text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-gray-500">
          <Link href="/products">Shop Now</Link>
        </button>
      </div>
    </div>
  );
}
