import { NextRequest, NextResponse } from 'next/server'

interface AuditData {
  designScore: number
  conversionScore: number
  technicalScore: number
  overallScore: number
  grade: string
  competitors: Array<{
    name: string
    screenshot: string
    analysis: string
  }>
  recommendations: Array<{
    id: number
    title: string
    description: string
    pricing: string
  }>
}

// Demo analysis logic (real implementation would use actual APIs)
function analyzeDesign(url: string): number {
  return Math.floor(Math.random() * 30) + 70 // 70-100 for demo
}

function analyzeConversion(url: string): number {
  return Math.floor(Math.random() * 40) + 60 // 60-100 for demo
}

function analyzeTechnical(url: string): number {
  return Math.floor(Math.random() * 35) + 65 // 65-100 for demo
}

function calculateGrade(score: number): string {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'F'
}

function getCompetitors(): Array<{name: string, screenshot: string, analysis: string}> {
  return [
    {
      name: "Industry Leader Example",
      screenshot: "/competitors/leader.jpg",
      analysis: "Uses bold value proposition + social proof above fold"
    },
    {
      name: "High-Converter Example", 
      screenshot: "/competitors/converter.jpg",
      analysis: "Clear CTA hierarchy + trust builders throughout"
    }
  ]
}

function getRecommendations(): Array<{id: number, title: string, description: string, pricing: string}> {
  return [
    {
      id: 1,
      title: "Premium Website Redesign",
      description: "Complete redesign with conversion-focused design and automation",
      pricing: "$4,999"
    },
    {
      id: 2,
      title: "Lead Capture Automation",
      description: "Automated intake forms, scheduling, and SMS confirmations",
      pricing: "$2,999"
    },
    {
      id: 3,
      title: "Conversion Optimization",
      description: "A/B testing, form optimization, trust element enhancement",
      pricing: "$1,999"
    }
  ]
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Basic validation
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`)
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
    }

    // Generate audit data
    const designScore = analyzeDesign(url)
    const conversionScore = analyzeConversion(url)
    const technicalScore = analyzeTechnical(url)
    const overallScore = Math.round((designScore + conversionScore + technicalScore) / 3)
    
    const auditData: AuditData = {
      designScore,
      conversionScore,
      technicalScore,
      overallScore,
      grade: calculateGrade(overallScore),
      competitors: getCompetitors(),
      recommendations: getRecommendations()
    }

    return NextResponse.json(auditData)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}