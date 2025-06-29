import React, { useState } from 'react';
import { Database, Download, Upload, CheckCircle, XCircle, Loader } from 'lucide-react';
import { destinationImporter } from '../services/destinationImporter';
import { useAuth } from '../hooks/useAuth';

const AdminPanel: React.FC = () => {
  const [importing, setImporting] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { user } = useAuth();

  // Simple admin check - in production, you'd have proper role-based access
  const isAdmin = user?.email?.includes('admin') || user?.email?.includes('test');

  const handleImportData = async () => {
    setImporting(true);
    setResults(null);
    
    try {
      const importResults = await destinationImporter.importAllSampleData();
      setResults(importResults);
    } catch (error) {
      setResults({
        success: false,
        error: error instanceof Error ? error.message : 'Import failed'
      });
    } finally {
      setImporting(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Admin Panel</h2>
          <p className="text-gray-600">Please sign in to access admin features.</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Database className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Data Import Section */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Upload className="h-5 w-5 mr-2 text-green-600" />
              Import Sample Data
            </h2>
            <p className="text-gray-600 mb-4">
              Import comprehensive destination data including popular cities, hotels, tours, and flights.
            </p>
            <button
              onClick={handleImportData}
              disabled={importing}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {importing ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>Importing...</span>
                </>
              ) : (
                <>
                  <Download className="h-5 w-5" />
                  <span>Import All Data</span>
                </>
              )}
            </button>
          </div>

          {/* Status Section */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Import Status</h2>
            {!results && !importing && (
              <p className="text-gray-500">No import operations performed yet.</p>
            )}
            
            {importing && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Loader className="h-4 w-4 animate-spin text-blue-600" />
                  <span className="text-sm text-gray-600">Importing data...</span>
                </div>
              </div>
            )}

            {results && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  {results.success ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span className={`font-medium ${results.success ? 'text-green-600' : 'text-red-600'}`}>
                    {results.message}
                  </span>
                </div>

                {results.results && (
                  <div className="space-y-2 text-sm">
                    {Object.entries(results.results).map(([key, result]: [string, any]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="capitalize">{key}:</span>
                        <div className="flex items-center space-x-1">
                          {result.success ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className={result.success ? 'text-green-600' : 'text-red-600'}>
                            {result.success ? 'Success' : 'Failed'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Data Overview */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">What Gets Imported</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900">Destinations</h3>
              <p className="text-sm text-blue-700 mt-1">25+ popular cities worldwide</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-900">Hotels</h3>
              <p className="text-sm text-green-700 mt-1">Sample luxury hotels</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium text-purple-900">Tours</h3>
              <p className="text-sm text-purple-700 mt-1">Various tour categories</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-medium text-orange-900">Flights</h3>
              <p className="text-sm text-orange-700 mt-1">Sample flight routes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;