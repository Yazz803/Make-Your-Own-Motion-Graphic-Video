'use client';

import { useMemo, useState } from 'react';
import {
  ALL_STATIONS,
  MOTION_STYLES,
} from '@/lib/constants';
import type { RepoSource } from '@/types';

export type CatalogRepoFilter = 'all' | RepoSource;

const INITIAL_PAGE_SIZE = 9;
const PAGE_INCREMENT = 12;

export function useStyleCatalogFilter() {
  const [repoFilter, setRepoFilter] = useState<CatalogRepoFilter>('all');
  const [stationFilter, setStationFilter] = useState<string>('all');
  const [query, setQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_PAGE_SIZE);

  const availableStations = useMemo(() => {
    if (repoFilter === 'all') return ALL_STATIONS;
    return Array.from(
      new Set(
        MOTION_STYLES.filter((s) => s.repo === repoFilter).map((s) => s.station)
      )
    );
  }, [repoFilter]);

  const filteredStyles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return MOTION_STYLES.filter((style) => {
      if (repoFilter !== 'all' && style.repo !== repoFilter) return false;
      if (stationFilter !== 'all' && style.station !== stationFilter) {
        return false;
      }
      if (!normalizedQuery) return true;
      return (
        style.name.toLowerCase().includes(normalizedQuery) ||
        style.station.toLowerCase().includes(normalizedQuery) ||
        style.shortDesc.toLowerCase().includes(normalizedQuery) ||
        style.skillHandle.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [repoFilter, stationFilter, query]);

  const displayedStyles = filteredStyles.slice(0, visibleCount);
  const remainingCount = Math.max(0, filteredStyles.length - visibleCount);
  const hasActiveFilters =
    Boolean(query) || stationFilter !== 'all' || repoFilter !== 'all';

  const handleRepoChange = (next: CatalogRepoFilter) => {
    setRepoFilter(next);
    setStationFilter('all');
    setVisibleCount(INITIAL_PAGE_SIZE);
  };

  const handleStationChange = (next: string) => {
    setStationFilter(next);
    setVisibleCount(INITIAL_PAGE_SIZE);
  };

  const handleQueryChange = (next: string) => {
    setQuery(next);
    setVisibleCount(INITIAL_PAGE_SIZE);
  };

  const showMore = () => {
    setVisibleCount((count) => count + PAGE_INCREMENT);
  };

  const showAll = () => {
    setVisibleCount(filteredStyles.length);
  };

  const resetFilters = () => {
    setQuery('');
    setStationFilter('all');
    setRepoFilter('all');
    setVisibleCount(INITIAL_PAGE_SIZE);
  };

  return {
    repoFilter,
    stationFilter,
    query,
    availableStations,
    filteredStyles,
    displayedStyles,
    remainingCount,
    hasActiveFilters,
    pageIncrement: PAGE_INCREMENT,
    handleRepoChange,
    handleStationChange,
    handleQueryChange,
    showMore,
    showAll,
    resetFilters,
  };
}
