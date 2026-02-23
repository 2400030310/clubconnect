import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { 
  FiUsers, 
  FiCalendar, 
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
  FiEdit,
  FiTrash2,
  FiPlus,
  FiEye,
  FiDownload,
  FiUpload,
  FiBarChart2,
  FiPieChart,
  FiDollarSign,
  FiUserCheck,
  FiUserX,
  FiMail,
  FiMessageSquare,
  FiFlag,
  FiShield,
  FiCheckSquare,
  FiSquare,
  FiMoreVertical,
  FiRefreshCw,
  FiSave,
  FiX
} from 'react-icons/fi'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

const AdminDashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedItems, setSelectedItems] = useState([])
  const [selectMode, setSelectMode] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showBulkActionModal, setShowBulkActionModal] = useState(false)
  const [bulkActionType, setBulkActionType] = useState('')
  const [currentItem, setCurrentItem] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationsRef = useRef(null)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showParticipationModal, setShowParticipationModal] = useState(false)
  const [participationView, setParticipationView] = useState('overview')
  const [dateRange, setDateRange] = useState('month')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [showRequestDetails, setShowRequestDetails] = useState(false)
  const [filterType, setFilterType] = useState('all')
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New user registered', read: false, time: '5 min ago' },
    { id: 2, message: 'Event approval pending', read: false, time: '1 hour ago' },
    { id: 3, message: 'System update completed', read: true, time: '1 day ago' }
  ])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Mock Data - Users
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Priya Sharma',
      email: 'priya.sharma@kluniversity.ac.in',
      college: 'KL University',
      year: '3rd Year',
      userType: 'student',
      status: 'active',
      joined: '2024-01-15',
      activities: 12,
      avatar: 'https://images.unsplash.com/photo-1494790108777-847fd61a7487?w=100&auto=format',
      phone: '+91 98765 43210',
      bio: 'Computer Science student passionate about AI and robotics.'
    },
    {
      id: 2,
      name: 'Rahul Verma',
      email: 'rahul.verma@kluniversity.ac.in',
      college: 'KL University',
      year: '1st Year',
      userType: 'student',
      status: 'active',
      joined: '2024-02-01',
      activities: 8,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format',
      phone: '+91 98765 43211',
      bio: 'MBA student interested in startups and entrepreneurship.'
    },
    {
      id: 3,
      name: 'Anjali Krishnan',
      email: 'anjali.k@kluniversity.ac.in',
      college: 'KL University',
      year: '4th Year',
      userType: 'student',
      status: 'inactive',
      joined: '2023-11-20',
      activities: 3,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format',
      phone: '+91 98765 43212',
      bio: 'Final year engineering student.'
    },
    {
      id: 4,
      name: 'Vikram Reddy',
      email: 'vikram.r@kluniversity.ac.in',
      college: 'KL University',
      year: '2nd Year',
      userType: 'student',
      status: 'active',
      joined: '2024-01-05',
      activities: 15,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format',
      phone: '+91 98765 43213',
      bio: 'Electronics student, gaming enthusiast.'
    },
    {
      id: 5,
      name: 'Neha Gupta',
      email: 'neha.gupta@kluniversity.ac.in',
      college: 'KL University',
      year: '3rd Year',
      userType: 'student',
      status: 'active',
      joined: '2023-12-10',
      activities: 10,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format',
      phone: '+91 98765 43214',
      bio: 'Literature student, aspiring writer.'
    },
    {
      id: 6,
      name: 'Arjun Singh',
      email: 'arjun.s@kluniversity.ac.in',
      college: 'KL University',
      year: '4th Year',
      userType: 'student',
      status: 'blocked',
      joined: '2023-09-15',
      activities: 2,
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format',
      phone: '+91 98765 43215',
      bio: 'Mechanical engineering student.'
    },
    {
      id: 7,
      name: 'Admin User',
      email: 'admin@kluniversity.ac.in',
      college: 'KL University',
      year: 'N/A',
      userType: 'admin',
      status: 'active',
      joined: '2023-01-01',
      activities: 0,
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&auto=format',
      phone: '+91 98765 43216',
      bio: 'Platform administrator.'
    }
  ])

  // Mock Data - Events
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'KL University Tech Fest 2024',
      category: 'Technology',
      date: '2024-03-15',
      time: '10:00 AM',
      location: 'Guntur',
      registrations: 3456,
      capacity: 5000,
      status: 'upcoming',
      price: '₹999',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format',
      organizer: 'KL University',
      description: 'Asia\'s largest science and technology festival featuring workshops, competitions, and exhibitions.',
      contact: 'events@kluniversity.ac.in'
    },
    {
      id: 2,
      name: 'Sunburn Music Festival',
      category: 'Music',
      date: '2024-04-05',
      time: '4:00 PM',
      location: 'Guntur',
      registrations: 18765,
      capacity: 25000,
      status: 'upcoming',
      price: '₹2,499',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&auto=format',
      organizer: 'Sunburn',
      description: 'Asia\'s biggest electronic music festival.',
      contact: 'sunburn@kluniversity.ac.in'
    },
    {
      id: 3,
      name: 'AI & Robotics Hackathon',
      category: 'Technology',
      date: '2024-03-18',
      time: '9:00 AM',
      location: 'Guntur',
      registrations: 156,
      capacity: 200,
      status: 'ongoing',
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format',
      organizer: 'Microsoft Research',
      description: '48-hour hackathon focused on AI and robotics.',
      contact: 'hackathon@kluniversity.ac.in'
    }
  ])

  // Mock Data - Communities
  const [communities, setCommunities] = useState([
    {
      id: 1,
      name: 'AI & ML Enthusiasts',
      category: 'Technology',
      members: 12500,
      events: 45,
      status: 'active',
      lead: 'Dr. Priya Sharma',
      created: '2023-01-15',
      description: 'Community for AI and machine learning enthusiasts.',
      contact: 'aiml@kluniversity.ac.in'
    },
    {
      id: 2,
      name: 'Bollywood Music Lovers',
      category: 'Music',
      members: 34200,
      events: 56,
      status: 'active',
      lead: 'Amit Kumar',
      created: '2022-11-20',
      description: 'Community for Bollywood music lovers.',
      contact: 'music@kluniversity.ac.in'
    },
    {
      id: 3,
      name: 'Indian Photography Network',
      category: 'Arts',
      members: 45300,
      events: 89,
      status: 'active',
      lead: 'Rathika Ramasamy',
      created: '2022-08-10',
      description: 'Community for photographers across India.',
      contact: 'photo@kluniversity.ac.in'
    }
  ])

  // Mock Data - Reports
  const [reports, setReports] = useState([
    {
      id: 1,
      type: 'user',
      reportedBy: 'Priya Sharma',
      reportedItem: 'Event: Sunburn Festival',
      reason: 'Inappropriate Content',
      status: 'pending',
      date: '2024-03-10',
      details: 'User reported inappropriate comments in event discussion.'
    },
    {
      id: 2,
      type: 'community',
      reportedBy: 'Rahul Verma',
      reportedItem: 'Community: Crypto Traders',
      reason: 'Spam',
      status: 'pending',
      date: '2024-03-09',
      details: 'Community posting spam messages.'
    },
    {
      id: 3,
      type: 'event',
      reportedBy: 'Anjali Krishnan',
      reportedItem: 'Event: Startup Pitch Fest',
      reason: 'Misleading Information',
      status: 'resolved',
      date: '2024-03-08',
      details: 'Event details were misleading about speakers.'
    }
  ])

  // Form state for adding/editing
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    year: '',
    userType: 'student',
    status: 'active',
    phone: '',
    bio: '',
    category: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    price: '',
    description: '',
    organizer: '',
    contact: '',
    lead: '',
    event: '',
    venue: '',
    registered: ''
  })

  const recentActivities = [
    { id: 1, user: 'Priya Sharma', action: 'registered for', target: 'KL University Tech Fest 2024', time: '5 min ago' },
    { id: 2, user: 'Rahul Verma', action: 'created community', target: 'Web Developers India', time: '1 hour ago' },
    { id: 3, user: 'Anjali Krishnan', action: 'reported event', target: 'Sunburn Festival', time: '3 hours ago' },
    { id: 4, user: 'Vikram Reddy', action: 'joined', target: 'AI & ML Enthusiasts', time: '5 hours ago' }
  ]

  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 1,
      name: 'Web Developers India',
      type: 'community',
      submittedDate: '2024-03-12',
      summary: 'New community request with 50 founding members',
      requestedBy: 'Rahul Verma'
    },
    {
      id: 2,
      name: 'Startup Pitch Fest',
      type: 'event',
      submittedDate: '2024-03-11',
      summary: 'Event approval request with 200 registrations',
      requestedBy: 'KL University Entrepreneurship Cell'
    },
    {
      id: 3,
      name: 'Design Sprint Workshop',
      type: 'event',
      submittedDate: '2024-03-09',
      summary: 'New workshop proposal for design students',
      requestedBy: 'KL University Design Club'
    }
  ])

  // Dashboard Stats
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalEvents: events.length,
    upcomingEvents: events.filter(e => e.status === 'upcoming').length,
    totalCommunities: communities.length,
    totalRegistrations: events.reduce((acc, e) => acc + e.registrations, 0),
    pendingApprovals: pendingApprovals.length,
    pendingReports: reports.filter(r => r.status === 'pending').length
  }

  // Handlers
  const handleLogout = () => {
    toast.success('Logged out successfully')
    logout()
    navigate('/')
  }

  const handleView = (item) => {
    setCurrentItem(item)
    setShowViewModal(true)
  }

  const handleViewDetails = (item) => {
    setSelectedRequest(item)
    setShowRequestDetails(true)
  }

  const handleEdit = (item) => {
    setCurrentItem(item)
    setFormData(item)
    setShowEditModal(true)
  }

  const handleDelete = (item) => {
    setCurrentItem(item)
    setShowDeleteModal(true)
  }

  const handleAdd = () => {
    if (activeTab === 'schedule') {
      setFormData({
        ...formData,
        event: '',
        date: '',
        time: '',
        venue: '',
        registered: '',
        capacity: ''
      })
      setShowAddModal(true)
      return
    }

    setFormData({
      name: '',
      email: '',
      college: '',
      year: '',
      userType: 'student',
      status: 'active',
      phone: '',
      bio: '',
      category: '',
      date: '',
      time: '',
      location: '',
      capacity: '',
      price: '',
      description: '',
      organizer: '',
      contact: '',
      lead: '',
      event: '',
      venue: '',
      registered: ''
    })
    setShowAddModal(true)
  }

  const validateScheduleForm = () => {
    const requiredFields = [
      { key: 'event', label: 'Event' },
      { key: 'date', label: 'Date' },
      { key: 'time', label: 'Time' },
      { key: 'venue', label: 'Venue' },
      { key: 'capacity', label: 'Capacity' }
    ]

    const missingField = requiredFields.find(({ key }) => !formData[key]?.toString().trim())
    if (missingField) {
      toast.error(`${missingField.label} is required`)
      return false
    }

    const capacity = Number(formData.capacity)
    const registered = Number(formData.registered || 0)

    if (!Number.isFinite(capacity) || capacity <= 0) {
      toast.error('Capacity must be greater than 0')
      return false
    }

    if (!Number.isFinite(registered) || registered < 0) {
      toast.error('Registered count cannot be negative')
      return false
    }

    if (registered > capacity) {
      toast.error('Registered count cannot exceed capacity')
      return false
    }

    return true
  }

  const handleSaveAdd = () => {
    if (activeTab === 'communities') {
      const requiredFields = [
        { key: 'name', label: 'Community name' },
        { key: 'category', label: 'Category' },
        { key: 'lead', label: 'Community lead' },
        { key: 'contact', label: 'Contact' },
        { key: 'description', label: 'Description' }
      ]

      const missingField = requiredFields.find(({ key }) => !formData[key]?.toString().trim())
      if (missingField) {
        toast.error(`${missingField.label} is required`)
        return
      }
    }

    if (activeTab === 'schedule' && !validateScheduleForm()) {
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      const newItem = {
        ...formData,
        id: Date.now(),
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format',
        joined: new Date().toISOString().split('T')[0],
        activities: 0
      }
      
      if (activeTab === 'users') {
        setUsers([...users, newItem])
        toast.success('User added successfully')
      } else if (activeTab === 'events') {
        setEvents([...events, { ...newItem, registrations: 0 }])
        toast.success('Event added successfully')
      } else if (activeTab === 'communities') {
        setCommunities([
          ...communities,
          {
            ...newItem,
            members: 0,
            events: 0,
            created: new Date().toISOString().split('T')[0]
          }
        ])
        toast.success('Community added successfully')
      } else if (activeTab === 'schedule') {
        setScheduleItems([
          {
            id: Date.now(),
            event: formData.event,
            date: formData.date,
            time: formData.time,
            venue: formData.venue,
            registered: Number(formData.registered) || 0,
            capacity: Number(formData.capacity) || 0
          },
          ...scheduleItems
        ])
        toast.success('Schedule item added successfully')
      }
      
      setShowAddModal(false)
      setIsLoading(false)
    }, 1000)
  }

  const handleSaveEdit = () => {
    if (activeTab === 'schedule' && !validateScheduleForm()) {
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      if (activeTab === 'users') {
        setUsers(users.map(u => u.id === currentItem.id ? { ...u, ...formData } : u))
        toast.success('User updated successfully')
      } else if (activeTab === 'events') {
        setEvents(events.map(e => e.id === currentItem.id ? { ...e, ...formData } : e))
        toast.success('Event updated successfully')
      } else if (activeTab === 'communities') {
        setCommunities(communities.map(c => c.id === currentItem.id ? { ...c, ...formData } : c))
        toast.success('Community updated successfully')
      } else if (activeTab === 'schedule') {
        setScheduleItems(
          scheduleItems.map(s =>
            s.id === currentItem.id
              ? {
                  ...s,
                  event: formData.event,
                  date: formData.date,
                  time: formData.time,
                  venue: formData.venue,
                  registered: Number(formData.registered) || 0,
                  capacity: Number(formData.capacity) || 0
                }
              : s
          )
        )
        toast.success('Schedule item updated successfully')
      }
      
      setShowEditModal(false)
      setIsLoading(false)
    }, 1000)
  }

  const handleConfirmDelete = () => {
    setIsLoading(true)
    setTimeout(() => {
      if (activeTab === 'users') {
        setUsers(users.filter(u => u.id !== currentItem.id))
        toast.success('User deleted successfully')
      } else if (activeTab === 'events') {
        setEvents(events.filter(e => e.id !== currentItem.id))
        toast.success('Event deleted successfully')
      } else if (activeTab === 'communities') {
        setCommunities(communities.filter(c => c.id !== currentItem.id))
        toast.success('Community deleted successfully')
      } else if (activeTab === 'schedule') {
        setScheduleItems(scheduleItems.filter(s => s.id !== currentItem.id))
        toast.success('Schedule item deleted successfully')
      }
      
      setShowDeleteModal(false)
      setIsLoading(false)
    }, 1000)
  }

  const handleStatusChange = (item, newStatus) => {
    setIsLoading(true)
    setTimeout(() => {
      if (activeTab === 'users') {
        setUsers(users.map(u => u.id === item.id ? { ...u, status: newStatus } : u))
        toast.success(`User ${newStatus === 'active' ? 'activated' : newStatus === 'inactive' ? 'deactivated' : 'blocked'} successfully`)
      } else if (activeTab === 'events') {
        setEvents(events.map(e => e.id === item.id ? { ...e, status: newStatus } : e))
        toast.success(`Event status updated to ${newStatus}`)
      } else if (activeTab === 'communities') {
        setCommunities(communities.map(c => c.id === item.id ? { ...c, status: newStatus } : c))
        toast.success(`Community status updated to ${newStatus}`)
      }
      setIsLoading(false)
    }, 500)
  }

  const handleSendEmail = (item) => {
    toast.success(`Email sent to ${item.email}`)
  }

  const handleExport = () => {
    toast.success('Data exported successfully')
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      toast.success('Data refreshed')
      setIsLoading(false)
    }, 1000)
  }

  const handleApprove = (item) => {
    setPendingApprovals(prev => prev.filter(req => req.id !== item.id))
    toast.success(`${item.type === 'event' ? 'Event' : 'Community'} approved`)
  }

  const handleReject = (item) => {
    setPendingApprovals(prev => prev.filter(req => req.id !== item.id))
  }

  const handleRejectWithReason = (item) => {
    const reason = prompt(`Why are you rejecting "${item.name}"?`)
    if (reason) {
      handleReject(item)
      toast.error(`Rejected: ${reason}`)
    }
  }

  const handleMarkNotificationRead = (id) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    )
    toast.success('Notification marked as read')
  }

  const handleMarkAllNotificationsRead = () => {
    const hasUnread = notifications.some(n => !n.read)

    if (!hasUnread) {
      toast('No unread notifications')
      return
    }

    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    toast.success('All notifications marked as read')
  }

  const handleResolveReport = (reportId, action) => {
    setReports(reports.map(r => 
      r.id === reportId ? { ...r, status: 'resolved' } : r
    ))
    toast.success(`Report ${action === 'approve' ? 'approved' : 'rejected'} and resolved`)
  }

  const handleAddToSchedule = () => {
    setFormData({
      ...formData,
      event: '',
      date: '',
      time: '',
      venue: '',
      registered: '',
      capacity: ''
    })
    setShowAddModal(true)
  }

  const handleEditScheduleItem = (item) => {
    setCurrentItem(item)
    setFormData({
      ...formData,
      event: item.event,
      date: item.date,
      time: item.time,
      venue: item.venue,
      registered: item.registered,
      capacity: item.capacity
    })
    setShowEditModal(true)
  }

  const handleDeleteScheduleItem = (item) => {
    setCurrentItem(item)
    setShowDeleteModal(true)
  }

  const handleViewStudentParticipation = (student) => {
    setSelectedStudent(student)
    setShowParticipationModal(true)
  }

  const handleExportParticipationData = () => {
    toast.success('Participation data exported successfully')
  }

  const handleFilterByDateRange = (range) => {
    setDateRange(range)
    toast.success(`Filtered by ${range}`)
  }

  const handleFilterByCategory = (category) => {
    setSelectedCategory(category)
    toast.success(`Filtered by ${category} category`)
  }

  const getParticipationStats = () => {
    const totalStudents = users.filter(u => u.userType === 'student').length
    const participationRate = totalStudents
      ? Math.round((participationData.activeParticipants / totalStudents) * 100)
      : 0

    return {
      ...participationData,
      totalStudents,
      participationRate
    }
  }

  const getActiveEntityLabel = () => {
    if (activeTab === 'users') return { singular: 'User', plural: 'Users' }
    if (activeTab === 'events') return { singular: 'Event', plural: 'Events' }
    if (activeTab === 'communities') return { singular: 'Community', plural: 'Communities' }
    if (activeTab === 'schedule') return { singular: 'Schedule Item', plural: 'Schedule Items' }
    if (activeTab === 'reports') return { singular: 'Report', plural: 'Reports' }
    return { singular: 'Item', plural: 'Items' }
  }

  // Selection Handlers
  const handleSelectAll = (items) => {
    if (selectedItems.length === items.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(items.map(item => item.id))
    }
  }

  const handleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    )
  }

  const handleBulkAction = (action) => {
    setBulkActionType(action)
    setShowBulkActionModal(true)
  }

  const handleConfirmBulkAction = () => {
    setIsLoading(true)
    setTimeout(() => {
      if (activeTab === 'users') {
        switch(bulkActionType) {
          case 'activate':
            setUsers(users.map(u => selectedItems.includes(u.id) ? { ...u, status: 'active' } : u))
            toast.success(`${selectedItems.length} users activated`)
            break
          case 'deactivate':
            setUsers(users.map(u => selectedItems.includes(u.id) ? { ...u, status: 'inactive' } : u))
            toast.success(`${selectedItems.length} users deactivated`)
            break
          case 'delete':
            setUsers(users.filter(u => !selectedItems.includes(u.id)))
            toast.success(`${selectedItems.length} users deleted`)
            break
          default:
            break
        }
      } else if (activeTab === 'events') {
        switch(bulkActionType) {
          case 'delete':
            setEvents(events.filter(e => !selectedItems.includes(e.id)))
            toast.success(`${selectedItems.length} events deleted`)
            break
          default:
            break
        }
      } else if (activeTab === 'communities') {
        switch(bulkActionType) {
          case 'delete':
            setCommunities(communities.filter(c => !selectedItems.includes(c.id)))
            toast.success(`${selectedItems.length} communities deleted`)
            break
          default:
            break
        }
      }
      
      setSelectedItems([])
      setSelectMode(false)
      setShowBulkActionModal(false)
      setIsLoading(false)
    }, 1000)
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-600'
      case 'inactive': return 'bg-gray-100 text-gray-600'
      case 'blocked': return 'bg-red-100 text-red-600'
      case 'upcoming': return 'bg-blue-100 text-blue-600'
      case 'ongoing': return 'bg-purple-100 text-purple-600'
      case 'completed': return 'bg-gray-100 text-gray-600'
      case 'pending': return 'bg-yellow-100 text-yellow-600'
      case 'resolved': return 'bg-green-100 text-green-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  // Filtered Data
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.college.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || user.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || event.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.lead.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || community.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  const filteredApprovals = pendingApprovals.filter(item =>
    filterType === 'all' || item.type === filterType
  )

  const sortedApprovals = [...filteredApprovals].sort((a, b) =>
    new Date(b.submittedDate) - new Date(a.submittedDate)
  )

  const [scheduleItems, setScheduleItems] = useState([
    {
      id: 1,
      event: 'Tech Fest 2024',
      date: '2024-03-15',
      time: '10:00 AM - 6:00 PM',
      venue: 'Main Auditorium',
      registered: 3456,
      capacity: 5000
    },
    {
      id: 2,
      event: 'Startup Bootcamp',
      date: '2024-03-18',
      time: '9:30 AM - 4:30 PM',
      venue: 'Innovation Lab',
      registered: 1120,
      capacity: 1500
    },
    {
      id: 3,
      event: 'Cultural Night',
      date: '2024-03-22',
      time: '6:00 PM - 10:00 PM',
      venue: 'Open Air Theatre',
      registered: 2780,
      capacity: 3000
    },
    {
      id: 4,
      event: 'AI Workshop',
      date: '2024-03-25',
      time: '11:00 AM - 2:00 PM',
      venue: 'Computer Lab 2',
      registered: 640,
      capacity: 800
    }
  ])

  const [participationData, setParticipationData] = useState({
    totalRegistrations: 156,
    activeParticipants: 89,
    avgEventsPerStudent: 4.2,
    completionRate: 78,
    categoryStats: [
      { category: 'Technology', registrations: 45, students: 32 },
      { category: 'Music', registrations: 38, students: 28 },
      { category: 'Sports', registrations: 42, students: 35 },
      { category: 'Business', registrations: 31, students: 24 },
      { category: 'Gaming', registrations: 28, students: 22 },
      { category: 'Arts', registrations: 25, students: 19 },
      { category: 'Health', registrations: 22, students: 18 }
    ],
    monthlyTrends: [
      { month: 'Jan', registrations: 42 },
      { month: 'Feb', registrations: 58 },
      { month: 'Mar', registrations: 75 },
      { month: 'Apr', registrations: 82 },
      { month: 'May', registrations: 64 },
      { month: 'Jun', registrations: 48 }
    ],
    topParticipants: [
      { id: 1, name: 'Priya Sharma', events: 12, categories: ['Tech', 'Business'], lastActive: '2024-03-15' },
      { id: 2, name: 'Rahul Verma', events: 10, categories: ['Sports', 'Gaming'], lastActive: '2024-03-14' },
      { id: 3, name: 'Anjali Krishnan', events: 9, categories: ['Arts', 'Music'], lastActive: '2024-03-13' },
      { id: 4, name: 'Vikram Reddy', events: 8, categories: ['Tech', 'Gaming'], lastActive: '2024-03-12' },
      { id: 5, name: 'Neha Gupta', events: 7, categories: ['Literary', 'Arts'], lastActive: '2024-03-11' }
    ],
    recentRegistrations: [
      { id: 101, student: 'Priya Sharma', event: 'AI & Robotics Hackathon', date: '2024-03-15', status: 'confirmed' },
      { id: 102, student: 'Rahul Verma', event: 'BGMI Pro League', date: '2024-03-14', status: 'confirmed' },
      { id: 103, student: 'Anjali Krishnan', event: 'Jaipur Literature Festival', date: '2024-03-13', status: 'confirmed' },
      { id: 104, student: 'Vikram Reddy', event: 'KL University Tech Fest 2024', date: '2024-03-12', status: 'pending' },
      { id: 105, student: 'Neha Gupta', event: 'Lakme Fashion Week', date: '2024-03-11', status: 'confirmed' },
      { id: 106, student: 'Arjun Singh', event: 'Yoga & Wellness Retreat', date: '2024-03-10', status: 'cancelled' }
    ]
  })

  const unreadNotificationsCount = notifications.filter(n => !n.read).length
  const participationStats = getParticipationStats()
  const participationCircle = 2 * Math.PI * 40
  const participationStroke = (participationCircle * participationStats.participationRate) / 100
  const participationOffset = participationCircle * 0.25

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link to="/" className="text-2xl font-black text-black">
                ClubConnect
              </Link>
              <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <FiShield className="w-3 h-3" />
                Admin
              </span>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Refresh Button */}
              <button 
                onClick={handleRefresh}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                disabled={isLoading}
              >
                <FiRefreshCw className={`w-5 h-5 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
              </button>

              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setShowNotifications(prev => !prev)}
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Notifications"
                >
                  <FiBell className="w-5 h-5 text-gray-600" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                      {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                      <button
                        onClick={handleMarkAllNotificationsRead}
                        className="text-xs font-medium text-purple-600 hover:text-purple-700"
                      >
                        Mark all read
                      </button>
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <button
                          key={notification.id}
                          onClick={() => handleMarkNotificationRead(notification.id)}
                          className={`w-full text-left px-4 py-3 border-b border-gray-100 last:border-b-0 transition-colors ${
                            notification.read ? 'bg-white hover:bg-gray-50' : 'bg-purple-50 hover:bg-purple-100'
                          }`}
                        >
                          <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Admin Profile */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Admin</p>
                  <p className="text-xs text-gray-500">superadmin@kluniversity.ac.in</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                  A
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiLogOut className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)] p-4">
          <div className="space-y-1">
            <button
              onClick={() => {
                setActiveTab('overview')
                setSelectedItems([])
                setSelectMode(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'overview' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FiBarChart2 className="w-5 h-5" />
              <span className="font-medium">Overview</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('users')
                setSelectedItems([])
                setSelectMode(false)
                setSearchTerm('')
                setSelectedFilter('all')
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'users' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FiUsers className="w-5 h-5" />
              <span className="font-medium">Users</span>
              <span className="ml-auto bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                {stats.totalUsers}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('events')
                setSelectedItems([])
                setSelectMode(false)
                setSearchTerm('')
                setSelectedFilter('all')
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'events' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FiCalendar className="w-5 h-5" />
              <span className="font-medium">Events</span>
              <span className="ml-auto bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                {stats.totalEvents}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('schedule')
                setSelectedItems([])
                setSelectMode(false)
                setSearchTerm('')
                setSelectedFilter('all')
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'schedule' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FiClock className="w-5 h-5" />
              <span className="font-medium">Schedule Management</span>
              <span className="ml-auto bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                {scheduleItems.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('participation')
                setSelectedItems([])
                setSelectMode(false)
                setSearchTerm('')
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'participation'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FiUsers className="w-5 h-5" />
              <span className="font-medium">Participation Tracking</span>
              <span className="ml-auto bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                {participationData.activeParticipants}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('communities')
                setSelectedItems([])
                setSelectMode(false)
                setSearchTerm('')
                setSelectedFilter('all')
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'communities' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FiHeart className="w-5 h-5" />
              <span className="font-medium">Communities</span>
              <span className="ml-auto bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                {stats.totalCommunities}
              </span>
            </button>

            <div className="border-t border-gray-200 my-4 pt-4">
              <button
                onClick={() => setActiveTab('reports')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'reports' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FiFlag className="w-5 h-5" />
                <span className="font-medium">Reports</span>
                {stats.pendingReports > 0 && (
                  <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                    {stats.pendingReports}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'settings' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FiSettings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome back, Admin!</h2>
                <p className="text-purple-100">Here's what's happening with your platform today.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FiUsers className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stats.totalUsers}</span>
                  </div>
                  <h3 className="text-gray-600 font-medium">Total Users</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {stats.activeUsers} active now
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                      <FiCalendar className="w-6 h-6 text-pink-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stats.totalEvents}</span>
                  </div>
                  <h3 className="text-gray-600 font-medium">Total Events</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {stats.upcomingEvents} upcoming
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FiHeart className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stats.totalCommunities}</span>
                  </div>
                  <h3 className="text-gray-600 font-medium">Communities</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Active groups
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                      <FiCheckCircle className="w-6 h-6 text-pink-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stats.totalRegistrations}</span>
                  </div>
                  <h3 className="text-gray-600 font-medium">Registrations</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Across all events
                  </p>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-400">📊 User growth chart will appear here</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Events by Category</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-400">📊 Events distribution chart will appear here</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity & Pending Approvals */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <div>
                          <span className="font-medium text-gray-900">{activity.user}</span>
                          <span className="text-gray-600"> {activity.action} </span>
                          <span className="font-medium text-purple-600">{activity.target}</span>
                        </div>
                        <span className="text-xs text-gray-400">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pending Approvals */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
                    <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full">
                      {stats.pendingApprovals} pending
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <button
                      onClick={() => setFilterType('all')}
                      className={`px-3 py-1 text-xs rounded-full ${
                        filterType === 'all' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilterType('event')}
                      className={`px-3 py-1 text-xs rounded-full ${
                        filterType === 'event' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      Events
                    </button>
                    <button
                      onClick={() => setFilterType('community')}
                      className={`px-3 py-1 text-xs rounded-full ${
                        filterType === 'community' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      Communities
                    </button>
                  </div>
                  <div className="space-y-3">
                    {sortedApprovals.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleViewDetails(item)}
                        className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-700 font-bold">
                            {item.type === 'event' ? 'ET' : 'NC'}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.summary}</p>
                            <p className="text-xs text-gray-400 mt-1">Submitted {item.submittedDate}</p>
                          </div>
                        </div>
                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleApprove(item)}
                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                          >
                            <FiCheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleRejectWithReason(item)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <FiXCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {sortedApprovals.length === 0 && (
                      <div className="text-sm text-gray-500 text-center py-6">
                        No pending approvals for this filter.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Manage Users</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={handleExport}
                    className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all"
                  >
                    <FiDownload className="w-4 h-4" />
                    Export
                  </button>
                  <button 
                    onClick={() => setSelectMode(!selectMode)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                      selectMode 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                        : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {selectMode ? 'Cancel Selection' : 'Select Users'}
                  </button>
                  <button 
                    onClick={handleAdd}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg flex items-center gap-2 hover:shadow-md transition-all"
                  >
                    <FiPlus className="w-4 h-4" />
                    Add User
                  </button>
                </div>
              </div>

              {/* Selection Bar */}
              {selectMode && selectedItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-purple-50 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">
                      {selectedItems.length} user(s) selected
                    </span>
                    <button
                      onClick={() => handleBulkAction('activate')}
                      className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Activate
                    </button>
                    <button
                      onClick={() => handleBulkAction('deactivate')}
                      className="px-3 py-1.5 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      Deactivate
                    </button>
                    <button
                      onClick={() => handleBulkAction('delete')}
                      className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedItems([])}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {/* Search & Filters */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users by name, email, or college..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-gray-900"
                  >
                    <option value="all" className="text-gray-900">All Status</option>
                    <option value="active" className="text-gray-900">Active</option>
                    <option value="inactive" className="text-gray-900">Inactive</option>
                    <option value="blocked" className="text-gray-900">Blocked</option>
                  </select>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        {selectMode && (
                          <th className="px-4 py-3 w-10">
                            <button
                              onClick={() => handleSelectAll(filteredUsers)}
                              className="text-gray-600 hover:text-purple-600"
                            >
                              {selectedItems.length === filteredUsers.length ? (
                                <FiCheckSquare className="w-5 h-5" />
                              ) : (
                                <FiSquare className="w-5 h-5" />
                              )}
                            </button>
                          </th>
                        )}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participation</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          {selectMode && (
                            <td className="px-4 py-4">
                              <button
                                onClick={() => handleSelectItem(user.id)}
                                className="text-gray-600 hover:text-purple-600"
                              >
                                {selectedItems.includes(user.id) ? (
                                  <FiCheckSquare className="w-5 h-5 text-purple-600" />
                                ) : (
                                  <FiSquare className="w-5 h-5" />
                                )}
                              </button>
                            </td>
                          )}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                              <div>
                                <p className="font-medium text-gray-900">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{user.college}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{user.year}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              user.userType === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                              {user.userType}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{user.joined}</td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-900">{user.activities}</span>
                                <span className="text-xs text-gray-500">events</span>
                              </div>
                              <div className="w-20 bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-1.5 rounded-full"
                                  style={{ width: `${(user.activities / 20) * 100}%` }}
                                ></div>
                              </div>
                              <button
                                onClick={() => handleView(user)}
                                className="text-xs text-purple-600 hover:underline text-left mt-1"
                              >
                                View Details
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleView(user)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                title="View"
                              >
                                <FiEye className="w-4 h-4 text-gray-600" />
                              </button>
                              <button 
                                onClick={() => handleEdit(user)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                title="Edit"
                              >
                                <FiEdit className="w-4 h-4 text-gray-600" />
                              </button>
                              <button 
                                onClick={() => handleSendEmail(user)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                title="Send Email"
                              >
                                <FiMail className="w-4 h-4 text-gray-600" />
                              </button>
                              {user.status === 'active' ? (
                                <button 
                                  onClick={() => handleStatusChange(user, 'blocked')}
                                  className="p-1 hover:bg-red-100 rounded transition-colors"
                                  title="Block User"
                                >
                                  <FiUserX className="w-4 h-4 text-red-600" />
                                </button>
                              ) : (
                                <button 
                                  onClick={() => handleStatusChange(user, 'active')}
                                  className="p-1 hover:bg-green-100 rounded transition-colors"
                                  title="Activate User"
                                >
                                  <FiUserCheck className="w-4 h-4 text-green-600" />
                                </button>
                              )}
                              <button 
                                onClick={() => handleDelete(user)}
                                className="p-1 hover:bg-red-100 rounded transition-colors"
                                title="Delete"
                              >
                                <FiTrash2 className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Manage Events</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={handleExport}
                    className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all"
                  >
                    <FiDownload className="w-4 h-4" />
                    Export
                  </button>
                  <button 
                    onClick={() => setSelectMode(!selectMode)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                      selectMode 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                        : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {selectMode ? 'Cancel Selection' : 'Select Events'}
                  </button>
                  <button 
                    onClick={handleAdd}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg flex items-center gap-2 hover:shadow-md transition-all"
                  >
                    <FiPlus className="w-4 h-4" />
                    Create Event
                  </button>
                </div>
              </div>

              {/* Selection Bar */}
              {selectMode && selectedItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-purple-50 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">
                      {selectedItems.length} event(s) selected
                    </span>
                    <button
                      onClick={() => handleBulkAction('delete')}
                      className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete Selected
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedItems([])}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {/* Search & Filters */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search events by name, category, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-gray-900"
                  >
                    <option value="all" className="text-gray-900">All Status</option>
                    <option value="upcoming" className="text-gray-900">Upcoming</option>
                    <option value="ongoing" className="text-gray-900">Ongoing</option>
                    <option value="completed" className="text-gray-900">Completed</option>
                  </select>
                </div>
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all relative">
                    {selectMode && (
                      <div className="absolute top-2 left-2 z-10">
                        <button
                          onClick={() => handleSelectItem(event.id)}
                          className="bg-white rounded-lg p-1 shadow-md"
                        >
                          {selectedItems.includes(event.id) ? (
                            <FiCheckSquare className="w-5 h-5 text-purple-600" />
                          ) : (
                            <FiSquare className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    )}
                    <div className="relative h-40">
                      <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
                      <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{event.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{event.category}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <FiCalendar className="w-3 h-3" />
                        <span>{event.date}</span>
                        <FiMapPin className="w-3 h-3 ml-2" />
                        <span>{event.location.split(',')[0]}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          <span className="font-semibold text-gray-900">{event.registrations}</span>
                          <span className="text-gray-500">/{event.capacity}</span>
                        </span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleView(event)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            title="View"
                          >
                            <FiEye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button 
                            onClick={() => handleEdit(event)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Edit"
                          >
                            <FiEdit className="w-4 h-4 text-gray-600" />
                          </button>
                          <button 
                            onClick={() => handleDelete(event)}
                            className="p-1 hover:bg-red-100 rounded transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Manage Activity Schedules</h2>
                <button
                  onClick={handleAddToSchedule}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg flex items-center gap-2"
                >
                  <FiPlus className="w-4 h-4" />
                  Add to Schedule
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Venue</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registered</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {scheduleItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{item.event}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{item.time}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{item.venue}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <span className="font-semibold text-purple-600">{item.registered.toLocaleString()}</span>
                            /{item.capacity.toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditScheduleItem(item)}
                                className="p-1 hover:bg-gray-100 rounded"
                              >
                                <FiEdit className="w-4 h-4 text-gray-600" />
                              </button>
                              <button
                                onClick={() => handleDeleteScheduleItem(item)}
                                className="p-1 hover:bg-red-100 rounded"
                              >
                                <FiTrash2 className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-sm text-gray-500">Total Events</p>
                  <p className="text-2xl font-bold text-gray-900">{scheduleItems.length}</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-sm text-gray-500">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">{Math.min(scheduleItems.length, 3)}</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-sm text-gray-500">Total Capacity</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {scheduleItems.reduce((total, item) => total + item.capacity, 0).toLocaleString()}+
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'participation' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Student Participation Tracking</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setParticipationView('overview')}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                      participationView === 'overview'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <FiBarChart2 className="w-4 h-4" />
                    Overview
                  </button>
                  <button
                    onClick={() => setParticipationView('details')}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                      participationView === 'details'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <FiList className="w-4 h-4" />
                    Detailed View
                  </button>
                  <button
                    onClick={() => setParticipationView('analytics')}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                      participationView === 'analytics'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <FiPieChart className="w-4 h-4" />
                    Analytics
                  </button>
                  <button
                    onClick={handleExportParticipationData}
                    className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50"
                  >
                    <FiDownload className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Date Range:</span>
                    <button
                      onClick={() => handleFilterByDateRange('week')}
                      className={`px-3 py-1 text-sm rounded-lg ${
                        dateRange === 'week' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
                      }`}
                    >
                      This Week
                    </button>
                    <button
                      onClick={() => handleFilterByDateRange('month')}
                      className={`px-3 py-1 text-sm rounded-lg ${
                        dateRange === 'month' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
                      }`}
                    >
                      This Month
                    </button>
                    <button
                      onClick={() => handleFilterByDateRange('year')}
                      className={`px-3 py-1 text-sm rounded-lg ${
                        dateRange === 'year' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
                      }`}
                    >
                      This Year
                    </button>
                    <button
                      onClick={() => handleFilterByDateRange('all')}
                      className={`px-3 py-1 text-sm rounded-lg ${
                        dateRange === 'all' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
                      }`}
                    >
                      All Time
                    </button>
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-sm text-gray-500">Category:</span>
                    <select
                      value={selectedCategory}
                      onChange={(e) => handleFilterByCategory(e.target.value)}
                      className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-gray-900"
                    >
                      <option value="all" className="text-gray-900">All Categories</option>
                      <option value="Technology" className="text-gray-900">Technology</option>
                      <option value="Music" className="text-gray-900">Music</option>
                      <option value="Sports" className="text-gray-900">Sports</option>
                      <option value="Business" className="text-gray-900">Business</option>
                      <option value="Gaming" className="text-gray-900">Gaming</option>
                      <option value="Arts" className="text-gray-900">Arts</option>
                      <option value="Health" className="text-gray-900">Health</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-sm text-gray-500">Total Registrations</p>
                  <p className="text-3xl font-bold text-gray-900">{participationData.totalRegistrations}</p>
                  <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-sm text-gray-500">Active Participants</p>
                  <p className="text-3xl font-bold text-gray-900">{participationData.activeParticipants}</p>
                  <p className="text-xs text-green-600 mt-2">Out of {participationStats.totalStudents} students</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-sm text-gray-500">Avg Events/Student</p>
                  <p className="text-3xl font-bold text-gray-900">{participationData.avgEventsPerStudent}</p>
                  <p className="text-xs text-gray-500 mt-2">Across all categories</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-sm text-gray-500">Completion Rate</p>
                  <p className="text-3xl font-bold text-gray-900">{participationData.completionRate}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${participationData.completionRate}%` }}></div>
                  </div>
                </div>
              </div>

              {participationView === 'overview' && (
                <>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Participation by Category</h3>
                    <div className="space-y-4">
                      {participationData.categoryStats.map((stat) => (
                        <div key={stat.category}>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="font-medium text-gray-700">{stat.category}</span>
                            <span className="text-gray-600">{stat.registrations} registrations • {stat.students} students</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                              style={{ width: `${(stat.registrations / participationData.totalRegistrations) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Registration Trends</h3>
                    <div className="h-64 flex items-end justify-between gap-2">
                      {participationData.monthlyTrends.map((month) => (
                        <div key={month.month} className="flex-1 flex flex-col items-center">
                          <div
                            className="w-full bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-lg"
                            style={{ height: `${(month.registrations / 100) * 200}px` }}
                          ></div>
                          <span className="text-xs text-gray-500 mt-2">{month.month}</span>
                          <span className="text-xs font-medium text-gray-700">{month.registrations}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Active Students</h3>
                    <div className="space-y-3">
                      {participationData.topParticipants.map((student, index) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleViewStudentParticipation(student)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                              index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-purple-600'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{student.name}</p>
                              <p className="text-xs text-gray-500">{student.events} events • {student.categories.join(', ')}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-400">Last active</p>
                            <p className="text-sm font-medium text-gray-700">{student.lastActive}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {participationView === 'details' && (
                <>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Recent Registrations</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {participationData.recentRegistrations.map((reg) => (
                            <tr key={reg.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4">
                                <span className="font-medium text-gray-900">{reg.student}</span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600">{reg.event}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{reg.date}</td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  reg.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                                  reg.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                                  'bg-red-100 text-red-600'
                                }`}>
                                  {reg.status}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                                  View
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">All Students Participation</h3>
                    <div className="space-y-4">
                      {users.filter(u => u.userType === 'student').map((student) => (
                        <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                            <div>
                              <p className="font-medium text-gray-900">{student.name}</p>
                              <p className="text-xs text-gray-500">{student.college} • {student.year}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <p className="text-sm text-gray-500">Events</p>
                              <p className="text-lg font-bold text-purple-600">{student.activities}</p>
                            </div>
                            <div className="w-32">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                                  style={{ width: `${(student.activities / 20) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            <button
                              onClick={() => handleViewStudentParticipation(student)}
                              className="px-3 py-1.5 text-sm bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {participationView === 'analytics' && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Participation Rate</h3>
                    <div className="flex items-center justify-center">
                      <div className="relative w-48 h-48">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="10"
                            strokeDasharray={`${participationStroke} ${participationCircle - participationStroke}`}
                            strokeDashoffset={participationOffset}
                            strokeLinecap="round"
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#9333ea" />
                              <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-3xl font-bold text-gray-900">{participationStats.participationRate}%</p>
                            <p className="text-xs text-gray-500">Participation</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
                    <div className="space-y-3">
                      {participationData.categoryStats.map((stat) => (
                        <div key={stat.category} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{stat.category}</span>
                          <span className="text-sm font-medium text-gray-900">
                            {Math.round((stat.registrations / participationData.totalRegistrations) * 100)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6 col-span-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Metrics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-purple-50 rounded-xl">
                        <p className="text-2xl font-bold text-purple-600">45</p>
                        <p className="text-xs text-gray-600">Active This Week</p>
                      </div>
                      <div className="text-center p-4 bg-pink-50 rounded-xl">
                        <p className="text-2xl font-bold text-pink-600">82</p>
                        <p className="text-xs text-gray-600">Active This Month</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-xl">
                        <p className="text-2xl font-bold text-green-600">156</p>
                        <p className="text-xs text-gray-600">Total Registrations</p>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-xl">
                        <p className="text-2xl font-bold text-yellow-600">12</p>
                        <p className="text-xs text-gray-600">New This Week</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Communities Tab */}
          {activeTab === 'communities' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Manage Communities</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={handleExport}
                    className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50"
                  >
                    <FiDownload className="w-4 h-4" />
                    Export
                  </button>
                  <button 
                    onClick={() => setSelectMode(!selectMode)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                      selectMode 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                        : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {selectMode ? 'Cancel Selection' : 'Select Communities'}
                  </button>
                  <button 
                    onClick={handleAdd}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg flex items-center gap-2 hover:shadow-md"
                  >
                    <FiPlus className="w-4 h-4" />
                    Add Community
                  </button>
                </div>
              </div>

              {/* Selection Bar */}
              {selectMode && selectedItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-purple-50 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">
                      {selectedItems.length} community(ies) selected
                    </span>
                    <button
                      onClick={() => handleBulkAction('delete')}
                      className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                    >
                      Delete Selected
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedItems([])}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {/* Search & Filters */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search communities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-gray-900"
                  >
                    <option value="all" className="text-gray-900">All Status</option>
                    <option value="active" className="text-gray-900">Active</option>
                    <option value="inactive" className="text-gray-900">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Communities Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {selectMode && (
                        <th className="px-4 py-3 w-10">
                          <button
                            onClick={() => handleSelectAll(filteredCommunities)}
                            className="text-gray-600 hover:text-purple-600"
                          >
                            {selectedItems.length === filteredCommunities.length ? (
                              <FiCheckSquare className="w-5 h-5" />
                            ) : (
                              <FiSquare className="w-5 h-5" />
                            )}
                          </button>
                        </th>
                      )}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Community</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Members</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Events</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lead</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredCommunities.map((community) => (
                      <tr key={community.id} className="hover:bg-gray-50">
                        {selectMode && (
                          <td className="px-4 py-4">
                            <button
                              onClick={() => handleSelectItem(community.id)}
                              className="text-gray-600 hover:text-purple-600"
                            >
                              {selectedItems.includes(community.id) ? (
                                <FiCheckSquare className="w-5 h-5 text-purple-600" />
                              ) : (
                                <FiSquare className="w-5 h-5" />
                              )}
                            </button>
                          </td>
                        )}
                        <td className="px-6 py-4 font-medium text-gray-900">{community.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{community.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{community.members.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{community.events}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{community.lead}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(community.status)}`}>
                            {community.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleView(community)}
                              className="p-1 hover:bg-gray-100 rounded"
                              title="View"
                            >
                              <FiEye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button 
                              onClick={() => handleEdit(community)}
                              className="p-1 hover:bg-gray-100 rounded"
                              title="Edit"
                            >
                              <FiEdit className="w-4 h-4 text-gray-600" />
                            </button>
                            <button 
                              onClick={() => handleDelete(community)}
                              className="p-1 hover:bg-red-100 rounded"
                              title="Delete"
                            >
                              <FiTrash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* User Reports */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">User Reports</h3>
                  <div className="space-y-3">
                    {reports.map((report) => (
                      <div key={report.id} className={`p-3 rounded-lg ${
                        report.status === 'pending' ? 'bg-yellow-50' : 'bg-green-50'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <FiFlag className={`${
                              report.status === 'pending' ? 'text-yellow-600' : 'text-green-600'
                            } mt-1`} />
                            <div>
                              <p className="font-medium text-gray-900">{report.reason}</p>
                              <p className="text-sm text-gray-500">{report.reportedItem}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                Reported by {report.reportedBy} • {report.date}
                              </p>
                            </div>
                          </div>
                          {report.status === 'pending' && (
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleResolveReport(report.id, 'approve')}
                                className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
                                title="Approve"
                              >
                                <FiCheckCircle className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleResolveReport(report.id, 'reject')}
                                className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                                title="Reject"
                              >
                                <FiXCircle className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Health */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Server Status</span>
                      <span className="text-green-600 font-medium flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Operational
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Database</span>
                      <span className="text-green-600 font-medium flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Healthy
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">API Response Time</span>
                      <span className="text-gray-900 font-medium">124ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Active Sessions</span>
                      <span className="text-gray-900 font-medium">1,234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Storage Used</span>
                      <span className="text-gray-900 font-medium">45%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                    <input 
                      type="text" 
                      defaultValue="ClubConnect" 
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                    <input 
                      type="email" 
                      defaultValue="admin@kluniversity.ac.in" 
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Mode</label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900">
                      <option className="text-gray-900">Disabled</option>
                      <option className="text-gray-900">Enabled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default User Role</label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900">
                      <option className="text-gray-900">Student</option>
                      <option className="text-gray-900">Admin</option>
                    </select>
                  </div>
                  <button 
                    onClick={() => toast.success('Settings saved successfully')}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-md transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
                <div className="space-y-4 max-w-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Session Timeout</p>
                      <p className="text-sm text-gray-500">Auto logout after inactivity</p>
                    </div>
                    <select className="px-3 py-1 border border-gray-200 rounded-lg text-gray-900">
                      <option className="text-gray-900">30 minutes</option>
                      <option className="text-gray-900">1 hour</option>
                      <option className="text-gray-900">2 hours</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showRequestDetails && selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowRequestDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Request Details</h3>
                  <button
                    onClick={() => setShowRequestDetails(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="text-sm font-medium text-gray-900 capitalize">{selectedRequest.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="text-sm font-medium text-gray-900">{selectedRequest.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Submitted Date</p>
                    <p className="text-sm text-gray-700">{selectedRequest.submittedDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Requested By</p>
                    <p className="text-sm text-gray-700">{selectedRequest.requestedBy}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Summary</p>
                    <p className="text-sm text-gray-700">{selectedRequest.summary}</p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={() => setShowRequestDetails(false)}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleRejectWithReason(selectedRequest)
                      setShowRequestDetails(false)
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      handleApprove(selectedRequest)
                      setShowRequestDetails(false)
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-md"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showParticipationModal && selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowParticipationModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white sticky top-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedStudent.avatar}
                      alt={selectedStudent.name}
                      className="w-12 h-12 rounded-full border-2 border-white"
                    />
                    <div>
                      <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                      <p className="text-purple-100 text-sm">{selectedStudent.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowParticipationModal(false)}
                    className="text-white/80 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <p className="text-2xl font-bold text-purple-600">{selectedStudent.activities}</p>
                    <p className="text-xs text-gray-600">Total Events</p>
                  </div>
                  <div className="text-center p-4 bg-pink-50 rounded-xl">
                    <p className="text-2xl font-bold text-pink-600">
                      {events.filter(e => e.status !== 'completed').slice(0, selectedStudent.activities).length}
                    </p>
                    <p className="text-xs text-gray-600">Upcoming</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <p className="text-2xl font-bold text-green-600">
                      {Math.max(0, selectedStudent.activities - events.filter(e => e.status !== 'completed').slice(0, selectedStudent.activities).length)}
                    </p>
                    <p className="text-xs text-gray-600">Completed</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Categories Participated</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Technology', 'Business', 'Music'].map((cat, i) => (
                      <span key={i} className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Registered Events</h4>
                  <div className="space-y-3">
                    {events.slice(0, 5).map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white">
                            <FiCalendar className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{event.name}</p>
                            <p className="text-xs text-gray-500">{event.date}</p>
                          </div>
                        </div>
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                          Registered
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Participation Timeline</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p className="text-sm text-gray-600">Joined: {selectedStudent.joined}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <p className="text-sm text-gray-600">First event: 2 weeks after joining</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <p className="text-sm text-gray-600">Most active in: Technology category</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowViewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">View Details</h3>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                {activeTab === 'users' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <img src={currentItem.avatar} alt={currentItem.name} className="w-20 h-20 rounded-full object-cover" />
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900">{currentItem.name}</h4>
                        <p className="text-gray-500">{currentItem.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">College</p>
                        <p className="font-medium text-gray-900">{currentItem.college}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Year</p>
                        <p className="font-medium text-gray-900">{currentItem.year}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium text-gray-900">{currentItem.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Joined</p>
                        <p className="font-medium text-gray-900">{currentItem.joined}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Bio</p>
                      <p className="text-gray-700">{currentItem.bio}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'events' && (
                  <div className="space-y-4">
                    <img src={currentItem.image} alt={currentItem.name} className="w-full h-48 object-cover rounded-lg" />
                    <h4 className="text-2xl font-bold text-gray-900">{currentItem.name}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <p className="font-medium text-gray-900">{currentItem.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium text-gray-900">{currentItem.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium text-gray-900">{currentItem.time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium text-gray-900">{currentItem.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Organizer</p>
                        <p className="font-medium text-gray-900">{currentItem.organizer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="font-medium text-gray-900">{currentItem.price}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Description</p>
                      <p className="text-gray-700">{currentItem.description}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'communities' && (
                  <div className="space-y-4">
                    <h4 className="text-2xl font-bold text-gray-900">{currentItem.name}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <p className="font-medium text-gray-900">{currentItem.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="font-medium text-gray-900">{currentItem.status}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Community Lead</p>
                        <p className="font-medium text-gray-900">{currentItem.lead}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Contact</p>
                        <p className="font-medium text-gray-900">{currentItem.contact}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Members</p>
                        <p className="font-medium text-gray-900">{currentItem.members?.toLocaleString?.() ?? 0}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Events</p>
                        <p className="font-medium text-gray-900">{currentItem.events ?? 0}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Created</p>
                        <p className="font-medium text-gray-900">{currentItem.created || '—'}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Description</p>
                      <p className="text-gray-700">{currentItem.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(showAddModal || showEditModal) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowAddModal(false)
              setShowEditModal(false)
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {showAddModal
                      ? `Add New ${getActiveEntityLabel().singular}`
                      : `Edit ${getActiveEntityLabel().singular}`}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddModal(false)
                      setShowEditModal(false)
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {activeTab === 'users' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-gray-900 placeholder-gray-400"
                          placeholder="Enter name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-gray-900 placeholder-gray-400"
                          placeholder="Enter email"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
                          <input
                            type="text"
                            value={formData.college}
                            onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                            placeholder="Enter college"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                          <input
                            type="text"
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                            placeholder="Enter year"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                          placeholder="Enter phone"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                          placeholder="Enter bio"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'events' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                          placeholder="Enter event name"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                          <input
                            type="text"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                            placeholder="Enter category"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                          <input
                            type="text"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                            placeholder="Enter price"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                          <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                          <input
                            type="time"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                          placeholder="Enter location"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                          placeholder="Enter description"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'communities' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Community Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                          placeholder="Enter community name"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                          <input
                            type="text"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                            placeholder="Enter category"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Community Lead</label>
                          <input
                            type="text"
                            value={formData.lead}
                            onChange={(e) => setFormData({ ...formData, lead: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                            placeholder="Enter lead name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                          <input
                            type="text"
                            value={formData.contact}
                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                            placeholder="Enter contact"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                          placeholder="Enter description"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'schedule' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event</label>
                        <input
                          type="text"
                          value={formData.event}
                          onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                          placeholder="Enter event name"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                          <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                          <input
                            type="text"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                            placeholder="e.g. 10:00 AM - 6:00 PM"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                        <input
                          type="text"
                          value={formData.venue}
                          onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                          placeholder="Enter venue"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Registered</label>
                          <input
                            type="number"
                            min="0"
                            value={formData.registered}
                            onChange={(e) => setFormData({ ...formData, registered: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                          <input
                            type="number"
                            min="0"
                            value={formData.capacity}
                            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900"
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => {
                      setShowAddModal(false)
                      setShowEditModal(false)
                    }}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={showAddModal ? handleSaveAdd : handleSaveEdit}
                    disabled={isLoading}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-md transition-all flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <FiRefreshCw className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FiSave className="w-4 h-4" />
                        Save
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiTrash2 className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Confirm Delete</h3>
                <p className="text-gray-500 text-center mb-6">
                  Are you sure you want to delete this {getActiveEntityLabel().singular.toLowerCase()}? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <FiRefreshCw className="w-4 h-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Action Modal */}
      <AnimatePresence>
        {showBulkActionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowBulkActionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiAlertCircle className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Confirm Bulk Action</h3>
                <p className="text-gray-500 text-center mb-6">
                  Are you sure you want to {bulkActionType} {selectedItems.length} selected {activeTab}?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowBulkActionModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmBulkAction}
                    disabled={isLoading}
                    className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors flex items-center justify-center gap-2 ${
                      bulkActionType === 'delete' 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-md'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <FiRefreshCw className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Confirm'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminDashboard