import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card max-w-md text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Registration Successful! 🎉
        </h1>
        <p className="text-gray-600 mb-8">
          Welcome to M&A Kitchen! Your account has been created successfully.
        </p>
        <button
          onClick={() => navigate('/')}
          className="btn-primary w-full"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Success;

