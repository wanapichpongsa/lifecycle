"use client";

import { useState } from 'react';
import { products } from '@/types/products';
import Image from 'next/image';

interface AddProductFormProps {
  onAdd: (newProduct: string[]) => void;
}

export default function AddProductForm({ onAdd }: AddProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    serialNumber: '',
    manufactureDate: '',
    image: ''
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setFormData(prev => ({ ...prev, image: data.filename }));
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);

    const newProduct = [
      formData.serialNumber,
      formData.name,
      "ClockoWe",
      formData.manufactureDate,
      "5 years left",
      formData.image
    ];

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      onAdd(newProduct);
      setFormData({
        name: '',
        serialNumber: '',
        manufactureDate: '',
        image: ''
      });
      setPreview(null);
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Serial Number</label>
          <input
            type="text"
            value={formData.serialNumber}
            onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
            className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Manufacture Date</label>
          <input
            type="date"
            value={formData.manufactureDate}
            onChange={(e) => setFormData({ ...formData, manufactureDate: e.target.value })}
            className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isUploading || isAdding}
          />
          {isUploading && <p className="text-sm text-zinc-500 mt-1">Uploading...</p>}
          {preview && (
            <div className="mt-2 relative h-32 w-32">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-contain rounded-md"
              />
            </div>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isUploading || isAdding}
      >
        {isAdding ? 'Adding...' : 'Add Product'}
      </button>
    </form>
  );
} 