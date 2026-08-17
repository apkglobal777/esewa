import { useState } from 'react';
import { useLawyer } from '../context/LawyerContext';

export default function LawyerDashboard() {
  const { profile, cases, documents, schedule, activities, addCase } = useLawyer();
  const [showCaseModal, setShowCaseModal] = useState(false);
  const [newCase, setNewCase] = useState({
    client: '',
    area: 'Corporate Litigation',
    milestoneType: 'Pre-trial Hearing',
    nextMilestone: '',
    detail: '',
  });
  const [errors, setErrors] = useState({});

  // Compute stats
  const activeCasesCount = cases.filter(c => c.status === 'Active').length;
  const pendingDocsCount = documents.length;
  const consultationsCount = schedule.filter(s => s.tag === 'MEETING').length;

  // Form handlers
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
    setShowCaseModal(false);
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
    <div className="p-margin-desktop space-y-stack-xl max-w-7xl mx-auto">
      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Welcome back, {profile.name}</h2>
          <p className="font-body-md text-on-surface-variant mt-2 max-w-2xl">
            You have {schedule.filter(s => s.tag === 'HEARING').length} court hearings scheduled and {pendingDocsCount} documents in your vault.
          </p>
        </div>
        <button
          onClick={() => setShowCaseModal(true)}
          className="bg-primary text-white px-6 py-3 rounded-lg font-label-md flex items-center gap-2 hover:brightness-110 transition-all shadow-md active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Create New Case
        </button>
      </section>

      {/* Summary Stats Bento */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="bento-card p-stack-lg rounded-xl bg-white border border-outline-variant flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-primary/10 rounded-lg text-primary">
              <span className="material-symbols-outlined">gavel</span>
            </div>
            <span className="text-secondary font-label-sm">+2 this week</span>
          </div>
          <div className="mt-6">
            <p className="text-on-surface-variant font-label-md">Active Cases</p>
            <h3 className="text-headline-md font-bold text-on-surface">{activeCasesCount}</h3>
          </div>
        </div>

        <div className="bento-card p-stack-lg rounded-xl bg-white border border-outline-variant flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-secondary-container/10 rounded-lg text-secondary">
              <span className="material-symbols-outlined">pending_actions</span>
            </div>
            <span className="text-error font-label-sm">Vault Vault</span>
          </div>
          <div className="mt-6">
            <p className="text-on-surface-variant font-label-md">Documents in Vault</p>
            <h3 className="text-headline-md font-bold text-on-surface">{pendingDocsCount}</h3>
          </div>
        </div>

        <div className="bento-card p-stack-lg rounded-xl bg-white border border-outline-variant flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-tertiary-container/10 rounded-lg text-tertiary">
              <span className="material-symbols-outlined">schedule</span>
            </div>
            <span className="text-on-surface-variant font-label-sm">Avg: 38/wk</span>
          </div>
          <div className="mt-6">
            <p className="text-on-surface-variant font-label-md">Billable Hours</p>
            <h3 className="text-headline-md font-bold text-on-surface">144.5</h3>
          </div>
        </div>

        <div className="bento-card p-stack-lg rounded-xl bg-white border border-outline-variant flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-surface-container-high rounded-lg text-on-surface">
              <span className="material-symbols-outlined">video_call</span>
            </div>
            <span className="text-secondary font-label-sm">Today's schedule</span>
          </div>
          <div className="mt-6">
            <p className="text-on-surface-variant font-label-md">Client Consultations</p>
            <h3 className="text-headline-md font-bold text-on-surface">{consultationsCount}</h3>
          </div>
        </div>
      </section>

      {/* Core Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Today's Schedule Timeline */}
        <section className="lg:col-span-8 space-y-stack-md">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-headline-sm text-on-surface">Practice Schedule</h3>
            <span className="text-primary font-label-md">Daily Agenda</span>
          </div>
          <div className="bento-card rounded-xl p-6 bg-white border border-outline-variant shadow-sm">
            <div className="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant">
              {schedule.map((item) => (
                <div key={item.id} className="relative pl-10 group">
                  <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-4 ${
                    item.tag === 'HEARING' ? 'border-primary' : 'border-outline-variant group-hover:border-secondary'
                  } z-10 transition-colors`}></div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface rounded-lg group-hover:bg-surface-container transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-label-sm text-primary uppercase">{item.time}</p>
                        <span className="text-[10px] text-on-surface-variant font-semibold bg-surface-container px-2 py-0.5 rounded">{item.dateStr}</span>
                      </div>
                      <h4 className="font-body-lg font-semibold text-on-surface mt-1">{item.title}</h4>
                      <p className="text-body-sm text-on-surface-variant">{item.subtitle}</p>
                    </div>
                    <div className="mt-3 sm:mt-0 flex gap-2">
                      {item.hasZoom && (
                        <a
                          href="https://zoom.us"
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 border border-outline-variant bg-white rounded-lg hover:bg-surface text-primary"
                          title="Join Zoom Meeting"
                        >
                          <span className="material-symbols-outlined text-[18px]">videocam</span>
                        </a>
                      )}
                      {item.hasDoc && (
                        <button className="p-2 border border-outline-variant bg-white rounded-lg hover:bg-surface text-on-surface-variant">
                          <span className="material-symbols-outlined text-[18px]">description</span>
                        </button>
                      )}
                      <span className={`px-3 py-1 text-white text-[10px] font-bold rounded-full h-fit flex items-center ${
                        item.tag === 'HEARING' ? 'bg-primary' : 'bg-secondary'
                      }`}>
                        {item.tag}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Case Updates Feed */}
        <aside className="lg:col-span-4 space-y-stack-md">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-headline-sm text-on-surface">Recent Updates</h3>
            <span className="material-symbols-outlined text-on-surface-variant">refresh</span>
          </div>
          <div className="bento-card rounded-xl overflow-hidden bg-white border border-outline-variant shadow-sm">
            <div className="p-6 space-y-6">
              {activities.slice(0, 4).map((activity) => (
                <div key={activity.id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shrink-0">
                    <span className={`material-symbols-outlined ${activity.color} text-[20px]`}>{activity.icon}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-body-sm text-on-surface">{activity.text}</p>
                    <p className="text-[12px] text-on-surface-variant">{activity.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Insights Promo */}
          <div className="relative h-48 rounded-xl overflow-hidden group cursor-default border border-outline-variant/60 shadow-sm">
            <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAdjZneYH3S4DZ84ShD0O5rRkL1K9elG-fxkrHbVpMn0PnIWg5YbrB_9Uf9uFOt_MLfQBNddKwz9hD3ocg9yIHjryGJ1TOp47GCGJXFWhDhdIM2UWLwDFV9AEGRWxSdfm3wyGQIEWBGWb2EWzfcrEImUkZrhX3qzpN0WzwgzivsZo0bo5TOB3kqcoMLJ2XabX9rap8g646w6qOFv89bNrxG7k0OqQhEQZBUVHHiW1nOeTnVz-jmEQW_waPfj8-F3adZY0kJ_3sZpew')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 to-transparent z-10"></div>
            <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
              <p className="text-[10px] uppercase font-bold tracking-widest opacity-80">Insights</p>
              <h4 className="font-headline-sm font-bold">Supreme Court Directives</h4>
              <p className="text-body-sm opacity-90">Review updated procedures for virtual hearings.</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Global Footer / Quick Actions */}
      <footer className="pt-stack-xl border-t border-outline-variant pb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-body-sm text-on-surface-variant">© 2026 eSewa Legal Services Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-gutter">
            <a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Data Privacy</a>
            <a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Security Architecture</a>
          </div>
        </div>
      </footer>

      {/* Floating Quick Action (FAB) */}
      <button
        onClick={() => setShowCaseModal(true)}
        className="fixed bottom-10 right-10 w-16 h-16 bg-primary text-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 active:scale-90 transition-all z-50 group border-none"
      >
        <span className="material-symbols-outlined text-[32px] group-hover:rotate-90 transition-transform duration-300">add</span>
      </button>

      {/* CREATE NEW CASE MODAL */}
      {showCaseModal && (
        <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-[200] flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg border border-outline-variant p-6 max-w-lg w-full mx-4 relative animate-scale-up">
            <button
              onClick={() => setShowCaseModal(false)}
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
              {/* Client Name */}
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
                {/* Practice Area */}
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

                {/* Next Milestone Type */}
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
                {/* Milestone Date */}
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

                {/* Initial Status */}
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

              {/* Case Details */}
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

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setShowCaseModal(false)}
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
    </div>
  );
}
