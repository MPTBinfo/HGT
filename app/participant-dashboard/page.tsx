"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ParticipantData } from '@/lib/auth'
import { Save, LogOut, User, Phone, Mail, Calendar, Award, Anchor } from 'lucide-react'
import Image from 'next/image'

export default function ParticipantDashboard() {
  const [participant, setParticipant] = useState<ParticipantData>({
    id: '',
    name: '',
    email: '',
    phone: '',
    age: '',
    experience: '',
    boatType: '',
    registrationDate: new Date().toISOString().split('T')[0],
    status: 'pending'
  })
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') { // Added check for window
      const isAuthenticated = localStorage.getItem('isAuthenticated')
      const userRole = localStorage.getItem('userRole')
      
      if (!isAuthenticated || userRole !== 'participant') {
        router.push('/login')
        return
      }

      // Load saved participant data from localStorage
      const savedParticipant = localStorage.getItem('participantData')
      if (savedParticipant) {
        setParticipant(JSON.parse(savedParticipant))
      } else {
        // Generate unique ID for new participant
        setParticipant(prev => ({
          ...prev,
          id: 'P' + Date.now().toString().slice(-6)
        }))
      }
    }
  }, [router])

  const handleSave = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (typeof window !== 'undefined') { // Added check for window
      localStorage.setItem('participantData', JSON.stringify(participant))
      
      // Also save to participants list for CMS
      const existingParticipants = JSON.parse(localStorage.getItem('allParticipants') || '[]')
      const updatedParticipants = existingParticipants.filter((p: ParticipantData) => p.id !== participant.id)
      updatedParticipants.push(participant)
      localStorage.setItem('allParticipants', JSON.stringify(updatedParticipants))
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'rejected':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'स्वीकृत'
      case 'rejected':
        return 'अस्वीकृत'
      default:
        return 'लंबित'
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
                  src="/images/tiranga-flag.png" 
                  alt="Tiranga Flag" 
                  width={60} 
                  height={40}
                  className="rounded-md shadow-lg"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Participant Dashboard
                  </h1>
                  <p className="text-blue-600">तिरंगा बोट रैली - प्रतिभागी पंजीकरण</p>
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
        {/* Status Card */}
        <Card className={`mb-8 shadow-xl border-2 ${getStatusColor(participant.status)}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">पंजीकरण स्थिति</h3>
                <p className="text-lg font-semibold mt-2">
                  {getStatusText(participant.status)}
                </p>
                {participant.id && (
                  <p className="text-sm text-gray-600 mt-1">
                    पंजीकरण ID: {participant.id}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">पंजीकरण तारीख</p>
                <p className="font-semibold">{participant.registrationDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registration Form */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <User className="text-blue-500" size={24} />
              प्रतिभागी पंजीकरण फॉर्म
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-700 font-semibold flex items-center gap-2">
                  <User size={16} />
                  पूरा नाम *
                </Label>
                <Input
                  value={participant.name}
                  onChange={(e) => setParticipant({...participant, name: e.target.value})}
                  placeholder="अपना पूरा नाम लिखें"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label className="text-gray-700 font-semibold flex items-center gap-2">
                  <Mail size={16} />
                  ईमेल पता *
                </Label>
                <Input
                  type="email"
                  value={participant.email}
                  onChange={(e) => setParticipant({...participant, email: e.target.value})}
                  placeholder="your.email@example.com"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label className="text-gray-700 font-semibold flex items-center gap-2">
                  <Phone size={16} />
                  मोबाइल नंबर *
                </Label>
                <Input
                  type="tel"
                  value={participant.phone}
                  onChange={(e) => setParticipant({...participant, phone: e.target.value})}
                  placeholder="9876543210"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label className="text-gray-700 font-semibold flex items-center gap-2">
                  <Calendar size={16} />
                  आयु *
                </Label>
                <Input
                  type="number"
                  min="16"
                  max="60"
                  value={participant.age}
                  onChange={(e) => setParticipant({...participant, age: e.target.value})}
                  placeholder="25"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label className="text-gray-700 font-semibold flex items-center gap-2">
                  <Award size={16} />
                  नौकायन अनुभव *
                </Label>
                <Select 
                  value={participant.experience} 
                  onValueChange={(value) => setParticipant({...participant, experience: value})}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="अपना अनुभव चुनें" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">शुरुआती (0-1 साल)</SelectItem>
                    <SelectItem value="intermediate">मध्यम (1-3 साल)</SelectItem>
                    <SelectItem value="advanced">उन्नत (3+ साल)</SelectItem>
                    <SelectItem value="expert">विशेषज्ञ (5+ साल)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-700 font-semibold flex items-center gap-2">
                  <Anchor size={16} />
                  पसंदीदा नाव प्रकार *
                </Label>
                <Select 
                  value={participant.boatType} 
                  onValueChange={(value) => setParticipant({...participant, boatType: value})}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="नाव का प्रकार चुनें" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kayak">कायक</SelectItem>
                    <SelectItem value="rowing">रोइंग बोट</SelectItem>
                    <SelectItem value="any">कोई भी</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Event Information */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800 text-lg">कार्यक्रम की जानकारी</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-blue-700">तारीख</p>
                    <p>14 अगस्त 2025 (गुरुवार)</p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-700">समय</p>
                    <p>शाम 5:00 - 6:30</p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-700">स्थान</p>
                    <p>छोटा तालाब, भोपाल</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white rounded-lg border border-blue-300">
                  <h4 className="font-semibold text-blue-800 mb-2">महत्वपूर्ण निर्देश:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• कार्यक्रम से 30 मिनट पहले पहुंचें</li>
                    <li>• तैराकी की बुनियादी जानकारी आवश्यक</li>
                    <li>• सुरक्षा उपकरण प्रदान किए जाएंगे</li>
                    <li>• मोबाइल फोन वाटरप्रूफ कवर में रखें</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    className="mt-1"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-orange-800">
                    मैं पुष्टि करता/करती हूं कि मैंने सभी नियम और शर्तें पढ़ी हैं और स्वीकार करता/करती हूं। 
                    मैं समझता/समझती हूं कि यह एक जल क्रीड़ा गतिविधि है और इसमें जोखिम हो सकता है। 
                    मैं अपनी सुरक्षा की पूरी जिम्मेदारी लेता/लेती हूं।
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="text-center pt-4">
              <Button 
                onClick={handleSave}
                disabled={loading || !participant.name || !participant.email || !participant.phone}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 text-lg font-semibold"
              >
                {loading ? (
                  'सेव हो रहा है...'
                ) : (
                  <>
                    <Save className="mr-2" size={20} />
                    पंजीकरण सेव करें
                  </>
                )}
              </Button>
              
              {saved && (
                <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md inline-block">
                  ✅ पंजीकरण सफलतापूर्वक सेव हो गया!
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mt-8 shadow-xl bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-gray-800">संपर्क जानकारी</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">MPTB Nodal Officer</h4>
                <p className="text-gray-600">पर्यटन बोर्ड संपर्क</p>
                <p className="text-blue-600">📞 0755-XXXXXXX</p>
                <p className="text-blue-600">📧 mptb.nodal@mp.gov.in</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Sports Nodal Officer</h4>
                <p className="text-gray-600">खेल विभाग संपर्क</p>
                <p className="text-blue-600">📞 0755-XXXXXXX</p>
                <p className="text-blue-600">📧 sports.nodal@mp.gov.in</p>
              </div>
            </div>
          </CardContent>
        </Card>
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
