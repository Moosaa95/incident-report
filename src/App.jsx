import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Dashboard from './pages/Dashboard'
import Incidents from './pages/Incidents'
import ReportPage from './pages/reports'
import ReportDetailsPage from './pages/reports/ReportDetails'
import LocationPage from './pages/location'
import SettingsPage from './pages/settings'
import ProfilePage from './pages/profile'
import Login from './pages/login'
import Register from './pages/register'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="incidents" element={<Incidents />} />
                    <Route exact path="/reports" element={<ReportPage />} />
                    <Route exact path="/locations" element={<LocationPage />} />
                    <Route exact path="/settings" element={<SettingsPage />} />
                    <Route exact path="/profile" element={<ProfilePage />} />
                    <Route path="/reports/:reportId" element={<ReportDetailsPage />} />
                </Route>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    )
}

export default App
