'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PretextLogoProps {
  text: string
  isDropping: boolean
  className?: string
}

export default function PretextLogo({ text, isDropping, className }: PretextLogoProps) {
  const [containerWidth, setContainerWidth] = useState(1200)

  useEffect(() => {
    const updateWidth = () => setContainerWidth(window.innerWidth)
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // 1. Prepare: High-performance measurement
  const prepared = useMemo(() => {
    // Note: Pretext 0.0.4 prepare takes (text, font, options)
    return prepareWithSegments(text, '900 128px Figtree') as any
  }, [text])

  // 2. Layout: Pure arithmetic wrapped lines
  const layoutResult = useMemo(() => {
    return layoutWithLines(prepared, containerWidth, 140) as any
  }, [prepared, containerWidth])

  return (
    <div 
      className={cn("relative mx-auto pointer-events-none select-none", className)}
      style={{ height: `${layoutResult.height}px`, width: `${layoutResult.width || 800}px` }}
    >
      {layoutResult.lines.map((line: any, lineIdx: number) => {
        let currentX = 0
        const lineSegments = prepared.segments.slice(line.start.segmentIndex, line.end.segmentIndex)
        const lineWidths = prepared.widths.slice(line.start.segmentIndex, line.end.segmentIndex)

        return (
          <div key={lineIdx} className="absolute inset-0">
            {lineSegments.map((segmentText: string, segIdx: number) => {
               const x = currentX
               const width = lineWidths[segIdx]
               currentX += width

               // Further split words into characters for the "drop" effect
               return segmentText.split('').map((char, charIdx) => {
                 const isGray = char === 'C' || char === 'h' || char === 'a' || char === 't'
                 if (char === ' ') return null

                 return (
                   <motion.span
                     key={`${lineIdx}-${segIdx}-${charIdx}`}
                     initial={false}
                     animate={isDropping ? { 
                       y: 800 + Math.random() * 400,
                       opacity: 0,
                       rotate: Math.random() * 90 - 45,
                       transition: { 
                         duration: 0.8 + Math.random() * 0.4,
                         ease: [0.32, 0, 0.67, 0],
                         delay: Math.random() * 0.3
                       }
                     } : { 
                       y: 0, 
                       opacity: 1,
                       rotate: 0,
                     }}
                     className={cn(
                       "absolute font-bold tracking-tighter inline-block whitespace-pre",
                       isGray ? "text-zinc-500" : "text-zinc-100"
                     )}
                     style={{
                       left: `${x + (charIdx * (width / segmentText.length))}px`,
                       top: `${lineIdx * 140}px`,
                       fontSize: '128px',
                       lineHeight: '1',
                     }}
                   >
                     {char}
                   </motion.span>
                 )
               })
            })}
          </div>
        )
      })}
    </div>
  )
}
