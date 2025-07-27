import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { getWaitlistEntries, getWaitlistCount, exportWaitlistCSV, clearWaitlist } from '../utils/storage';

const { FiUsers, FiDownload, FiTrash2, FiEye, FiEyeOff } = FiIcons;

const AdminPanel = () => {
  const [entries, setEntries] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simple password protection (in production, use proper authentication)
  const ADMIN_PASSWORD = 'keyvault2024';

  useEffect(() => {
    if (isAuthenticated) {
      loadEntries();
    }
  }, [isAuthenticated]);

  const loadEntries = () => {
    const waitlistEntries = getWaitlistEntries();
    setEntries(waitlistEntries);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Invalid password');
    }
  };

  const handleExport = () => {
    const csvContent = exportWaitlistCSV();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `keyvault_waitlist_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all waitlist entries? This cannot be undone.')) {
      clearWaitlist();
      setEntries([]);
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-slate-800 text-white p-3 rounded-full shadow-lg hover:bg-slate-700 transition-colors"
        >
          <SafeIcon icon={FiUsers} className="text-lg" />
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">KeyVault Admin Panel</h2>
          <button
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-white"
          >
            <SafeIcon icon={FiEyeOff} className="text-xl" />
          </button>
        </div>

        {!isAuthenticated ? (
          <div className="p-6">
            <form onSubmit={handleLogin} className="max-w-sm mx-auto">
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Admin Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-500 text-white py-2 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Waitlist Entries ({getWaitlistCount()})
                </h3>
                <p className="text-slate-600 text-sm">
                  Users who signed up for the ₹199 launch offer
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleExport}
                  className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-600 transition-colors flex items-center space-x-2"
                >
                  <SafeIcon icon={FiDownload} />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={handleClear}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center space-x-2"
                >
                  <SafeIcon icon={FiTrash2} />
                  <span>Clear All</span>
                </button>
              </div>
            </div>

            <div className="overflow-auto max-h-96">
              {entries.length === 0 ? (
                <p className="text-center text-slate-500 py-8">No entries yet</p>
              ) : (
                <table className="w-full border-collapse border border-slate-200">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-200 px-4 py-2 text-left">Name</th>
                      <th className="border border-slate-200 px-4 py-2 text-left">Email</th>
                      <th className="border border-slate-200 px-4 py-2 text-left">Phone</th>
                      <th className="border border-slate-200 px-4 py-2 text-left">City</th>
                      <th className="border border-slate-200 px-4 py-2 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry) => (
                      <tr key={entry.id} className="hover:bg-slate-50">
                        <td className="border border-slate-200 px-4 py-2">{entry.name}</td>
                        <td className="border border-slate-200 px-4 py-2">{entry.email}</td>
                        <td className="border border-slate-200 px-4 py-2">{entry.phone}</td>
                        <td className="border border-slate-200 px-4 py-2">{entry.city}</td>
                        <td className="border border-slate-200 px-4 py-2">
                          {new Date(entry.timestamp).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminPanel;