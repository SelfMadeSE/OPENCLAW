class ConsentStore {
  private optedOut = new Set<string>();

  normalize(phone: string): string {
    return phone.replace(/\s+/g, '').trim();
  }

  optOut(phone: string): void {
    this.optedOut.add(this.normalize(phone));
  }

  optIn(phone: string): void {
    this.optedOut.delete(this.normalize(phone));
  }

  isOptedOut(phone: string): boolean {
    return this.optedOut.has(this.normalize(phone));
  }
}

export const consentStore = new ConsentStore();
