import { useState } from 'react';
import { useCMS } from '../../cms/CMSContext';
import type { GalleryItem } from '../../cms/cmsTypes';
import { FormModal } from '../components/FormModal';
import { ImageUploader } from '../components/ImageUploader';
import { ConfirmDeleteDialog } from '../components/ConfirmDeleteDialog';
import { Plus, Trash2, Camera } from 'lucide-react';
import { toast } from 'sonner';

export function AdminGallery() {
  const { data, updateSection } = useCMS();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({ image: '', alt: '' });

  const handleAdd = () => {
    if (!form.image.trim()) {
      toast.error('Please provide an image');
      return;
    }
    const newItem: GalleryItem = {
      id: crypto.randomUUID(),
      image: form.image,
      alt: form.alt || 'Gallery image',
    };
    updateSection('gallery', [...data.gallery, newItem]);
    setForm({ image: '', alt: '' });
    setModalOpen(false);
    toast.success('Image added to gallery');
  };

  const handleDelete = () => {
    if (!deleteId) return;
    updateSection(
      'gallery',
      data.gallery.filter((g) => g.id !== deleteId),
    );
    setDeleteId(null);
    toast.success('Image removed from gallery');
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
          >
            Gallery
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage gallery images. When empty, default images are shown.
          </p>
        </div>
        <button
          onClick={() => {
            setForm({ image: '', alt: '' });
            setModalOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity self-start sm:self-auto"
          style={{ backgroundColor: 'var(--navy)' }}
        >
          <Plus className="w-4 h-4" />
          Add Image
        </button>
      </div>

      {/* Stats bar */}
      {data.gallery.length > 0 && (
        <div className="mb-5 px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-100 text-sm text-gray-600 flex items-center gap-2">
          <Camera className="w-4 h-4" style={{ color: 'var(--gold)' }} />
          <span>
            <span className="font-semibold" style={{ color: 'var(--navy)' }}>
              {data.gallery.length}
            </span>{' '}
            custom image{data.gallery.length !== 1 ? 's' : ''} — overriding default gallery
          </span>
        </div>
      )}

      {/* Empty state */}
      {data.gallery.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-blue-400" />
          </div>
          <h3 className="font-semibold text-gray-700 mb-2">No Custom Gallery Images</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
            Currently showing default gallery images. Add custom images to replace them.
          </p>
          <button
            onClick={() => {
              setForm({ image: '', alt: '' });
              setModalOpen(true);
            }}
            className="px-6 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90"
            style={{ backgroundColor: 'var(--navy)' }}
          >
            Add First Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {data.gallery.map((item, index) => (
            <div
              key={item.id}
              className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => setDeleteId(item.id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {/* Index badge */}
              <div
                className="absolute top-2 left-2 text-white text-xs px-1.5 py-0.5 rounded-md font-medium"
                style={{ backgroundColor: 'rgba(26,26,46,0.8)' }}
              >
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <FormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Add Gallery Image"
        onSubmit={handleAdd}
        submitLabel="Add Image"
      >
        <ImageUploader
          value={form.image}
          onChange={(v) => setForm((f) => ({ ...f, image: v }))}
          label="Image *"
        />
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Alt Text</label>
          <input
            type="text"
            value={form.alt}
            onChange={(e) => setForm((f) => ({ ...f, alt: e.target.value }))}
            placeholder="e.g. Wedding decoration setup"
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
          />
        </div>
      </FormModal>

      {/* Delete confirm */}
      <ConfirmDeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Remove Image"
        description="This image will be permanently removed from the gallery."
        onConfirm={handleDelete}
      />
    </div>
  );
}
