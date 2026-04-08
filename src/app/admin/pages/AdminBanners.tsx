import { useState } from 'react';
import { useCMS } from '../../cms/CMSContext';
import type { Banner } from '../../cms/cmsTypes';
import { FormModal } from '../components/FormModal';
import { ImageUploader } from '../components/ImageUploader';
import { ConfirmDeleteDialog } from '../components/ConfirmDeleteDialog';
import { Plus, Pencil, Trash2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

type BannerForm = Omit<Banner, 'id'>;

const emptyForm = (): BannerForm => ({ title: '', subtitle: '', image: '' });

export function AdminBanners() {
  const { data, updateSection } = useCMS();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<BannerForm>(emptyForm);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm());
    setModalOpen(true);
  };

  const openEdit = (banner: Banner) => {
    setEditingId(banner.id);
    setForm({ title: banner.title, subtitle: banner.subtitle, image: banner.image });
    setModalOpen(true);
  };

  const handleSubmit = () => {
    if (!form.image.trim()) {
      toast.error('Please provide a banner image');
      return;
    }
    if (!form.title.trim()) {
      toast.error('Banner title is required');
      return;
    }
    if (editingId) {
      updateSection(
        'banners',
        data.banners.map((b) => (b.id === editingId ? { ...b, ...form } : b)),
      );
      toast.success('Banner updated');
    } else {
      updateSection('banners', [
        ...data.banners,
        { id: crypto.randomUUID(), ...form },
      ]);
      toast.success('Banner added');
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    updateSection(
      'banners',
      data.banners.filter((b) => b.id !== deleteId),
    );
    setDeleteId(null);
    toast.success('Banner deleted');
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
          >
            Banners
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage hero slider banners. When empty, default images are used.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity self-start sm:self-auto"
          style={{ backgroundColor: 'var(--navy)' }}
        >
          <Plus className="w-4 h-4" />
          Add Banner
        </button>
      </div>

      {/* Empty state */}
      {data.banners.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="font-semibold text-gray-700 mb-2">No Custom Banners</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
            Currently using the default banner images. Add custom banners to override them on the
            home page slider.
          </p>
          <button
            onClick={openAdd}
            className="px-6 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: 'var(--navy)' }}
          >
            Add First Banner
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.banners.map((banner, index) => (
            <div
              key={banner.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Image preview */}
              <div className="h-48 bg-gray-100 relative">
                {banner.image ? (
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-300" />
                  </div>
                )}
                <div
                  className="absolute top-3 left-3 text-white text-xs px-2.5 py-1 rounded-lg font-medium"
                  style={{ backgroundColor: 'var(--navy)' }}
                >
                  Slide {index + 1}
                </div>
              </div>

              {/* Info */}
              <div className="px-4 pt-4 pb-3">
                <h3
                  className="font-semibold text-gray-800 truncate text-sm"
                  style={{ fontFamily: 'var(--font-subheading)' }}
                >
                  {banner.title || '(no title)'}
                </h3>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {banner.subtitle || '(no subtitle)'}
                </p>
              </div>

              {/* Actions */}
              <div className="px-4 pb-4 flex gap-2">
                <button
                  onClick={() => openEdit(banner)}
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all flex-1"
                  style={{
                    borderColor: 'var(--navy)',
                    color: 'var(--navy)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--navy)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--navy)';
                  }}
                >
                  <Pencil className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={() => setDeleteId(banner.id)}
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
        title={editingId ? 'Edit Banner' : 'Add Banner'}
        onSubmit={handleSubmit}
        submitLabel={editingId ? 'Update Banner' : 'Add Banner'}
      >
        <ImageUploader
          value={form.image}
          onChange={(v) => setForm((f) => ({ ...f, image: v }))}
          label="Banner Image *"
        />
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="e.g. Creating Unforgettable Moments"
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Subtitle</label>
          <input
            type="text"
            value={form.subtitle}
            onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
            placeholder="e.g. Professional Event Planning & Decoration"
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
          />
        </div>
      </FormModal>

      {/* Delete confirm */}
      <ConfirmDeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Banner"
        description="This banner will be permanently removed from the hero slider."
        onConfirm={handleDelete}
      />
    </div>
  );
}
