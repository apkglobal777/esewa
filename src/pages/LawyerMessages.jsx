import { useState, useEffect, useRef } from 'react';
import { useLawyer } from '../context/LawyerContext';
import './LawyerMessages.css';

export default function LawyerMessages() {
  const { chats, sendMessage, scheduleConsultation, addInvoice } = useLawyer();
  const [activeClientId, setActiveClientId] = useState('alice-smith');
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRightPanel, setShowRightPanel] = useState(true);

  // Modals inside chat
  const [showMeetModal, setShowMeetModal] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Modal forms
  const [meetForm, setMeetForm] = useState({
    title: 'Case Review Consultation',
    time: '03:00 PM - 03:45 PM',
    dateStr: 'Tomorrow',
  });
  const [billForm, setBillForm] = useState({
    hours: '',
    description: 'Document Review and Consultation',
  });

  const chatEndRef = useRef(null);

  const activeChat = chats[activeClientId];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages, activeChat?.typing]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeClientId, inputText);
    setInputText('');
  };

  const handleQuickRequestSign = () => {
    sendMessage(activeClientId, "Please review and sign the NDA document in your portal.");
    triggerToast("Signature request sent to client!");
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    scheduleConsultation(activeClientId, meetForm.title, meetForm.time, meetForm.dateStr, true);
    setShowMeetModal(false);
    triggerToast("Video consultation scheduled!");
    // Append auto message in chat
    sendMessage(activeClientId, `I have scheduled our virtual consultation: "${meetForm.title}" for ${meetForm.dateStr} at ${meetForm.time.split(' ')[0]}.`);
  };

  const handleBillSubmit = (e) => {
    e.preventDefault();
    if (isNaN(billForm.hours) || parseFloat(billForm.hours) <= 0) return;
    const amount = (parseFloat(billForm.hours) * 350).toString(); // Hourly rate 350
    addInvoice({
      client: activeChat.name,
      amount: amount,
      status: 'Pending',
    });
    setShowBillModal(false);
    triggerToast(`Logged ${billForm.hours} billable hours ($${parseFloat(amount).toFixed(2)})!`);
    sendMessage(activeClientId, `I have logged ${billForm.hours} hours of legal counsel work for billing.`);
  };

  // Filter clients
  const clientIds = Object.keys(chats).filter(id =>
    chats[id].name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="messages-layout h-[calc(100vh-4rem)] flex overflow-hidden">
      {/* LEFT COLUMN: Clients list */}
      <aside className="w-80 border-r border-outline-variant bg-white flex flex-col shrink-0">
        <div className="p-4 border-b border-outline-variant">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-surface border border-outline-variant rounded-lg text-label-md outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar division-y division-outline-variant/35">
          {clientIds.map(id => {
            const chat = chats[id];
            const isSelected = activeClientId === id;
            return (
              <div
                key={id}
                onClick={() => setActiveClientId(id)}
                className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-surface/60 transition-colors ${
                  isSelected ? 'bg-surface border-r-4 border-primary' : ''
                }`}
              >
                {/* Avatar with status indicator */}
                <div className="relative shrink-0">
                  <div className={`w-11 h-11 rounded-full ${chat.color} flex items-center justify-center font-bold text-sm border border-outline-variant/50`}>
                    {chat.initials}
                  </div>
                  {chat.online ? (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" title="Online"></span>
                  ) : (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 rounded-full border-2 border-white" title="Offline"></span>
                  )}
                </div>

                {/* Body info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="font-label-md font-bold text-on-surface truncate">{chat.name}</h4>
                    <span className="text-[10px] text-on-surface-variant font-medium">Just now</span>
                  </div>
                  <p className="text-xs text-on-surface-variant truncate mb-1">{chat.role}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-on-surface-variant truncate max-w-[150px] italic">
                      {chat.typing ? 'Client is typing...' : chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <span className="bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {clientIds.length === 0 && (
            <p className="text-center text-on-surface-variant text-body-sm py-10">No clients found.</p>
          )}
        </div>
      </aside>

      {/* CENTER COLUMN: Chat Interface */}
      <section className="flex-grow flex flex-col bg-surface overflow-hidden">
        {/* Chat header */}
        <header className="px-6 h-16 bg-white border-b border-outline-variant flex justify-between items-center shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${activeChat.color} flex items-center justify-center font-bold text-sm border border-outline-variant`}>
              {activeChat.initials}
            </div>
            <div>
              <h3 className="font-label-md font-bold text-on-surface">{activeChat.name}</h3>
              <p className="text-[11px] text-on-surface-variant flex items-center gap-1.5 font-medium">
                <span className={`w-1.5 h-1.5 rounded-full ${activeChat.online ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                {activeChat.online ? 'Online' : 'Offline'} • {activeChat.role}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMeetModal(true)}
              className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface rounded-lg transition-colors border-none"
              title="Schedule Video Consultation"
            >
              <span className="material-symbols-outlined">video_call</span>
            </button>
            <button
              onClick={handleQuickRequestSign}
              className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface rounded-lg transition-colors border-none"
              title="Request Signature"
            >
              <span className="material-symbols-outlined">draw</span>
            </button>
            <button
              onClick={() => setShowRightPanel(p => !p)}
              className={`p-2 text-on-surface-variant hover:text-primary hover:bg-surface rounded-lg transition-colors border-none ${showRightPanel ? 'text-primary' : ''}`}
              title="Toggle Profile Panel"
            >
              <span className="material-symbols-outlined">info</span>
            </button>
          </div>
        </header>

        {/* Scrollable messages box */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {activeChat.messages.map((msg, idx) => {
            const isLawyer = msg.sender === 'lawyer';
            return (
              <div key={idx} className={`flex ${isLawyer ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-md rounded-xl p-4 shadow-sm ${
                  isLawyer 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white border border-outline-variant text-on-surface rounded-tl-none'
                }`}>
                  <p className="text-body-md leading-relaxed">{msg.text}</p>
                  <p className={`text-[10px] mt-1.5 text-right font-semibold ${isLawyer ? 'text-white/70' : 'text-on-surface-variant/75'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {activeChat.typing && (
            <div className="flex justify-start">
              <div className="bg-white border border-outline-variant rounded-xl rounded-tl-none p-4 shadow-sm flex items-center gap-1.5">
                <span className="text-xs text-on-surface-variant font-bold italic mr-1">Client is typing</span>
                <span className="typing-dot bg-primary w-1.5 h-1.5 rounded-full animate-bounce"></span>
                <span className="typing-dot bg-primary w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="typing-dot bg-primary w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input box form */}
        <footer className="p-4 bg-white border-t border-outline-variant shrink-0 z-10 shadow-sm">
          <form onSubmit={handleSend} className="flex gap-3">
            <button type="button" className="p-2.5 text-on-surface-variant hover:text-primary hover:bg-surface rounded-lg border-none" title="Attach Document Template">
              <span className="material-symbols-outlined">attachment</span>
            </button>
            <input
              type="text"
              placeholder={`Message ${activeChat.name}...`}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="flex-grow bg-surface border border-outline-variant rounded-lg px-4 py-2.5 text-body-md outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="bg-primary text-white border-none px-6 py-2.5 rounded-lg font-label-md hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[20px] font-bold">send</span>
            </button>
          </form>
        </footer>
      </section>

      {/* RIGHT COLUMN: Client Profile Details (Collapsible) */}
      {showRightPanel && (
        <aside className="w-80 border-l border-outline-variant bg-white flex flex-col p-6 overflow-y-auto shrink-0 custom-scrollbar space-y-6">
          <div className="text-center space-y-3 pb-6 border-b border-outline-variant">
            <div className={`w-20 h-20 rounded-full ${activeChat.color} flex items-center justify-center font-bold text-2xl mx-auto border border-outline-variant`}>
              {activeChat.initials}
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">{activeChat.name}</h3>
              <p className="text-xs text-on-surface-variant">{activeChat.role}</p>
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
              activeChat.online ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {activeChat.online ? 'Online Status' : 'Away'}
            </span>
          </div>

          {/* Quick info */}
          <div className="space-y-4 pb-6 border-b border-outline-variant">
            <h4 className="font-label-sm uppercase tracking-wider text-on-surface-variant font-bold text-xs">Contact Details</h4>
            <div className="space-y-2.5 text-body-sm">
              <div className="flex gap-2">
                <span className="material-symbols-outlined text-[18px] text-outline">mail</span>
                <span className="text-on-surface font-medium truncate">{activeChat.name.toLowerCase().replace(/\s/g, '')}@example.com</span>
              </div>
              <div className="flex gap-2">
                <span className="material-symbols-outlined text-[18px] text-outline">call</span>
                <span className="text-on-surface font-medium">+91 98765 43210</span>
              </div>
              <div className="flex gap-2">
                <span className="material-symbols-outlined text-[18px] text-outline">folder</span>
                <span className="text-on-surface font-medium">Practice Area: {activeChat.role.split('-')[1]?.trim() || 'General'}</span>
              </div>
            </div>
          </div>

          {/* Quick Action Operations */}
          <div className="space-y-3">
            <h4 className="font-label-sm uppercase tracking-wider text-on-surface-variant font-bold text-xs">Operations Suite</h4>
            <button
              onClick={() => setShowMeetModal(true)}
              className="w-full bg-primary-fixed hover:bg-primary-fixed-dim text-on-primary-fixed py-3 rounded-lg font-label-md flex items-center justify-center gap-2 border-none transition-colors font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">video_call</span>
              Schedule Consultation
            </button>
            <button
              onClick={() => setShowBillModal(true)}
              className="w-full bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface py-3 rounded-lg font-label-md flex items-center justify-center gap-2 transition-colors font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
              Record Billing Hours
            </button>
            <button
              onClick={handleQuickRequestSign}
              className="w-full bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface py-3 rounded-lg font-label-md flex items-center justify-center gap-2 transition-colors font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">draw</span>
              Request E-Sign
            </button>
          </div>
        </aside>
      )}

      {/* SCHEDULE MEETING MODAL */}
      {showMeetModal && (
        <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-[200] flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg border border-outline-variant p-6 max-w-md w-full mx-4 relative animate-scale-up">
            <button onClick={() => setShowMeetModal(false)} className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface border-none">
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-headline-sm font-bold text-on-surface mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">calendar_today</span>
              Schedule Consultation
            </h3>
            <p className="text-body-sm text-on-surface-variant mb-6">
              Create an online meeting. This will immediately display in your practice schedule and alert {activeChat.name}.
            </p>
            <form onSubmit={handleScheduleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-label-md font-semibold text-on-surface" htmlFor="meet-title">Consultation Subject</label>
                <input
                  id="meet-title"
                  type="text"
                  value={meetForm.title}
                  onChange={e => setMeetForm(p => ({ ...p, title: e.target.value }))}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-label-md font-semibold text-on-surface" htmlFor="meet-date">Date Option</label>
                  <select
                    id="meet-date"
                    value={meetForm.dateStr}
                    onChange={e => setMeetForm(p => ({ ...p, dateStr: e.target.value }))}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="Next Monday">Next Monday</option>
                    <option value="Next Friday">Next Friday</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-label-md font-semibold text-on-surface" htmlFor="meet-time">Time Slot</label>
                  <select
                    id="meet-time"
                    value={meetForm.time}
                    onChange={e => setMeetForm(p => ({ ...p, time: e.target.value }))}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  >
                    <option value="09:00 AM - 09:45 AM">09:00 AM</option>
                    <option value="11:00 AM - 11:45 AM">11:00 AM</option>
                    <option value="03:00 PM - 03:45 PM">03:00 PM</option>
                    <option value="05:30 PM - 06:15 PM">05:30 PM</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setShowMeetModal(false)}
                  className="border border-outline-variant text-on-surface px-4 py-2 rounded-lg hover:bg-surface font-label-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-5 py-2 rounded-lg hover:opacity-90 font-label-md transition-opacity border-none"
                >
                  Schedule Meet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECORD BILLING HOURS MODAL */}
      {showBillModal && (
        <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-[200] flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg border border-outline-variant p-6 max-w-md w-full mx-4 relative animate-scale-up">
            <button onClick={() => setShowBillModal(false)} className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface border-none">
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-headline-sm font-bold text-on-surface mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
              Record Counsel Hours
            </h3>
            <p className="text-body-sm text-on-surface-variant mb-6">
              Record billable hours for {activeChat.name}. Invoices are generated automatically at $350.00/hour.
            </p>
            <form onSubmit={handleBillSubmit} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-label-md font-semibold text-on-surface" htmlFor="bill-hours">Hours Spent</label>
                <input
                  id="bill-hours"
                  type="number"
                  min="0.5"
                  step="0.5"
                  placeholder="e.g. 2.5"
                  value={billForm.hours}
                  onChange={e => setBillForm(p => ({ ...p, hours: e.target.value }))}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-label-md font-semibold text-on-surface" htmlFor="bill-desc">Description of Work</label>
                <textarea
                  id="bill-desc"
                  rows="3"
                  value={billForm.description}
                  onChange={e => setBillForm(p => ({ ...p, description: e.target.value }))}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setShowBillModal(false)}
                  className="border border-outline-variant text-on-surface px-4 py-2 rounded-lg hover:bg-surface font-label-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-5 py-2 rounded-lg hover:opacity-90 font-label-md transition-opacity border-none"
                >
                  Post Billing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TOAST FEEDBACK */}
      <div
        className={`fixed bottom-10 right-10 flex items-center gap-3 bg-inverse-surface text-inverse-on-surface px-6 py-4 rounded-xl shadow-2xl transition-all duration-500 pointer-events-none z-[250] ${
          showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        <span className="material-symbols-outlined text-[#D1FAE5]">check_circle</span>
        <span className="font-label-md font-semibold">{toastMessage}</span>
      </div>
    </div>
  );
}
