import React from 'react'
import toast from 'react-hot-toast'
import { useActivities } from '../../hooks/useActivities'
import { activityService } from '../../services/activityService'
import Button from '../common/Button'

const fallbackActivities = [
  { id: 'music-club', title: 'Music Club', category: 'Arts', eventDate: '2026-03-12' },
  { id: 'coding-sprint', title: 'Coding Sprint', category: 'Tech', eventDate: '2026-03-18' },
  { id: 'debate-forum', title: 'Debate Forum', category: 'Literary', eventDate: '2026-03-25' },
]

const ActivityCatalog = () => {
  const { activities, loading, error, refetch } = useActivities()
  const list = activities.length ? activities : fallbackActivities

  const handleRegister = async (activity) => {
    try {
      await activityService.registerForActivity(activity.id)
      toast.success(`Registered for ${activity.title || activity.name}`)
    } catch {
      const saved = JSON.parse(localStorage.getItem('myRegistrations') || '[]')
      const alreadyRegistered = saved.some((item) => item.id === activity.id)
      if (!alreadyRegistered) {
        localStorage.setItem('myRegistrations', JSON.stringify([...saved, activity]))
      }
      toast.success(`Saved ${activity.title || activity.name} registration locally`)
    } finally {
      refetch()
    }
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground">Activity Catalog</h2>
      {loading && <p className="text-sm text-foreground">Loading activities...</p>}
      {error && <p className="text-sm text-destructive">Using fallback activities while API is unavailable.</p>}
      <div className="space-y-2">
        {list.slice(0, 4).map((activity) => (
          <div key={activity.id} className="flex items-center justify-between rounded-md border border-border bg-background p-3">
            <div>
              <p className="font-medium text-foreground">{activity.title || activity.name || 'Untitled Activity'}</p>
              <p className="text-sm text-foreground">{activity.category || 'General'} • {activity.eventDate || activity.date || 'TBA'}</p>
            </div>
            <Button size="sm" onClick={() => handleRegister(activity)}>
              Register
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivityCatalog
