import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center bg-light text-dark">
      <h1 className="text-5xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg mb-6 max-w-xl">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-primary text-light rounded-md shadow-md hover:bg-dark transition"
      >
        Go back home
      </Link>
    </section>
  );
}
