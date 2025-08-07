"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ContentData, getDefaultContent, ParticipantData, MPTBTaskData, SportsTaskData } from '@/lib/auth'
import { Save, LogOut, Eye, Settings, FileText, Users, Flag, Heart, Trophy, Download, Database } from 'lucide-react'
import Image from 'next/image'

export default function AdminPage() {
  const [content, setContent] = useState<ContentData>(getDefaultContent())
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('content')

  // Initialize these as state variables with empty arrays as default,
  // and populate them on the client-side within useEffect.
  const [participants, setParticipants] = useState<ParticipantData[]>([]);
  const [mptbTasks, setMptbTasks] = useState<MPTBTaskData[]>([]);
  const [sportsTasks, setSportsTasks] = useState<SportsTaskData[]>([]);

  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuthenticated = localStorage.getItem('isAuthenticated')
      const userRole = localStorage.getItem('userRole')
      
      if (!isAuthenticated || userRole !== 'cms') {
        router.push('/login')
        return
      }

      // Load saved content from localStorage
      const savedContent = localStorage.getItem('cmsContent')
      if (savedContent) {
        setContent(JSON.parse(savedContent))
      }

      // Load other data from localStorage
      setParticipants(JSON.parse(localStorage.getItem('allParticipants') || '[]'));
      setMptbTasks(JSON.parse(localStorage.getItem('mptbTasks') || '[]'));
      setSportsTasks(JSON.parse(localStorage.getItem('sportsTasks') || '[]'));
    }
  }, [router])

  const handleSave = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('cmsContent', JSON.stringify(content))
    }
    setSaved(true)
    setLoading(false)
    
    setTimeout(() => setSaved(false), 3000)
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('userRole')
      localStorage.removeItem('userName')
    }
    router.push('/login')
  }

  const handlePreview = () => {
    window.open('/', '_blank')
  }

  const exportData = () => {
    if (typeof window !== 'undefined') {
      const allData = {
        content: JSON.parse(localStorage.getItem('cmsContent') || '{}'),
        participants: JSON.parse(localStorage.getItem('allParticipants') || '[]'),
        mptbTasks: JSON.parse(localStorage.getItem('mptbTasks') || '[]'),
        sportsTasks: JSON.parse(localStorage.getItem('sportsTasks') || '[]'),
        exportDate: new Date().toISOString()
      }
      
      const dataStr = JSON.stringify(allData, null, 2)
      const dataBlob = new Blob([dataStr], {type: 'application/json'})
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `tiranga-boat-rally-data-${new Date().toISOString().split('T')[0]}.json`
      link.click()
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
                    CMS डैशबोर्ड
                  </h1>
                  <p className="text-orange-600">तिरंगा बोट रैली प्रबंधन</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handlePreview}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Eye size={16} />
                  प्रीव्यू
                </Button>
                <Button 
                  onClick={exportData}
                  variant="outline"
                  className="flex items-center gap-2 text-green-600 border-green-300 hover:bg-green-50"
                >
                  <Download size={16} />
                  डेटा एक्सपोर्ट
                </Button>
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

      {/* Tab Navigation */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex gap-4 mb-6">
          <Button 
            onClick={() => setActiveTab('content')}
            variant={activeTab === 'content' ? 'default' : 'outline'}
            className="flex items-center gap-2"
          >
            <Settings size={16} />
            कंटेंट प्रबंधन
          </Button>
          <Button 
            onClick={() => setActiveTab('data')}
            variant={activeTab === 'data' ? 'default' : 'outline'}
            className="flex items-center gap-2"
          >
            <Database size={16} />
            डेटा देखें
          </Button>
        </div>

        {activeTab === 'content' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Header Section */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Settings className="text-orange-500" size={20} />
                  हेडर सेक्शन
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-700 font-semibold">पर्यटन बोर्ड शीर्षक</Label>
                  <Input
                    value={content.tourismBoardTitle}
                    onChange={(e) => setContent({...content, tourismBoardTitle: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-700 font-semibold">पर्यटन बोर्ड उप-शीर्षक</Label>
                  <Input
                    value={content.tourismBoardSubtitle}
                    onChange={(e) => setContent({...content, tourismBoardSubtitle: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Hero Section */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Flag className="text-green-500" size={20} />
                  हीरो सेक्शन
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-700 font-semibold">मुख्य शीर्षक</Label>
                  <Input
                    value={content.heroTitle}
                    onChange={(e) => setContent({...content, heroTitle: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-700 font-semibold">उप शीर्षक</Label>
                  <Textarea
                    value={content.heroSubtitle}
                    onChange={(e) => setContent({...content, heroSubtitle: e.target.value})}
                    className="mt-1"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Event Details */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <FileText className="text-blue-500" size={20} />
                  कार्यक्रम विवरण
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-700 font-semibold">तारीख</Label>
                  <Input
                    value={content.eventDate}
                    onChange={(e) => setContent({...content, eventDate: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-700 font-semibold">समय</Label>
                  <Input
                    value={content.eventTime}
                    onChange={(e) => setContent({...content, eventTime: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-700 font-semibold">स्थान</Label>
                  <Input
                    value={content.eventLocation}
                    onChange={(e) => setContent({...content, eventLocation: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Vision Section */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Heart className="text-red-500" size={20} />
                  संकल्प सेक्शन
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-700 font-semibold">संकल्प शीर्षक</Label>
                  <Input
                    value={content.visionTitle}
                    onChange={(e) => setContent({...content, visionTitle: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-700 font-semibold">संकल्प टेक्स्ट</Label>
                  <Textarea
                    value={content.visionText}
                    onChange={(e) => setContent({...content, visionText: e.target.value})}
                    rows={4}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Event Highlights */}
            <Card className="shadow-xl lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Trophy className="text-green-500" size={20} />
                  कार्यक्रम की विशेषताएं
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-700 font-semibold">विशेषताएं शीर्षक</Label>
                  <Input
                    value={content.highlightsTitle}
                    onChange={(e) => setContent({...content, highlightsTitle: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-700 font-semibold">विशेषता 1</Label>
                    <Input
                      value={content.highlight1}
                      onChange={(e) => setContent({...content, highlight1: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 font-semibold">विशेषता 2</Label>
                    <Input
                      value={content.highlight2}
                      onChange={(e) => setContent({...content, highlight2: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 font-semibold">विशेषता 3</Label>
                    <Input
                      value={content.highlight3}
                      onChange={(e) => setContent({...content, highlight3: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 font-semibold">विशेषता 4</Label>
                    <Input
                      value={content.highlight4}
                      onChange={(e) => setContent({...content, highlight4: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements Section */}
            <Card className="shadow-xl lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Users className="text-purple-500" size={20} />
                  आवश्यक सहयोग सेक्शन
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-700 font-semibold">सहयोग शीर्षक</Label>
                  <Input
                    value={content.requirementsTitle}
                    onChange={(e) => setContent({...content, requirementsTitle: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold">आवश्यकता 1 शीर्षक</Label>
                    <Input
                      value={content.requirement1Title}
                      onChange={(e) => setContent({...content, requirement1Title: e.target.value})}
                    />
                    <Label className="text-gray-700 font-semibold">आवश्यकता 1 विवरण</Label>
                    <Textarea
                      value={content.requirement1Text}
                      onChange={(e) => setContent({...content, requirement1Text: e.target.value})}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold">आवश्यकता 2 शीर्षक</Label>
                    <Input
                      value={content.requirement2Title}
                      onChange={(e) => setContent({...content, requirement2Title: e.target.value})}
                    />
                    <Label className="text-gray-700 font-semibold">आवश्यकता 2 विवरण</Label>
                    <Textarea
                      value={content.requirement2Text}
                      onChange={(e) => setContent({...content, requirement2Text: e.target.value})}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold">आवश्यकता 3 शीर्षक</Label>
                    <Input
                      value={content.requirement3Title}
                      onChange={(e) => setContent({...content, requirement3Title: e.target.value})}
                    />
                    <Label className="text-gray-700 font-semibold">आवश्यकता 3 विवरण</Label>
                    <Textarea
                      value={content.requirement3Text}
                      onChange={(e) => setContent({...content, requirement3Text: e.target.value})}
                      rows={2}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Commitment Section */}
            <Card className="shadow-xl lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Trophy className="text-blue-500" size={20} />
                  प्रतिबद्धता सेक्शन
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-700 font-semibold">प्रतिबद्धता शीर्षक</Label>
                  <Input
                    value={content.commitmentTitle}
                    onChange={(e) => setContent({...content, commitmentTitle: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold">प्रतिबद्धता 1 शीर्षक</Label>
                    <Input
                      value={content.commitment1Title}
                      onChange={(e) => setContent({...content, commitment1Title: e.target.value})}
                    />
                    <Label className="text-gray-700 font-semibold">प्रतिबद्धता 1 विवरण</Label>
                    <Textarea
                      value={content.commitment1Text}
                      onChange={(e) => setContent({...content, commitment1Text: e.target.value})}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold">प्रतिबद्धता 2 शीर्षक</Label>
                    <Input
                      value={content.commitment2Title}
                      onChange={(e) => setContent({...content, commitment2Title: e.target.value})}
                    />
                    <Label className="text-gray-700 font-semibold">प्रतिबद्धता 2 विवरण</Label>
                    <Textarea
                      value={content.commitment2Text}
                      onChange={(e) => setContent({...content, commitment2Text: e.target.value})}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold">प्रतिबद्धता 3 शीर्षक</Label>
                    <Input
                      value={content.commitment3Title}
                      onChange={(e) => setContent({...content, commitment3Title: e.target.value})}
                    />
                    <Label className="text-gray-700 font-semibold">प्रतिबद्धता 3 विवरण</Label>
                    <Textarea
                      value={content.commitment3Text}
                      onChange={(e) => setContent({...content, commitment3Text: e.target.value})}
                      rows={2}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action Section */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Heart className="text-pink-500" size={20} />
                  कॉल टू एक्शन
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-700 font-semibold">CTA शीर्षक</Label>
                  <Input
                    value={content.ctaTitle}
                    onChange={(e) => setContent({...content, ctaTitle: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-700 font-semibold">CTA टेक्स्ट</Label>
                  <Textarea
                    value={content.ctaText}
                    onChange={(e) => setContent({...content, ctaText: e.target.value})}
                    rows={3}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-700 font-semibold">बटन 1 टेक्स्ट</Label>
                    <Input
                      value={content.ctaButton1}
                      onChange={(e) => setContent({...content, ctaButton1: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 font-semibold">बटन 2 टेक्स्ट</Label>
                    <Input
                      value={content.ctaButton2}
                      onChange={(e) => setContent({...content, ctaButton2: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quote Section */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <FileText className="text-indigo-500" size={20} />
                  प्रेरणादायक उद्धरण
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-700 font-semibold">उद्धरण</Label>
                  <Textarea
                    value={content.quote}
                    onChange={(e) => setContent({...content, quote: e.target.value})}
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <div>
                  <Label className="text-gray-700 font-semibold">लेखक</Label>
                  <Input
                    value={content.quoteAuthor}
                    onChange={(e) => setContent({...content, quoteAuthor: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="shadow-xl border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-500 p-3 rounded-full">
                      <Users className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">प्रतिभागी</h3>
                      <p className="text-2xl font-bold text-blue-600">{participants.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-500 p-3 rounded-full">
                      <Trophy className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">MPTB कार्य</h3>
                      <p className="text-2xl font-bold text-green-600">{mptbTasks.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-500 p-3 rounded-full">
                      <Flag className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">Sports कार्य</h3>
                      <p className="text-2xl font-bold text-purple-600">{sportsTasks.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-500 p-3 rounded-full">
                      <Heart className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">स्वीकृत</h3>
                      <p className="text-2xl font-bold text-orange-600">
                        {participants.filter(p => p.status === 'approved').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Participants Data */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Users className="text-blue-500" size={20} />
                  प्रतिभागी डेटा ({participants.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {participants.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">ID</th>
                          <th className="text-left p-2">नाम</th>
                          <th className="text-left p-2">ईमेल</th>
                          <th className="text-left p-2">फोन</th>
                          <th className="text-left p-2">आयु</th>
                          <th className="text-left p-2">अनुभव</th>
                          <th className="text-left p-2">नाव प्रकार</th>
                          <th className="text-left p-2">स्थिति</th>
                        </tr>
                      </thead>
                      <tbody>
                        {participants.map((participant) => (
                          <tr key={participant.id} className="border-b hover:bg-gray-50">
                            <td className="p-2 font-mono text-xs">{participant.id}</td>
                            <td className="p-2">{participant.name}</td>
                            <td className="p-2">{participant.email}</td>
                            <td className="p-2">{participant.phone}</td>
                            <td className="p-2">{participant.age}</td>
                            <td className="p-2">{participant.experience}</td>
                            <td className="p-2">{participant.boatType}</td>
                            <td className="p-2">
                              <span className={`px-2 py-1 rounded text-xs ${
                                participant.status === 'approved' ? 'bg-green-100 text-green-800' :
                                participant.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {participant.status === 'approved' ? 'स्वीकृत' :
                                 participant.status === 'rejected' ? 'अस्वीकृत' : 'लंबित'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">कोई प्रतिभागी डेटा उपलब्ध नहीं है</p>
                )}
              </CardContent>
            </Card>

            {/* MPTB Tasks Data */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Trophy className="text-green-500" size={20} />
                  MPTB कार्य डेटा ({mptbTasks.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {mptbTasks.length > 0 ? (
                  <div className="space-y-4">
                    {mptbTasks.map((task) => (
                      <div key={task.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{task.task}</h4>
                          <span className={`px-2 py-1 rounded text-xs ${
                            task.status === 'completed' ? 'bg-green-100 text-green-800' :
                            task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {task.status === 'completed' ? 'पूर्ण' :
                             task.status === 'in-progress' ? 'प्रगति में' : 'लंबित'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                        {task.notes && (
                          <p className="text-gray-500 text-sm"><strong>टिप्पणी:</strong> {task.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">कोई MPTB कार्य डेटा उपलब्ध नहीं है</p>
                )}
              </CardContent>
            </Card>

            {/* Sports Tasks Data */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Flag className="text-purple-500" size={20} />
                  Sports कार्य डेटा ({sportsTasks.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {sportsTasks.length > 0 ? (
                  <div className="space-y-4">
                    {sportsTasks.map((task) => (
                      <div key={task.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{task.task}</h4>
                          <span className={`px-2 py-1 rounded text-xs ${
                            task.status === 'completed' ? 'bg-green-100 text-green-800' :
                            task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {task.status === 'completed' ? 'पूर्ण' :
                             task.status === 'in-progress' ? 'प्रगति में' : 'लंबित'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                        {task.boatsAllocated !== undefined && (
                          <p className="text-blue-600 text-sm"><strong>नावें:</strong> {task.boatsAllocated}/50</p>
                        )}
                        {task.participantsAssigned !== undefined && (
                          <p className="text-purple-600 text-sm"><strong>प्रतिभागी:</strong> {task.participantsAssigned}</p>
                        )}
                        {task.notes && (
                          <p className="text-gray-500 text-sm"><strong>टिप्पणी:</strong> {task.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">कोई Sports कार्य डेटा उपलब्ध नहीं है</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Save Button - Only show for content tab */}
        {activeTab === 'content' && (
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
        )}
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
