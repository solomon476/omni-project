"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Heart, Wind, Thermometer, Activity, 
  LayoutDashboard, Bell, LineChart, Map, Users, Sparkles, Radio, Settings,
  RotateCw, Battery, Signal, Satellite, Cpu, Code, MapPin, ShieldAlert,
  TrendingUp, TrendingDown, Minus
} from "lucide-react";

// --- Types ---
interface VitalCard {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit: string;
  sub: string;
  trend: "up" | "down" | "stable";
  trendLabel: string;
  status: "ok" | "warn" | "danger" | "info";
}

interface FeedItem {
  id: number;
  type: "safe" | "warn" | "alert" | "info";
  title: string;
  desc: string;
  time: string;
}

interface Contact {
  id: number;
  initials: string;
  name: string;
  role: string;
  online: boolean;
  avatarClass: string;
}

// --- Mock Data ---
const VITALS: VitalCard[] = [
  {
    icon: <Heart size={24} />,
    label: "Heart Rate",
    value: 72,
    unit: "bpm",
    sub: "Normal resting rate",
    trend: "stable",
    trendLabel: "Stable",
    status: "ok",
  },
  {
    icon: <Wind size={24} />,
    label: "Blood Oxygen",
    value: 98,
    unit: "%",
    sub: "SpO₂ — optimal",
    trend: "stable",
    trendLabel: "Stable",
    status: "ok",
  },
  {
    icon: <Thermometer size={24} />,
    label: "Body Temp",
    value: 36.8,
    unit: "°C",
    sub: "Normal range",
    trend: "up",
    trendLabel: "+0.3°",
    status: "warn",
  },
  {
    icon: <Activity size={24} />,
    label: "Motion",
    value: "Active",
    unit: "",
    sub: "Light movement detected",
    trend: "up",
    trendLabel: "Moving",
    status: "info",
  },
];

const FEED_ITEMS: FeedItem[] = [
  {
    id: 1,
    type: "safe",
    title: "System Online",
    desc: "OMNI wearable connected via GSM. All sensors nominal.",
    time: "Just now",
  },
  {
    id: 2,
    type: "info",
    title: "GPS Lock Acquired",
    desc: "Location tracking active. Accuracy: ±4m.",
    time: "2 min ago",
  },
  {
    id: 3,
    type: "warn",
    title: "Elevated Temperature",
    desc: "Body temperature slightly elevated at 36.8°C. Monitoring closely.",
    time: "5 min ago",
  },
  {
    id: 4,
    type: "safe",
    title: "Heart Rate Normal",
    desc: "Resting heart rate returned to baseline after activity.",
    time: "12 min ago",
  },
  {
    id: 5,
    type: "info",
    title: "Daily Summary Generated",
    desc: "AI wellbeing report ready. No anomalies detected in last 24h.",
    time: "1 hr ago",
  },
];

const CONTACTS: Contact[] = [
  {
    id: 1,
    initials: "MJ",
    name: "Mary Johnson",
    role: "Primary Guardian",
    online: true,
    avatarClass: "avatar-1",
  },
  {
    id: 2,
    initials: "DR",
    name: "Dr. Roberts",
    role: "Medical Contact",
    online: true,
    avatarClass: "avatar-2",
  },
  {
    id: 3,
    initials: "AS",
    name: "Alex Smith",
    role: "Emergency Contact",
    online: false,
    avatarClass: "avatar-3",
  },
  {
    id: 4,
    initials: "LP",
    name: "Laura Park",
    role: "School Coordinator",
    online: true,
    avatarClass: "avatar-4",
  },
];

