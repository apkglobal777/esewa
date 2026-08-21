import { useState, useEffect } from 'react';
import { useLawyer } from '../context/LawyerContext';

export default function LawyerDocuments() {
  const { documents, addDocument, cases } = useLawyer();
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [pendingUploadFile, setPendingUploadFile] = useState(null);

  // Modals visibility
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  // Forms states
  const [uploadForm, setUploadForm] = useState({
    name: '',
    caseTag: '—',
    type: 'LEGAL PDF',
  });
  const [generateForm, setGenerateForm] = useState({
    template: 'Vakalatnama (Power of Attorney)',
    caseTag: '—',
    clientName: '',
    secondPartyName: '',
  });

  // Storage metric calculation
  const totalFilesCount = documents.length;
  // Size calculations based on mock sizes
  const parseSize = (sizeStr) => {
    if (sizeStr.includes('MB')) return parseFloat(sizeStr) * 1024;
    return parseFloat(sizeStr); // in KB
  };
  const totalSizeKB = documents.reduce((sum, doc) => sum + parseSize(doc.size), 0);
  const totalSizeGB = (totalSizeKB / (1024 * 1024)).toFixed(2);
  const usedPercentage = Math.round((totalSizeKB / (10 * 1024 * 1024)) * 100);

  // Document uploader animation effect
  useEffect(() => {
    let interval;
    if (isUploading) {
      interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsUploading(false);
              setUploadProgress(0);
              // Save file to context
              if (pendingUploadFile) {
                addDocument(
                  pendingUploadFile.name,
                  pendingUploadFile.size,
                  pendingUploadFile.caseTag,
                  pendingUploadFile.type
                );
                setPendingUploadFile(null);
              }
            }, 800);
            return 100;
          }
          return prev + 20;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isUploading, pendingUploadFile, addDocument]);

  const handleQuickUploadClick = () => {
    setShowUploadModal(true);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadForm.name.trim()) return;

    const sizeStr = `${(1.2 + Math.random() * 4).toFixed(1)} MB`;
    const tag = uploadForm.caseTag === '—' ? '—' : uploadForm.caseTag.split(':')[0].trim();

    setPendingUploadFile({
      name: uploadForm.name.endsWith('.pdf') || uploadForm.name.endsWith('.docx') || uploadForm.name.endsWith('.jpg')
        ? uploadForm.name
        : `${uploadForm.name}${uploadForm.type === 'LEGAL PDF' ? '.pdf' : uploadForm.type === 'WORD TEMPLATE' ? '.docx' : '.jpg'}`,
      size: sizeStr,
      caseTag: tag,
      type: uploadForm.type,
    });

    setShowUploadModal(false);
    setIsUploading(true);
    setUploadProgress(5);
  };

  const handleGenerateSubmit = (e) => {
    e.preventDefault();
    const templateName = generateForm.template.split(' ')[0].toUpperCase();
    const clientSanitized = generateForm.clientName.replace(/\s/g, '');
    const fileName = `${templateName}_Draft_${clientSanitized || 'Case'}.pdf`;
    const tag = generateForm.caseTag === '—' ? '—' : generateForm.caseTag.split(':')[0].trim();

    addDocument(fileName, '124 KB', tag, 'LEGAL PDF');
    setShowGenerateModal(false);

    // Reset generate form
    setGenerateForm({
      template: 'Vakalatnama (Power of Attorney)',
      caseTag: '—',
      clientName: '',
      secondPartyName: '',
    });
  };

  const filteredDocs = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.caseTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-margin-desktop pb-stack-xl max-w-container-max mx-auto space-y-stack-lg relative">
      {/* Header & Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-on-surface-variant font-label-sm mb-2">
            <span className="text-primary font-bold">Document Vault</span>
          </nav>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Document Vault</h2>
          <p className="text-on-surface-variant mt-1">Manage and secure your legal documentation.</p>
        </div>
        <div className="flex gap-3">
          {/* Search Field */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline material-symbols-outlined text-[18px]">search</span>
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-outline-variant bg-white rounded-lg text-label-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all w-60"
            />
          </div>
          <button
            onClick={() => setShowGenerateModal(true)}
            className="flex items-center gap-2 border border-outline-variant bg-surface-container-lowest text-on-surface font-label-md px-4 py-2.5 rounded-lg hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined">auto_awesome</span>
            Generate Document
          </button>
          <button
            onClick={handleQuickUploadClick}
            className="flex items-center gap-2 bg-primary text-on-primary font-label-md px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity shadow-sm border-none"
          >
            <span className="material-symbols-outlined">upload</span>
            Quick Upload
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="bento-grid">
        {/* Shortcuts widgets */}
        <div className="col-span-12 md:col-span-3 bg-white border border-outline-variant rounded-xl p-stack-md hover:border-primary transition-all cursor-pointer group shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">folder</span>
            </div>
            <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">more_vert</span>
          </div>
          <h3 className="font-label-md text-on-surface mb-1 font-semibold">Case Documents</h3>
          <div className="flex justify-between items-center">
            <p className="text-on-surface-variant font-label-sm">{totalFilesCount} Files</p>
            <span className="text-primary font-label-sm font-semibold">{totalSizeGB} MB</span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-3 bg-white border border-outline-variant rounded-xl p-stack-md hover:border-primary transition-all cursor-pointer group shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-secondary-container/10 rounded-lg flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">file_copy</span>
            </div>
            <span className="material-symbols-outlined text-outline-variant group-hover:text-secondary transition-colors">more_vert</span>
          </div>
          <h3 className="font-label-md text-on-surface mb-1 font-semibold">Templates</h3>
          <div className="flex justify-between items-center">
            <p className="text-on-surface-variant font-label-sm">3 Files</p>
            <span className="text-secondary font-label-sm font-semibold">120 KB</span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-3 bg-white border border-outline-variant rounded-xl p-stack-md hover:border-primary transition-all cursor-pointer group shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#D1FAE5] text-[#065F46] rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">verified_user</span>
            </div>
            <span className="material-symbols-outlined text-outline-variant group-hover:text-tertiary transition-colors">more_vert</span>
          </div>
          <h3 className="font-label-md text-on-surface mb-1 font-semibold">Signed Affidavits</h3>
          <div className="flex justify-between items-center">
            <p className="text-on-surface-variant font-label-sm">8 Files</p>
            <span className="text-tertiary font-label-sm font-semibold">350 KB</span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-3 bg-white border border-outline-variant rounded-xl p-stack-md hover:border-primary transition-all cursor-pointer group shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-error-container/20 rounded-lg flex items-center justify-center text-error">
              <span className="material-symbols-outlined">note_alt</span>
            </div>
            <span className="material-symbols-outlined text-outline-variant group-hover:text-error transition-colors">more_vert</span>
          </div>
          <h3 className="font-label-md text-on-surface mb-1 font-semibold">Research Notes</h3>
          <div className="flex justify-between items-center">
            <p className="text-on-surface-variant font-label-sm">15 Files</p>
            <span className="text-error font-label-sm font-semibold">4.5 MB</span>
          </div>
        </div>

        {/* List View */}
        <div className="col-span-12 lg:col-span-9 bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
          <div className="px-stack-lg py-4 border-b border-outline-variant flex justify-between items-center bg-surface">
            <div className="flex items-center gap-4">
              <h3 className="font-label-md text-on-surface font-semibold">Recent Files</h3>
            </div>
          </div>
          <div className="flex-grow overflow-auto min-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-surface-container-low/80 backdrop-blur z-10 border-b border-outline-variant">
                <tr>
                  <th className="px-6 py-3 font-label-sm text-on-surface-variant uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 font-label-sm text-on-surface-variant uppercase tracking-wider">Date Modified</th>
                  <th className="px-6 py-3 font-label-sm text-on-surface-variant uppercase tracking-wider">Related Case</th>
                  <th className="px-6 py-3 font-label-sm text-on-surface-variant uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 font-label-sm text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {filteredDocs.map((doc, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low/50 transition-colors cursor-default group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined ${doc.iconColor}`}>{doc.icon}</span>
                        <div>
                          <p className="font-label-md text-on-surface group-hover:text-primary font-medium">{doc.name}</p>
                          <p className="text-xs text-on-surface-variant">{doc.size}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body-sm text-on-surface-variant">{doc.modified}</td>
                    <td className="px-6 py-4">
                      {doc.caseTag !== '—' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-tight">
                          {doc.caseTag}
                        </span>
                      ) : (
                        <span className="text-on-surface-variant italic">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-surface-container-low text-on-surface-variant rounded-md text-[10px] font-semibold uppercase">
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-primary/10 rounded-full text-on-surface-variant hover:text-primary transition-all border-none">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredDocs.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-on-surface-variant font-body-md">
                      No files found matching the search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Bento Column */}
        <div className="col-span-12 lg:col-span-3 space-y-gutter">
          {/* Storage Usage Card */}
          <div className="bg-white rounded-xl border border-outline-variant p-stack-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-label-md text-on-surface font-semibold">Storage Vault</h4>
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">info</span>
            </div>
            <div className="w-full bg-surface-container-low h-2.5 rounded-full overflow-hidden mb-2">
              <div className="bg-primary h-full rounded-full transition-all duration-300" style={{ width: `${usedPercentage}%` }}></div>
            </div>
            <div className="flex justify-between font-label-sm mb-6">
              <span className="text-on-surface-variant">{totalSizeGB} MB of 10 GB used</span>
              <span className="text-primary font-semibold">{usedPercentage}%</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="flex-grow text-on-surface-variant font-label-sm">Legal PDFs</span>
                <span className="font-label-sm font-medium">{(totalSizeKB * 0.75 / 1024).toFixed(1)} MB</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span className="flex-grow text-on-surface-variant font-label-sm">Word Documents</span>
                <span className="font-label-sm font-medium">{(totalSizeKB * 0.15 / 1024).toFixed(1)} MB</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-tertiary" />
                <span className="flex-grow text-on-surface-variant font-label-sm">Images</span>
                <span className="font-label-sm font-medium">{(totalSizeKB * 0.10 / 1024).toFixed(1)} MB</span>
              </div>
            </div>
          </div>

          {/* Trust Indicator */}
          <div className="bg-[#D1FAE5]/10 rounded-xl border border-[#D1FAE5] p-stack-md flex items-start gap-4 shadow-sm">
            <div className="p-2 bg-[#D1FAE5] rounded-lg text-[#065F46]">
              <span className="material-symbols-outlined">lock</span>
            </div>
            <div>
              <h4 className="font-label-sm text-[#065F46] font-semibold">AES-256 Encrypted</h4>
              <p className="text-[11px] leading-tight text-on-surface-variant mt-1">All files are end-to-end encrypted and compliant with global legal security standards.</p>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK UPLOAD MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-[200] flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg border border-outline-variant p-6 max-w-md w-full mx-4 relative animate-scale-up">
            <button onClick={() => setShowUploadModal(false)} className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface border-none">
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-headline-sm font-bold text-on-surface mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">cloud_upload</span>
              Upload Case Document
            </h3>
            <p className="text-body-sm text-on-surface-variant mb-6">
              Select details to index this document on the encrypted eSewa storage network.
            </p>
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-label-md font-semibold text-on-surface" htmlFor="upload-name">File Name</label>
                <input
                  id="upload-name"
                  type="text"
                  placeholder="e.g. Affidavit_Draft_Rajesh"
                  value={uploadForm.name}
                  onChange={e => setUploadForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-label-md font-semibold text-on-surface" htmlFor="upload-case">Link to Case</label>
                <select
                  id="upload-case"
                  value={uploadForm.caseTag}
                  onChange={e => setUploadForm(p => ({ ...p, caseTag: e.target.value }))}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                >
                  <option value="—">No Case (General Storage)</option>
                  {cases.map(c => (
                    <option key={c.id} value={`${c.id}: ${c.client}`}>{c.id}: {c.client}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-label-md font-semibold text-on-surface" htmlFor="upload-type">Document Type</label>
                <select
                  id="upload-type"
                  value={uploadForm.type}
                  onChange={e => setUploadForm(p => ({ ...p, type: e.target.value }))}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                >
                  <option value="LEGAL PDF">LEGAL PDF (.pdf)</option>
                  <option value="WORD TEMPLATE">WORD DOCUMENT (.docx)</option>
                  <option value="IMAGE">IMAGE EVIDENCE (.jpg)</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="border border-outline-variant text-on-surface px-4 py-2 rounded-lg hover:bg-surface font-label-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-5 py-2 rounded-lg hover:opacity-90 font-label-md transition-opacity border-none"
                >
                  Upload File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GENERATE TEMPLATE MODAL */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-[200] flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg border border-outline-variant p-6 max-w-md w-full mx-4 relative animate-scale-up">
            <button onClick={() => setShowGenerateModal(false)} className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface border-none">
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-headline-sm font-bold text-on-surface mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              Generate Legal Document
            </h3>
            <p className="text-body-sm text-on-surface-variant mb-6">
              Select standard templates to draft legally binding contracts instantly.
            </p>
            <form onSubmit={handleGenerateSubmit} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-label-md font-semibold text-on-surface" htmlFor="gen-template">Select Template</label>
                <select
                  id="gen-template"
                  value={generateForm.template}
                  onChange={e => setGenerateForm(p => ({ ...p, template: e.target.value }))}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                >
                  <option value="Vakalatnama (Power of Attorney)">Vakalatnama (Power of Attorney)</option>
                  <option value="NDA (Non-Disclosure Agreement)">NDA (Non-Disclosure Agreement)</option>
                  <option value="Lease_Deed (Commercial Rental)">Lease Deed (Commercial Rental)</option>
                  <option value="Employment_Agreement (Staffing)">Employment Agreement (Staffing)</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-label-md font-semibold text-on-surface" htmlFor="gen-case">Link to Case Folder</label>
                <select
                  id="gen-case"
                  value={generateForm.caseTag}
                  onChange={e => setGenerateForm(p => ({ ...p, caseTag: e.target.value }))}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                >
                  <option value="—">No Case (General Storage)</option>
                  {cases.map(c => (
                    <option key={c.id} value={`${c.id}: ${c.client}`}>{c.id}: {c.client}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-label-md font-semibold text-on-surface" htmlFor="gen-client">First Party Name</label>
                <input
                  id="gen-client"
                  type="text"
                  placeholder="e.g. Alice Smith"
                  value={generateForm.clientName}
                  onChange={e => setGenerateForm(p => ({ ...p, clientName: e.target.value }))}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-label-md font-semibold text-on-surface" htmlFor="gen-second">Second Party Name</label>
                <input
                  id="gen-second"
                  type="text"
                  placeholder="e.g. Bob Verma, Alexander Patel"
                  value={generateForm.secondPartyName}
                  onChange={e => setGenerateForm(p => ({ ...p, secondPartyName: e.target.value }))}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setShowGenerateModal(false)}
                  className="border border-outline-variant text-on-surface px-4 py-2 rounded-lg hover:bg-surface font-label-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-5 py-2 rounded-lg hover:opacity-90 font-label-md transition-opacity border-none"
                >
                  Generate PDF
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPLOAD STATUS CARD */}
      <div
        className={`fixed bottom-8 right-8 w-80 bg-white border border-outline-variant rounded-xl p-4 shadow-xl transition-all duration-500 z-50 ${
          isUploading ? 'translate-y-0 opacity-100' : 'translate-y-[200%] opacity-0'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="font-label-sm text-on-surface flex items-center gap-2 font-semibold">
            <span className="material-symbols-outlined text-[18px] text-primary animate-spin">sync</span>
            Uploading document ({uploadProgress}%)
          </span>
          <button onClick={() => setIsUploading(false)} className="text-on-surface-variant hover:text-on-surface border-none">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
        <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
          <div className="bg-primary h-full transition-all duration-300 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
        </div>
      </div>
    </div>
  );
}
