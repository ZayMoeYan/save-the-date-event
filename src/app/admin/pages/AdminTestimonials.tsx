import { useState } from 'react';
import { useCMS } from '../../cms/CMSContext';
import type { Testimonial } from '../../cms/cmsTypes';
import { FormModal } from '../components/FormModal';
import { ImageUploader } from '../components/ImageUploader';
import { ConfirmDeleteDialog } from '../components/ConfirmDeleteDialog';
import { Plus, Trash2, Star } from 'lucide-react';
import { toast } from 'sonner';

export function AdminTestimonials() {
  const { data, updateSection } = useCMS();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [newImage, setNewImage] = useState('');

  const handleAdd = () => {
    if (!newImage.trim()) {
      toast.error('Please provide a testimonial image');
      return;
    }
    updateSection('testimonials', [
      ...data.testimonials,
      { id: crypto.randomUUID(), image: newImage },
    ]);
    setNewImage('');
    setModalOpen(false);
    toast.success('Testimonial added');
  };

  const handleDelete = () => {
    if (!deleteId) return;
    updateSection(
      'testimonials',
      data.testimonials.filter((t) => t.id !== deleteId),
    );
    setDeleteId(null);
    toast.success('Testimonial removed');
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
            Testimonials
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Client review screenshots displayed in the slider. When empty, default reviews are used.
          </p>
        </div>
        <button
          onClick={() => {
            setNewImage('');
            setModalOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity self-start sm:self-auto"
          style={{ backgroundColor: 'var(--navy)' }}
        >
          <Plus className="w-4 h-4" />
          Add Review
        </button>
      </div>

      {/* Empty state */}
      {data.testimonials.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-yellow-400" />
          </div>
          <h3 className="font-semibold text-gray-700 mb-2">No Custom Testimonials</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
            Currently showing default review screenshots. Add custom testimonial images to override
            them.
          </p>
          <button
            onClick={() => {
              setNewImage('');
              setModalOpen(true);
            }}
            className="px-6 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90"
            style={{ backgroundColor: 'var(--navy)' }}
          >
            Add First Testimonial
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data.testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] bg-gray-50">
                <img
                  src={testimonial.image}
                  alt={`Review ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => setDeleteId(testimonial.id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {/* Index badge */}
                <div
                  className="absolute top-2 left-2 text-white text-xs px-2 py-0.5 rounded-md font-medium"
                  style={{ backgroundColor: 'var(--navy)' }}
                >
                  #{index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <FormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Add Testimonial"
        description="Upload a screenshot of a client review"
        onSubmit={handleAdd}
        submitLabel="Add Testimonial"
      >
        <ImageUploader
          value={newImage}
          onChange={setNewImage}
          label="Review Screenshot *"
        />
      </FormModal>

      {/* Delete confirm */}
      <ConfirmDeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Remove Testimonial"
        description="This review will be removed from the testimonials slider."
        onConfirm={handleDelete}
      />
    </div>
  );
}
