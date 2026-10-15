'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface AccordionItemProps {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItemProps[]
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleItem(index)
    }
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-[#D9E2EC] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <button
            onClick={() => toggleItem(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            aria-expanded={openIndex === index}
            className="w-full flex items-center justify-between p-4 sm:p-6 text-left bg-white hover:bg-[#F4F7FA] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-inset"
          >
            <h3 className="font-semibold text-[#172B3A] text-base sm:text-lg pr-4 break-words">{item.question}</h3>
            <ChevronDown
              className={`w-5 h-5 text-[#526575] transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''
                }`}
              aria-hidden="true"
            />
          </button>
          <div
            className={`px-4 sm:px-6 pb-4 sm:pb-6 bg-white transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
              }`}
          >
            <p className="text-sm sm:text-base text-[#526575] leading-relaxed pt-2">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
