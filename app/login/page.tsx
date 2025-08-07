"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { authenticate, User } from '@/lib/auth'
import { Eye, EyeOff, Lock, UserIcon } from 'lucide-react'
import Image from 'next/image'

export default function LoginPage() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000))

    const user = authenticate(id, password)
    if (user && user.role === role) {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userRole', user.role)
      localStorage.setItem('userName', user.name)
      
      // Redirect based on role
      switch (user.role) {
        case 'cms':
          router.push('/admin')
          break
        case 'mptb_nodal':
          router.push('/mptb-dashboard')
          break
        case 'sports_nodal':
          router.push('/sports-dashboard')
          break
        case 'participant':
          router.push('/participant-dashboard')
          break
        default:
          router.push('/')
      }
    } else {
      setError('गलत ID, पासवर्ड या भूमिका!')
    }
    setLoading(false)
  }

  const getRoleCredentials = (selectedRole: string) => {
    switch (selectedRole) {
      case 'cms':
        return { id: 'cms_hgt', password: 'cms_hgt' }
      case 'mptb_nodal':
        return { id: 'mptb_nodal', password: 'mptb_2025' }
      case 'sports_nodal':
        return { id: 'sports_nodal', password: 'sports_2025' }
      case 'participant':
        return { id: 'participant', password: 'participant_2025' }
      default:
        return { id: '', password: '' }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-100/20 via-white/20 to-green-100/20"></div>
      
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <Image 
              src="/images/mp-tourism-logo.png" 
              alt="MP Tourism Logo" 
              width={80} 
              height={80}
              className="rounded-full shadow-lg"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            तिरंगा बोट रैली लॉगिन
          </CardTitle>
          <p className="text-gray-600">अपनी भूमिका चुनें और लॉगिन करें</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role" className="text-gray-700 font-semibold">
                भूमिका चुनें
              </Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="border-gray-300 focus:border-orange-500">
                  <SelectValue placeholder="अपनी भूमिका चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cms">CMS Admin</SelectItem>
                  <SelectItem value="mptb_nodal">MPTB Nodal Officer</SelectItem>
                  <SelectItem value="sports_nodal">Sports Nodal Officer</SelectItem>
                  <SelectItem value="participant">Participant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="id" className="text-gray-700 font-semibold">
                यूजर ID
              </Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="id"
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="Type your user name"
                  className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-semibold">
                पासवर्ड
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type your password"
                  className="pl-10 pr-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {role && (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md text-sm">
                <p className="font-semibold">
                  {role === 'cms' && 'CMS Admin क्रेडेंशियल:'}
                  {role === 'mptb_nodal' && 'MPTB Nodal Officer क्रेडेंशियल:'}
                  {role === 'sports_nodal' && 'Sports Nodal Officer क्रेडेंशियल:'}
                  {role === 'participant' && 'Participant क्रेडेंशियल:'}
                </p>
                <p>ID: {getRoleCredentials(role).id}</p>
                <p>Password: {getRoleCredentials(role).password}</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200"
              disabled={loading || !role}
            >
              {loading ? 'लॉगिन हो रहा है...' : 'लॉगिन करें'}
            </Button>
          </form>

          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => router.push('/')}
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              वापस होम पेज पर जाएं
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hide v0 branding */}
      <style jsx global>{`
        [data-v0-t="footer"],
        .v0-footer,
        .v0-branding,
        [class*="v0-"],
        [id*="v0-"],
        .powered-by-v0,
        .built-with-v0 {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
        }
      `}</style>
    </div>
  )
}
