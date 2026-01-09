'use client';

import { motion } from 'framer-motion';
import { Check, Star, Crown, Sparkles } from 'lucide-react';

interface SponsorshipTierCardProps {
  name: 'Standard' | 'Featured' | 'Premium' | 'Platinum';
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  isPremium?: boolean;
  onSelect: () => void;
}

export default function SponsorshipTierCard({
  name,
  price,
  description,
  features,
  isPopular = false,
  isPremium = false,
  onSelect,
}: SponsorshipTierCardProps) {
  const getTierStyles = () => {
    switch (name) {
      case 'Standard':
        return {
          container: 'bg-white border-2 border-teal-500',
          header: 'text-slate-900',
          price: 'text-teal-600',
          description: 'text-slate-600',
          feature: 'text-slate-700',
          checkIcon: 'text-teal-500',
          button: 'bg-teal-500 hover:bg-teal-600 text-white',
          icon: null,
        };
      case 'Featured':
        return {
          container: 'bg-teal-50 border-2 border-teal-400 shadow-lg',
          header: 'text-slate-900',
          price: 'text-teal-600',
          description: 'text-slate-600',
          feature: 'text-slate-700',
          checkIcon: 'text-teal-500',
          button: 'bg-teal-500 hover:bg-teal-600 text-white',
          icon: <Star className="w-5 h-5 text-teal-500" />,
        };
      case 'Premium':
        return {
          container: 'bg-gradient-to-br from-teal-500 to-emerald-500 border-0',
          header: 'text-white',
          price: 'text-white',
          description: 'text-teal-100',
          feature: 'text-white',
          checkIcon: 'text-white',
          button: 'bg-white hover:bg-slate-100 text-teal-600',
          icon: <Crown className="w-5 h-5 text-white" />,
        };
      case 'Platinum':
        return {
          container: 'bg-slate-900 border-2 border-amber-400',
          header: 'text-white',
          price: 'text-amber-400',
          description: 'text-slate-300',
          feature: 'text-slate-200',
          checkIcon: 'text-amber-400',
          button: 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-semibold',
          icon: <Sparkles className="w-5 h-5 text-amber-400" />,
        };
      default:
        return {
          container: 'bg-white border-2 border-slate-200',
          header: 'text-slate-900',
          price: 'text-teal-600',
          description: 'text-slate-600',
          feature: 'text-slate-700',
          checkIcon: 'text-teal-500',
          button: 'bg-teal-500 hover:bg-teal-600 text-white',
          icon: null,
        };
    }
  };

  const styles = getTierStyles();

  return (
    <motion.div
      className={`relative rounded-2xl p-6 ${styles.container} flex flex-col h-full`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.03,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      }}
      transition={{ duration: 0.3 }}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-teal-500 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md">
            Popular
          </span>
        </div>
      )}

      {isPremium && name === 'Platinum' && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 text-sm font-semibold px-4 py-1 rounded-full shadow-md">
            Exclusive
          </span>
        </div>
      )}

      <div className="flex items-center gap-2 mb-4">
        {styles.icon}
        <h3 className={`text-xl font-bold ${styles.header}`}>{name}</h3>
      </div>

      <div className="mb-4">
        <span className={`text-4xl font-bold ${styles.price}`}>
          ${price.toLocaleString()}
        </span>
        <span className={`text-lg ${styles.description}`}>/mo</span>
      </div>

      <p className={`mb-6 ${styles.description}`}>{description}</p>

      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${styles.checkIcon}`} />
            <span className={`text-sm ${styles.feature}`}>{feature}</span>
          </li>
        ))}
      </ul>

      <motion.button
        onClick={onSelect}
        className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${styles.button}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {name === 'Platinum' ? 'Get Started' : 'Select Plan'}
      </motion.button>
    </motion.div>
  );
}
