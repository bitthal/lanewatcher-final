// pages/404.tsx
import Link from "next/link";
const Custom404 = () => {
  return (
    <div className="grid place-content-center h-screen">
      <div className="container mx-auto max-w-md text-center">
        <p className="text-zinc-400">
          Sorry, we could not find the page you are looking for. Instead, we are working on this.
        </p>
        {/*TODO: List similar pages here */}
        {/*TODO: Create Search bar component here */}
        <div className="border border-b-gray-50 my-4"></div>
        {/* Add navigation to important pages */}
        <div>
          <Link
            className="hover:underline hover:text-indigo-400 text-indigo-500"
            href="/tracker"
          >
            Go to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Custom404;
