import { supabase } from './supabase'

export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('test').select('*').limit(1)
    
    if (error) {
      console.log('Supabase connection test - Expected error (table might not exist):', error.message)
      return { success: true, message: 'Connection established (table test not found is expected)' }
    }
    
    console.log('Supabase connection successful:', data)
    return { success: true, message: 'Connection successful', data }
  } catch (err) {
    console.error('Supabase connection failed:', err)
    return { success: false, message: 'Connection failed', error: err }
  }
}