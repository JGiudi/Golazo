
export enum ViewState {
  MATCHES = 'MATCHES',
  FIELDS = 'FIELDS',
  RANKINGS = 'RANKINGS',
  CHAT = 'CHAT',
  PROFILE = 'PROFILE',
  NOTIFICATIONS = 'NOTIFICATIONS'
}

export interface Player {
  id: string;
  name: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  rating: number; // 0-5
  matchesPlayed: number;
  avatarUrl: string;
}

export type MatchLevel = 'Amistoso' | 'Intermedio' | 'Competitivo';
export type MatchFormat = '5v5' | '7v7' | '9v9' | '11v11';

export interface Match {
  id: string;
  title: string;
  description: string;
  location: string;
  date: Date;
  format: MatchFormat; // Fixed format
  maxPlayers: number;
  currentPlayers: number;
  pricePerPerson: number;
  level: MatchLevel;
  organizer: string;
  // New details for the tactical sheet
  surface: 'Sintético' | 'Césped Natural' | 'Parquet' | 'Cemento';
  paymentMethods: ('Efectivo' | 'Transferencia')[];
  registeredPlayers: { name: string; avatar: string; position: string; team?: 'A' | 'B' }[];
  // New logic fields
  isPrivate: boolean;
  isBookedField: boolean; // True if created via Fields booking
}

export interface Field {
  id: string;
  name: string;
  location: string;
  type: '5v5' | '7v7' | '11v11';
  pricePerHour: number;
  rating: number;
  imageUrl: string;
  amenities: string[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: Date;
  isMe: boolean;
}

export interface ChatConversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatarUrl: string;
  isGroup: boolean;
}

export interface RankingTeam {
  id: number;
  name: string;
  points: number;
  won: number;
  lost: number;
  badgeUrl: string;
}

// --- NEW RANKING SYSTEM TYPES ---

export type PlayerTier = 'Novato' | 'Promesa' | 'Titular' | 'Capitán' | 'Leyenda';
export type RankingScope = 'local' | 'district' | 'provincial' | 'national';

export interface MatchScoreDetail {
  matchId: string;
  date: Date;
  totalPoints: number;
  breakdown: {
    base: number;      // +20
    result: number;    // Win +30, Draw +15, Loss +5
    performance?: number; // MVP +20, Muro +15
    bonus?: number;    // Hat-trick +10, Clean Sheet +10, Organizer +5
  };
  isBest8: boolean; // Calculated on frontend
}

export interface RankingPlayer {
  id: string;
  name: string;
  avatarUrl: string;
  position: string;
  matchHistory: MatchScoreDetail[]; // All matches in season
  totalSeasonPoints: number; // Calculated from Best 8
  tier: PlayerTier;
}

// --- PLAYER PROFILE TYPES (SIMPLIFIED) ---

export interface PlayerAttributes {
  attack: number;    // 0-100
  defense: number;   // 0-100
  technique: number; // 0-100 "Buen pie"
  physical: number;  // 0-100 "Aguante/Velocidad"
}

export interface UserStats {
  matches: number;
  goals: number;
  mvp: number;
  rating: number;
  attributes: PlayerAttributes;
  reputation: number; // 0-100 (New Reputation System)
}

export interface PlayerProfileData {
  name: string;
  avatar: string;
  position: string;
  tier: string; // e.g. 'Titular'
  stats: UserStats;
  form: ('W' | 'L' | 'D')[]; // Recent form: Win/Loss/Draw
  isFriend?: boolean;
  tags: string[]; // Simplified tags: "Puntual", "Correlón", "Rústico"
  reliability: number; // Keeping for backward compatibility, mapped to reputation
}

// --- NOTIFICATIONS & TRANSACTIONS ---

export interface Notification {
  id: string;
  type: 'system' | 'invite' | 'match_alert' | 'reputation';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionLabel?: string;
}

export interface Transaction {
  id: string;
  type: 'payment' | 'deposit' | 'refund';
  amount: number;
  description: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  method: string; // 'Mercado Pago', 'Wallet', etc.
}
