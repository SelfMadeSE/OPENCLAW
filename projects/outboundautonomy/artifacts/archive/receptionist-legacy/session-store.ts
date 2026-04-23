import { DemoSession } from './types';

export class SessionStore {
  private sessions: Map<string, DemoSession> = new Map();

  createSession(businessName: string, phoneNumber: string): DemoSession {
    const sessionId = this.generateSessionId();
    const session: DemoSession = {
      id: sessionId,
      businessName,
      phoneNumber,
      createdAt: new Date(),
      calls: [],
      appointments: [],
      bookingState: {}
    };
    this.sessions.set(sessionId, session);
    return session;
  }

  getSession(sessionId: string): DemoSession | undefined {
    return this.sessions.get(sessionId);
  }

  addCallRecord(sessionId: string, callId: string, from: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.calls.push({ id: callId, timestamp: new Date(), from, status: 'incoming' });
    }
  }

  setBookingField(sessionId: string, field: string, value: string): void {
    const session = this.sessions.get(sessionId);
    if (session) session.bookingState[field] = value;
  }

  getBookingState(sessionId: string): Record<string, string> {
    return this.sessions.get(sessionId)?.bookingState ?? {};
  }

  clearBookingState(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) session.bookingState = {};
  }

  addAppointment(sessionId: string, callerNumber: string, day?: string, time?: string, reason?: string): string {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Session not found');
    const appointmentId = this.generateSessionId();
    session.appointments.push({ id: appointmentId, day, time, reason, callerNumber, createdAt: new Date(), confirmed: false });
    return appointmentId;
  }

  confirmAppointment(sessionId: string, appointmentId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      const apt = session.appointments.find(a => a.id === appointmentId);
      if (apt) apt.confirmed = true;
    }
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}

export const sessionStore = new SessionStore();
