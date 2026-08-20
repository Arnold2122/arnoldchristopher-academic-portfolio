import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Check } from 'lucide-react';

export default function ManageAbout() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aboutId, setAboutId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    department: '',
    institution: '',
    institution_website: '',
    location: '',
    about_location: '',
    degree: '',
    email: '',
    photo_url: '',
    about_short: '',
    cgpa: '',
    education_subtitle: ''
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  async function fetchAbout() {
    setLoading(true);
    setErrorMsg(null);
    const { data, error } = await supabase
      .from('about')
      .select('*')
      .limit(1)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Supabase error:', error);
      setErrorMsg(error.message);
    }
    
    if (data) {
      setAboutId(data.id);
      setFormData({
        name: data.name || '',
        designation: data.designation || '',
        department: data.department || '',
        institution: data.institution || '',
        institution_website: data.institution_website || '',
        location: data.location || '',
        about_location: data.about_location || '',
        degree: data.degree || '',
        email: data.email || '',
        photo_url: data.photo_url || '',
        about_short: data.about_short || '',
        cgpa: data.cgpa || '',
        education_subtitle: data.education_subtitle || ''
      });
    }
    setLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);
    
    const operation = aboutId 
      ? supabase.from('about').update(formData).eq('id', aboutId)
      : supabase.from('about').insert([{ id: '1', ...formData }]);

    const { error } = await operation;

    setSaving(false);
    
    if (error) {
      console.error('Error saving about:', error);
      setErrorMsg(error.message);
    } else {
      alert('About Me settings saved successfully!');
      fetchAbout();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-primary-text mb-2">About Me</h2>
      </div>

      <div className="bg-card border border-border rounded-xl p-8 max-w-4xl shadow-sm">
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            <p className="font-bold">Database Error:</p>
            <p className="font-mono text-sm mt-1">{errorMsg}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-8 text-secondary-text">Loading settings...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h3 className="font-serif text-xl font-bold text-primary-text border-b border-border pb-3 mb-5">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">Full Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">Designation</label>
                <input required type="text" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">Email</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">Location</label>
                <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors" />
              </div>
            </div>
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold text-primary-text border-b border-border pb-3 mb-5 mt-8">Academic & Institution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">Degree</label>
                <input type="text" value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">CGPA</label>
                <input type="text" value={formData.cgpa} onChange={e => setFormData({...formData, cgpa: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">Institution</label>
                <input type="text" value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">Department</label>
                <input type="text" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors" />
              </div>
            </div>
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold text-primary-text border-b border-border pb-3 mb-5 mt-8">Media & Bios</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">Profile Photo URL</label>
                <input type="text" value={formData.photo_url} onChange={e => setFormData({...formData, photo_url: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">Short Bio</label>
                <textarea rows={4} value={formData.about_short} onChange={e => setFormData({...formData, about_short: e.target.value})} className="w-full bg-primary-bg border border-border rounded-lg px-4 py-2.5 text-primary-text focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"></textarea>
              </div>
            </div>
            </div>

            <div className="pt-8 flex justify-end space-x-4 border-t border-border mt-8">
              <button disabled={saving} type="submit" className="bg-gold hover:bg-gold-dark text-white shadow-sm font-medium py-3 px-8 rounded-lg transition-colors flex items-center disabled:opacity-50">
                <Check size={18} className="mr-2" /> {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
