import { DemoSession } from './types';

export class DemoSessionStore {
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
      bookingState: {},
    };
    this.sessions.set(sessionId, session);
    return session;
  }

  getSession(sessionId: string): DemoSession | undefined {
    return this.sessions.get(sessionId);
  }

  activeCount(): number {
    return this.sessions.size;
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}

export const demoSessionStore = new DemoSessionStore();
