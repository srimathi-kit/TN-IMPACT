import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API_BASE_URL from '../api'
import { CheckCircle2, XCircle, Clock, MessageSquare, Building2, Package } from 'lucide-react'

const Requests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/requests`, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      })
      setRequests(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
    markAllAsViewed()
  }, [])

  const markAllAsViewed = async () => {
    try {
      await axios.put(`${API_BASE_URL}/requests/mark-viewed`, {}, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      window.dispatchEvent(new Event('refreshNotifications'));
    } catch (err) {
      console.error('Error marking requests as viewed:', err);
    }
  }

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`${API_BASE_URL}/requests/${id}`, { status }, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      })
      fetchRequests()
    } catch (err) {
      console.error(err)
      alert('Failed to update request status')
    }
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Exchange Requests</h1>
        <p className="text-slate-500">Manage incoming and outgoing material exchange requests.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading requests...</div>
        ) : requests.length === 0 ? (
          <div className="p-20 text-center">
            <div className="inline-flex p-4 bg-slate-50 rounded-full mb-4">
              <MessageSquare className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No requests yet</h3>
            <p className="text-slate-500 mt-1">Start connecting with other industries in the marketplace.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {requests.map((req) => (
              <div key={req._id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-2xl ${req.sender._id === userInfo._id ? 'bg-blue-50 text-blue-600' : 'bg-primary-50 text-primary-600'}`}>
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900">
                        {req.sender._id === userInfo._id ? 'To: ' + req.receiver.industryName : 'From: ' + req.sender.industryName}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        req.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        req.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      Material: <span className="font-medium text-slate-900">{req.wasteItem?.wasteType} Waste</span>
                    </p>
                    {req.message && (
                      <p className="text-sm bg-slate-50 p-3 rounded-xl mt-2 text-slate-500 italic">
                        "{req.message}"
                      </p>
                    )}
                    <p className="text-xs text-slate-400 mt-2 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(req.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {req.receiver._id === userInfo._id && req.status === 'pending' ? (
                    <>
                      <button 
                        onClick={() => handleStatusUpdate(req._id, 'accepted')}
                        className="px-4 py-2 bg-primary-600 text-white text-sm font-bold rounded-xl hover:bg-primary-700 transition-colors flex items-center space-x-2"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Accept</span>
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(req._id, 'rejected')}
                        className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center space-x-2"
                      >
                        <XCircle className="h-4 w-4" />
                        <span>Decline</span>
                      </button>
                    </>
                  ) : (
                    <div className="text-xs font-bold text-slate-400 uppercase bg-slate-100 px-3 py-1 rounded-lg">
                      {req.status}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Requests