// Wave bar heights (randomised but seeded for SSR safety)
const WAVE_HEIGHTS = [30, 55, 80, 45, 90, 60, 75, 40, 65, 85, 50, 70, 95, 35, 80, 60, 45, 90, 55, 70, 40, 85, 65, 50, 75, 30, 95, 60, 45, 80];
const WAVE_DURATIONS = [1.2, 0.9, 1.5, 1.0, 1.3, 0.8, 1.6, 1.1, 0.95, 1.4];

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [heartRate, setHeartRate] = useState(72);
  const [sosActive, setSosActive] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Simulated live heart rate fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(60, Math.min(100, prev + delta));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSOS = () => {
    setSosActive(true);
    setTimeout(() => setSosActive(false), 3000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const navItems = [
    { id: "dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard", badge: null },
    { id: "alerts", icon: <Bell size={18} />, label: "Alerts", badge: "2" },
    { id: "vitals", icon: <LineChart size={18} />, label: "Vitals History", badge: null },
    { id: "map", icon: <Map size={18} />, label: "Live Location", badge: null },
    { id: "contacts", icon: <Users size={18} />, label: "Trusted Contacts", badge: null },
    { id: "ai", icon: <Sparkles size={18} />, label: "AI Insights", badge: null },
    { id: "devices", icon: <Radio size={18} />, label: "Device Manager", badge: null },
    { id: "settings", icon: <Settings size={18} />, label: "Settings", badge: null },
  ];

  return (
    <div className="app-layout">
      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-mark">OM</div>
          <div className="logo-text">OMNI</div>
        </div>

        <p className="sidebar-label">Navigation</p>
        <nav className="sidebar-nav">
          {navItems.slice(0, 6).map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              className={`nav-item${activeNav === item.id ? " active" : ""}`}
              onClick={() => setActiveNav(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>

        <p className="sidebar-label">System</p>
        <nav className="sidebar-nav">
          {navItems.slice(6).map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              className={`nav-item${activeNav === item.id ? " active" : ""}`}
              onClick={() => setActiveNav(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-chip" id="user-profile">
            <div className="user-avatar">SL</div>
            <div className="user-info">
              <div className="user-name">Solomon</div>
              <div className="user-role">Admin · Caregiver</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN PANEL ── */}
      <div className="main-panel">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <h2>Overview Dashboard</h2>
            <div className="topbar-sub">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          <div className="topbar-right">
            <div className="status-chip safe" id="system-status">
              <span className="status-dot"></span>
              All Systems Normal
            </div>
            
            <div className="notification-container" style={{ position: 'relative' }}>
              <button 
                className={`icon-btn ${showNotifications ? 'active' : ''}`} 
                id="btn-notifications" 
                aria-label="Notifications"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
                {FEED_ITEMS.length > 0 && <span className="notif-dot"></span>}
              </button>
              
              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h4>Recent Alerts</h4>
                  </div>
                  <div className="notifications-list">
                    {FEED_ITEMS.slice(0, 3).map(item => (
                      <div key={item.id} className="notif-item">
                        <div className={`feed-dot ${item.type}`}></div>
                        <div className="notif-content">
                          <p className="notif-title">{item.title}</p>
                          <p className="notif-time">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="view-all-notifs" onClick={() => { setActiveNav("alerts"); setShowNotifications(false); }}>
                    View all alerts →
                  </button>
                </div>
              )}
            </div>

            <button 
              className={`icon-btn ${isRefreshing ? 'refreshing' : ''}`} 
              id="btn-refresh" 
              aria-label="Refresh"
              onClick={handleRefresh}
            >
              <RotateCw size={20} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="content">
          {activeNav === "dashboard" && (
            <>
          {/* ── Vital Cards ── */}
          <p className="section-title">Live Vitals</p>
          <div className="vitals-grid">
            {VITALS.map((v, i) => (
              <div
                key={i}
                id={`vital-${v.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={`vital-card ${v.status}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="vital-card-top">
                  <div className="vital-icon-wrap">{v.icon}</div>
                  <span
                    className={`vital-trend ${
                      v.trend === "up"
                        ? "trend-up"
                        : v.trend === "down"
                        ? "trend-down"
                        : "trend-stable"
                    }`}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      {v.trend === "up" ? <TrendingUp size={16} /> : v.trend === "down" ? <TrendingDown size={16} /> : <Minus size={16} />}
                      {v.trendLabel}
                    </span>
                  </span>
                </div>
                <div className="vital-value">
                  {v.label === "Heart Rate" ? heartRate : v.value}
                  {v.unit && <span className="vital-unit">{v.unit}</span>}
                </div>
                <div className="vital-label">{v.label}</div>
                <div className="vital-sub">{v.sub}</div>
              </div>
            ))}
          </div>

          {/* ── Main Grid ── */}
          <div className="main-grid">
            {/* Left Column */}
            <div className="left-col">
              {/* Heart Rate Chart */}
              <div className="panel" id="panel-hr-chart">
                <div className="panel-header">
                  <span className="panel-title">Heart Rate Monitor</span>
                  <span className="panel-action" onClick={() => setActiveNav("vitals")}>View full history →</span>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-outfit)",
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "var(--accent-cyan)",
                    }}
                  >
                    {heartRate}
                  </span>
                  <span
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.9rem",
                      marginLeft: "0.4rem",
                    }}
                  >
                    bpm · Live
                  </span>
                </div>
                <div className="waveform-bars">
                  {WAVE_HEIGHTS.map((h, i) => (
                    <div
                      key={i}
                      className="wave-bar"
                      style={
                        {
                          height: `${h}%`,
                          "--dur": `${WAVE_DURATIONS[i % WAVE_DURATIONS.length]}s`,
                          animationDelay: `${i * 0.05}s`,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Live Map */}
              <div className="panel" id="panel-map" style={{ padding: 0, overflow: "hidden" }}>
                <div
                  className="panel-header"
                  style={{ padding: "1.25rem 1.75rem 0", zIndex: 10, position: 'relative' }}
                >
                  <span className="panel-title">Live Location</span>
                  <span className="panel-action" onClick={() => setActiveNav("map")}>Open full map →</span>
                </div>
                <div className="map-panel" style={{ border: "none", borderRadius: 0, height: "220px", position: "relative" }}>
                  <Image 
                    src="/map_interface.png" 
                    alt="Live Map Interface" 
                    fill 
                    style={{ objectFit: "cover", opacity: 0.8 }}
                    priority
                  />
                  <div className="map-grid" style={{ position: "absolute", inset: 0, zIndex: 2 }}>
                    <div className="map-rings">
                      <div className="map-ring"></div>
                      <div className="map-ring"></div>
                      <div className="map-ring"></div>
                    </div>
                    <div className="map-pin"></div>
                  </div>
                  <div className="map-overlay" style={{ position: "absolute", bottom: "1rem", left: "1rem", right: "1rem", zIndex: 2 }}>
                    <span className="map-coords">37.7749° N, 122.4194° W</span>
                    <span className="map-badge"><MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} /> GPS Active</span>
                  </div>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="panel" id="panel-activity">
                <div className="panel-header">
                  <span className="panel-title">Activity Feed</span>
                  <span className="panel-action" onClick={() => setActiveNav("alerts")}>View all →</span>
                </div>
                <div className="feed-list">
                  {FEED_ITEMS.map((item, i) => (
                    <div
                      key={item.id}
                      className="feed-item"
                      style={{ animationDelay: `${i * 0.08}s` }}
                    >
                      <div className="feed-dot-wrap">
                        <div className={`feed-dot ${item.type}`}></div>
                      </div>
                      <div className="feed-content">
                        <div className="feed-title">{item.title}</div>
                        <div className="feed-desc">{item.desc}</div>
                      </div>
                      <div className="feed-time">{item.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="right-col">
              {/* SOS Panel */}
              <div className="panel sos-section" id="panel-sos">
                <div className="panel-header">
                  <span className="panel-title">Emergency SOS</span>
                </div>
                <button
                  id="btn-sos"
                  className="sos-btn"
                  onClick={handleSOS}
                  style={
                    sosActive
                      ? {
                          background:
                            "rgba(255,53,72,0.3)",
                          borderColor: "var(--alert-red)",
                          boxShadow: "0 0 40px rgba(255,53,72,0.5)",
                        }
                      : {}
                  }
                >
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <ShieldAlert size={20} /> {sosActive ? "SOS ACTIVATED" : "TRIGGER SOS"}
                  </span>
                </button>
                <p className="sos-desc">
                  {sosActive
                    ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}><ShieldAlert size={14} /> Alerting trusted contacts & emergency services…</span>
                    : "Instantly alerts trusted contacts and shares live location"}
                </p>
              </div>

              {/* Trusted Contacts */}
              <div className="panel" id="panel-contacts">
                <div className="panel-header">
                  <span className="panel-title">Trusted Contacts</span>
                  <span className="panel-action" onClick={() => setActiveNav("contacts")}>Manage →</span>
                </div>
                <div className="contacts-list">
                  {CONTACTS.map((c) => (
                    <div key={c.id} id={`contact-${c.id}`} className="contact-item">
                      <div className={`contact-avatar ${c.avatarClass}`}>
                        {c.initials}
                      </div>
                      <div className="contact-info">
                        <div className="contact-name">{c.name}</div>
                        <div className="contact-role">{c.role}</div>
                      </div>
                      <div
                        className={`contact-status ${c.online ? "online" : "offline"}`}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Device Status */}
              <div className="panel" id="panel-device">
                <div className="panel-header">
                  <span className="panel-title">Device Status</span>
                </div>
                <div className="device-items">
                  {[
                    { icon: <Battery size={16} />, label: "Battery", value: "87%", cls: "ok" },
                    { icon: <Signal size={16} />, label: "GSM Signal", value: "Strong", cls: "ok" },
                    { icon: <Satellite size={16} />, label: "GPS", value: "Locked", cls: "ok" },
                    { icon: <Cpu size={16} />, label: "Sensor Health", value: "Nominal", cls: "ok" },
                    { icon: <Code size={16} />, label: "Firmware", value: "v2.1.4", cls: "warn" },
                  ].map((d, i) => (
                    <div key={i} className="device-row">
                      <div className="device-row-left">
                        <span>{d.icon}</span>
                        <span>{d.label}</span>
                      </div>
                      <span className={`device-value ${d.cls}`}>{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
            </>
          )}

          {activeNav === "vitals" && (
            <div className="panel full-height-panel">
              <div className="panel-header">
                <span className="panel-title">Detailed Vitals History</span>
              </div>
              <div className="history-chart-placeholder">
                <div className="large-sparkline">
                  {/* Mock detailed chart */}
                  {Array.from({length: 40}).map((_, i) => (
                    <div key={i} className="history-bar" style={{ height: `${30 + Math.random() * 60}%` }}></div>
                  ))}
                </div>
              </div>
              <div className="history-stats">
                <div className="stat-box">
                  <span className="stat-label">Average HR (24h)</span>
                  <span className="stat-value">71 bpm</span>
                </div>
                <div className="stat-box">
                  <span className="stat-label">Peak HR</span>
                  <span className="stat-value text-accent-red">112 bpm</span>
                </div>
                <div className="stat-box">
                  <span className="stat-label">Avg SpO₂</span>
                  <span className="stat-value text-accent-cyan">98%</span>
                </div>
              </div>
            </div>
          )}

          {activeNav === "map" && (
            <div className="panel full-height-panel" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="panel-header" style={{ padding: "1.25rem 1.75rem", zIndex: 10, position: 'relative' }}>
                <span className="panel-title">Full Live Location Map</span>
              </div>
              <div className="map-panel" style={{ border: "none", borderRadius: 0, height: "calc(100% - 65px)", position: "relative" }}>
                  <Image 
                    src="/map_interface.png" 
                    alt="Live Map Interface" 
                    fill 
                    style={{ objectFit: "cover", opacity: 0.9 }}
                    priority
                  />
                  <div className="map-grid" style={{ position: "absolute", inset: 0, zIndex: 2 }}>
                    <div className="map-rings" style={{ transform: 'scale(2)' }}>
                      <div className="map-ring"></div>
                      <div className="map-ring"></div>
                      <div className="map-ring"></div>
                    </div>
                    <div className="map-pin"></div>
                  </div>
                  <div className="map-overlay" style={{ position: "absolute", bottom: "2rem", left: "2rem", zIndex: 2 }}>
                    <div className="mini-stat">
                      <span>Coordinates</span>
                      <strong>37.7749° N, 122.4194° W</strong>
                    </div>
                    <div className="mini-stat" style={{ marginTop: '10px' }}>
                      <span>Status</span>
                      <strong><MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} /> GPS Active (Accuracy ±2m)</strong>
                    </div>
                  </div>
              </div>
            </div>
          )}

          {activeNav === "alerts" && (
            <div className="panel full-height-panel">
              <div className="panel-header">
                <span className="panel-title">System Alerts & Activity History</span>
              </div>
              <div className="full-feed-list">
                {FEED_ITEMS.map((item) => (
                  <div key={item.id} className="feed-item large-feed-item">
                    <div className="feed-dot-wrap">
                      <div className={`feed-dot ${item.type}`}></div>
                    </div>
                    <div className="feed-content">
                      <div className="feed-title">{item.title}</div>
                      <div className="feed-desc">{item.desc}</div>
                    </div>
                    <div className="feed-time">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {["contacts", "ai", "devices", "settings"].includes(activeNav) && (
            <div className="panel full-height-panel placeholder-view-container">
              <div className="panel-header">
                <span className="panel-title">{navItems.find(n => n.id === activeNav)?.label}</span>
              </div>
              <div className="placeholder-view">
                <Settings size={48} className="placeholder-icon text-accent-cyan" />
                <h3>Module in Development</h3>
                <p>This section is currently being configured for the OMNI ecosystem.</p>
                <button className="sos-btn" onClick={() => setActiveNav("dashboard")} style={{ width: 'auto', padding: '0.8rem 2rem', marginTop: '1.5rem', background: 'var(--glass-bg)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}>Return to Dashboard</button>
              </div>
            </div>
          )}
          
        </main>
      </div>
      
      {/* ── MOBILE BOTTOM NAV ── */}
      <nav className="mobile-bottom-nav">
        {[
          { id: "dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
          { id: "vitals", icon: <LineChart size={20} />, label: "Vitals" },
          { id: "map", icon: <Map size={20} />, label: "Map" },
          { id: "alerts", icon: <Bell size={20} />, label: "Alerts" },
        ].map(item => (
          <button 
            key={item.id}
            className={`mobile-nav-item ${activeNav === item.id ? 'active' : ''}`}
            onClick={() => setActiveNav(item.id)}
          >
            <span className="mobile-nav-icon">{item.icon}</span>
            <span className="mobile-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
