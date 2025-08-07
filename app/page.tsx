"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Waves, Calendar, Clock, MapPin, Users, Flag, Heart, Trophy, Anchor } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { ContentData, getDefaultContent } from '@/lib/auth'

export default function TirangaBoatRallyProposal() {
const [content, setContent] = useState<ContentData>(getDefaultContent())

useEffect(() => {
  // Load content from localStorage if available
  const savedContent = localStorage.getItem('cmsContent')
  if (savedContent) {
    setContent(JSON.parse(savedContent))
  }
}, [])

return (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
    {/* Header with Tricolor Theme */}
    <div className="bg-gradient-to-r from-orange-500 via-white to-green-500 p-1">
      <div className="bg-white mx-1 rounded-lg">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Link href="/login" className="group">
                <Image 
                  src="/images/mp-tourism-logo.png" 
                  alt="MP Tourism Logo" 
                  width={100} 
                  height={100}
                  className="rounded-full shadow-lg bg-white p-2 group-hover:shadow-xl transition-shadow cursor-pointer"
                />
              </Link>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {content.tourismBoardTitle}
                </h1>
                <p className="text-orange-600 font-semibold">{content.tourismBoardSubtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Image 
                src="/images/sports-logo.png" 
                alt="Sports Department Logo" 
                width={180} 
                height={120}
                className="rounded-lg shadow-md bg-white p-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Hero Section */}
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 text-orange-300 opacity-30">
          <Waves size={100} />
        </div>
        <div className="absolute bottom-10 right-10 text-green-300 opacity-30">
          <Anchor size={80} />
        </div>
        <div className="absolute top-1/2 left-1/4 text-white opacity-20">
          <Flag size={60} />
        </div>
      </div>
      
      <div className="relative container mx-auto px-6 py-16 text-center">
        <div className="flex justify-center mb-6">
          <Badge className="bg-orange-500 text-white px-6 py-2 text-lg font-bold flex items-center gap-2">
            <Image src="/images/tiranga-flag.png" alt="Tiranga" width={24} height={16} className="rounded-sm" />
            हर घर तिरंगा अभियान 2025
            <Image src="/images/tiranga-flag.png" alt="Tiranga" width={24} height={16} className="rounded-sm" />
          </Badge>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {content.heroTitle.split(' ').map((word, index) => (
            <span key={index} className={
              index === 0 ? "text-orange-300" : 
              index === 1 ? "text-white" : 
              "text-green-300"
            }>
              {word}{" "}
            </span>
          ))}
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
          {content.heroSubtitle}
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <Calendar className="text-orange-300" size={20} />
            <span className="font-semibold">{content.eventDate}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <Clock className="text-green-300" size={20} />
            <span className="font-semibold">{content.eventTime}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <MapPin className="text-white" size={20} />
            <span className="font-semibold">{content.eventLocation}</span>
          </div>
        </div>
      </div>
    </div>

    {/* Floating Tiranga Elements */}
    <div className="absolute top-20 right-20 opacity-60">
      <Image src="/images/tiranga-flag.png" alt="Tiranga" width={60} height={40} className="rounded-md shadow-lg animate-pulse" />
    </div>
    <div className="absolute bottom-32 left-16 opacity-50">
      <Image src="/images/tiranga-flag.png" alt="Tiranga" width={40} height={27} className="rounded-md shadow-lg animate-bounce" />
    </div>

    {/* Main Content */}
    <div className="container mx-auto px-6 py-12">
      {/* Vision Section */}
      <Card className="mb-8 border-l-4 border-l-orange-500 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full">
              <Heart className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{content.visionTitle}</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            {content.visionText}
          </p>
        </CardContent>
      </Card>

      {/* Event Details Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Event Highlights */}
        <Card className="shadow-xl border-t-4 border-t-green-500">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-full">
                <Trophy className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{content.highlightsTitle}</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-orange-100 p-1 rounded-full mt-1">
                  <Flag className="text-orange-600" size={16} />
                </div>
                <span className="text-gray-700">{content.highlight1}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-green-100 p-1 rounded-full mt-1">
                  <Users className="text-green-600" size={16} />
                </div>
                <span className="text-gray-700">{content.highlight2}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-blue-100 p-1 rounded-full mt-1">
                  <Waves className="text-blue-600" size={16} />
                </div>
                <span className="text-gray-700">{content.highlight3}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-red-100 p-1 rounded-full mt-1">
                  <Heart className="text-red-600" size={16} />
                </div>
                <span className="text-gray-700">{content.highlight4}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card className="shadow-xl border-t-4 border-t-blue-500">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
                <Anchor className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{content.requirementsTitle}</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-l-orange-400">
                <h4 className="font-semibold text-orange-800 mb-2">{content.requirement1Title}</h4>
                <p className="text-orange-700">{content.requirement1Text}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-l-green-400">
                <h4 className="font-semibold text-green-800 mb-2">{content.requirement2Title}</h4>
                <p className="text-green-700">{content.requirement2Text}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-l-blue-400">
                <h4 className="font-semibold text-blue-800 mb-2">{content.requirement3Title}</h4>
                <p className="text-blue-700">{content.requirement3Text}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Our Commitment */}
      <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 shadow-xl">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
            {content.commitmentTitle}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flag className="text-white" size={24} />
              </div>
              <h4 className="font-semibold mb-2">{content.commitment1Title}</h4>
              <p className="text-gray-600">{content.commitment1Text}</p>
            </div>
            <div className="text-center">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={24} />
              </div>
              <h4 className="font-semibold mb-2">{content.commitment2Title}</h4>
              <p className="text-gray-600">{content.commitment2Text}</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-white" size={24} />
              </div>
              <h4 className="font-semibold mb-2">{content.commitment3Title}</h4>
              <p className="text-gray-600">{content.commitment3Text}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-orange-500 via-white to-green-500 p-1 shadow-2xl">
        <div className="bg-white m-1 rounded-lg">
          <CardContent className="p-8 text-center">
            <h3 className="text-3xl font-bold mb-4 text-gray-800">
              {content.ctaTitle}
            </h3>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              {content.ctaText}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
                {content.ctaButton1}
              </Button>
              <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 px-8 py-3 text-lg">
                {content.ctaButton2}
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Footer Quote */}
      <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl">
        <blockquote className="text-2xl font-bold text-gray-800 mb-4">
          "{content.quote}"
        </blockquote>
        <p className="text-lg text-gray-600">- {content.quoteAuthor}</p>
        <div className="flex justify-center items-center mt-6 space-x-4">
          <Image src="/images/tiranga-flag.png" alt="Tiranga" width={48} height={32} className="rounded-md shadow-lg" />
          <span className="text-4xl">🚣‍♂️</span>
          <span className="text-4xl">💙</span>
        </div>
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
