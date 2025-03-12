import { SignUp } from "@clerk/nextjs";

export default function CustomSignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Create an Account</h1>
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: "bg-green-600 hover:bg-green-700 text-white",
              footerActionLink: "text-green-600 hover:text-green-700",
            },
          }}
        />
      </div>
    </div>
  );
}