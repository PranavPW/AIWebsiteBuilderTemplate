import React, { useState } from 'react';
import { Camera, Mail, User, Calendar, Shield, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Card from '../components/UI/Card';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setSuccess(false);

    try {
      await updateProfile({
        name: formData.name,
        email: formData.email
      });
      setEditing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || ''
    });
    setEditing(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Profile Settings</h1>
          <p className="text-slate-600 mt-2">
            Manage your account information and preferences.
          </p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-800">Profile updated successfully!</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture */}
          <div className="lg:col-span-1">
            <Card>
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{user.name}</h3>
                <p className="text-sm text-slate-600 mb-4">{user.email}</p>
                <div className="flex justify-center">
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                </div>
              </div>
            </Card>

            {/* Account Info */}
            <Card className="mt-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Account Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sm">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="font-medium text-slate-700">Member since</p>
                    <p className="text-slate-600">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                {user.lastLogin && (
                  <div className="flex items-center space-x-3 text-sm">
                    <Shield className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="font-medium text-slate-700">Last login</p>
                      <p className="text-slate-600">
                        {new Date(user.lastLogin).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900">Personal Information</h2>
                {!editing && (
                  <Button
                    variant="outline"
                    onClick={() => setEditing(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!editing}
                    required
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!editing}
                    required
                  />

                  <div className="md:col-span-2">
                    <Input
                      label="User ID"
                      type="text"
                      value={user.id}
                      disabled
                      helperText="This is your unique user identifier and cannot be changed."
                    />
                  </div>
                </div>

                {editing && (
                  <div className="flex space-x-4 mt-6 pt-6 border-t border-slate-200">
                    <Button
                      type="submit"
                      loading={loading}
                      className="flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </form>
            </Card>

            {/* Security Section */}
            <Card className="mt-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-900">Password</h4>
                    <p className="text-sm text-slate-600">Change your account password</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change Password
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-900">Two-Factor Authentication</h4>
                    <p className="text-sm text-slate-600">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable 2FA
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-900">Active Sessions</h4>
                    <p className="text-sm text-slate-600">Manage your active sessions</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Sessions
                  </Button>
                </div>
              </div>
            </Card>

            {/* Danger Zone */}
            <Card className="mt-6 border-red-200">
              <h3 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h3>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-red-900">Delete Account</h4>
                    <p className="text-sm text-red-700">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <Button variant="danger" size="sm">
                    Delete Account
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;