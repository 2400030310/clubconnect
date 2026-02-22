import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FiUsers, 
  FiCalendar, 
  FiAward, 
  FiHeart,
  FiBookOpen,
  FiMapPin,
  FiMail,
  FiPhone,
  FiArrowRight,
  FiGithub,
  FiTwitter,
  FiLinkedin
} from 'react-icons/fi'

const About = () => {
  const stats = [
    { value: '50K+', label: 'Students', icon: '👥' },
    { value: '500+', label: 'Colleges', icon: '🏛️' },
    { value: '1000+', label: 'Events', icon: '🎪' },
    { value: '15', label: 'Categories', icon: '🎯' }
  ]

  const principles = [
    {
      title: 'Students First',
      description: 'Every feature we build starts with "will this actually help a student?" If not, we don\'t build it.'
    },
    {
      title: 'Keep It Simple',
      description: 'No complicated dashboards. No jargon. Just stuff that works.'
    },
    {
      title: 'Real Connections',
      description: 'We\'re not about numbers. We\'re about actual human connections that help students grow.'
    },
    {
      title: 'Free Forever',
      description: 'Students shouldn\'t have to pay to find opportunities. This will always be free.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            We're building something
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-purple-100 text-xl max-w-2xl mx-auto"
          >
            A place where students actually find what they're looking for. No fluff. No jargon. Just real opportunities.
          </motion.p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why we exist */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Why we built this</h2>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-xl">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              "I remember being in my second year of engineering, sitting in my hostel room, scrolling through 15 different WhatsApp groups trying to find if any hackathon was happening. There had to be a better way."
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              That's how ClubConnect started. Four of us, all from different colleges, facing the same problem. We built a simple website over a weekend, shared it on a few WhatsApp groups, and within a week, 2000 students had signed up.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Today, we're 50,000+ strong. But the goal remains the same: help students find opportunities that actually matter to them.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                PS
              </div>
              <div>
                <p className="font-medium text-gray-900">Priya Sharma</p>
                <p className="text-sm text-gray-500">Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What we believe in</h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{principle.title}</h3>
                <p className="text-sm text-gray-600">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact - Simple and direct */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Get in touch</h2>
            <p className="text-gray-500">We reply within a day. Usually faster.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-6 rounded-xl">
              <FiMail className="w-5 h-5 text-purple-600 mb-2" />
              <h3 className="font-medium text-gray-900 mb-1">Email</h3>
              <p className="text-sm text-gray-600 mb-2">Drop us a line anytime</p>
              <a href="mailto:hello@clubconnect.com" className="text-purple-600 text-sm hover:underline">
                hello@clubconnect.com
              </a>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <FiMapPin className="w-5 h-5 text-purple-600 mb-2" />
              <h3 className="font-medium text-gray-900 mb-1">Visit</h3>
              <p className="text-sm text-gray-600">We're mostly remote, but</p>
              <p className="text-sm text-gray-600">Bengaluru • Mumbai • Delhi</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <FiPhone className="w-5 h-5 text-purple-600 mb-2" />
              <h3 className="font-medium text-gray-900 mb-1">Call</h3>
              <p className="text-sm text-gray-600 mb-2">9 AM - 6 PM, Mon-Fri</p>
              <a href="tel:+919876543210" className="text-purple-600 text-sm hover:underline">
                +91 98765 43210
              </a>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <FiHeart className="w-5 h-5 text-purple-600 mb-2" />
              <h3 className="font-medium text-gray-900 mb-1">Social</h3>
              <p className="text-sm text-gray-600 mb-2">We post sometimes</p>
              <div className="flex gap-3">
                <a href="#" className="text-gray-400 hover:text-purple-600">
                  <FiTwitter className="w-4 h-4" />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-600">
                  <FiLinkedin className="w-4 h-4" />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-600">
                  <FiGithub className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-12 bg-purple-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Join 50,000+ students</h2>
          <p className="text-gray-600 mb-4">It's free. Always will be.</p>
          <Link to="/register">
            <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-md transition-all">
              Create your profile →
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default About