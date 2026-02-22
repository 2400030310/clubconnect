import React from 'react'
import { useActivities } from '../../hooks/useActivities'

const AdminDashboard = () => {
  const { activities, loading } = useActivities()

  const activeCount = activities.filter((item) => item.status !== 'completed').length
  const categories = new Set(activities.map((item) => item.category).filter(Boolean)).size

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground">Admin Overview</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-md border border-border bg-card p-3">
          <p className="text-sm font-medium text-foreground">Activities</p>
          <p className="text-xl font-bold text-primary">{loading ? '...' : activities.length}</p>
        </div>
        <div className="rounded-md border border-border bg-card p-3">
          <p className="text-sm font-medium text-foreground">Active</p>
          <p className="text-xl font-bold text-primary">{loading ? '...' : activeCount}</p>
        </div>
        <div className="rounded-md border border-border bg-card p-3 col-span-2">
          <p className="text-sm font-medium text-foreground">Categories</p>
          <p className="text-xl font-bold text-primary">{loading ? '...' : categories}</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
