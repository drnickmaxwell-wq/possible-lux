'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Sparkles, 
  Star, 
  Clock, 
  Shield, 
  Heart, 
  ArrowRight,
  CheckCircle,
  Palette,
  Layers,
  Zap
} from 'lucide-react';

const benefits = [
  {
    icon: Star,
    title: 'Natural Beauty',
    description: 'Ultra-thin porcelain that mimics natural tooth enamel perfectly.'
  },
  {
    icon: Shield,
    title: 'Stain Resistant',
    description: 'Porcelain veneers resist staining from coffee, wine, and tobacco.'
  },
  {
    icon: Clock,
    title: 'Long Lasting',
    description: 'With proper care, veneers can last 15-20 years or more.'
  },
  {
    icon: Zap,
    title: 'Minimal Prep',
    description: 'Conservative treatment preserves most of your natural tooth.'
  }
];

const beforeAfter = [
  {
    issue: 'Discolored Teeth',
    solution: 'Bright, white smile that resists future staining'
  },
  {
    issue: 'Chipped or Worn Teeth',
    solution: 'Smooth, perfectly shaped teeth with natural contours'
  },
  {
    issue: 'Gaps Between Teeth',
    solution: 'Seamless smile with properly spaced, uniform teeth'
  },
  {
    issue: 'Misshapen Teeth',
    solution: 'Beautifully proportioned teeth that complement your face'
  },
  {
    issue: 'Minor Misalignment',
    solution: 'Straight-appearing smile without orthodontic treatment'
  },
  {
    issue: 'Uneven Tooth Length',
    solution: 'Harmonious smile line with perfectly balanced proportions'
  }
];

const process = [
  {
    step: 1,
    title: 'Consultation & Design',
    description: 'We discuss your goals and create a digital smile design to preview your new look.',
    icon: Palette
  },
  {
    step: 2,
    title: 'Preparation',
    description: 'Minimal tooth preparation (0.5mm) and precise digital impressions.',
    icon: Layers
  },
  {
    step: 3,
    title: 'Fabrication',
    description: 'Custom veneers crafted by master ceramists using premium porcelain.',
    icon: Sparkles
  },
  {
    step: 4,
    title: 'Placement',
    description: 'Precise bonding and final adjustments for perfect fit and appearance.',
    icon: Star
  }
];

const candidateChecklist = [
  'Healthy teeth and gums',
  'Sufficient tooth enamel',
  'Realistic expectations',
  'Good oral hygiene habits',
  'No severe teeth grinding',
  'Commitment to maintenance'
];

export default function VeneersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-teal-600/10" />
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 mb-6">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Porcelain Veneers
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Transform your smile with ultra-thin, custom-crafted porcelain veneers. 
              Achieve the perfect smile you've always dreamed of with our luxury veneer treatments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Why Choose Porcelain Veneers?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Porcelain veneers offer the perfect combination of beauty, durability, 
              and natural appearance for a stunning smile transformation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Transform Your Smile
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how porcelain veneers can address various cosmetic concerns 
              and give you the confident smile you deserve.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beforeAfter.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6"
              >
                <div className="text-center mb-4">
                  <div className="inline-flex p-2 rounded-lg bg-red-100 text-red-600 text-sm font-medium mb-2">
                    Before
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">{item.issue}</h3>
                </div>
                <div className="flex justify-center mb-4">
                  <ArrowRight className="w-6 h-6 text-blue-500" />
                </div>
                <div className="text-center">
                  <div className="inline-flex p-2 rounded-lg bg-green-100 text-green-600 text-sm font-medium mb-2">
                    After
                  </div>
                  <p className="text-slate-600 leading-relaxed">{item.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              The Veneer Process
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our streamlined process ensures beautiful results with minimal discomfort 
              and maximum precision at every step.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="relative mb-6">
                    <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gold-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Candidate Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Are You a Candidate?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Most people are excellent candidates for porcelain veneers. 
              Here's what we look for during your consultation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {candidateChecklist.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6"
              >
                <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                <span className="text-slate-700 font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready for Your Dream Smile?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Discover how porcelain veneers can transform your smile and boost your confidence. 
              Schedule a consultation to see if veneers are right for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-lg"
                >
                  Book Veneer Consultation
                </motion.button>
              </Link>
              <Link href="/treatments">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Explore Other Treatments
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

