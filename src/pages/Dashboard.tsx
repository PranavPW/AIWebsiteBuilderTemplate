import React from 'react';
import { BarChart3, Users, TrendingUp, DollarSign, Activity, Calendar, Bell, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/UI/Card';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Users',
      value: '2,543',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Revenue',
      value: '$45,210',
      change: '+8%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Growth Rate',
      value: '24.5%',
      change: '+3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'Active Sessions',
      value: '892',
      change: '-2%',
      trend: 'down',
      icon: Activity,
      color: 'text-orange-600'
    }
  ];

  const recentActivity = [
    { id: 1, action: 'New user registered', time: '2 minutes ago', type: 'user' },
    { id: 2, action: 'Payment received', time: '5 minutes ago', type: 'payment' },
    { id: 3, action: 'Profile updated', time: '1 hour ago', type: 'profile' },
    { id: 4, action: 'Security alert resolved', time: '2 hours ago', type: 'security' },
    { id: 5, action: 'Backup completed', time: '3 hours ago', type: 'system' }
  ];

  const quickActions = [
    { title: 'View Analytics', icon: BarChart3, color: 'bg-blue-500' },
    { title: 'Manage Users', icon: Users, color: 'bg-green-500' },
    { title: 'Schedule Event', icon: Calendar, color: 'bg-purple-500' },
    { title: 'Notifications', icon: Bell, color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-slate-600 mt-2">
            Here's what's happening with your account today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.color === 'text-blue-600' ? 'bg-blue-100' :
                  stat.color === 'text-green-600' ? 'bg-green-100' :
                  stat.color === 'text-purple-600' ? 'bg-purple-100' : 'bg-orange-100'
                }`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View all
                </button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'user' ? 'bg-blue-100' :
                      activity.type === 'payment' ? 'bg-green-100' :
                      activity.type === 'profile' ? 'bg-purple-100' :
                      activity.type === 'security' ? 'bg-red-100' : 'bg-slate-100'
                    }`}>
                      <div className={`w-3 h-3 rounded-full ${
                        activity.type === 'user' ? 'bg-blue-500' :
                        activity.type === 'payment' ? 'bg-green-500' :
                        activity.type === 'profile' ? 'bg-purple-500' :
                        activity.type === 'security' ? 'bg-red-500' : 'bg-slate-500'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                      <action.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-slate-900">{action.title}</span>
                  </button>
                ))}
              </div>
            </Card>

            {/* User Info */}
            <Card className="mt-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">
                    {user?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900">{user?.name}</h3>
                <p className="text-sm text-slate-600 mb-4">{user?.email}</p>
                <div className="flex justify-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user?.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user?.role}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;