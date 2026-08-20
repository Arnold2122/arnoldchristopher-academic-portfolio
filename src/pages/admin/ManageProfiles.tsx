import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, X, Check, ArrowUp, ArrowDown, ArrowUpToLine } from 'lucide-react';

export default function ManageProfiles() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    platform: '',
    profile_url: '',
    display_name: '',
    icon_name: '',
    is_published: true
  });

  useEffect(() => {
    fetchProfiles();
  }, []);

  async function fetchProfiles() {
    setLoading(true);
    setErrorMsg(null);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Supabase error:', error);
      setErrorMsg(error.message);
    }
    
    if (data) {
      setProfiles(data);
    }
    setLoading(false);
  }

  const handleOpenModal = (prof: any = null) => {
    if (prof) {
      setEditingId(prof.id);
      setFormData({
        platform: prof.platform || '',
        profile_url: prof.profile_url || '',
        display_name: prof.display_name || '',
        icon_name: prof.icon_name || '',
        is_published: prof.is_published ?? true
      });
    } else {
      setEditingId(null);
      setFormData({
        platform: '', profile_url: '', display_name: '', icon_name: '', is_published: true
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
      ? supabase.from('profiles').update(formData).eq('id', editingId)
      : supabase.from('profiles').insert([formData]);

    const { error } = await operation;

    if (error) {
      console.error('Error saving profile:', error);
      setErrorMsg(error.message);
    } else {
      handleCloseModal();
      fetchProfiles();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      const { error } = await supabase.from('profiles').delete().eq('id', id);
      if (error) {
        setErrorMsg(error.message);
      } else {
        fetchProfiles();
      }
    }
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === profiles.length - 1) return;

    const newItems = [...profiles];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    const currentItem = newItems[index];
    const targetItem = newItems[targetIndex];
    
    newItems[index] = targetItem;
    newItems[targetIndex] = currentItem;
    
    setProfiles(newItems);
    
    let currentCreatedAt = currentItem.created_at;
    let targetCreatedAt = targetItem.created_at;
    
    if (currentCreatedAt === targetCreatedAt) {
       const date = new Date(currentCreatedAt);
       date.setMilliseconds(date.getMilliseconds() + (direction === 'up' ? 10 : -10));
       currentCreatedAt = date.toISOString();
    }
    
    await Promise.all([
      supabase.from('profiles').update({ created_at: targetCreatedAt }).eq('id', currentItem.id),
      supabase.from('profiles').update({ created_at: currentCreatedAt }).eq('id', targetItem.id)
    ]);
    
    fetchProfiles();
  };

  const handleMoveToTop = async (id: string) => {
    const { error } = await supabase.from('profiles').update({ created_at: new Date().toISOString() }).eq('id', id);
    if (!error) fetchProfiles();
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold text-primary-text mb-2">Profiles</h2>
          <p className="text-secondary-text">Manage your social profiles and external links.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="mt-4 md:mt-0 bg-gold hover:bg-gold-dark text-white font-medium py-2.5 px-5 rounded-lg flex items-center transition-colors shadow-sm"
        >
          <Plus size={18} className="mr-2" /> Add Profile Link
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
                <th className="px-6 py-4 font-medium">Platform</th>
                <th className="px-6 py-4 font-medium">Display Name</th>
                <th className="px-6 py-4 font-medium">URL</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center">Loading profiles...</td></tr>
              ) : profiles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center flex flex-col items-center">
                    <p className="font-medium text-primary-text">No profiles found.</p>
                  </td>
                </tr>
              ) : (
                profiles.map((prof, index) => (
                  <tr key={prof.id} className="hover:bg-primary-bg transition-colors group">
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
                          disabled={index === profiles.length - 1} 
                          onClick={() => handleMoveOrder(index, 'down')}
                          className="text-secondary-text hover:text-gold disabled:opacity-30 p-1"
                        >
                           <ArrowDown size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-primary-text capitalize">{prof.platform}</td>
                    <td className="px-6 py-4">{prof.display_name}</td>
                    <td className="px-6 py-4 max-w-[200px] truncate text-gold-dark">
                      <a href={prof.profile_url} target="_blank" rel="noreferrer" className="hover:underline">{prof.profile_url}</a>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${prof.is_published ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-yellow-100 text-yellow-700 border border-yellow-200'}`}>
                        {prof.is_published ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button onClick={() => handleMoveToTop(prof.id)} title="Move to Top" className="flex items-center text-secondary-text hover:text-gold transition-colors px-2 py-1">
                          <ArrowUpToLine size={16} />
                        </button>
                        <button onClick={() => handleOpenModal(prof)} className="flex items-center text-secondary-text hover:text-gold transition-colors px-2 py-1">
                          <Edit2 size={16} className="mr-1" /> Edit
                        </button>
                        <button onClick={() => handleDelete(prof.id)} className="flex items-center text-secondary-text hover:text-red-500 transition-colors px-2 py-1">
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
                {editingId ? 'Edit Profile' : 'Add Profile'}
              </h3>
              <button onClick={handleCloseModal} className="text-secondary-text hover:text-gold transition-colors p-1"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-1">Platform (e.g. linkedin)</label>
                  <input required type="text" value={formData.platform} onChange={e => setFormData({...formData, platform: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-1">Icon Name (lucide-react)</label>
                  <input type="text" value={formData.icon_name} onChange={e => setFormData({...formData, icon_name: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold outline-none transition-colors" placeholder="e.g. Linkedin, Github" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">Display Name / Handle</label>
                <input required type="text" value={formData.display_name} onChange={e => setFormData({...formData, display_name: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold outline-none transition-colors" placeholder="e.g. @yourhandle" />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">Profile URL</label>
                <input required type="url" value={formData.profile_url} onChange={e => setFormData({...formData, profile_url: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold outline-none transition-colors" />
              </div>

              <div className="flex items-center space-x-3 pt-4 pb-2">
                <input type="checkbox" id="is_published" checked={formData.is_published} onChange={e => setFormData({...formData, is_published: e.target.checked})} className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold" />
                <label htmlFor="is_published" className="text-sm font-medium text-primary-text cursor-pointer">Show on Portfolio</label>
              </div>

              <div className="pt-6 flex justify-end space-x-3 border-t border-border mt-6">
                <button type="button" onClick={handleCloseModal} className="px-5 py-2.5 text-secondary-text hover:text-primary-text hover:bg-secondary-bg rounded-lg transition-colors font-medium">Cancel</button>
                <button type="submit" className="bg-gold hover:bg-gold-dark text-white font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center shadow-sm">
                  <Check size={18} className="mr-2" /> Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
