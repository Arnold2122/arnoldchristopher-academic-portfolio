import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import ws from 'ws';

dotenv.config({ path: resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
  realtime: { transport: ws }
});

async function run() {
  console.log('Fetching publications...');
  const { data: publications, error } = await supabase.from('publications').select('*').order('created_at', { ascending: true });
  
  if (error) {
    console.error('Error fetching:', error);
    return;
  }
  
  console.log(`Found ${publications?.length} publications.`);
  
  if (publications) {
    let currentOrder = 1;
    for (const pub of publications) {
      const isBookChapter1 = pub.title.includes('Building Future-Ready Leaders');
      const isBookChapter2 = pub.title.includes('Adaptive Vibro-Physiological');
      
      const newType = (isBookChapter1 || isBookChapter2) ? 'Book Chapter' : pub.publication_type;
      
      let newPublisher = pub.publisher;
      let newIndexing = pub.indexing;
      
      if (pub.publisher && pub.publisher.includes('IGI Global')) {
        newPublisher = 'IGI Global';
      }
      if (pub.publisher && pub.publisher.includes('Scopus Indexed')) {
        newIndexing = 'Scopus Indexed';
      }
      
      const updates = {
        publication_type: newType,
        publisher: newPublisher,
        indexing: newIndexing || 'Scopus Indexed',
        status: pub.status || 'Published',
        display_order: currentOrder
      };
      
      console.log(`Updating ${pub.title.substring(0, 30)}... to order ${currentOrder}`);
      const { error: updateError } = await supabase.from('publications').update(updates).eq('id', pub.id);
      
      if (updateError) {
        console.error('Failed to update', updateError);
      }
      currentOrder++;
    }
  }
  
  console.log('Done!');
}

run();
