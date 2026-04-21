import { randomUUID } from 'crypto';
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
      session.calls.push({
        id: callId,
        timestamp: new Date(),
        from,
        status: 'incoming'
      });
    }
  }

  // ─── Booking state management ────────────────────────────────────

  /** Set a single field on the in-progress booking state. */
  setBookingField(sessionId: string, field: string, value: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.bookingState[field] = value;
    }
  }

  /** Get the current in-progress booking state. */
  getBookingState(sessionId: string): Record<string, string> {
    const session = this.sessions.get(sessionId);
    return session?.bookingState ?? {};
  }

  /** Clear booking state (e.g. after appointment is finalized). */
  clearBookingState(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.bookingState = {};
    }
  }

  // ─── Appointments ────────────────────────────────────────────────

  addAppointment(
    sessionId: string,
    callerNumber: string,
    day?: string,
    time?: string,
    reason?: string
  ): string {
    const session = this.sessions.get(sessionId);
    if (session) {
      const appointmentId = this.generateSessionId();
      session.appointments.push({
        id: appointmentId,
        day,
        time,
        reason,
        callerNumber,
        createdAt: new Date(),
        confirmed: false
      });
      return appointmentId;
    }
    throw new Error('Session not found');
  }

  confirmAppointment(sessionId: string, appointmentId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      const appointment = session.appointments.find(apt => apt.id === appointmentId);
      if (appointment) {
        appointment.confirmed = true;
      }
    }
  }

  private generateSessionId(): string {
    return randomUUID();
  }
}

export const sessionStore = new SessionStore();
