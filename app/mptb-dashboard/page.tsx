"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MPTBTaskData, getDefaultMPTBTasks } from '@/lib/auth'
import { Save, LogOut, CheckCircle, Clock, AlertCircle, Flag, Users, Camera } from 'lucide-react'
import Image from 'next/image'

export default function MPTBDashboard() {
  const [tasks, setTasks] = useState<MPTBTaskData[]>(getDefaultMPTBTasks())
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') { // Added check for window
      const isAuthenticated = localStorage.getItem('isAuthenticated')
      const userRole = localStorage.getItem('userRole')
      
      if (!isAuthenticated || userRole !== 'mptb_nodal') {
        router.push('/login')
        return
      }

      // Load saved tasks from localStorage
      const savedTasks = localStorage.getItem('mptbTasks')
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks))
      }
    }
  }, [router])

  const handleSave = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (typeof window !== 'undefined') { // Added check for window
      localStorage.setItem('mptbTasks', JSON.stringify(tasks))
    }
    setSaved(true)
    setLoading(false)
    
    setTimeout(() => setSaved(false), 3000)
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') { // Added check for window
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('userRole')
      localStorage.removeItem('userName')
    }
    router.push('/login')
  }

  const updateTask = (id: string, updates: Partial<MPTBTaskData>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { 
            ...task, 
            ...updates,
            completedDate: updates.status === 'completed' ? new Date().toISOString().split('T')[0] : task.completedDate
          }
        : task
    ))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />
      case 'in-progress':
        return <Clock className="text-yellow-500" size={20} />
      default:
        return <AlertCircle className="text-red-500" size={20} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200'
      case 'in-progress':
        return 'bg-yellow-50 border-yellow-200'
      default:
        return 'bg-red-50 border-red-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-white to-green-500 p-1">
        <div className="bg-white mx-1 rounded-lg">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image 
                  src="/images/mp-tourism-logo.png" 
                  alt="MP Tourism Logo" 
                  width={60} 
                  height={60}
                  className="rounded-full shadow-lg"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    MPTB Nodal Officer Dashboard
                  </h1>
                  <p className="text-orange-600">मध्यप्रदेश पर्यटन बोर्ड - तिरंगा बोट रैली</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  लॉगआउट
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-xl border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-500 p-3 rounded-full">
                  <CheckCircle className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">पूर्ण कार्य</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {tasks.filter(t => t.status === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-l-4 border-l-yellow-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500 p-3 rounded-full">
                  <Clock className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">प्रगति में</h3>
                  <p className="text-2xl font-bold text-yellow-600">
                    {tasks.filter(t => t.status === 'in-progress').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-l-4 border-l-red-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-red-500 p-3 rounded-full">
                  <AlertCircle className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">लंबित कार्य</h3>
                  <p className="text-2xl font-bold text-red-600">
                    {tasks.filter(t => t.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks Management */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            🎯 MPTB की जिम्मेदारियां
          </h2>

          {tasks.map((task) => (
            <Card key={task.id} className={`shadow-xl border-2 ${getStatusColor(task.status)}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {getStatusIcon(task.status)}
                  <span className="text-gray-800">{task.task}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-700 font-semibold">कार्य विवरण</Label>
                  <p className="text-gray-600 mt-1">{task.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-700 font-semibold">स्थिति</Label>
                    <Select 
                      value={task.status} 
                      onValueChange={(value) => updateTask(task.id, { status: value as any })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">लंबित</SelectItem>
                        <SelectItem value="in-progress">प्रगति में</SelectItem>
                        <SelectItem value="completed">पूर्ण</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-gray-700 font-semibold">असाइन तारीख</Label>
                    <Input
                      type="date"
                      value={task.assignedDate}
                      onChange={(e) => updateTask(task.id, { assignedDate: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>

                {task.status === 'completed' && task.completedDate && (
                  <div>
                    <Label className="text-gray-700 font-semibold">पूर्ण तारीख</Label>
                    <Input
                      type="date"
                      value={task.completedDate}
                      readOnly
                      className="mt-1 bg-green-50"
                    />
                  </div>
                )}

                <div>
                  <Label className="text-gray-700 font-semibold">टिप्पणी</Label>
                  <Textarea
                    value={task.notes}
                    onChange={(e) => updateTask(task.id, { notes: e.target.value })}
                    placeholder="कार्य की प्रगति या अन्य जानकारी यहाँ लिखें..."
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mt-8 shadow-xl bg-gradient-to-r from-orange-50 to-green-50">
          <CardHeader>
            <CardTitle className="text-gray-800">त्वरित कार्य</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2">
                <Flag size={16} />
                तिरंगा ऑर्डर करें
              </Button>
              <Button className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2">
                <Users size={16} />
                कैटरिंग बुक करें
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
                <Camera size={16} />
                मीडिया संपर्क करें
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="mt-8 text-center">
          <Button 
            onClick={handleSave}
            disabled={loading}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 text-lg font-semibold"
          >
            {loading ? (
              'सेव हो रहा है...'
            ) : (
              <>
                <Save className="mr-2" size={20} />
                सभी बदलाव सेव करें
              </>
            )}
          </Button>
          
          {saved && (
            <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md inline-block">
              ✅ सफलतापूर्वक सेव हो गया!
            </div>
          )}
        </div>
      </div>

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
