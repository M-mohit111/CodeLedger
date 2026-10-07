import React from 'react';
import { Plus, Edit, Trash2, Video } from 'lucide-react';
import { NavLink } from 'react-router';

function Admin() {
  const adminOptions = [
    {
      id: 'create',
      title: 'Create Problem',
      description: 'Add a new coding problem',
      icon: Plus,
      gradient: 'from-green-500 to-emerald-600',
      shadow: 'shadow-green-500/20',
      route: '/admin/create'
    },
    {
      id: 'update',
      title: 'Update Problem',
      description: 'Edit existing problem details',
      icon: Edit,
      gradient: 'from-yellow-500 to-orange-600',
      shadow: 'shadow-yellow-500/20',
      route: '/admin/update'
    },
    {
      id: 'delete',
      title: 'Delete Problem',
      description: 'Remove problems from platform',
      icon: Trash2,
      gradient: 'from-red-500 to-rose-600',
      shadow: 'shadow-red-500/20',
      route: '/admin/delete'
    },
    {
      id: 'video',
      title: 'Video Editorials',
      description: 'Upload & manage video solutions',
      icon: Video,
      gradient: 'from-blue-500 to-purple-600',
      shadow: 'shadow-blue-500/20',
      route: '/admin/video'
    }
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0b0d14] flex flex-col justify-center py-12 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
            Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Dashboard</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Manage your coding problems, test cases, and video editorials from one central command center.
          </p>
        </div>

        {/* Admin Options Grid - Fits perfectly in 1 row on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {adminOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div
                key={option.id}
                className="bg-[#151822] rounded-2xl border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col relative overflow-hidden group"
              >
                {/* Subtle top border gradient */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${option.gradient} opacity-70`}></div>

                <div className="p-6 flex flex-col h-full items-center text-center">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-white/5 border border-white/10 shadow-lg ${option.shadow} group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={24} className="text-white" />
                  </div>
                  
                  {/* Title */}
                  <h2 className="text-lg font-bold text-white mb-2">
                    {option.title}
                  </h2>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-xs mb-6 flex-1">
                    {option.description}
                  </p>
                  
                  {/* Action Button */}
                  <NavLink 
                    to={option.route}
                    className={`w-full py-2.5 rounded-xl bg-gradient-to-r ${option.gradient} text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg ${option.shadow}`}
                  >
                    Manage
                  </NavLink>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Admin;