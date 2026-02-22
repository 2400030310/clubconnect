import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiCalendar, 
  FiUsers, 
  FiAward, 
  FiClock,
  FiMapPin,
  FiBookOpen,
  FiTrendingUp,
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronRight,
  FiStar,
  FiHeart,
  FiCamera,
  FiMic,
  FiMusic,
  FiCpu,
  FiActivity,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiFilter,
  FiSearch,
  FiGrid,
  FiList,
  FiCheckSquare,
  FiSquare
} from 'react-icons/fi'  // Added FiCheckSquare and FiSquare
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'  // Added for notifications

const StudentDashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const notificationsSectionRef = useRef(null)
  
  // ===== NEW STATE FOR BULK SELECTION =====
  const [selectedActivities, setSelectedActivities] = useState([])
  const [selectMode, setSelectMode] = useState(false)
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Event Added',
      message: 'Bollywood Music Festival registrations are now open!',
      time: '5 min ago',
      read: false,
      type: 'event'
    },
    {
      id: 2,
      title: 'Registration Confirmed',
      message: 'You have successfully registered for Tech Fest 2024',
      time: '2 hours ago',
      read: false,
      type: 'success'
    },
    {
      id: 3,
      title: 'Placement Workshop',
      message: 'Resume building workshop tomorrow at 4 PM',
      time: '1 day ago',
      read: true,
      type: 'reminder'
    },
    {
      id: 4,
      title: 'New Event: BGMI Tournament',
      message: '₹50L prize pool tournament registrations open',
      time: '3 hours ago',
      read: false,
      type: 'event'
    }
  ])

  // All Events Data - Comprehensive list
  const [allEvents, setAllEvents] = useState([
    // Technology Events
    {
      id: 1,
      name: 'Tech Fest 2024',
      category: 'Technology',
      date: '2024-03-15',
      time: '10:00 AM',
      location: 'Mumbai, Maharashtra',
      spots: 5000,
      registered: true,
      selected: false,  // ADDED for bulk selection
      icon: <FiCpu className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: true,
      price: '₹999',
      organizer: 'Tech Institute',
      description: 'Asia\'s largest science and technology festival featuring workshops, competitions, and exhibitions.',
      speakers: ['Narayana Murthy', 'Kiran Mazumdar-Shaw', 'Bhavish Aggarwal']
    },
    {
      id: 2,
      name: 'AI & Robotics Hackathon',
      category: 'Technology',
      date: '2024-03-18',
      time: '9:00 AM',
      location: 'Bengaluru',
      spots: 200,
      registered: false,
      selected: false,  // ADDED for bulk selection
      icon: <FiCpu className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      price: 'Free',
      organizer: 'Microsoft Research',
      description: '48-hour hackathon focused on AI and robotics solutions for real-world problems.',
      speakers: ['Sundar Pichai', 'Sam Altman']
    },
    {
      id: 3,
      name: 'Google Cloud Summit',
      category: 'Technology',
      date: '2024-04-05',
      time: '10:00 AM',
      location: 'Hyderabad',
      spots: 1000,
      registered: false,
      selected: false,  // ADDED for bulk selection
      icon: <FiCpu className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: false,
      price: '₹499',
      organizer: 'Google',
      description: 'Learn about cloud computing, AI/ML, and career opportunities at Google.',
      speakers: ['Google Engineers']
    },

    // Music Events
    {
      id: 4,
      name: 'Sunburn Music Festival',
      category: 'Music',
      date: '2024-04-05',
      time: '4:00 PM',
      location: 'Goa',
      spots: 25000,
      registered: false,
      selected: false,  // ADDED for bulk selection
      icon: <FiMusic className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      price: '₹2,499',
      organizer: 'Sunburn',
      description: 'Asia\'s biggest electronic music festival featuring international and Indian artists.',
      artists: ['Nucleya', 'Divine', 'Martin Garrix']
    },
    {
      id: 5,
      name: 'Bollywood Music Night',
      category: 'Music',
      date: '2024-03-25',
      time: '7:00 PM',
      location: 'Mumbai',
      spots: 5000,
      registered: true,
      selected: false,  // ADDED for bulk selection
      icon: <FiMusic className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: true,
      price: '₹999',
      organizer: 'Zee Live',
      description: 'Night of Bollywood hits with live performances by top playback singers.',
      artists: ['Arijit Singh', 'Shreya Ghoshal']
    },
    {
      id: 6,
      name: 'Classical Music Concert',
      category: 'Music',
      date: '2024-04-12',
      time: '6:00 PM',
      location: 'Chennai',
      spots: 2000,
      registered: false,
      selected: false,  // ADDED for bulk selection
      icon: <FiMusic className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: false,
      price: '₹599',
      organizer: 'Madras Music Academy',
      description: 'Evening of classical Carnatic music by renowned artists.',
      artists: ['Bombay Jayashree', 'T.M. Krishna']
    },

    // Sports Events
    {
      id: 7,
      name: 'National Sports Meet',
      category: 'Sports',
      date: '2024-04-20',
      time: '8:00 AM',
      location: 'Chennai, Tamil Nadu',
      spots: 2000,
      registered: false,
      selected: false,  // ADDED for bulk selection
      icon: <FiActivity className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: true,
      price: 'Free',
      organizer: 'Sports Institute',
      description: 'Annual national sports competition featuring multiple disciplines and competitions.'
    },
    {
      id: 8,
      name: 'Mumbai Marathon 2024',
      category: 'Sports',
      date: '2024-05-15',
      time: '5:00 AM',
      location: 'Mumbai',
      spots: 50000,
      registered: false,
      selected: false,  // ADDED for bulk selection
      icon: <FiActivity className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      price: '₹799',
      organizer: 'Procam International',
      description: 'India\'s largest marathon with full marathon, half marathon, and 10K runs.'
    },
    {
      id: 9,
      name: 'Premier Badminton League',
      category: 'Sports',
      date: '2024-06-10',
      time: '6:00 PM',
      location: 'Hyderabad',
      spots: 1000,
      registered: false,
      selected: false,  // ADDED for bulk selection
      icon: <FiActivity className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: false,
      price: '₹399',
      organizer: 'PBL',
      description: 'Watch top international and Indian badminton players compete.'
    },

    // Business Events
    {
      id: 10,
      name: 'Startup India Pitch Fest',
      category: 'Business',
      date: '2024-05-02',
      time: '10:00 AM',
      location: 'Delhi NCR',
      spots: 500,
      registered: true,
      selected: false,  // ADDED for bulk selection
      icon: <FiTrendingUp className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      price: 'Free',
      organizer: 'Startup India',
      description: 'Pitch your startup idea to top VCs and angel investors.',
      speakers: ['Kunal Shah', 'Vijay Shekhar Sharma']
    },
    {
      id: 11,
      name: 'Young Entrepreneurs Summit',
      category: 'Business',
      date: '2024-05-20',
      time: '9:00 AM',
      location: 'Bengaluru',
      spots: 1000,
      registered: false,
      selected: false,  // ADDED for bulk selection
      icon: <FiTrendingUp className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: false,
      price: '₹299',
      organizer: 'TiE',
      description: 'Learn from successful entrepreneurs and network with peers.',
      speakers: ['Bhavish Aggarwal', 'Falguni Nayar']
    },
    {
      id: 12,
      name: 'Investment Banking Workshop',
      category: 'Business',
      date: '2024-06-05',
      time: '11:00 AM',
      location: 'Mumbai',
      spots: 200,
      registered: false,
      selected: false,  // ADDED for bulk selection
      icon: <FiTrendingUp className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      price: '₹999',
      organizer: 'Goldman Sachs',
      description: 'Workshop on investment banking careers and skills.'
    },

    // Gaming Events
    {
      id: 13,
      name: 'BGMI Pro League',
      category: 'Gaming',
      date: '2024-05-25',
      time: '11:00 AM',
      location: 'Hyderabad',
      spots: 5000,
      registered: false,
      selected: false,  // ADDED for bulk selection
      icon: <FiCamera className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: true,
      price: '₹499',
      organizer: 'Krafton',
      description: 'India\'s biggest BGMI tournament with ₹50L prize pool.'
    },
    {
      id: 14,
      name: 'Valorant Campus Clash',
      category: 'Gaming',
      date: '2024-06-15',
      time: '2:00 PM',
      location: 'Online',
      spots: 1000,
      registered: false,
      selected: false,  // ADDED for bulk selection
      icon: <FiCamera className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      price: 'Free',
      organizer: 'Riot Games',
      description: 'Inter-college Valorant tournament with cash prizes.'
    },
    {
      id: 15,
      name: 'Esports Championship',
      category: 'Gaming',
      date: '2024-07-10',
      time: '10:00 AM',
      location: 'Mumbai',
      spots: 2000,
      registered: false,
      selected: false,  // ADDED for bulk selection
      icon: <FiCamera className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: false,
      price: '₹299',
      organizer: 'NODWIN Gaming',
      description: 'Multi-game esports tournament featuring CS:GO, Valorant, and BGMI.'
    },

    // Arts & Cultural Events
    {
      id: 16,
      name: 'Lakme Fashion Week',
      category: 'Fashion',
      date: '2024-05-10',
      time: '7:00 PM',
      location: 'Mumbai',
      spots: 3000,
      registered: false,
      selected: false,  // ADDED for bulk selection
      icon: <FiHeart className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      price: '₹4,999',
      organizer: 'Lakme',
      description: 'India\'s premier fashion event featuring top designers.',
      designers: ['Sabyasachi', 'Manish Malhotra']
    },
    {
      id: 17,
      name: 'Jaipur Literature Festival',
      category: 'Literary',
      date: '2024-06-20',
      time: '9:00 AM',
      location: 'Jaipur',
      spots: 10000,
      registered: false,
      selected: false,  // ADDED for bulk selection
      icon: <FiBookOpen className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: true,
      price: 'Free',
      organizer: 'Teamwork Arts',
      description: 'World\'s largest free literary festival with authors from around the world.',
      speakers: ['Chetan Bhagat', 'Ruskin Bond']
    },
    {
      id: 18,
      name: 'Kala Ghoda Arts Festival',
      category: 'Arts',
      date: '2024-07-05',
      time: '10:00 AM',
      location: 'Mumbai',
      spots: 50000,
      registered: false,
      selected: false,  // ADDED for bulk selection
      icon: <FiHeart className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: false,
      price: 'Free',
      organizer: 'Kala Ghoda Association',
      description: 'Celebration of art, culture, music, and food in South Mumbai.'
    },

    // Health & Wellness
    {
      id: 19,
      name: 'Yoga & Wellness Retreat',
      category: 'Health',
      date: '2024-04-02',
      time: '6:00 AM',
      location: 'Rishikesh',
      spots: 100,
      registered: false,
      selected: false,  // ADDED for bulk selection
      icon: <FiHeart className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      price: '₹4,999',
      organizer: 'Patanjali',
      description: '3-day yoga and meditation retreat in the yoga capital of the world.'
    },
    {
      id: 20,
      name: 'Mental Health Summit',
      category: 'Health',
      date: '2024-05-30',
      time: '10:00 AM',
      location: 'Online',
      spots: 5000,
      registered: false,
      selected: false,  // ADDED for bulk selection
      icon: <FiHeart className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: true,
      price: 'Free',
      organizer: 'YourDOST',
      description: 'Summit on mental health awareness and resources for students.'
    }
  ])

  const [myRegistrations, setMyRegistrations] = useState(
    allEvents.filter(event => event.registered)
  )

  // Filter events based on search and category
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Get unique categories for filter
  const categories = ['all', ...new Set(allEvents.map(event => event.category))]

  const [stats] = useState({
    totalActivities: allEvents.length,
    myRegistrations: myRegistrations.length,
    upcomingEvents: myRegistrations.filter(a => new Date(a.date) > new Date()).length,
    completedEvents: myRegistrations.filter(a => new Date(a.date) < new Date()).length,
    trendingActivities: allEvents.filter(a => a.trending).length
  })

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const unreadNotificationsCount = notifications.filter(n => !n.read).length

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const openNotifications = () => {
    notificationsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleViewAllNotifications = () => {
    openNotifications()
    if (unreadNotificationsCount === 0) {
      toast('No new notifications')
      return
    }

    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
    toast.success('All notifications marked as read')
  }

  const handleRegister = (eventId) => {
    setAllEvents(prev =>
      prev.map(event =>
        event.id === eventId ? { ...event, registered: true } : event
      )
    )
    // Update myRegistrations
    const registeredEvent = allEvents.find(e => e.id === eventId)
    setMyRegistrations(prev => [...prev, { ...registeredEvent, registered: true }])
    toast.success('Successfully registered!')
  }

  // ===== NEW BULK SELECTION HANDLERS =====
  const handleSelectActivity = (eventId) => {
    setAllEvents(prev =>
      prev.map(event =>
        event.id === eventId ? { ...event, selected: !event.selected } : event
      )
    )
    
    setSelectedActivities(prev => {
      if (prev.includes(eventId)) {
        return prev.filter(id => id !== eventId)
      } else {
        return [...prev, eventId]
      }
    })
  }

  const handleSelectAll = () => {
    const filteredIds = filteredEvents.map(e => e.id)
    
    if (selectedActivities.length === filteredEvents.length) {
      // Deselect all
      setAllEvents(prev =>
        prev.map(event => ({ ...event, selected: false }))
      )
      setSelectedActivities([])
    } else {
      // Select all filtered events
      setAllEvents(prev =>
        prev.map(event => ({
          ...event,
          selected: filteredIds.includes(event.id) ? true : event.selected
        }))
      )
      setSelectedActivities(filteredIds)
    }
  }

  const handleBulkRegister = () => {
    if (selectedActivities.length === 0) return
    
    let registeredCount = 0
    selectedActivities.forEach(id => {
      const event = allEvents.find(e => e.id === id)
      if (!event.registered) {
        setAllEvents(prev =>
          prev.map(e =>
            e.id === id ? { ...e, registered: true } : e
          )
        )
        const registeredEvent = allEvents.find(e => e.id === id)
        setMyRegistrations(prev => [...prev, { ...registeredEvent, registered: true }])
        registeredCount++
      }
    })
    
    // Clear selection after bulk register
    setAllEvents(prev =>
      prev.map(event => ({ ...event, selected: false }))
    )
    setSelectedActivities([])
    setSelectMode(false)
    
    toast.success(`Successfully registered for ${registeredCount} activities!`)
  }

  const exitSelectMode = () => {
    setSelectMode(false)
    setAllEvents(prev =>
      prev.map(event => ({ ...event, selected: false }))
    )
    setSelectedActivities([])
  }

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'event': return <FiCalendar className="text-purple-500" />
      case 'success': return <FiCheckCircle className="text-green-500" />
      case 'reminder': return <FiAlertCircle className="text-pink-500" />
      default: return <FiBell className="text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      {/* Top Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-black">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Club
                </span>
                <span className="text-gray-900">Connect</span>
              </span>
              <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">Student</span>
            </Link>

            {/* Right Side Icons */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={openNotifications}
                  className="p-2 hover:bg-purple-50 rounded-full transition-colors relative"
                  title="Open notifications"
                >
                  <FiBell className="w-5 h-5 text-gray-600" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full" />
                  )}
                </button>
              </div>

              {/* User Menu */}
              <div className="flex items-center gap-3 pl-4 border-l border-purple-100">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'Priya Sharma'}</p>
                  <p className="text-xs text-gray-500">{user?.email || 'priya.sharma@college.ac.in'}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0) || 'P'}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-purple-50 rounded-full transition-colors"
                >
                  <FiLogOut className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 mb-8 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back, {user?.name || 'Priya'}! 👋
            </h1>
            <p className="text-purple-100 text-lg max-w-2xl">
              Explore {allEvents.length} events and activities happening across India. Find your next adventure!
            </p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FiActivity className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.totalActivities}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Total Activities</h3>
            <p className="text-sm text-gray-400 mt-1">Available this month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-pink-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <FiCheckCircle className="w-6 h-6 text-pink-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.myRegistrations}</span>
            </div>
            <h3 className="text-gray-600 font-medium">My Registrations</h3>
            <p className="text-sm text-gray-400 mt-1">Active participations</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FiCalendar className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.upcomingEvents}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Upcoming Events</h3>
            <p className="text-sm text-gray-400 mt-1">Next 30 days</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-pink-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="w-6 h-6 text-pink-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.trendingActivities}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Trending Now</h3>
            <p className="text-sm text-gray-400 mt-1">Hot this week</p>
          </motion.div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Activity Catalog */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              {/* Header with Search and Filters */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FiBookOpen className="text-purple-600" />
                    Activity Catalog
                  </h2>
                  <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
                    {filteredEvents.length} Events
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {/* Search Bar */}
                  <div className="relative flex-1 sm:flex-initial">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search events..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-64 pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                    />
                  </div>

                  {/* ===== NEW BULK SELECT TOGGLE BUTTON ===== */}
                  <button
                    onClick={() => selectMode ? exitSelectMode() : setSelectMode(true)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectMode 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-purple-100'
                    }`}
                  >
                    {selectMode ? 'Cancel' : 'Select Activities'}
                  </button>

                  {/* View Toggle */}
                  <button
                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    {viewMode === 'grid' ? <FiList className="w-5 h-5 text-gray-600" /> : <FiGrid className="w-5 h-5 text-gray-600" />}
                  </button>
                </div>
              </div>

              {/* ===== NEW SELECTION BAR - Shows when items are selected ===== */}
              {selectMode && selectedActivities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-purple-50 rounded-lg p-3 mb-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    {/* Select All Checkbox */}
                    <button
                      onClick={handleSelectAll}
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-purple-600"
                    >
                      {selectedActivities.length === filteredEvents.length ? (
                        <FiCheckSquare className="w-5 h-5 text-purple-600" />
                      ) : (
                        <FiSquare className="w-5 h-5" />
                      )}
                      Select All
                    </button>
                    
                    {/* Selection Count */}
                    <span className="text-sm text-gray-500">
                      {selectedActivities.length} selected
                    </span>
                  </div>
                  
                  {/* Bulk Register Button */}
                  {selectedActivities.length > 0 && (
                    <button
                      onClick={handleBulkRegister}
                      className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm rounded-lg hover:shadow-md transition-all"
                    >
                      Register Selected ({selectedActivities.length})
                    </button>
                  )}
                </motion.div>
              )}

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600'
                    }`}
                  >
                    {category === 'all' ? 'All' : category}
                  </button>
                ))}
              </div>

              {/* Events Grid/List - UPDATED with selection checkboxes */}
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    onClick={() => selectMode && handleSelectActivity(event.id)}
                    className={`group bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-all border ${
                      event.selected ? 'border-purple-500 ring-2 ring-purple-500/20' : 'border-gray-100'
                    } ${viewMode === 'grid' ? 'p-4 cursor-pointer' : 'p-4 flex items-start gap-4 cursor-pointer'}`}
                  >
                    {viewMode === 'grid' ? (
                      // Grid View with Selection Checkbox
                      <>
                        <div className="flex items-start gap-3 mb-3">
                          {/* Selection Checkbox - Only shows in select mode */}
                          {selectMode && (
                            <div className="flex-shrink-0 mt-1">
                              {event.selected ? (
                                <FiCheckSquare className="w-5 h-5 text-purple-600" />
                              ) : (
                                <FiSquare className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                          )}
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${event.color} flex items-center justify-center text-white flex-shrink-0`}>
                            {event.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-1">
                                {event.name}
                              </h3>
                              {event.trending && (
                                <FiTrendingUp className="w-4 h-4 text-pink-500 flex-shrink-0 ml-1" />
                              )}
                            </div>
                            <p className="text-xs text-gray-500">{event.category}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <FiCalendar className="text-purple-400 w-3 h-3" /> {event.date}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <FiClock className="text-pink-400 w-3 h-3" /> {event.time}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <FiMapPin className="text-purple-400 w-3 h-3" /> {event.location.split(',')[0]}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <FiUsers className="text-pink-400 w-3 h-3" /> {event.spots} spots
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-purple-600">{event.price}</span>
                          {/* Register button - only shown when NOT in select mode */}
                          {!selectMode && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRegister(event.id)
                              }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                event.registered
                                  ? 'bg-green-100 text-green-600'
                                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-md'
                              }`}
                            >
                              {event.registered ? 'Registered ✓' : 'Register'}
                            </button>
                          )}
                        </div>
                      </>
                    ) : (
                      // List View with Selection Checkbox
                      <>
                        {selectMode && (
                          <div className="flex-shrink-0 mt-2">
                            {event.selected ? (
                              <FiCheckSquare className="w-5 h-5 text-purple-600" />
                            ) : (
                              <FiSquare className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        )}
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${event.color} flex items-center justify-center text-white flex-shrink-0`}>
                          {event.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                              {event.name}
                            </h3>
                            {event.trending && (
                              <span className="bg-pink-100 text-pink-600 text-xs px-2 py-0.5 rounded-full">Trending</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mb-2">{event.category} • {event.location}</p>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><FiCalendar className="text-purple-400" /> {event.date}</span>
                            <span className="flex items-center gap-1"><FiClock className="text-pink-400" /> {event.time}</span>
                            <span className="flex items-center gap-1"><FiUsers className="text-purple-400" /> {event.spots} spots</span>
                          </div>
                        </div>
                        {!selectMode && (
                          <div className="flex flex-col items-end gap-2">
                            <span className="text-sm font-medium text-purple-600">{event.price}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRegister(event.id)
                              }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                event.registered
                                  ? 'bg-green-100 text-green-600'
                                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-md'
                              }`}
                            >
                              {event.registered ? 'Registered' : 'Register'}
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                ))}
              </div>

              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiSearch className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No events found</p>
                  <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Notifications & My Registrations */}
          <div className="space-y-6">
            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-6"
              ref={notificationsSectionRef}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FiBell className="text-purple-600" />
                  Notifications
                </h2>
                {unreadNotificationsCount > 0 && (
                  <span className="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
                    {unreadNotificationsCount} new
                  </span>
                )}
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-3 rounded-xl cursor-pointer transition-all ${
                      notification.read ? 'bg-gray-50' : 'bg-purple-50'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-pink-500 rounded-full" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={handleViewAllNotifications}
                className="w-full mt-4 text-sm text-purple-600 hover:text-purple-700 font-medium text-center"
              >
                View All Notifications
              </button>
            </motion.div>

            {/* My Registrations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FiCheckCircle className="text-purple-600" />
                  My Registrations
                </h2>
                <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                  {myRegistrations.length} Active
                </span>
              </div>

              {myRegistrations.length > 0 ? (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {myRegistrations.map((registration, index) => (
                    <motion.div
                      key={registration.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                      className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${registration.color} flex items-center justify-center text-white flex-shrink-0`}>
                          {registration.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 text-sm mb-1">{registration.name}</h3>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <FiCalendar className="text-purple-400" /> {registration.date}
                            <FiMapPin className="text-pink-400 ml-1" /> {registration.location.split(',')[0]}
                          </div>
                        </div>
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full whitespace-nowrap">
                          Confirmed
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiCalendar className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">No registrations yet</p>
                  <p className="text-xs text-gray-400 mt-1">Browse events and register now!</p>
                </div>
              )}

              <button className="w-full mt-4 text-sm text-purple-600 hover:text-purple-700 font-medium text-center">
                View All Registrations
              </button>
            </motion.div>

            {/* Upcoming Events Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <FiCalendar className="w-5 h-5" />
                </div>
                <h3 className="font-semibold">Upcoming This Week</h3>
              </div>
              
              <div className="space-y-3">
                {allEvents
                  .filter(e => new Date(e.date) > new Date() && e.trending)
                  .slice(0, 3)
                  .map((event, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-1 h-1 bg-white rounded-full" />
                      <span className="flex-1">{event.name}</span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  ))}
              </div>
              
              <button className="w-full mt-4 bg-white text-purple-600 font-medium py-2 rounded-lg hover:bg-purple-50 transition-colors">
                View Calendar
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard