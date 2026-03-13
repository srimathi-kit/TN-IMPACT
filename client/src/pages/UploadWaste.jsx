import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import API_BASE_URL from '../api'
import { Upload, Package, MapPin, AlignLeft, CheckCircle2 } from 'lucide-react'

const UploadWaste = () => {
  const [formData, setFormData] = useState({
    wasteType: '',
    quantity: '',
    location: '',
    description: ''
  })
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    
    const data = new FormData()
    Object.keys(formData).forEach(key => data.append(key, formData[key]))
    if (image) data.append('image', image)

    try {
      await axios.post(`${API_BASE_URL}/waste`, data, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      setSuccess(true)
      setTimeout(() => navigate('/marketplace'), 2000)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Upload Successful!</h2>
          <p className="text-slate-500 mt-2">Your waste listing is now live in the marketplace.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-500">
      <div>
        <h1 className="text-2xl font-bold text-white">Upload Material</h1>
        <p className="text-slate-400">List your industrial waste to find potential exchange partners.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-800 space-y-6">
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-300 mb-2">
                <Package className="h-4 w-4 mr-2 text-primary-500" />
                Material Type
              </label>
              <select 
                name="wasteType"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                required
              >
                <option value="" className="bg-slate-800 text-white">Select Material</option>
                <option value="Plastic" className="bg-slate-800 text-white">Plastic</option>
                <option value="Fabric" className="bg-slate-800 text-white">Fabric</option>
                <option value="Metal" className="bg-slate-800 text-white">Metal</option>
                <option value="Wood" className="bg-slate-800 text-white">Wood</option>
                <option value="Paper" className="bg-slate-800 text-white">Paper</option>
                <option value="Chemical" className="bg-slate-800 text-white">Chemical</option>
                <option value="Food" className="bg-slate-800 text-white">Food / Organic</option>
                <option value="E-Waste" className="bg-slate-800 text-white">E-Waste</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-semibold text-slate-300 mb-2">
                  <TrendingUp className="h-4 w-4 mr-2 text-primary-500" />
                  Quantity
                </label>
                <input 
                  name="quantity"
                  type="text" 
                  onChange={handleChange}
                  placeholder="e.g. 500 kg"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-semibold text-slate-300 mb-2">
                  <MapPin className="h-4 w-4 mr-2 text-primary-500" />
                  Pickup Location
                </label>
                <input 
                  name="location"
                  type="text" 
                  onChange={handleChange}
                  placeholder="Facility Address"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-slate-300 mb-2">
                <AlignLeft className="h-4 w-4 mr-2 text-primary-500" />
                Description
              </label>
              <textarea 
                name="description"
                rows="4"
                onChange={handleChange}
                placeholder="Describe condition, purity, or any specific details..."
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-800 flex flex-col items-center justify-center min-h-[300px]">
            {preview ? (
              <div className="w-full space-y-4">
                <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded-2xl" />
                <button 
                  type="button"
                  onClick={() => {setImage(null); setPreview(null)}}
                  className="text-red-500 text-sm font-bold hover:underline"
                >
                  Remove image
                </button>
              </div>
            ) : (
              <label className="w-full h-64 border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-800 transition-colors">
                <Upload className="h-10 w-10 text-slate-500 mb-2" />
                <span className="text-slate-400 font-medium">Upload Material Image</span>
                <input type="file" className="hidden" onChange={handleImageChange} />
              </label>
            )}
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 text-white py-4 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Listing Material'}
          </button>
        </div>
      </form>
    </div>
  )
}

const TrendingUp = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
)

export default UploadWaste
