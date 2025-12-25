import { supabase } from './supabase'

export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  sp_amt: number
  orders_count: number
  updated_at: string
}

export const getProfile = async (userId: string): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }

    return data
  } catch (err) {
    console.error('Error fetching profile:', err)
    return null
  }
}

export const updateProfile = async (userId: string, updates: Partial<Profile>) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating profile:', error)
      return { data: null, error }
    }

    return { data, error: null }
  } catch (err) {
    console.error('Error updating profile:', err)
    return { data: null, error: err }
  }
}

export const incrementOrderCount = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ 
        orders_count: supabase.raw('orders_count + 1'),
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error incrementing order count:', error)
      return { data: null, error }
    }

    return { data, error: null }
  } catch (err) {
    console.error('Error incrementing order count:', err)
    return { data: null, error: err }
  }
}

export const updateSpAmount = async (userId: string, amount: number) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ 
        sp_amt: amount,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating sp_amt:', error)
      return { data: null, error }
    }

    return { data, error: null }
  } catch (err) {
    console.error('Error updating sp_amt:', err)
    return { data: null, error: err }
  }
}