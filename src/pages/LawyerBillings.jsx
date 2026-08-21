import { useState, useEffect } from 'react';
import { useLawyer } from '../context/LawyerContext';

export default function LawyerBillings() {
  const { invoices, addInvoice } = useLawyer();
  const [animate, setAnimate] = useState(false);
  const [timeframe, setTimeframe] = useState('Monthly');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    client: '',
    amount: '',
    status: 'Pending',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 150);
    return () => clearTimeout(timer);
  }, []);

  // Parse dollar strings to float
  const parseAmount = (str) => {
    return parseFloat(str.replace(/[$,]/g, '')) || 0;
  };

  // Calculations based on context state
  const totalBilled = invoices
    .filter(inv => inv.status === 'Paid')
    .reduce((sum, inv) => sum + parseAmount(inv.amount), 0);

  const outstanding = invoices
    .filter(inv => inv.status === 'Pending' || inv.status === 'Overdue')
    .reduce((sum, inv) => sum + parseAmount(inv.amount), 0);

  const overdueCount = invoices.filter(inv => inv.status === 'Overdue').length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const e = {};
    if (!newInvoice.client) e.client = 'Client is required.';
    if (!newInvoice.amount.trim() || isNaN(newInvoice.amount) || parseFloat(newInvoice.amount) <= 0) {
      e.amount = 'Enter a valid amount greater than 0.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCreateInvoiceSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    addInvoice(newInvoice);
    setShowInvoiceModal(false);
    // Reset form
    setNewInvoice({
      client: '',
      amount: '',
      status: 'Pending',
    });
  };

  const chartData = [
    { label: 'Jan', height: '60%' },
    { label: 'Feb', height: '75%' },
    { label: 'Mar', height: '45%' },
    { label: 'Apr', height: '90%' },
    { label: 'May', height: '82%', highlight: true },
    { label: 'Jun', height: '20%', future: true }
  ];

  return (
    <div className="p-margin-desktop pb-stack-xl max-w-container-max mx-auto space-y-stack-lg">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-background">Financial Overview</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Detailed tracking of your practice billable performance and liquidity.</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowInvoiceModal(true)}
            className="flex items-center px-4 py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity shadow-sm border-none"
          >
            <span className="material-symbols-outlined mr-2">add</span> Create New Invoice
          </button>
        </div>
      </div>

      {/* Bento Grid Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {/* Card 1 */}
        <div className="bg-white border border-outline-variant p-stack-lg rounded-xl flex flex-col justify-between hover:border-primary transition-colors cursor-default shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-primary-fixed rounded-lg text-primary">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <span className="text-green-600 font-label-sm text-label-sm flex items-center">
              <span className="material-symbols-outlined text-[16px] mr-1">trending_up</span> +12.4%
            </span>
          </div>
          <div className="mt-stack-md">
            <p className="font-label-md text-label-md text-on-surface-variant">Total Paid Invoices</p>
            <h3 className="font-display text-display text-on-surface mt-1 font-bold text-3xl">
              ${totalBilled.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-outline-variant p-stack-lg rounded-xl flex flex-col justify-between hover:border-error transition-colors cursor-default shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-error-container rounded-lg text-error">
              <span className="material-symbols-outlined">pending_actions</span>
            </div>
            <span className="text-error font-label-sm text-label-sm flex items-center font-medium">
              <span className="material-symbols-outlined text-[16px] mr-1">warning</span> {overdueCount} Overdue
            </span>
          </div>
          <div className="mt-stack-md">
            <p className="font-label-md text-label-md text-on-surface-variant">Outstanding Payments</p>
            <h3 className="font-display text-display text-on-surface mt-1 font-bold text-3xl">
              ${outstanding.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-outline-variant p-stack-lg rounded-xl flex flex-col justify-between hover:border-secondary transition-colors cursor-default shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-tertiary-fixed rounded-lg text-tertiary">
              <span className="material-symbols-outlined">timer</span>
            </div>
            <span className="text-on-surface-variant font-label-sm text-label-sm">Consistent</span>
          </div>
          <div className="mt-stack-md">
            <p className="font-label-md text-label-md text-on-surface-variant">Average Hourly Rate</p>
            <h3 className="font-display text-display text-on-surface mt-1 font-bold text-3xl">$350.00</h3>
          </div>
        </div>
      </div>

      {/* Revenue Chart & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <div className="lg:col-span-2 bg-white border border-outline-variant rounded-xl p-stack-lg flex flex-col justify-between min-h-[360px] shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-headline-sm text-headline-sm font-semibold">Revenue Performance</h4>
            <div className="flex bg-surface-container-low p-1 rounded-lg">
              <button
                onClick={() => setTimeframe('Monthly')}
                className={`px-3 py-1 rounded-md text-label-sm font-label-sm ${
                  timeframe === 'Monthly' ? 'bg-white shadow-sm font-semibold' : 'text-on-surface-variant'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setTimeframe('Quarterly')}
                className={`px-3 py-1 rounded-md text-label-sm font-label-sm ${
                  timeframe === 'Quarterly' ? 'bg-white shadow-sm font-semibold' : 'text-on-surface-variant'
                }`}
              >
                Quarterly
              </button>
            </div>
          </div>

          <div className="h-64 flex items-end space-x-4 px-2">
            {chartData.map(bar => (
              <div key={bar.label} className={`flex-1 flex flex-col items-center group ${bar.future ? 'opacity-40' : ''}`}>
                <div
                  style={{ height: animate ? bar.height : '0%' }}
                  className={`w-full rounded-t-lg transition-all duration-[600ms] ease-out chart-bar ${
                    bar.highlight ? 'bg-primary shadow-md' : 'bg-primary-fixed-dim hover:bg-primary'
                  }`}
                />
                <span className={`mt-2 font-label-sm text-label-sm ${bar.highlight ? 'text-on-surface font-bold' : 'text-on-surface-variant'}`}>
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Billable Hours Breakdown */}
        <div className="bg-white border border-outline-variant rounded-xl p-stack-lg flex flex-col justify-between shadow-sm">
          <h4 className="font-headline-sm text-headline-sm mb-6 font-semibold">Hour Allocation</h4>
          <div className="space-y-stack-md flex-grow justify-center flex flex-col space-y-4">
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between text-label-md font-label-md">
                <span>Litigation</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="w-full h-2 bg-surface-container-low rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between text-label-md font-label-md">
                <span>Consultation</span>
                <span className="font-medium">30%</span>
              </div>
              <div className="w-full h-2 bg-surface-container-low rounded-full overflow-hidden">
                <div className="h-full bg-secondary" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between text-label-md font-label-md">
                <span>Drafting</span>
                <span className="font-medium">20%</span>
              </div>
              <div className="w-full h-2 bg-surface-container-low rounded-full overflow-hidden">
                <div className="h-full bg-tertiary" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between text-label-md font-label-md">
                <span>Research</span>
                <span className="font-medium">5%</span>
              </div>
              <div className="w-full h-2 bg-surface-container-low rounded-full overflow-hidden">
                <div className="h-full bg-outline-variant" style={{ width: '5%' }}></div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-outline-variant">
            <div className="flex justify-between items-center">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Total Hours Logged</span>
              <span className="font-headline-sm text-headline-sm font-semibold">164.5h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Invoices Table */}
      <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="px-stack-lg py-stack-md border-b border-outline-variant flex justify-between items-center bg-surface">
          <h4 className="font-headline-sm text-headline-sm font-semibold">Recent Invoices</h4>
          <span className="text-primary font-label-md font-semibold">Live Billing Log</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low">
              <tr className="border-b border-outline-variant">
                <th className="px-stack-lg py-3 font-label-sm text-label-sm text-outline uppercase tracking-wider">Invoice ID</th>
                <th className="px-stack-lg py-3 font-label-sm text-label-sm text-outline uppercase tracking-wider">Client Name</th>
                <th className="px-stack-lg py-3 font-label-sm text-label-sm text-outline uppercase tracking-wider">Date Issued</th>
                <th className="px-stack-lg py-3 font-label-sm text-label-sm text-outline uppercase tracking-wider">Amount</th>
                <th className="px-stack-lg py-3 font-label-sm text-label-sm text-outline uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low">
              {invoices.map((inv, idx) => (
                <tr key={idx} className={`hover:bg-surface-container-low/20 transition-colors group ${inv.rowClass || ''}`}>
                  <td className="px-stack-lg py-4 font-body-md text-body-md text-on-surface font-semibold">{inv.id}</td>
                  <td className="px-stack-lg py-4 font-body-md text-body-md text-on-surface">{inv.client}</td>
                  <td className="px-stack-lg py-4 font-body-md text-body-md text-on-surface-variant">{inv.date}</td>
                  <td className="px-stack-lg py-4 font-body-md text-body-md text-on-surface font-bold">{inv.amount}</td>
                  <td className="px-stack-lg py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase ${
                      inv.status === 'Paid' ? 'bg-green-100 text-green-700 border-green-200' : inv.status === 'Overdue' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-blue-100 text-blue-700 border-blue-200'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE NEW INVOICE MODAL */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-[200] flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg border border-outline-variant p-6 max-w-md w-full mx-4 relative animate-scale-up">
            <button onClick={() => setShowInvoiceModal(false)} className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface border-none">
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-headline-sm font-bold text-on-surface mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
              Create New Invoice
            </h3>
            <p className="text-body-sm text-on-surface-variant mb-6">
              Issue an billing statement to client for logged counsel hours.
            </p>
            <form onSubmit={handleCreateInvoiceSubmit} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-label-md font-semibold text-on-surface" htmlFor="inv-client">Select Client</label>
                <select
                  id="inv-client"
                  name="client"
                  value={newInvoice.client}
                  onChange={handleInputChange}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  required
                >
                  <option value="">-- Choose Client --</option>
                  <option value="Alice Smith">Alice Smith</option>
                  <option value="Bob Verma">Bob Verma</option>
                  <option value="Alexander Patel">Alexander Patel</option>
                  <option value="Sharma & Sons">Sharma & Sons</option>
                  <option value="Anjali Mehta">Anjali Mehta</option>
                </select>
                {errors.client && <span className="text-error text-xs">{errors.client}</span>}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-label-md font-semibold text-on-surface" htmlFor="inv-amount">Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-on-surface-variant">$</span>
                  <input
                    id="inv-amount"
                    name="amount"
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="e.g. 2400.00"
                    value={newInvoice.amount}
                    onChange={handleInputChange}
                    className="w-full bg-surface border border-outline-variant rounded-lg pl-8 pr-4 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                {errors.amount && <span className="text-error text-xs">{errors.amount}</span>}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-label-md font-semibold text-on-surface" htmlFor="inv-status">Status</label>
                <select
                  id="inv-status"
                  name="status"
                  value={newInvoice.status}
                  onChange={handleInputChange}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setShowInvoiceModal(false)}
                  className="border border-outline-variant text-on-surface px-4 py-2 rounded-lg hover:bg-surface font-label-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-5 py-2 rounded-lg hover:opacity-90 font-label-md transition-opacity border-none"
                >
                  Issue Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Quick Action Button */}
      <div className="fixed bottom-margin-desktop right-margin-desktop flex flex-col items-end space-y-4">
        <button
          onClick={() => setShowInvoiceModal(true)}
          className="w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform active:scale-95 border-none"
        >
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>
    </div>
  );
}
