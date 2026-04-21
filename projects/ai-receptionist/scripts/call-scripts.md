# Dental AI Receptionist — Call Scripts

> **Tone note:** Dental patients are often nervous. Every line should feel like a calm, friendly person — never robotic, never rushed. Short sentences. Warm phrasing. Efficient but never cold.

---

## 1. Business Hours Greeting

**Trigger:** Mon–Fri, 8:00 AM – 6:00 PM

> Thank you for calling {businessName}. This is your virtual receptionist — I'm here to help.
>
> Please choose one of the following:
>
> - **Press 1** to schedule an appointment  
> - **Press 2** for our hours and location  
> - **Press 3** to leave a message

---

## 2. Appointment Booking Flow

### Step 1 — New or Returning

> Great, I'd love to help you book an appointment. Are you a new patient or have you visited us before?
>
> - **Press 1** for new patient  
> - **Press 2** for returning patient

### Step 2 — Preferred Day

> What day works best for you? You can say something like "next Tuesday" or "this Friday," or press:
>
> - **Press 1** for Monday  
> - **Press 2** for Tuesday  
> - **Press 3** for Wednesday  
> - **Press 4** for Thursday  
> - **Press 5** for Friday

### Step 3 — Preferred Time

> Morning or afternoon work better for you?
>
> - **Press 1** for morning (8 AM – 12 PM)  
> - **Press 2** for afternoon (12 PM – 6 PM)

### Step 4 — Reason for Visit

> And what's the reason for your visit?
>
> - **Press 1** for routine cleaning  
> - **Press 2** for a dental emergency  
> - **Press 3** for a consultation  
> - **Press 4** for something else

### Step 5 — Confirmation

> Perfect! I've got you scheduled for **{day}** in the **{time}** for a **{reason}**. You'll receive a text confirmation shortly so you have all the details.
>
> Is there anything else I can help you with today?

*(If no)*

> Wonderful — we look forward to seeing you! Have a great day.

---

## 3. Hours & Location

> We're open **Monday through Friday, 8 AM to 6 PM**. You'll find us at **{address}**.
>
> Would you like to schedule an appointment?
>
> - **Press 1** to book now  
> - **Press 2** to go back to the main menu

---

## 4. After-Hours Greeting

**Trigger:** Outside Mon–Fri 8 AM – 6 PM

> Thank you for calling {businessName}. We're closed right now, but I can still help.
>
> Our regular hours are **Monday through Friday, 8 AM to 6 PM**.
>
> If this is a dental emergency, **press 1**.  
> Otherwise, **press 2** to leave a message and we'll call you back first thing tomorrow.

---

## 5. Emergency Route

**Trigger:** After-hours → Press 1

> I understand — dental emergencies can be really stressful. Here's what to do:
>
> Call our emergency line at **{emergencyNumber}**, or visit your nearest emergency room if you need immediate care.
>
> Would you like me to text you our emergency contact info so you have it handy?
>
> - **Press 1** to receive a text  
> - **Press 2** if you don't need one

*(If press 1)*

> Sent! You should have it now. Please don't hesitate to call the emergency line — they're there for you. Take care.

---

## 6. Voicemail Flow

**Trigger:** Press 3 (business hours) or Press 2 (after-hours)

> Please leave your name, phone number, and a brief message after the tone. We'll return your call on the next business day.
>
> *[BEEP]*

---

## 7. SMS Templates

### Booking Confirmation → Caller

> Hi! Your appointment at {businessName} is confirmed for **{day}** at **{time}** ({reason}). We look forward to seeing you! Reply HELP for assistance.

### Lead Summary → Practice Owner

> 📲 New appointment at {businessName}: **{name}** on {day} at {time} for {reason}. Caller: {phone}. Demo session: {sessionId}

### Emergency Info → Caller (optional)

> {businessName} Emergency Line: {emergencyNumber}. If you're in urgent pain, don't wait — call now or visit your nearest ER.
