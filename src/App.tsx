import React, { useState } from 'react'
import { Textarea } from './components/ui/textarea'
import { nanoid } from 'nanoid'

import { cn } from '@/lib/utils'

function App() {
  const [text, setText] = useState('')
  const [lines, setLines] = useState<{ text: string; id: string }[]>([])
  console.warn(lines)

  return (
    <div className="bg-background min-h-screen w-full">
      <div className="max-w-5xl mx-auto flex flex-col p-8 relative">
        <Textarea
          placeholder="What's on your mind ?"
          value={text}
          className="z-10"
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              setLines([{ text, id: nanoid() }, ...lines])
              setText('')
              e.preventDefault()
            }
          }}
        />

        <div className="flex flex-rox pl-2 space-x-8 py-4">
          <div className="flex flex-col space-y-2">
            {lines.map((line, index) => (
              <Thought key={line.id} text={line.text} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const Thought: React.FC<{ text: string; index: number }> = ({
  text,
  index,
}) => {
  const [isBlur, setIsBlur] = useState(false)

  setTimeout(() => {
    setIsBlur(true)
  }, 700)

  const blur = getBlurValue(index)

  return (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', {
        'hover:!blur-none opacity-30 hover:opacity-100 transition-all duration-700':
          isBlur,
        [blur]: isBlur,
      })}
      {...(isBlur && { style: { filter: blur } })}
    >
      {text}
    </p>
  )
}

const getBlurValue = (index: number) => {
  const min = Math.max(index, 4)
  const max = Math.min(20, min)

  return `blur(${max}px)`
}

export default App
