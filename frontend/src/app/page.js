// app/page.js
import Link from "next/link";

export default function Home() {
  
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
      <h1 className="text-5xl font-extrabold mb-8 text-shadow-lg">
        Smart Todo List
      </h1>
      <p className="text-xl text-center mb-12 max-w-md">
        Your AI-powered assistant for ultimate task management and productivity.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        <Link
          href="/dashboard"
          className="
          flex flex-col items-center justify-center p-6 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm
          rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105
          text-white text-lg font-semibold w-40 h-40 border border-white border-opacity-30
        "
        >
          <svg
            style={{ width: "2.5rem", height: "2.5rem", marginBottom: "2" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 17l-4 4m0 0l-4-4m4 4V3m6 18V3m0 18l4-4m0 4l4-4"
            ></path>
          </svg>
          Dashboard
        </Link>

        <Link
          href="/create-task"
          className="
          flex flex-col items-center justify-center p-6 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm
          rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105
          text-white text-lg font-semibold w-40 h-40 border border-white border-opacity-30
        "
        >
          <svg
            style={{ width: "2.5rem", height: "2.5rem", marginBottom: "2" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </Link>

        <Link
          href="/context"
          className="
          flex flex-col items-center justify-center p-6 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm
          rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105
          text-white text-lg font-semibold w-40 h-40 border border-white border-opacity-30
        "
        >
          <svg
            style={{ width: "2.5rem", height: "2.5rem", marginBottom: "2" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 8h10M7 12h10M7 16h10M9 20H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2h-2M9 20l-4-4"
            ></path>
          </svg>
          Context Input
        </Link>
      </div>
      {/* <style jsx>{`
        .text-shadow-lg {
          text-shadow: 2px 2px 8px rgba(0,0,0,0.3);
        }
      `}</style> */}
    </main>
  );
}
