import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLawyer } from '../context/LawyerContext';
import '../pages/LawyerPanel.css';

export default function LawyerLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { profile, chats } = useLawyer();

  // Compute total unread messages
  const totalUnread = Object.values(chats).reduce((sum, c) => sum + (c.unread || 0), 0);

  // Add the custom lawyer-panel-body class to the body on mount, and clean up on unmount
  useEffect(() => {
    document.body.classList.add('lawyer-panel-body');
    return () => {
      document.body.classList.remove('lawyer-panel-body');
    };
  }, []);

  const navItems = [
    { label: 'Dashboard', path: '/lawyer/dashboard', icon: 'dashboard' },
    { label: 'Case Files', path: '/lawyer/cases', icon: 'folder_open' },
    { label: 'Documents', path: '/lawyer/documents', icon: 'description' },
    { label: 'Messages', path: '/lawyer/messages', icon: 'forum', isChat: true },
    { label: 'Billings', path: '/lawyer/billings', icon: 'account_balance_wallet' },
    { label: 'Settings', path: '/lawyer/settings', icon: 'settings' },
  ];

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* SideNavBar (The Anchor) */}
      <aside className="w-64 h-screen fixed left-0 top-0 bg-surface flex flex-col py-stack-lg border-r border-outline-variant z-50">
        <div className="px-6 mb-8">
          <h1 className="font-headline-md text-headline-md font-bold text-primary">eSewa Legal</h1>
          <p className="font-body-sm text-on-surface-variant opacity-70">Professional Suite</p>
        </div>
        <nav className="flex-grow space-y-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-6 py-3 transition-colors group ${
                  isActive
                    ? 'font-bold text-primary border-r-4 border-primary bg-surface-container-low'
                    : 'text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                <div className="flex items-center">
                  <span className="material-symbols-outlined mr-3">{item.icon}</span>
                  <span className="font-body-md">{item.label}</span>
                </div>
                {item.isChat && totalUnread > 0 && (
                  <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full mr-2">
                    {totalUnread}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="px-6 py-6 border-t border-outline-variant mt-auto space-y-4">
          <button
            onClick={() => navigate('/lawyer/messages')}
            className="w-full bg-primary text-white font-label-md py-3 rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all"
          >
            Client Workspace
          </button>
          <div className="space-y-1">
            <a className="flex items-center text-on-surface-variant hover:text-primary py-2 transition-colors" href="#">
              <span className="material-symbols-outlined mr-3 text-[20px]">help_outline</span>
              <span className="font-label-md">Support</span>
            </a>
            <button
              onClick={() => navigate('/login')}
              className="w-full flex items-center text-on-surface-variant hover:text-error py-2 transition-colors text-left"
            >
              <span className="material-symbols-outlined mr-3 text-[20px]">logout</span>
              <span className="font-label-md">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="ml-64 flex-grow flex flex-col h-screen overflow-hidden">
        {/* TopAppBar (The Anchor) */}
        <header className="flex justify-between items-center w-full px-margin-desktop h-16 glass-header border-b border-outline-variant z-40 shrink-0">
          <div className="flex items-center flex-grow max-w-xl">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input
                className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2 text-label-md focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all outline-none"
                placeholder="Search case files, clients, or documents..."
                type="text"
              />
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-gutter mx-gutter">
            <Link
              to="/lawyer/dashboard"
              className={`pb-1 font-label-md ${currentPath === '/lawyer/dashboard' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary transition-all'}`}
            >
              Dashboard
            </Link>
            <Link to="/lawyer/messages" className="text-on-surface-variant hover:text-primary transition-all font-label-md">
              Chats
            </Link>
            <a className="text-on-surface-variant hover:text-primary transition-all font-label-md" href="#">Calendar</a>
          </nav>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <button className="p-2 text-on-surface-variant hover:text-primary transition-all active:scale-90 relative">
                <span className="material-symbols-outlined">notifications</span>
                {totalUnread > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>}
              </button>
              <button className="p-2 text-on-surface-variant hover:text-primary transition-all active:scale-90">
                <span className="material-symbols-outlined">apps</span>
              </button>
            </div>
            <div className="flex items-center space-x-3 pl-4 border-l border-outline-variant">
              <div className="text-right hidden sm:block">
                <p className="font-label-md text-on-surface">{profile.name}</p>
                <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">{profile.role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm border border-outline-variant">
                {profile.name.split(' ').filter(x => !x.includes('.')).map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </div>
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <div className="flex-grow overflow-y-auto custom-scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

