import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router'; 
import { loginUser } from "../authSlice";
import { Code2, Trophy, BrainCircuit, Users, Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

const loginSchema = z.object({
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too weak") 
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="min-h-screen bg-[#0b0d14] text-white flex items-center justify-center p-4 lg:p-8 font-sans relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center z-10">
        
        {/* Left Side: Features */}
        <div className="space-y-6 hidden lg:block">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 mb-4">
              <span>Build</span> <span className="w-1 h-1 rounded-full bg-blue-500"></span> 
              <span>Practice</span> <span className="w-1 h-1 rounded-full bg-purple-500"></span> 
              <span>Grow</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-3">
              Welcome Back to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">CodeLedger</span>
            </h1>
            <p className="text-gray-400 text-base max-w-md">
              Log in to continue solving problems, tracking your progress, and accessing the AI Doubt Solver.
            </p>
          </div>

          <div className="space-y-3">
            <FeatureItem icon={<Code2 className="w-5 h-5 text-blue-400" />} title="Pick up where you left off" desc="Your progress is securely saved." />
            <FeatureItem icon={<Trophy className="w-5 h-5 text-yellow-400" />} title="Check your rankings" desc="See how you compare to other developers." />
          </div>

          <div className="pt-2">
            <span className="text-lg font-script text-blue-300/80 italic" style={{fontFamily: 'cursive'}}>Better Code. Better You.</span>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="bg-[#151822] p-6 lg:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle card inner glow */}
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2 lg:hidden">
              <Code2 className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-bold text-white">Code<span className="text-blue-500">Ledger</span></span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">Welcome Back</h2>
            <p className="text-gray-400 text-sm">Please sign in to your account.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className={`block w-full pl-10 pr-4 py-2 bg-[#0b0d14] border ${errors.emailId ? 'border-red-500' : 'border-white/10'} rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
                  {...register('emailId')}
                />
              </div>
              {errors.emailId && <span className="text-red-400 text-xs mt-1 block">{errors.emailId.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`block w-full pl-10 pr-10 py-2 bg-[#0b0d14] border ${errors.password ? 'border-red-500' : 'border-white/10'} rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <span className="text-red-400 text-xs mt-1 block">{errors.password.message}</span>}
            </div>

            {error && (
              <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-xs text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl text-sm font-medium shadow-lg shadow-blue-500/25 transition-all flex justify-center items-center gap-2 mt-4"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-4 h-4" /> Login
                </>
              )}
            </button>
          </form>

          <div className="mt-6 relative flex items-center justify-center">
            <div className="border-t border-white/10 w-full absolute"></div>
            <span className="bg-[#151822] px-3 text-[10px] uppercase text-gray-500 relative z-10">OR</span>
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <NavLink to="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Sign Up
              </NavLink>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner shadow-white/5">
        {icon}
      </div>
      <div>
        <h3 className="text-white font-medium text-sm">{title}</h3>
        <p className="text-gray-400 text-xs">{desc}</p>
      </div>
    </div>
  );
}

export default Login;