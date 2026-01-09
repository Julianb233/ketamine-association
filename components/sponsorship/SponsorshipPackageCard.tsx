'use client';

import { motion } from 'framer-motion';
import { Check, Mail, Calendar, GraduationCap, Globe, ArrowRight } from 'lucide-react';

interface SponsorshipPackageCardProps {
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  icon: 'newsletter' | 'event' | 'academy' | 'platform';
  onSelect: () => void;
}

const iconMap = {
  newsletter: Mail,
  event: Calendar,
  academy: GraduationCap,
  platform: Globe,
};

const colorMap = {
  newsletter: {
    bg: 'bg-blue-50',
    icon: 'bg-blue-100 text-blue-600',
    border: 'border-blue-200',
    button: 'bg-blue-600 hover:bg-blue-700',
  },
  event: {
    bg: 'bg-purple-50',
    icon: 'bg-purple-100 text-purple-600',
    border: 'border-purple-200',
    button: 'bg-purple-600 hover:bg-purple-700',
  },
  academy: {
    bg: 'bg-amber-50',
    icon: 'bg-amber-100 text-amber-600',
    border: 'border-amber-200',
    button: 'bg-amber-600 hover:bg-amber-700',
  },
  platform: {
    bg: 'bg-teal-50',
    icon: 'bg-teal-100 text-teal-600',
    border: 'border-teal-200',
    button: 'bg-teal-600 hover:bg-teal-700',
  },
};

export function SponsorshipPackageCard({
  name,
  price,
  priceNote,
  description,
  features,
  icon,
  onSelect,
}: SponsorshipPackageCardProps) {
  const Icon = iconMap[icon];
  const colors = colorMap[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-2xl border-2 ${colors.border} ${colors.bg} p-6 h-full flex flex-col`}
    >
      <div className={`w-14 h-14 rounded-xl ${colors.icon} flex items-center justify-center mb-4`}>
        <Icon className="w-7 h-7" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">{name}</h3>

      <div className="mb-4">
        <span className="text-3xl font-bold text-slate-900">{price}</span>
        <span className="text-slate-500 text-sm ml-1">{priceNote}</span>
      </div>

      <p className="text-slate-600 mb-6">{description}</p>

      <ul className="space-y-3 mb-6 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
            <span className="text-slate-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onSelect}
        className={`w-full py-3 px-4 rounded-xl text-white font-medium ${colors.button} transition-colors flex items-center justify-center gap-2`}
      >
        Learn More
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}

export default SponsorshipPackageCard;
