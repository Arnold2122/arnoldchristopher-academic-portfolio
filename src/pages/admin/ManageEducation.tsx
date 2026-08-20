import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, X, Check, ArrowUp, ArrowDown, ArrowUpToLine } from 'lucide-react';

export default function ManageEducation() {
  const [education, setEducation] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    degree: '',
    field: '',
    institution: '',
    institution_url: '',
    start_year: '',
    end_year: '',
    location: '',
    status: '',
    description: '',
    is_published: true
  });

  useEffect(() => {
    fetchEducation();
  }, []);

  async function fetchEducation() {
    setLoading(true);
    setErrorMsg(null);
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Supabase error:', error);
      setErrorMsg(error.message);
    }
    
    if (data) {
      setEducation(data);
    }
    setLoading(false);
  }

  const handleOpenModal = (edu: any = null) => {
    if (edu) {
      setEditingId(edu.id);
      setFormData({
        degree: edu.degree || '',
        field: edu.field || '',
        institution: edu.institution || '',
        institution_url: edu.institution_url || '',
        start_year: edu.start_year || '',
        end_year: edu.end_year || '',
        location: edu.location || '',
        status: edu.status || '',
        description: edu.description || '',
        is_published: edu.is_published ?? true
      });
    } else {
      setEditingId(null);
      setFormData({
        degree: '', field: '', institution: '', institution_url: '', start_year: '', end_year: '', location: '', status: '', description: '', is_published: true
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const operation = editingId
      ? supabase.from('education').update(formData).eq('id', editingId)
      : supabase.from('education').insert([formData]);

    const { error } = await operation;

    if (error) {
      console.error('Error saving education:', error);
      setErrorMsg(error.message);
    } else {
      handleCloseModal();
      fetchEducation();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      const { error } = await supabase.from('education').delete().eq('id', id);
      if (error) {
        setErrorMsg(error.message);
      } else {
        fetchEducation();
      }
    }
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === education.length - 1) return;

    const newItems = [...education];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    const currentItem = newItems[index];
    const targetItem = newItems[targetIndex];
    
    newItems[index] = targetItem;
    newItems[targetIndex] = currentItem;
    
    setEducation(newItems);
    
    let currentCreatedAt = currentItem.created_at;
    let targetCreatedAt = targetItem.created_at;
    
    if (currentCreatedAt === targetCreatedAt) {
       const date = new Date(currentCreatedAt);
       date.setMilliseconds(date.getMilliseconds() + (direction === 'up' ? 10 : -10));
       currentCreatedAt = date.toISOString();
    }
    
    await Promise.all([
      supabase.from('education').update({ created_at: targetCreatedAt }).eq('id', currentItem.id),
      supabase.from('education').update({ created_at: currentCreatedAt }).eq('id', targetItem.id)
    ]);
    
    fetchEducation();
  };

  const handleMoveToTop = async (id: string) => {
    const { error } = await supabase.from('education').update({ created_at: new Date().toISOString() }).eq('id', id);
    if (!error) fetchEducation();
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold text-primary-text mb-2">Education</h2>
          <p className="text-secondary-text">Manage your academic degrees and educational background.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="mt-4 md:mt-0 bg-gold hover:bg-gold-dark text-white font-medium py-2.5 px-5 rounded-lg flex items-center transition-colors shadow-sm"
        >
          <Plus size={18} className="mr-2" /> Add Education
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        {errorMsg && (
          <div className="m-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            <p className="font-bold">Database Error:</p>
            <p className="font-mono text-sm mt-1">{errorMsg}</p>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-secondary-text">
            <thead className="bg-secondary-bg text-xs uppercase text-primary-text border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium w-16 text-center">Order</th>
                <th className="px-6 py-4 font-medium">Degree</th>
                <th className="px-6 py-4 font-medium">Institution</th>
                <th className="px-6 py-4 font-medium">Duration</th>
                <th className="px-6 py-4 font-medium">Status / Score</th>
                <th className="px-6 py-4 font-medium">Visibility</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-8 text-center">Loading education...</td></tr>
              ) : education.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center flex flex-col items-center">
                    <p className="font-medium text-primary-text">No education entries found.</p>
                  </td>
                </tr>
              ) : (
                education.map((edu, index) => (
                  <tr key={edu.id} className="hover:bg-primary-bg transition-colors group">
                    <td className="px-2 py-4">
                      <div className="flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity space-y-1">
                        <button 
                          disabled={index === 0} 
                          onClick={() => handleMoveOrder(index, 'up')}
                          className="text-secondary-text hover:text-gold disabled:opacity-30 p-1"
                        >
                           <ArrowUp size={16} />
                        </button>
                        <button 
                          disabled={index === education.length - 1} 
                          onClick={() => handleMoveOrder(index, 'down')}
                          className="text-secondary-text hover:text-gold disabled:opacity-30 p-1"
                        >
                           <ArrowDown size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-primary-text">{edu.degree}</td>
                    <td className="px-6 py-4">{edu.institution}</td>
                    <td className="px-6 py-4">{edu.start_year} - {edu.end_year}</td>
                    <td className="px-6 py-4">{edu.status}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${edu.is_published ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-yellow-100 text-yellow-700 border border-yellow-200'}`}>
                        {edu.is_published ? 'Public' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button onClick={() => handleMoveToTop(edu.id)} title="Move to Top" className="flex items-center text-secondary-text hover:text-gold transition-colors px-2 py-1">
                          <ArrowUpToLine size={16} />
                        </button>
                        <button onClick={() => handleOpenModal(edu)} className="flex items-center text-secondary-text hover:text-gold transition-colors px-2 py-1">
                          <Edit2 size={16} className="mr-1" /> Edit
                        </button>
                        <button onClick={() => handleDelete(edu.id)} className="flex items-center text-secondary-text hover:text-red-500 transition-colors px-2 py-1">
                          <Trash2 size={16} className="mr-1" /> Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-xl w-full max-w-xl shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-border bg-card rounded-t-xl sticky top-0 z-10">
              <h3 className="font-serif text-xl font-bold text-primary-text">
                {editingId ? 'Edit Education' : 'Add Education'}
              </h3>
              <button onClick={handleCloseModal} className="text-secondary-text hover:text-gold transition-colors p-1"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-1">Degree / Course</label>
                  <input required type="text" value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-1">Field of Study</label>
                  <input type="text" value={formData.field} onChange={e => setFormData({...formData, field: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold outline-none transition-colors" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-1">Institution</label>
                  <input required type="text" value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-1">Institution URL</label>
                  <input type="url" value={formData.institution_url} onChange={e => setFormData({...formData, institution_url: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold outline-none transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-1">Location</label>
                  <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-1">Status / Score</label>
                  <input type="text" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold outline-none transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-1">Start Year</label>
                  <input type="text" value={formData.start_year} onChange={e => setFormData({...formData, start_year: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-1">End Year</label>
                  <input type="text" required value={formData.end_year} onChange={e => setFormData({...formData, end_year: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold outline-none transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">Description</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold outline-none transition-colors"></textarea>
              </div>

              <div className="flex items-center space-x-3 pt-4 pb-2">
                <input type="checkbox" id="is_published" checked={formData.is_published} onChange={e => setFormData({...formData, is_published: e.target.checked})} className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold" />
                <label htmlFor="is_published" className="text-sm font-medium text-primary-text cursor-pointer">Visible on Public Portfolio</label>
              </div>

              <div className="pt-6 flex justify-end space-x-3 border-t border-border mt-6">
                <button type="button" onClick={handleCloseModal} className="px-5 py-2.5 text-secondary-text hover:text-primary-text hover:bg-secondary-bg rounded-lg transition-colors font-medium">Cancel</button>
                <button type="submit" className="bg-gold hover:bg-gold-dark text-white font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center shadow-sm">
                  <Check size={18} className="mr-2" /> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
