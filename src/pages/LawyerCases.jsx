import { useState } from 'react';
import { useLawyer } from '../context/LawyerContext';

export default function LawyerCases() {
  const { cases, deleteCase, addCase } = useLawyer();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [activeMenuCaseId, setActiveMenuCaseId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCase, setNewCase] = useState({
    client: '',
    area: 'Corporate Litigation',
    milestoneType: 'Pre-trial Hearing',
    nextMilestone: '',
    detail: '',
  });
  const [errors, setErrors] = useState({});

  const tabs = [
    { label: 'All Cases', filter: 'All' },
    { label: 'Corporate Disputes', filter: 'Corporate Litigation' },
    { label: 'IP Protection', filter: 'Intellectual Property' },
    { label: 'Real Estate Law', filter: 'Real Estate Law' },
    { label: 'Contract Disputes', filter: 'Contractual Dispute' },
    { label: 'Regulatory Compliance', filter: 'Regulatory Compliance' },
  ];

  // Stats computation
  const totalCount = cases.length;
  const activeCount = cases.filter(c => c.status === 'Active').length;
  const pendingCount = cases.filter(c => c.status === 'Pending').length;
  const closedCount = cases.filter(c => c.status === 'Closed').length;

  const filteredCases = cases.filter(c => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.status.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'All') return matchesSearch;
    return matchesSearch && c.area === activeTab;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCase(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const e = {};
    if (!newCase.client.trim()) e.client = 'Client name is required.';
    if (!newCase.nextMilestone) e.nextMilestone = 'Milestone date is required.';
    if (!newCase.detail.trim()) e.detail = 'Case description is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCreateCaseSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    addCase(newCase);
    setShowCreateModal(false);
    // Reset form
    setNewCase({
      client: '',
      area: 'Corporate Litigation',
      milestoneType: 'Pre-trial Hearing',
      nextMilestone: '',
      detail: '',
    });
  };

  return (
    <div className="p-margin-desktop pb-stack-xl max-w-container-max mx-auto space-y-stack-lg relative">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Case Directory</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Manage and monitor all active legal proceedings across your practice.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Search bar mapping to searchQuery state */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline material-symbols-outlined text-[18px]">search</span>
            <input
              type="text"
              placeholder="Search table..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-outline-variant bg-white rounded-lg text-label-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all w-60"
            />
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white border-none rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add Case
          </button>
        </div>
      </div>

      {/* Filter Bar (Bento-style tabs) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="bg-white p-stack-md border border-outline-variant rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Cases</p>
            <h3 className="font-headline-md text-headline-md text-on-surface">{totalCount}</h3>
          </div>
          <div className="w-12 h-12 bg-primary-container/10 rounded-lg flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">folder</span>
          </div>
        </div>
        <div className="bg-white p-stack-md border border-outline-variant rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Active</p>
            <h3 className="font-headline-md text-headline-md text-on-surface">{activeCount}</h3>
          </div>
          <div className="w-12 h-12 bg-secondary-container/10 rounded-lg flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined">bolt</span>
          </div>
        </div>
        <div className="bg-white p-stack-md border border-outline-variant rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Pending Review</p>
            <h3 className="font-headline-md text-headline-md text-on-surface">{pendingCount}</h3>
          </div>
          <div className="w-12 h-12 bg-tertiary-container/10 rounded-lg flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined">hourglass_empty</span>
          </div>
        </div>
        <div className="bg-white p-stack-md border border-outline-variant rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Closed</p>
            <h3 className="font-headline-md text-headline-md text-on-surface">{closedCount}</h3>
          </div>
          <div className="w-12 h-12 bg-error-container/20 rounded-lg flex items-center justify-center text-error">
            <span className="material-symbols-outlined">event_note</span>
          </div>
        </div>
      </div>

      {/* Quick Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => (
          <button
            key={tab.filter}
            onClick={() => setActiveTab(tab.filter)}
            className={`px-4 py-1.5 rounded-full font-label-md text-label-md transition-all ${
              activeTab === tab.filter
                ? 'bg-primary text-white'
                : 'bg-surface-container border border-outline-variant text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Data Table Section */}
      <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="px-6 py-4 font-label-sm text-label-sm text-outline uppercase tracking-wider">Case ID</th>
                <th className="px-6 py-4 font-label-sm text-label-sm text-outline uppercase tracking-wider">Client Name</th>
                <th className="px-6 py-4 font-label-sm text-label-sm text-outline uppercase tracking-wider">Practice Area</th>
                <th className="px-6 py-4 font-label-sm text-label-sm text-outline uppercase tracking-wider">Next Milestone</th>
                <th className="px-6 py-4 font-label-sm text-label-sm text-outline uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 font-label-sm text-label-sm text-outline uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filteredCases.map(item => (
                <tr key={item.id} className="case-row hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-label-md text-label-md text-primary font-bold">{item.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${item.colorClass || 'bg-primary/10 text-primary'} flex items-center justify-center font-bold text-xs`}>
                        {item.initials}
                      </div>
                      <span className="font-body-md text-body-md text-on-surface font-medium">{item.client}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{item.area}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-body-sm text-body-sm text-on-surface font-medium">{item.nextMilestone}</span>
                      <span className={`font-label-sm text-label-sm ${item.milestoneColor || 'text-primary'}`}>{item.milestoneType}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${
                      item.status === 'Active' ? 'bg-green-100 text-green-800' : item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                    }`}>{item.status}</span>
                    <p className="text-[11px] text-on-surface-variant mt-1">{item.detail}</p>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button
                      onClick={() => setActiveMenuCaseId(activeMenuCaseId === item.id ? null : item.id)}
                      className="p-2 hover:bg-surface-container-high rounded-lg transition-colors border-none"
                    >
                      <span className="material-symbols-outlined text-outline">more_vert</span>
                    </button>
                    {activeMenuCaseId === item.id && (
                      <div className="absolute right-6 top-14 bg-white border border-outline-variant rounded-xl shadow-lg z-50 py-2 w-48 text-left animate-scale-up">
                        <button
                          onClick={() => {
                            deleteCase(item.id);
                            setActiveMenuCaseId(null);
                          }}
                          className="w-full px-4 py-2 hover:bg-surface text-error font-label-md flex items-center gap-2 text-left border-none"
                        >
                          <span className="material-symbols-outlined text-xs">delete</span>
                          Delete Case File
                        </button>
                        <button
                          onClick={() => setActiveMenuCaseId(null)}
                          className="w-full px-4 py-2 hover:bg-surface text-on-surface font-label-md flex items-center gap-2 text-left border-none"
                        >
                          <span className="material-symbols-outlined text-xs">visibility</span>
                          View Details
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredCases.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-on-surface-variant font-body-md">
                    No cases match the filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-outline-variant flex items-center justify-between bg-surface-container-lowest">
          <span className="font-body-sm text-body-sm text-on-surface-variant">Showing 1 to {filteredCases.length} of {filteredCases.length} entries</span>
          <div className="flex gap-2">
            <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors disabled:opacity-50" disabled>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg font-label-md text-label-md">1</button>
            <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors" disabled>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* CREATE NEW CASE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-[200] flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg border border-outline-variant p-6 max-w-lg w-full mx-4 relative animate-scale-up">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <h3 className="text-headline-sm font-bold text-on-surface mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">folder_open</span>
              Create New Case File
            </h3>
            <p className="text-body-sm text-on-surface-variant mb-6">
              Enter professional details to initialize a legal case folder on the eSewa network.
            </p>

            <form onSubmit={handleCreateCaseSubmit} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-label-md font-semibold text-on-surface" htmlFor="modal-client">Client Name</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-outline">person</span>
                  <input
                    id="modal-client"
                    name="client"
                    type="text"
                    placeholder="e.g. Alice Smith, Bob Verma, Alexander Patel"
                    value={newCase.client}
                    onChange={handleInputChange}
                    className="w-full bg-surface border border-outline-variant rounded-lg pl-10 pr-4 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                {errors.client && <span className="text-error text-xs">{errors.client}</span>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-label-md font-semibold text-on-surface" htmlFor="modal-area">Practice Area</label>
                  <select
                    id="modal-area"
                    name="area"
                    value={newCase.area}
                    onChange={handleInputChange}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  >
                    <option value="Corporate Litigation">Corporate Litigation</option>
                    <option value="Intellectual Property">Intellectual Property</option>
                    <option value="Real Estate Law">Real Estate Law</option>
                    <option value="Contractual Dispute">Contractual Dispute</option>
                    <option value="Regulatory Compliance">Regulatory Compliance</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-label-md font-semibold text-on-surface" htmlFor="modal-milestone-type">Milestone Type</label>
                  <select
                    id="modal-milestone-type"
                    name="milestoneType"
                    value={newCase.milestoneType}
                    onChange={handleInputChange}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  >
                    <option value="Pre-trial Hearing">Pre-trial Hearing</option>
                    <option value="Filing Deadline">Filing Deadline</option>
                    <option value="Document Review">Document Review</option>
                    <option value="Final Settlement">Final Settlement</option>
                    <option value="Evidence Submission">Evidence Submission</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-label-md font-semibold text-on-surface" htmlFor="modal-milestone-date">Milestone Date</label>
                  <input
                    id="modal-milestone-date"
                    name="nextMilestone"
                    type="date"
                    value={newCase.nextMilestone}
                    onChange={handleInputChange}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                  {errors.nextMilestone && <span className="text-error text-xs">{errors.nextMilestone}</span>}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-label-md font-semibold text-on-surface" htmlFor="modal-status">Status</label>
                  <select
                    id="modal-status"
                    name="status"
                    value={newCase.status}
                    onChange={handleInputChange}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-label-md font-semibold text-on-surface" htmlFor="modal-detail">Case Summary / Task</label>
                <textarea
                  id="modal-detail"
                  name="detail"
                  rows="3"
                  placeholder="Summarize the immediate next operational task..."
                  value={newCase.detail}
                  onChange={handleInputChange}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                />
                {errors.detail && <span className="text-error text-xs">{errors.detail}</span>}
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="border border-outline-variant text-on-surface px-5 py-2.5 rounded-lg hover:bg-surface font-label-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2.5 rounded-lg hover:opacity-90 font-label-md transition-opacity"
                >
                  Initialize Case File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 border-none animate-scale-up"
      >
        <span className="material-symbols-outlined text-[24px]">add_circle</span>
      </button>
    </div>
  );
}
