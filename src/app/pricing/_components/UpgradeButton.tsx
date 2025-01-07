import { Zap } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function UpgradeButton() {
    const CHECKOUT_URL = "https://code-nova.lemonsqueezy.com/buy/d5c86eb7-8060-4531-9a21-56992a639061"
  return (
    <Link
      href={CHECKOUT_URL}
      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white 
        bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg 
        hover:from-blue-600 hover:to-blue-700 transition-all"
    >
      <Zap className="w-5 h-5" />
      Upgrade to Pro
    </Link>

  )
}

export default UpgradeButton