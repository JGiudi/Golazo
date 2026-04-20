export type UserRole = 'player' | 'owner' | 'admin';

export type BookingType = 'field' | 'match_slot';

export interface BookingDraft {
  type: BookingType;
  startsAt: string;
  endsAt: string;
  notes?: string;
}
