import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Lock, Zap, Users, Star, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const Home: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'Industry-standard security practices with JWT tokens and encrypted data storage.'
    },
    {
      icon: Lock,
      title: 'Protected Routes',
      description: 'Role-based access control with automatic route protection and user management.'
    },
    {
      icon: Zap,
      title: 'Production Ready',
      description: 'Built with modern technologies and optimized for performance and scalability.'
    },
    {
      icon: Users,
      title: 'User Management',
      description: 'Complete user profile management with customizable settings and preferences.'
    }
  ];

  const benefits = [
    'Beautiful, responsive design',
    'TypeScript for type safety',
    'Tailwind CSS for styling',
    'Environment variable configuration',
    'Security best practices',
    'Mobile-first responsive design'
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Beautiful React
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                {' '}Authentication
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              A production-ready authentication template with beautiful design, security best practices, 
              and modern development tools. Get started in minutes.
            </p>
            
            {user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto">
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
            
            <div className="mt-8 flex items-center justify-center space-x-1 text-sm text-slate-500">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>Loved by developers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything you need to get started
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Built with modern technologies and security best practices for production applications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Why choose our template?
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Save weeks of development time with our carefully crafted authentication system. 
                Built by developers, for developers.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:pl-8">
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Ready to Deploy</h3>
                  <p className="text-slate-600 mb-6">
                    Production-ready code with environment variables, security headers, and performance optimizations.
                  </p>
                  {!user && (
                    <Link to="/register">
                      <Button className="w-full">
                        Start Building Now
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Try the demo
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Experience the authentication flow with our demo credentials
          </p>
          <div className="bg-slate-800 rounded-lg p-6 mb-8">
            <div className="text-left space-y-2 text-slate-300">
              <p><span className="text-slate-400">Email:</span> demo@example.com</p>
              <p><span className="text-slate-400">Password:</span> password123</p>
            </div>
          </div>
          <Link to="/login">
            <Button variant="outline" size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
              Try Demo Login
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;