import { Link } from 'react-router-dom'
import mediaanConclusionLogo from '/mediaan_conclusion_logo.png'

function ChangePasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <div className="bg-white p-8 rounded-lg shadow-lg w-80">
          <div className="flex justify-center items-center">
            <img src={mediaanConclusionLogo} alt="alternate text" />
          </div>
          <h2 className="text-2xl font-semibold text-black mt-2">Change your password</h2>
          <p className="text-sm text-gray-500 mb-4">Fill in your new password confirm it to change it.</p>
          <form>
            <input
              type="password"
              placeholder="New password"
              className="w-full p-2 mb-3 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
            <input
              type="confirmpassword"
              placeholder="Confirm password"
              className="w-full p-2 mb-3 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
            <Link to="/">
              <button
                type="submit"
                className="w-full p-2 rounded-md bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold">
                Continue
              </button>
            </Link>
          </form>
        </div>
        <div className="text-center mt-6">
          <p className="text-xs text-white">
            Already have an account?
          </p>
          <Link to="/" className="text-xs text-white underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordPage;