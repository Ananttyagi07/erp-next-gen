/**
 * School Context - Manages school selection and multi-school data fetching
 * Provides global school switching functionality across the entire application
 */

import { createContext, useState, useEffect, useCallback, useRef } from 'react';
import apiService from '../services/apiService';

export const SchoolContext = createContext();

function SchoolProvider({ children }) {
  const [selectedSchool, setSelectedSchoolState] = useState('1');
  const [schools, setSchools] = useState([]);
  const [isLoadingSchools, setIsLoadingSchools] = useState(true);
  const [error, setError] = useState(null);

  // Use ref to track if initialization has run
  const initRef = useRef(false);

  const initializeSchool = useCallback(async () => {
      try {
        // Only try to fetch schools if user is authenticated
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.log('[School Init] No auth token, using default schools');
          setSchools([
            { id: 1, name: 'School 1', code: 'SCH001', collegeId: '1' },
            { id: 2, name: 'School 2', code: 'SCH002', collegeId: '2' }
          ]);
          setSelectedSchoolState('1');
          localStorage.setItem('selectedSchool', '1');
          setIsLoadingSchools(false);
          return;
        }

        // Try to fetch available schools from API
        try {
          const schoolsResponse = await apiService.get('/colleges/colleges/');
          const collegesData = schoolsResponse.data?.data || [];

          if (collegesData.length > 0) {
            // Format schools data from API - use college ID as primary identifier for X-School-Id header
            const formattedSchools = collegesData.map(college => ({
              id: college.id,
              name: college.name,
              code: college.code,
              collegeId: String(college.id) // Use college ID for routing
            }));

            setSchools(formattedSchools);
            console.log('[School Init] Loaded schools from API:', formattedSchools);

            // Check if there's a saved school selection
            const savedSchool = localStorage.getItem('selectedSchool');
            if (savedSchool && formattedSchools.some(s => String(s.collegeId) === String(savedSchool))) {
              setSelectedSchoolState(String(savedSchool));
              console.log('[School Init] Using saved school:', savedSchool);
            } else {
              // Default to first school
              const defaultSchoolId = String(formattedSchools[0].collegeId);
              setSelectedSchoolState(defaultSchoolId);
              localStorage.setItem('selectedSchool', defaultSchoolId);
              console.log('[School Init] Using default school:', defaultSchoolId);
            }
          }
        } catch (apiErr) {
          console.warn('[School Init] Could not fetch schools from API, using defaults:', apiErr.message);
          // Use default schools as fallback
          const defaultSchools = [
            { id: 1, name: 'School 1', code: 'SCH001', collegeId: '1' },
            { id: 2, name: 'School 2', code: 'SCH002', collegeId: '2' }
          ];
          setSchools(defaultSchools);
          setSelectedSchoolState('1');
          localStorage.setItem('selectedSchool', '1');
        }
      } catch (err) {
        console.error('[School Init] Error during initialization:', err.message);
        setError(err.message);
      } finally {
        setIsLoadingSchools(false);
      }
  }, []);

  // Initial fetch on mount only
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    initializeSchool();
  }, [initializeSchool]);

  // Re-fetch once a token appears from a same-tab login (client-side
  // navigation, no page reload) — otherwise the mount-only fetch above ran
  // once at app boot before any token existed, and the branch switcher
  // stayed on "School 1"/"School 2" placeholders until a manual page
  // refresh. This listener must live in its own effect: gating it behind
  // the same initRef guard as the mount-only fetch meant React 18
  // StrictMode's dev-mode double-invoke (mount → cleanup → mount) skipped
  // re-attaching it on the second, persisting mount.
  useEffect(() => {
    const handleAuthTokenSet = () => initializeSchool();
    window.addEventListener('authTokenSet', handleAuthTokenSet);
    return () => window.removeEventListener('authTokenSet', handleAuthTokenSet);
  }, [initializeSchool]);

  // Handle school selection change
  const changeSchool = useCallback((collegeId) => {
    const collegeIdStr = String(collegeId);
    console.log('[School Context] Changing school to:', collegeIdStr);

    // Validate school exists
    if (!schools.some(s => String(s.collegeId) === collegeIdStr)) {
      console.warn('[School Context] Invalid college ID:', collegeIdStr);
      return;
    }

    setSelectedSchoolState(collegeIdStr);
    localStorage.setItem('selectedSchool', collegeIdStr);

    // Update API headers for next requests
    console.log('[School Context] School changed, next API requests will use header:', {
      'X-School-Id': collegeIdStr
    });

    // Trigger a custom event so other components can react to school change
    window.dispatchEvent(new CustomEvent('schoolChanged', {
      detail: { collegeId: collegeIdStr }
    }));
  }, [schools]);

  // Get current selected school details
  const getCurrentSchool = useCallback(() => {
    return schools.find(s => String(s.collegeId) === String(selectedSchool)) || null;
  }, [schools, selectedSchool]);

  const value = {
    selectedSchool,
    schools,
    isLoadingSchools,
    error,
    changeSchool,
    getCurrentSchool,
  };

  return (
    <SchoolContext.Provider value={value}>
      {children}
    </SchoolContext.Provider>
  );
}

export default SchoolProvider;
