import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, X, Check, Star, ArrowUp, ArrowDown, ArrowUpToLine } from 'lucide-react';

export default function ManageProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    status: 'Completed',
    problem: '',
    short_description: '',
    detailed_description: '',
    technology_stack: [] as string[],
    github_url: '',
    live_demo_url: '',
    image_url: '',
    is_featured: false,
    is_published: true
  });

  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    setErrorMsg(null);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Supabase error:', error);
      setErrorMsg(error.message);
    }

    if (data) {
      setProjects(data);
    }
    setLoading(false);
  }

  const handleOpenModal = (proj: any = null) => {
    if (proj) {
      setEditingId(proj.id);
      setFormData({
        name: proj.name || '',
        category: proj.category || '',
        status: proj.status || 'Completed',
        problem: proj.problem || '',
        short_description: proj.short_description || '',
        detailed_description: proj.detailed_description || '',
        technology_stack: proj.technology_stack || [],
        github_url: proj.github_url || '',
        live_demo_url: proj.live_demo_url || '',
        image_url: proj.image_url || '',
        is_featured: proj.is_featured || false,
        is_published: proj.is_published ?? true
      });
      setTechInput('');
    } else {
      setEditingId(null);
      setFormData({
        name: '', category: '', status: 'Completed', problem: '',
        short_description: '', detailed_description: '',
        technology_stack: [], github_url: '', live_demo_url: '',
        image_url: '', is_featured: false, is_published: true
      });
      setTechInput('');
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const addTech = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      setFormData(prev => ({ ...prev, technology_stack: [...prev.technology_stack, techInput.trim()] }));
      setTechInput('');
    }
  };

  const removeTech = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technology_stack: prev.technology_stack.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const operation = editingId
      ? supabase.from('projects').update(formData).eq('id', editingId)
      : supabase.from('projects').insert([formData]);

    const { error } = await operation;

    if (error) {
      console.error('Error saving project:', error);
      setErrorMsg(error.message);
    } else {
      handleCloseModal();
      fetchProjects();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) {
        setErrorMsg(error.message);
      } else {
        fetchProjects();
      }
    }
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === projects.length - 1) return;

    const newItems = [...projects];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    const currentItem = newItems[index];
    const targetItem = newItems[targetIndex];
    
    newItems[index] = targetItem;
    newItems[targetIndex] = currentItem;
    
    setProjects(newItems);
    
    let currentCreatedAt = currentItem.created_at;
    let targetCreatedAt = targetItem.created_at;
    
    if (currentCreatedAt === targetCreatedAt) {
       const date1 = new Date(currentCreatedAt);
       const date2 = new Date(targetCreatedAt);
       date1.setMilliseconds(date1.getMilliseconds() + 10);
       date2.setMilliseconds(date2.getMilliseconds() - 10);
       currentCreatedAt = date1.toISOString();
       targetCreatedAt = date2.toISOString();
    }
    
    await Promise.all([
      supabase.from('projects').update({ created_at: targetCreatedAt }).eq('id', currentItem.id),
      supabase.from('projects').update({ created_at: currentCreatedAt }).eq('id', targetItem.id)
    ]);
    
    fetchProjects();
  };

  const handleMoveToTop = async (id: string) => {
    const { error } = await supabase.from('projects').update({ created_at: new Date().toISOString() }).eq('id', id);
    if (!error) fetchProjects();
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold text-primary-text mb-2">Projects</h2>
          <p className="text-secondary-text">Manage your portfolio projects and case studies.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="mt-4 md:mt-0 bg-gold hover:bg-gold-dark text-white font-medium py-2.5 px-5 rounded-lg flex items-center transition-colors shadow-sm"
        >
          <Plus size={18} className="mr-2" /> Add Project
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
                <th className="px-6 py-4 font-medium">Project</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Visibility</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center">Loading projects...</td></tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center flex flex-col items-center">
                    <p className="font-medium text-primary-text">No projects found.</p>
                  </td>
                </tr>
              ) : (
                projects.map((proj, index) => (
                  <tr key={proj.id} className="hover:bg-primary-bg transition-colors group">
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
                          disabled={index === projects.length - 1} 
                          onClick={() => handleMoveOrder(index, 'down')}
                          className="text-secondary-text hover:text-gold disabled:opacity-30 p-1"
                        >
                           <ArrowDown size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {proj.image_url ? (
                          <img src={proj.image_url} alt={proj.name} className="w-10 h-10 rounded object-cover border border-border" />
                        ) : (
                          <div className="w-10 h-10 rounded bg-secondary-bg border border-border flex items-center justify-center text-xs text-secondary-text">No Img</div>
                        )}
                        <span className="font-medium text-primary-text">{proj.name}</span>
                        {proj.is_featured && <Star size={14} className="text-gold ml-2" />}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-secondary-text">{proj.category || '-'}</td>
                    <td className="px-6 py-4 text-secondary-text">{proj.status || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${proj.is_published ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-yellow-100 text-yellow-700 border border-yellow-200'}`}>
                        {proj.is_published ? 'Public' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button onClick={() => handleMoveToTop(proj.id)} title="Move to Top" className="flex items-center text-secondary-text hover:text-gold transition-colors px-2 py-1">
                          <ArrowUpToLine size={16} />
                        </button>
                        <button onClick={() => handleOpenModal(proj)} className="flex items-center text-secondary-text hover:text-gold transition-colors px-2 py-1">
                          <Edit2 size={16} className="mr-1" /> Edit
                        </button>
                        <button onClick={() => handleDelete(proj.id)} className="flex items-center text-secondary-text hover:text-red-500 transition-colors px-2 py-1">
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
          <div className="bg-card border border-border rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-border sticky top-0 bg-card z-10">
              <h3 className="font-serif text-xl font-bold text-primary-text">
                {editingId ? 'Edit Project' : 'Add Project'}
              </h3>
              <button onClick={handleCloseModal} className="text-secondary-text hover:text-gold transition-colors p-1">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-1">Project Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-1">Image URL</label>
                  <input type="url" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold outline-none transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-1">Category</label>
                  <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="e.g. AI, Web Development" className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-1">Status</label>
                  <input type="text" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} placeholder="e.g. Completed, In Progress" className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold outline-none transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">Short Description</label>
                <textarea rows={2} value={formData.short_description} onChange={e => setFormData({...formData, short_description: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold outline-none transition-colors"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">Problem</label>
                <textarea rows={3} value={formData.problem} onChange={e => setFormData({...formData, problem: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold outline-none transition-colors"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">Solution / Detailed Description</label>
                <textarea rows={4} value={formData.detailed_description} onChange={e => setFormData({...formData, detailed_description: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold outline-none transition-colors"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">Technology Stack (Press Enter to add)</label>
                <div className="w-full bg-primary-bg border border-border rounded-lg p-2 flex flex-wrap gap-2 min-h-[46px]">
                  {formData.technology_stack.map((tech, i) => (
                    <span key={i} className="bg-gold/10 border border-gold/20 text-gold-dark px-2 py-1 rounded text-xs flex items-center">
                      {tech}
                      <button type="button" onClick={() => removeTech(i)} className="ml-1 hover:text-gold"><X size={12} /></button>
                    </span>
                  ))}
                  <input 
                    type="text" 
                    value={techInput} 
                    onChange={e => setTechInput(e.target.value)} 
                    onKeyDown={addTech}
                    placeholder="Type tech and press Enter"
                    className="bg-transparent text-primary-text outline-none flex-1 text-sm min-w-[150px] px-2 py-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-1">GitHub URL</label>
                  <input type="url" value={formData.github_url} onChange={e => setFormData({...formData, github_url: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-1">Live Demo URL</label>
                  <input type="url" value={formData.live_demo_url} onChange={e => setFormData({...formData, live_demo_url: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold outline-none transition-colors" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 pt-4 pb-2">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" id="is_published" checked={formData.is_published} onChange={e => setFormData({...formData, is_published: e.target.checked})} className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold cursor-pointer" />
                  <label htmlFor="is_published" className="text-sm font-medium text-primary-text cursor-pointer">Visible to Public</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input type="checkbox" id="is_featured" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold cursor-pointer" />
                  <label htmlFor="is_featured" className="text-sm font-medium text-primary-text cursor-pointer">Featured Project</label>
                </div>
              </div>

              <div className="pt-6 flex justify-end space-x-3 border-t border-border mt-6">
                <button type="button" onClick={handleCloseModal} className="px-5 py-2.5 text-secondary-text hover:text-primary-text hover:bg-secondary-bg rounded-lg transition-colors font-medium">Cancel</button>
                <button type="submit" className="bg-gold hover:bg-gold-dark text-white font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center shadow-sm">
                  <Check size={18} className="mr-2" /> Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
