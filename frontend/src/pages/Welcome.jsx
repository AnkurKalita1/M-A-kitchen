import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChefHat, ShoppingCart, Building2, Users, ArrowRight, LogIn } from 'lucide-react';

const ROLES = [
  {
    id: 'buyer',
    title: "Buyer",
    icon: ShoppingCart,
    description: 'Top To Continue as a Buyer',
    color: 'from-blue-500 to-blue-700',
  },
  {
    id: 'seller',
    title: "Seller",
    icon: Building2,
    description: 'Top To Continue as a Seller',
    color: 'from-green-500 to-green-700',
  },
  {
    id: 'agent',
    title: "Agent",
    icon: Users,
    description: 'Top To Continue as a Agent',
    color: 'from-purple-500 to-purple-700',
  },
];

function Welcome() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tier = searchParams.get('tier') || 'regular';
  const plan = searchParams.get('plan');
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
  };

  const handleContinue = () => {
    if (selectedRole && plan) {
      navigate(`/${selectedRole}/register?plan=${plan}&tier=${tier}`);
    } else if (selectedRole) {
      navigate(`/plan-details?tier=${tier}&role=${selectedRole}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#5D3FD3' }}>
      <style>{`
        .role-card-buyer:hover .role-icon-buyer {
          background: linear-gradient(to right, #3b82f6, #1d4ed8) !important;
        }
        .role-card-buyer:hover .role-icon-buyer svg {
          color: white !important;
        }
        .role-card-seller:hover .role-icon-seller {
          background: linear-gradient(to right, #22c55e, #15803d) !important;
        }
        .role-card-seller:hover .role-icon-seller svg {
          color: white !important;
        }
        .role-card-agent:hover .role-icon-agent {
          background: linear-gradient(to right, #a855f7, #7e22ce) !important;
        }
        .role-card-agent:hover .role-icon-agent svg {
          color: white !important;
        }
      `}</style>
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-full p-4">
              <ChefHat className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-2xl text-gray-100 mb-[50px]">Welcome to M&Akitchen™</h1>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {ROLES.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <div
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={`
                  role-card-${role.id} bg-white rounded-2xl p-8 cursor-pointer transition-all duration-300 flex flex-col items-center
                  ${isSelected 
                    ? 'ring-4 ring-white shadow-2xl -translate-y-4' 
                    : 'hover:-translate-y-2 hover:shadow-xl'
                  }
                `}
              >
                <div className={`
                  role-icon-${role.id} w-16 h-16 p-4 rounded-xl flex items-center justify-center mb-6 transition-all duration-300
                  ${isSelected 
                    ? `bg-gradient-to-r ${role.color}` 
                    : 'bg-white'
                  }
                `}>
                  <Icon className={`
                    w-10 h-10 transition-colors duration-300
                    ${isSelected 
                      ? 'text-white' 
                      : 'text-black'
                    }
                  `} />
                </div>
                
                <h3 className="text-2xl text-gray-900 text-center mb-6">{role.title}</h3>
                <p className="text-gray-500 text-center mb-6 text-sm">{role.description}</p>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all
              ${selectedRole
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            Continue with Selected Role
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm bg-white text-gray-700 hover:bg-gray-100 shadow-md transition-all"
          >
            <LogIn className="w-5 h-5" />
            Login (Existing Users)
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
