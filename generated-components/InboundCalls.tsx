'use client';

import React from 'react';
import { Phone, PhoneIncoming, Clock, User, CheckCircle, XCircle } from 'lucide-react';

interface InboundCallsProps {
  className?: string;
}

interface Call {
  id: string;
  from: string;
  to: string;
  status: 'ringing' | 'in-progress' | 'completed' | 'failed';
  duration?: number;
  timestamp: Date;
}

/**
 * InboundCalls Component
 * 
 * Interactive demo component for inbound calls functionality.
 * Displays real-time call status and allows users to test the Call API.
 * 
 * Based on Figma design: node-id=278-5132
 * 
 * @component
 */
export default function InboundCalls({ className = '' }: InboundCallsProps) {
  const [calls, setCalls] = React.useState<Call[]>([
    {
      id: 'call_1',
      from: '+1 (555) 123-4567',
      to: '+1 (555) 987-6543',
      status: 'completed',
      duration: 125,
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: 'call_2',
      from: '+1 (555) 234-5678',
      to: '+1 (555) 987-6543',
      status: 'in-progress',
      duration: 45,
      timestamp: new Date(Date.now() - 45000),
    },
  ]);

  const [isSimulating, setIsSimulating] = React.useState(false);

  const simulateInboundCall = () => {
    setIsSimulating(true);
    const newCall: Call = {
      id: `call_${Date.now()}`,
      from: `+1 (555) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
      to: '+1 (555) 987-6543',
      status: 'ringing',
      timestamp: new Date(),
    };

    setCalls((prev) => [newCall, ...prev]);

    // Simulate call progression
    setTimeout(() => {
      setCalls((prev) =>
        prev.map((call) =>
          call.id === newCall.id ? { ...call, status: 'in-progress', duration: 0 } : call
        )
      );
    }, 2000);

    setTimeout(() => {
      setCalls((prev) =>
        prev.map((call) =>
          call.id === newCall.id ? { ...call, status: 'completed', duration: 30 } : call
        )
      );
      setIsSimulating(false);
    }, 5000);
  };

  const getStatusIcon = (status: Call['status']) => {
    switch (status) {
      case 'ringing':
        return <PhoneIncoming className="h-5 w-5 text-blue-600 animate-pulse" />;
      case 'in-progress':
        return <Phone className="h-5 w-5 text-green-600" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-gray-400" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: Call['status']) => {
    switch (status) {
      case 'ringing':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Inbound Calls Demo</h2>
            <p className="text-gray-600">
              Test the Call API by simulating inbound calls. Watch real-time status updates.
            </p>
          </div>
          <button
            onClick={simulateInboundCall}
            disabled={isSimulating}
            className={`
              px-4 py-2 rounded-md font-medium transition-colors
              ${
                isSimulating
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }
            `}
          >
            {isSimulating ? 'Simulating...' : 'Simulate Call'}
          </button>
        </div>
      </div>

      {/* Calls List */}
      <div className="space-y-3">
        {calls.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Phone className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No calls yet. Click "Simulate Call" to test the API.</p>
          </div>
        ) : (
          calls.map((call) => (
            <div
              key={call.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(call.status)}
                  <div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{call.from}</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-gray-600">{call.to}</span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{call.timestamp.toLocaleTimeString()}</span>
                      </div>
                      <span>Duration: {formatDuration(call.duration)}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(call.status)}`}
                >
                  {call.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

