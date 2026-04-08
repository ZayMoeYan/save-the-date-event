import { useState } from 'react';
import { useCMS } from '../../cms/CMSContext';
import type { FAQ } from '../../cms/cmsTypes';
import { FormModal } from '../components/FormModal';
import { ConfirmDeleteDialog } from '../components/ConfirmDeleteDialog';
import { Plus, Pencil, Trash2, ChevronDown, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

type FAQForm = Omit<FAQ, 'id'>;
const emptyForm = (): FAQForm => ({ question: '', answer: '' });

export function AdminFAQs() {
  const { data, updateSection } = useCMS();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<FAQForm>(emptyForm);
  const [expanded, setExpanded] = useState<string | null>(null);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm());
    setModalOpen(true);
  };

  const openEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setForm({ question: faq.question, answer: faq.answer });
    setModalOpen(true);
  };

  const handleSubmit = () => {
    if (!form.question.trim()) {
      toast.error('Question is required');
      return;
    }
    if (!form.answer.trim()) {
      toast.error('Answer is required');
      return;
    }
    if (editingId) {
      updateSection(
        'faqs',
        data.faqs.map((f) => (f.id === editingId ? { ...f, ...form } : f)),
      );
      toast.success('FAQ updated');
    } else {
      updateSection('faqs', [...data.faqs, { id: crypto.randomUUID(), ...form }]);
      toast.success('FAQ added');
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    updateSection(
      'faqs',
      data.faqs.filter((f) => f.id !== deleteId),
    );
    setDeleteId(null);
    toast.success('FAQ deleted');
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
          >
            FAQs
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage frequently asked questions. When empty, default FAQs are shown.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity self-start sm:self-auto"
          style={{ backgroundColor: 'var(--navy)' }}
        >
          <Plus className="w-4 h-4" />
          Add FAQ
        </button>
      </div>

      {/* Empty state */}
      {data.faqs.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="font-semibold text-gray-700 mb-2">No Custom FAQs</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
            Currently showing default FAQ content. Add custom FAQs to replace them.
          </p>
          <button
            onClick={openAdd}
            className="px-6 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90"
            style={{ backgroundColor: 'var(--navy)' }}
          >
            Add First FAQ
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {data.faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Question row */}
              <div className="flex items-start gap-3 p-4">
                <span
                  className="text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: 'var(--navy)', color: 'var(--gold)' }}
                >
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}
                    className="w-full text-left"
                  >
                    <p
                      className="font-medium text-sm text-gray-800 leading-relaxed"
                      style={{ fontFamily: 'var(--font-subheading)' }}
                    >
                      {faq.question}
                    </p>
                  </button>
                  {/* Expanded answer */}
                  {expanded === faq.id && (
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed whitespace-pre-wrap">
                      {faq.answer}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  <button
                    onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        expanded === faq.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => openEdit(faq)}
                    className="p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                    style={{ color: 'var(--navy)' }}
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(faq.id)}
                    className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <FormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={editingId ? 'Edit FAQ' : 'Add FAQ'}
        onSubmit={handleSubmit}
        submitLabel={editingId ? 'Update FAQ' : 'Add FAQ'}
      >
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Question *</label>
          <input
            type="text"
            value={form.question}
            onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
            placeholder="Enter the question…"
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Answer *</label>
          <textarea
            value={form.answer}
            onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
            placeholder="Enter the answer…"
            rows={5}
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none resize-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
          />
        </div>
      </FormModal>

      {/* Delete confirm */}
      <ConfirmDeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete FAQ"
        description="This FAQ will be permanently removed."
        onConfirm={handleDelete}
      />
    </div>
  );
}
