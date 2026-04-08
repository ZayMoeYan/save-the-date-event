import { useState } from 'react';
import { useCMS } from '../../cms/CMSContext';
import type { Service } from '../../cms/cmsTypes';
import { FormModal } from '../components/FormModal';
import { ImageUploader } from '../components/ImageUploader';
import { ConfirmDeleteDialog } from '../components/ConfirmDeleteDialog';
import { Plus, Pencil, Trash2, Briefcase, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

type ServiceForm = Omit<Service, 'id'>;

const emptyForm = (): ServiceForm => ({
  title: '',
  description: '',
  features: '',
  image: '',
});

export function AdminServices() {
  const { data, updateSection } = useCMS();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<ServiceForm>(emptyForm);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm());
    setModalOpen(true);
  };

  const openEdit = (service: Service) => {
    setEditingId(service.id);
    setForm({
      title: service.title,
      description: service.description,
      features: service.features,
      image: service.image,
    });
    setModalOpen(true);
  };

  const handleSubmit = () => {
    if (!form.title.trim()) {
      toast.error('Service title is required');
      return;
    }
    if (!form.description.trim()) {
      toast.error('Service description is required');
      return;
    }
    if (editingId) {
      updateSection(
        'services',
        data.services.map((s) => (s.id === editingId ? { ...s, ...form } : s)),
      );
      toast.success('Service updated');
    } else {
      updateSection('services', [
        ...data.services,
        { id: crypto.randomUUID(), ...form },
      ]);
      toast.success('Service added');
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    updateSection(
      'services',
      data.services.filter((s) => s.id !== deleteId),
    );
    setDeleteId(null);
    toast.success('Service deleted');
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
          >
            Services
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage service cards. When empty, default services from translations are used.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity self-start sm:self-auto"
          style={{ backgroundColor: 'var(--navy)' }}
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      {/* Empty state */}
      {data.services.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-orange-400" />
          </div>
          <h3 className="font-semibold text-gray-700 mb-2">No Custom Services</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
            Currently using default services. Add custom services to override them on the Services
            page.
          </p>
          <button
            onClick={openAdd}
            className="px-6 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90"
            style={{ backgroundColor: 'var(--navy)' }}
          >
            Add First Service
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Image */}
              <div className="h-44 bg-gray-100">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3
                  className="font-semibold text-gray-800 text-sm mb-1"
                  style={{ fontFamily: 'var(--font-subheading)' }}
                >
                  {service.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-1">{service.description}</p>
                {service.features && (
                  <p className="text-xs text-gray-400 line-clamp-1">
                    Features: {service.features}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="px-4 pb-4 flex gap-2">
                <button
                  onClick={() => openEdit(service)}
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border flex-1 transition-colors hover:bg-[var(--navy)] hover:text-white hover:border-[var(--navy)]"
                  style={{ borderColor: 'var(--navy)', color: 'var(--navy)' }}
                >
                  <Pencil className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={() => setDeleteId(service.id)}
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border border-red-200 text-red-500 hover:bg-red-50 transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <FormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={editingId ? 'Edit Service' : 'Add Service'}
        onSubmit={handleSubmit}
        submitLabel={editingId ? 'Update Service' : 'Add Service'}
      >
        <ImageUploader
          value={form.image}
          onChange={(v) => setForm((f) => ({ ...f, image: v }))}
          label="Service Image"
        />
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="e.g. Event Planning"
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Description *</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Enter service description…"
            rows={3}
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none resize-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Features</label>
          <textarea
            value={form.features}
            onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))}
            placeholder="e.g. Concept Development • Budget Planning • Vendor Sourcing"
            rows={2}
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none resize-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
          />
          <p className="text-xs text-gray-400">Separate features with • (bullet) or new lines</p>
        </div>
      </FormModal>

      {/* Delete confirm */}
      <ConfirmDeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Service"
        description="This service will be permanently removed."
        onConfirm={handleDelete}
      />
    </div>
  );
}
