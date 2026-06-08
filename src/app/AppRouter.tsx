import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../hooks/useAuthStore'
import LandingPage from './landing/LandingPage'
import Login from './auth/Login'
import RoleSelection from './onboarding/RoleSelection'
import ChefWizard from './onboarding/ChefWizard'
import DiscoveryFeed from './discovery/DiscoveryFeed'
import ChefDetail from './customer/ChefDetail'
import Subscriptions from './customer/Subscriptions'
import AIPlanner from './customer/AIPlanner'
import OrderTracker from './customer/OrderTracker'
import ChefDashboard from './chef/ChefDashboard'
import ChefEarnings from './chef/ChefEarnings'
import DesignSystemShowcase from './design-system/DesignSystemShowcase'

import CustomerLayout from '../components/layouts/CustomerLayout'
import ChefLayout from '../components/layouts/ChefLayout'

// 1. Guard to check if user has a valid session
function RequireAuth() {
  const { session } = useAuthStore()
  if (!session) {
    return <Navigate to="/auth/login" replace />
  }
  return <Outlet />
}

// 2. Guard to redirect already-authenticated users from public auth pages
function RejectAuth() {
  const { session, profile } = useAuthStore()
  if (session) {
    if (!profile?.role) {
      return <Navigate to="/onboarding/role" replace />
    }
    return <Navigate to={profile.role === 'customer' ? '/discovery' : '/chef/dashboard'} replace />
  }
  return <Outlet />
}

// 3. Guard to enforce role selection on authenticated users with no role
function RequireNoRole() {
  const { profile } = useAuthStore()
  if (profile?.role) {
    return <Navigate to={profile.role === 'customer' ? '/discovery' : '/chef/dashboard'} replace />
  }
  return <Outlet />
}

// 4. Guard to check role authorization (customer vs chef)
function RequireRole({ allowedRole }: { allowedRole: 'customer' | 'chef' }) {
  const { profile } = useAuthStore()
  
  if (!profile?.role) {
    return <Navigate to="/onboarding/role" replace />
  }

  if (profile.role !== allowedRole) {
    // If role mismatch, route back to the appropriate user portal
    return <Navigate to={profile.role === 'customer' ? '/discovery' : '/chef/dashboard'} replace />
  }

  return <Outlet />
}

export default function AppRouter() {
  return (
    <Routes>
      
      {/* A. Public Landing Page */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/design-system" element={<DesignSystemShowcase />} />

      {/* B. Public Auth Routes (Blocked for authenticated users) */}
      <Route element={<RejectAuth />}>
        <Route path="/auth/login" element={<Login />} />
      </Route>

      {/* C. Protected Routes (Require Session) */}
      <Route element={<RequireAuth />}>
        
        {/* Onboarding - User has no role assigned yet */}
        <Route element={<RequireNoRole />}>
          <Route path="/onboarding/role" element={<RoleSelection />} />
        </Route>

        {/* Customer Portal (Require 'customer' role) */}
        <Route element={<RequireRole allowedRole="customer" />}>
          <Route element={<CustomerLayout />}>
            <Route path="/discovery" element={<DiscoveryFeed />} />
            <Route path="/chef/:id" element={<ChefDetail />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/track/:order_id" element={<OrderTracker />} />
            <Route path="/planner" element={<AIPlanner />} />
          </Route>
        </Route>

        {/* Chef Portal (Require 'chef' role) */}
        <Route element={<RequireRole allowedRole="chef" />}>
          {/* Onboarding Wizard (Standalone page for Chef Onboarding) */}
          <Route path="/onboarding/chef-wizard" element={<ChefWizard />} />

          {/* Chef Layout Dashboard */}
          <Route element={<ChefLayout />}>
            <Route path="/chef/dashboard" element={<ChefDashboard />} />
            <Route path="/chef/earnings" element={<ChefEarnings />} />
          </Route>
        </Route>

      </Route>

      {/* D. Catch-All Route fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  )
}
