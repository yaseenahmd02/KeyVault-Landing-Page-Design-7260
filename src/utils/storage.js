// Local storage utilities for waitlist data
export const saveWaitlistEntry = (formData) => {
  try {
    // Get existing entries
    const existingEntries = getWaitlistEntries();
    
    // Add timestamp and ID to new entry
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...formData
    };
    
    // Add to existing entries
    const updatedEntries = [...existingEntries, newEntry];
    
    // Save to localStorage
    localStorage.setItem('keyvault_waitlist', JSON.stringify(updatedEntries));
    
    console.log('Waitlist entry saved:', newEntry);
    return newEntry;
  } catch (error) {
    console.error('Error saving waitlist entry:', error);
    return null;
  }
};

export const getWaitlistEntries = () => {
  try {
    const entries = localStorage.getItem('keyvault_waitlist');
    return entries ? JSON.parse(entries) : [];
  } catch (error) {
    console.error('Error retrieving waitlist entries:', error);
    return [];
  }
};

export const getWaitlistCount = () => {
  return getWaitlistEntries().length;
};

export const clearWaitlist = () => {
  localStorage.removeItem('keyvault_waitlist');
};

// Export entries as CSV (for admin use)
export const exportWaitlistCSV = () => {
  const entries = getWaitlistEntries();
  if (entries.length === 0) return '';
  
  const headers = ['ID', 'Name', 'Email', 'Phone', 'City', 'Timestamp'];
  const csvContent = [
    headers.join(','),
    ...entries.map(entry => [
      entry.id,
      entry.name,
      entry.email,
      entry.phone,
      entry.city,
      entry.timestamp
    ].join(','))
  ].join('\n');
  
  return csvContent;
};