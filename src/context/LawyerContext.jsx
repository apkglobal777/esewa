import { createContext, useContext, useState } from 'react';

const LawyerContext = createContext();

export function LawyerProvider({ children }) {
  // Lawyer Profile State
  const [profile, setProfile] = useState({
    name: 'Adv. Rajesh Kumar',
    role: 'Senior Partner',
    barId: 'BC-2024-19283',
    specializations: ['Corporate Litigation', 'Intellectual Property'],
    bio: 'Senior Counsel with 12+ years of experience specializing in cross-border disputes and corporate affairs.',
    mfa: true,
    newCaseAlert: true,
    esignAlert: true,
    calendarAlert: true,
    dailyBrief: false,
    digestFrequency: 'Once daily',
  });

  // Cases State
  const [cases, setCases] = useState([
    {
      id: '#LAW-2024-0012',
      client: 'Alice Smith',
      initials: 'AS',
      colorClass: 'bg-secondary-container/10 text-secondary',
      area: 'Corporate Litigation',
      nextMilestone: 'Nov 12, 2024',
      milestoneType: 'Pre-trial Hearing',
      milestoneColor: 'text-error',
      status: 'Active',
      statusBg: 'bg-green-100 text-green-800 border-green-200',
      detail: 'Reviewing Evidence',
    },
    {
      id: '#LAW-2024-0045',
      client: 'Bob Verma',
      initials: 'BV',
      colorClass: 'bg-primary-container/10 text-primary',
      area: 'Intellectual Property',
      nextMilestone: 'Oct 28, 2024',
      milestoneType: 'Filing Deadline',
      milestoneColor: 'text-primary',
      status: 'Pending',
      statusBg: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      detail: 'Evidence Collection',
    },
    {
      id: '#LAW-2024-0103',
      client: 'Alexander Patel',
      initials: 'AP',
      colorClass: 'bg-secondary-container/10 text-secondary',
      area: 'Real Estate Law',
      nextMilestone: 'Nov 05, 2024',
      milestoneType: 'Document Review',
      milestoneColor: 'text-secondary',
      status: 'Active',
      statusBg: 'bg-green-100 text-green-800 border-green-200',
      detail: 'Acquiring Titles',
    },
    {
      id: '#LAW-2023-0891',
      client: 'Sharma & Sons',
      initials: 'SS',
      colorClass: 'bg-tertiary-container/10 text-tertiary',
      area: 'Contractual Dispute',
      nextMilestone: 'Completed',
      milestoneType: 'Final Settlement',
      milestoneColor: 'text-outline',
      status: 'Closed',
      statusBg: 'bg-gray-100 text-gray-800 border-gray-200',
      detail: 'Archived Oct 12',
    },
    {
      id: '#LAW-2024-0211',
      client: 'Anjali Mehta',
      initials: 'AM',
      colorClass: 'bg-primary-container/10 text-primary',
      area: 'Regulatory Compliance',
      nextMilestone: 'Dec 01, 2024',
      milestoneType: 'Audit Submission',
      milestoneColor: 'text-on-surface-variant',
      status: 'Active',
      statusBg: 'bg-green-100 text-green-800 border-green-200',
      detail: 'Reviewing Data',
    },
  ]);

  // Documents State
  const [documents, setDocuments] = useState([
    {
      name: 'Client_Contract_Final.pdf',
      size: '2.4 MB',
      modified: 'Oct 12, 2023 · 14:20',
      caseTag: 'Case #4412-A',
      type: 'LEGAL PDF',
      icon: 'description',
      iconColor: 'text-primary',
    },
    {
      name: 'Affidavit_Smith_Witness.pdf',
      size: '890 KB',
      modified: 'Oct 11, 2023 · 09:15',
      caseTag: 'Smith vs. Dept',
      type: 'SIGNED DOC',
      icon: 'picture_as_pdf',
      iconColor: 'text-error',
    },
    {
      name: 'ND_Template_Enterprise.docx',
      size: '45 KB',
      modified: 'Oct 10, 2023 · 16:45',
      caseTag: '—',
      type: 'WORD TEMPLATE',
      icon: 'article',
      iconColor: 'text-secondary',
    },
    {
      name: 'Evidence_Photo_004.jpg',
      size: '5.1 MB',
      modified: 'Oct 09, 2023 · 11:30',
      caseTag: 'Case #8821-B',
      type: 'IMAGE',
      icon: 'image',
      iconColor: 'text-on-surface-variant',
    },
  ]);

  // Invoices State
  const [invoices, setInvoices] = useState([
    {
      id: '#INV-8821',
      client: 'Alexander Patel',
      date: 'Oct 12, 2023',
      amount: '$4,250.00',
      status: 'Paid',
      badgeClass: 'bg-green-100 text-green-700 border-green-200',
    },
    {
      id: '#INV-8822',
      client: 'Alice Smith',
      date: 'Oct 15, 2023',
      amount: '$8,100.00',
      status: 'Pending',
      badgeClass: 'bg-blue-100 text-blue-700 border-blue-200',
    },
    {
      id: '#INV-8823',
      client: 'Bob Verma',
      date: 'Oct 01, 2023',
      amount: '$1,200.00',
      status: 'Overdue',
      badgeClass: 'bg-red-100 text-red-700 border-red-200',
      rowClass: 'bg-red-50/20',
    },
    {
      id: '#INV-8824',
      client: 'Sharma & Sons',
      date: 'Oct 18, 2023',
      amount: '$5,500.00',
      status: 'Pending',
      badgeClass: 'bg-blue-100 text-blue-700 border-blue-200',
    },
  ]);

  // Schedule/Timeline State
  const [schedule, setSchedule] = useState([
    {
      id: 'sched-1',
      time: '09:00 AM - 10:30 AM',
      title: 'Court Hearing: Sharma vs. BuildCorp',
      subtitle: 'Supreme Court - Room 402',
      tag: 'HEARING',
      color: 'primary',
      dateStr: 'Today',
    },
    {
      id: 'sched-2',
      time: '11:00 AM - 12:00 PM',
      title: 'Client Briefing: Alice Smith Dispute',
      subtitle: 'Video Call - Zoom Platform',
      tag: 'MEETING',
      color: 'outline-variant',
      dateStr: 'Today',
      hasZoom: true,
      hasDoc: true,
    },
    {
      id: 'sched-3',
      time: '02:30 PM - 04:00 PM',
      title: 'Contract Revision: Tech-Agro Mergers',
      subtitle: 'Internal Collaboration',
      tag: 'TASK',
      color: 'outline-variant',
      dateStr: 'Today',
    },
  ]);

  // Recent Updates/Activities
  const [activities, setActivities] = useState([
    {
      id: 'act-1',
      text: 'Anjali Mehta uploaded Affidavit_v2.pdf',
      sub: 'Mehta vs. State • 22 mins ago',
      icon: 'description',
      color: 'text-primary',
    },
    {
      id: 'act-2',
      text: 'Court date rescheduled for Case #LAW-2024-0045',
      sub: 'Now Oct 14th • 2 hours ago',
      icon: 'priority_high',
      color: 'text-error',
    },
    {
      id: 'act-3',
      text: 'Invoice #INV-8821 was paid by client',
      sub: 'Alexander Patel • 5 hours ago',
      icon: 'payments',
      color: 'text-secondary',
    },
    {
      id: 'act-4',
      text: 'Adv. Rohan left a note on Case #LAW-2023-0891',
      sub: '"Evidence verified" • Yesterday',
      icon: 'comment',
      color: 'text-on-surface-variant',
    },
  ]);

  // Clients & Messaging State
  const [chats, setChats] = useState({
    'alice-smith': {
      id: 'alice-smith',
      name: 'Alice Smith',
      online: true,
      role: 'Client - Corporate Dispute',
      initials: 'AS',
      color: 'bg-primary-container/10 text-primary',
      lastMessage: 'Thanks for checking the draft, Rajesh',
      unread: 0,
      typing: false,
      messages: [
        { sender: 'client', text: 'Hello Adv. Rajesh, were you able to look at the corporate merger drafts?', time: 'Yesterday 10:15 AM' },
        { sender: 'lawyer', text: 'Yes Alice, I reviewed the drafts and made corrections to clauses 8 and 12 regarding liabilities.', time: 'Yesterday 11:30 AM' },
        { sender: 'client', text: 'Excellent! Thanks for checking the draft, Rajesh', time: 'Yesterday 11:35 AM' },
      ],
    },
    'bob-verma': {
      id: 'bob-verma',
      name: 'Bob Verma',
      online: false,
      role: 'Client - IP Protection',
      initials: 'BV',
      color: 'bg-secondary-container/10 text-secondary',
      lastMessage: 'Do we have any update on the filing?',
      unread: 1,
      typing: false,
      messages: [
        { sender: 'lawyer', text: 'Bob, we are preparing the trademark filing package. We need your signed authorization.', time: 'Aug 14 · 2:00 PM' },
        { sender: 'client', text: 'Got it. I will upload it as soon as possible. Do we have any update on the filing?', time: 'Aug 14 · 4:10 PM' },
      ],
    },
    'alexander-patel': {
      id: 'alexander-patel',
      name: 'Alexander Patel',
      online: true,
      role: 'Client - Real Estate Law',
      initials: 'AP',
      color: 'bg-tertiary-container/10 text-tertiary',
      lastMessage: "Let's catch up tomorrow for the documents.",
      unread: 0,
      typing: false,
      messages: [
        { sender: 'client', text: 'Adv. Rajesh, the developer sent the new title deeds.', time: 'Yesterday 4:00 PM' },
        { sender: 'lawyer', text: 'Perfect. Let me verify the zoning clearance stamps.', time: 'Yesterday 4:20 PM' },
        { sender: 'client', text: "Let's catch up tomorrow for the documents.", time: 'Yesterday 5:00 PM' },
      ],
    },
    'anjali-mehta': {
      id: 'anjali-mehta',
      name: 'Anjali Mehta',
      online: true,
      role: 'Client - Regulatory Compliance',
      initials: 'AM',
      color: 'bg-[#D1FAE5] text-[#065F46]',
      lastMessage: 'I uploaded the signed affidavit in the folder.',
      unread: 0,
      typing: false,
      messages: [
        { sender: 'lawyer', text: 'Anjali, is the compliance document signed?', time: '2 hours ago' },
        { sender: 'client', text: 'Yes Rajesh, I uploaded the signed affidavit in the folder.', time: '22 mins ago' },
      ],
    },
  });

  // Action: Create Case
  const addCase = (newCase) => {
    const caseId = `#LAW-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const initials = newCase.client.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    
    const preparedCase = {
      id: caseId,
      client: newCase.client,
      initials: initials || 'CL',
      colorClass: 'bg-primary-container/10 text-primary',
      area: newCase.area || 'General Counsel',
      nextMilestone: newCase.nextMilestone || 'TBD',
      milestoneType: newCase.milestoneType || 'Milestone Verification',
      milestoneColor: 'text-primary',
      status: newCase.status || 'Active',
      statusBg: 'bg-green-100 text-green-800 border-green-200',
      detail: newCase.detail || 'New case files initialized.',
    };

    setCases(prev => [preparedCase, ...prev]);

    // Append a schedule event if milestone exists
    if (newCase.nextMilestone && newCase.nextMilestone !== 'Completed') {
      const newSchedule = {
        id: `sched-${Math.random()}`,
        time: '12:00 PM - 01:00 PM',
        title: `${newCase.milestoneType}: ${newCase.client}`,
        subtitle: `Office Briefing - Milestone Date: ${newCase.nextMilestone}`,
        tag: 'MEETING',
        color: 'primary',
        dateStr: 'Upcoming',
      };
      setSchedule(prev => [newSchedule, ...prev]);
    }

    // Append to activities
    const newActivity = {
      id: `act-${Math.random()}`,
      text: `Initialized case file ${caseId} for ${newCase.client}`,
      sub: `${newCase.area} • Just now`,
      icon: 'folder',
      color: 'text-primary',
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  // Action: Add/Upload Document
  const addDocument = (docName, docSize, caseTag = '—', docType = 'LEGAL PDF') => {
    const newDoc = {
      name: docName,
      size: docSize || '120 KB',
      modified: 'Just now',
      caseTag: caseTag,
      type: docType,
      icon: docType.includes('PDF') ? 'picture_as_pdf' : docType.includes('WORD') ? 'article' : 'description',
      iconColor: docType.includes('PDF') ? 'text-error' : 'text-primary',
    };

    setDocuments(prev => [newDoc, ...prev]);

    // Append to activities
    const newActivity = {
      id: `act-${Math.random()}`,
      text: `Uploaded file: ${docName}`,
      sub: `${caseTag !== '—' ? caseTag : 'General Vault'} • Just now`,
      icon: 'upload_file',
      color: 'text-secondary',
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  // Action: Create Invoice
  const addInvoice = (newInvoice) => {
    const invId = `#INV-${Math.floor(8825 + Math.random() * 100)}`;
    const formattedAmount = `$${parseFloat(newInvoice.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    
    const preparedInvoice = {
      id: invId,
      client: newInvoice.client,
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' }),
      amount: formattedAmount,
      status: newInvoice.status || 'Pending',
      badgeClass: newInvoice.status === 'Paid' 
        ? 'bg-green-100 text-green-700 border-green-200' 
        : newInvoice.status === 'Overdue' 
          ? 'bg-red-100 text-red-700 border-red-200' 
          : 'bg-blue-100 text-blue-700 border-blue-200',
      rowClass: newInvoice.status === 'Overdue' ? 'bg-red-50/20' : '',
    };

    setInvoices(prev => [preparedInvoice, ...prev]);

    // Append to activities
    const newActivity = {
      id: `act-${Math.random()}`,
      text: `Issued Invoice ${invId} to ${newInvoice.client}`,
      sub: `${formattedAmount} • Just now`,
      icon: 'receipt_long',
      color: 'text-on-surface-variant',
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  // Action: Delete/Remove Case
  const deleteCase = (caseId) => {
    setCases(prev => prev.filter(c => c.id !== caseId));
  };

  // Action: Update Settings/Profile
  const updateProfile = (updatedProfile) => {
    setProfile(prev => ({ ...prev, ...updatedProfile }));
  };

  // Action: Send Message and Trigger Simulated Response
  const sendMessage = (clientId, text) => {
    if (!text.trim() || !chats[clientId]) return;

    // Append lawyer message
    const lawyerMsg = {
      sender: 'lawyer',
      text: text,
      time: 'Just now',
    };

    setChats(prev => {
      const chat = prev[clientId];
      const updatedMessages = [...chat.messages, lawyerMsg];
      return {
        ...prev,
        [clientId]: {
          ...chat,
          lastMessage: text,
          messages: updatedMessages,
          unread: 0,
        },
      };
    });

    // Simulated reply trigger
    setTimeout(() => {
      setChats(prev => {
        const chat = prev[clientId];
        return {
          ...prev,
          [clientId]: {
            ...chat,
            typing: true,
          },
        };
      });

      // Append automated response
      setTimeout(() => {
        setChats(prev => {
          const chat = prev[clientId];
          let replyText = `Thanks for the update, Adv. Rajesh. Let's touch base on this during our next sync.`;
          const textLower = text.toLowerCase();
          
          if (textLower.includes('sign') || textLower.includes('doc') || textLower.includes('nda') || textLower.includes('contract')) {
            replyText = `Understood. I've received the file request and will review it in our document portal shortly.`;
          } else if (textLower.includes('call') || textLower.includes('meet') || textLower.includes('zoom') || textLower.includes('consult')) {
            replyText = `Sure, Zoom works fine for me. Please schedule it and send the link.`;
          } else if (textLower.includes('bill') || textLower.includes('pay') || textLower.includes('fee') || textLower.includes('invoice')) {
            replyText = `I will coordinate with our finance team to get this cleared. Thank you.`;
          } else if (textLower.includes('hearing') || textLower.includes('court') || textLower.includes('evidence')) {
            replyText = `Thank you. I'm gathering the remaining evidence documents to upload.`;
          }

          const clientReply = {
            sender: 'client',
            text: replyText,
            time: 'Just now',
          };

          return {
            ...prev,
            [clientId]: {
              ...chat,
              typing: false,
              lastMessage: replyText,
              messages: [...chat.messages, clientReply],
            },
          };
        });
      }, 1500);
    }, 800);
  };

  // Action: Schedule Consultation
  const scheduleConsultation = (clientId, title, time, dateStr, hasZoom = true) => {
    const clientName = chats[clientId]?.name || 'Client';
    const newSchedule = {
      id: `sched-${Math.random()}`,
      time: time || '03:00 PM - 03:45 PM',
      title: `${title || 'Client Briefing'}: ${clientName}`,
      subtitle: hasZoom ? 'Video Call - Zoom Platform' : 'In-person meeting',
      tag: 'MEETING',
      color: 'outline-variant',
      dateStr: dateStr || 'Tomorrow',
      hasZoom: hasZoom,
    };

    setSchedule(prev => [newSchedule, ...prev]);

    // Append to activities
    const newActivity = {
      id: `act-${Math.random()}`,
      text: `Scheduled consultation with ${clientName}`,
      sub: `${dateStr || 'Tomorrow'} at ${time.split(' ')[0]} • Just now`,
      icon: 'calendar_today',
      color: 'text-primary',
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  return (
    <LawyerContext.Provider
      value={{
        profile,
        cases,
        documents,
        invoices,
        schedule,
        activities,
        chats,
        addCase,
        deleteCase,
        addDocument,
        addInvoice,
        updateProfile,
        sendMessage,
        scheduleConsultation,
      }}
    >
      {children}
    </LawyerContext.Provider>
  );
}

export function useLawyer() {
  return useContext(LawyerContext);
}
