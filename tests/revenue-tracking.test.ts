import { describe, it, expect, beforeEach } from 'vitest';

// Mock the Clarity contract interactions
const mockRevenueEntries = new Map();
const mockFilmRevenue = new Map();
let mockEntryCount = 0;
const mockOwner = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
let currentSender = mockOwner;
let mockBlockHeight = 100;

// Channel constants
const CHANNEL_THEATRICAL = 1;
const CHANNEL_STREAMING = 2;
const CHANNEL_VOD = 3;
const CHANNEL_DVD = 4;
const CHANNEL_TV = 5;
const CHANNEL_OTHER = 6;

// Mock contract functions
const revenueTrackingContract = {
  recordRevenue: (filmId, territoryId, channelType, amount, description) => {
    if (currentSender !== mockOwner) {
      return { err: 403 };
    }
    
    if (![CHANNEL_THEATRICAL, CHANNEL_STREAMING, CHANNEL_VOD, CHANNEL_DVD, CHANNEL_TV, CHANNEL_OTHER].includes(channelType)) {
      return { err: 400 };
    }
    
    const entryId = mockEntryCount + 1;
    mockRevenueEntries.set(entryId, {
      filmId,
      territoryId,
      channelType,
      amount,
      timestamp: mockBlockHeight,
      description
    });
    
    // Update film total revenue
    const currentTotal = mockFilmRevenue.get(filmId)?.totalRevenue || 0;
    mockFilmRevenue.set(filmId, { totalRevenue: currentTotal + amount });
    
    mockEntryCount = entryId;
    return { ok: entryId };
  },
  
  getRevenueEntry: (entryId) => {
    return mockRevenueEntries.get(entryId) || null;
  },
  
  getFilmTotalRevenue: (filmId) => {
    return mockFilmRevenue.get(filmId)?.totalRevenue || 0;
  }
};

describe('Revenue Tracking Contract', () => {
  beforeEach(() => {
    mockRevenueEntries.clear();
    mockFilmRevenue.clear();
    mockEntryCount = 0;
    currentSender = mockOwner;
    mockBlockHeight = 100;
  });
  
  it('should record revenue entry', () => {
    const result = revenueTrackingContract.recordRevenue(
        1, // filmId
        2, // territoryId
        CHANNEL_THEATRICAL, // channelType
        1000, // amount
        'Opening weekend box office'
    );
    
    expect(result).toEqual({ ok: 1 });
    expect(mockRevenueEntries.size).toBe(1);
    expect(mockRevenueEntries.get(1).amount).toBe(1000);
    expect(mockFilmRevenue.get(1).totalRevenue).toBe(1000);
  });
  
  it('should accumulate revenue for a film', () => {
    revenueTrackingContract.recordRevenue(
        1, // filmId
        2, // territoryId
        CHANNEL_THEATRICAL, // channelType
        1000, // amount
        'Opening weekend box office'
    );
    
    revenueTrackingContract.recordRevenue(
        1, // filmId
        3, // territoryId
        CHANNEL_STREAMING, // channelType
        500, // amount
        'Streaming revenue'
    );
    
    expect(mockRevenueEntries.size).toBe(2);
    expect(mockFilmRevenue.get(1).totalRevenue).toBe(1500);
  });
  
  it('should not allow invalid channel types', () => {
    const result = revenueTrackingContract.recordRevenue(
        1, // filmId
        2, // territoryId
        999, // invalid channelType
        1000, // amount
        'Invalid channel'
    );
    
    expect(result).toEqual({ err: 400 });
    expect(mockRevenueEntries.size).toBe(0);
  });
  
  it('should retrieve revenue entry details', () => {
    revenueTrackingContract.recordRevenue(
        1, // filmId
        2, // territoryId
        CHANNEL_THEATRICAL, // channelType
        1000, // amount
        'Opening weekend box office'
    );
    
    const entry = revenueTrackingContract.getRevenueEntry(1);
    
    expect(entry).not.toBeNull();
    expect(entry.filmId).toBe(1);
    expect(entry.amount).toBe(1000);
    expect(entry.description).toBe('Opening weekend box office');
  });
  
  it('should get total revenue for a film', () => {
    revenueTrackingContract.recordRevenue(
        1, // filmId
        2, // territoryId
        CHANNEL_THEATRICAL, // channelType
        1000, // amount
        'Opening weekend box office'
    );
    
    revenueTrackingContract.recordRevenue(
        1, // filmId
        3, // territoryId
        CHANNEL_STREAMING, // channelType
        500, // amount
        'Streaming revenue'
    );
    
    expect(revenueTrackingContract.getFilmTotalRevenue(1)).toBe(1500);
    expect(revenueTrackingContract.getFilmTotalRevenue(2)).toBe(0); // Non-existent film
  });
});
