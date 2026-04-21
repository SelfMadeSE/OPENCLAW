export interface DemoSession {
  id: string;
  businessName: string;
  phoneNumber: string;
  createdAt: Date;
  calls: CallRecord[];
  appointments: Appointment[];
  /** In-progress booking state persisted across Gather steps. */
  bookingState: Record<string, string>;
}

export interface CallRecord {
  id: string;
  timestamp: Date;
  from: string;
  status: 'incoming' | 'completed' | 'missed';
  recordingUrl?: string;
  voicemailUrl?: string;
}

export interface Appointment {
  id: string;
  day?: string;
  time?: string;
  reason?: string;
  callerNumber: string;
  createdAt: Date;
  confirmed: boolean;
}
