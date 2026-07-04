# Doctor Booking System API Documentation

Base URL: `http://localhost:5000/api` (or your production URL)

## Table of Contents
1. [Authentication](#1-authentication)
2. [Doctor](#2-doctor)
3. [Patient](#3-patient)
4. [Appointment](#4-appointment)
5. [Payment](#5-payment)
6. [Admin](#6-admin)

---

## 1. Authentication

### 1.1 Register User
- **Endpoint**: `/auth/register`
- **Method**: `POST`
- **Access**: Public
- **Description**: Registers a new user (defaults to patient role).

**Request Body**:
```json
{
  "name": "John Doe",
  "mobile": "9876543210",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "patient"
}
```

**Success Response (201 Created)**:
```json
{
  "success": true,
  "user": {
    "_id": "60d...",
    "name": "John Doe",
    "mobile": "9876543210",
    "email": "john@example.com",
    "role": "patient",
    "createdAt": "2023-10-01T10:00:00.000Z"
  }
}
```

### 1.2 Login User
- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Access**: Public
- **Description**: Authenticate a user and get token.

**Request Body**:
```json
{
  "mobile": "9876543210",
  "password": "securepassword123"
}
```

**Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5c...",
  "user": {
    "_id": "60d...",
    "name": "John Doe",
    "mobile": "9876543210",
    "email": "john@example.com",
    "role": "patient"
  }
}
```

### 1.3 Get Profile
- **Endpoint**: `/auth/profile`
- **Method**: `GET`
- **Access**: Private (Requires Token)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Retrieve the logged-in user's profile.

**Success Response (200 OK)**:
```json
{
  "success": true,
  "user": {
    "_id": "60d...",
    "name": "John Doe",
    "email": "john@example.com",
    "mobile": "9876543210",
    "role": "patient"
  }
}
```

### 1.4 Forgot Password
- **Endpoint**: `/auth/forgot-password`
- **Method**: `POST`
- **Access**: Public
- **Description**: Send a password reset OTP to user's email.

**Request Body**:
```json
{
  "email": "john@example.com"
}
```

**Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "OTP sent to your email."
}
```

### 1.5 Verify Reset OTP
- **Endpoint**: `/auth/verify-reset-otp`
- **Method**: `POST`
- **Access**: Public
- **Description**: Verify the OTP sent to email.

**Request Body**:
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "OTP verified successfully."
}
```

### 1.6 Reset Password
- **Endpoint**: `/auth/reset-password`
- **Method**: `POST`
- **Access**: Public
- **Description**: Set new password after verifying OTP.

**Request Body**:
```json
{
  "email": "john@example.com",
  "newPassword": "newsecurepassword123"
}
```

**Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Password reset successfully."
}
```

---

## 2. Doctor

### 2.1 Get All Doctors
- **Endpoint**: `/doctors`
- **Method**: `GET`
- **Access**: Public
- **Query Params**: `page` (number), `limit` (number), `specialization` (string)
- **Description**: Get a paginated list of doctors.

**Success Response (200 OK)**:
```json
{
  "success": true,
  "count": 10,
  "doctors": [
    {
      "_id": "60d...",
      "name": "Dr. Smith",
      "specialization": "Cardiologist",
      "clinicName": "Heart Care Clinic",
      "consultationFee": 500
    }
  ]
}
```

### 2.2 Search Doctors
- **Endpoint**: `/doctors/search`
- **Method**: `GET`
- **Access**: Public
- **Query Params**: `keyword` (string)
- **Description**: Search doctors by name, specialization, or clinic name.

**Success Response (200 OK)**:
```json
{
  "success": true,
  "count": 5,
  "doctors": [ ... ]
}
```

### 2.3 Get Doctor By ID
- **Endpoint**: `/doctors/:id`
- **Method**: `GET`
- **Access**: Public
- **Description**: Get details of a single doctor with an active/trial subscription.

**Success Response (200 OK)**:
```json
{
  "success": true,
  "doctor": {
      "_id": "60d...",
      "name": "Dr. Smith",
      "specialization": "Cardiologist",
      "clinicName": "Heart Care Clinic",
      "consultationFee": 500,
      "premiumBookingEnabled": true,
      "homeVisitAvailable": false
  }
}
```

### 2.4 Get Premium Slots
- **Endpoint**: `/doctors/:id/premium-slots`
- **Method**: `GET`
- **Access**: Public
- **Query Params**: `date` (YYYY-MM-DD)
- **Description**: Get available premium slots for a specific date.

**Success Response (200 OK)**:
```json
{
  "success": true,
  "date": "2023-11-01",
  "totalSlots": 10,
  "bookedSlots": ["10:00", "11:30"],
  "availableSlots": ["09:00", "09:30", "10:30"]
}
```

### 2.5 Get Home Visit Slots
- **Endpoint**: `/doctors/:id/home-slots`
- **Method**: `GET`
- **Access**: Public
- **Query Params**: `date` (YYYY-MM-DD)
- **Description**: Get available home visit slots for a specific date.

**Success Response (200 OK)**:
```json
{
  "success": true,
  "date": "2023-11-01",
  "totalSlots": 5,
  "bookedSlots": ["14:00"],
  "availableSlots": ["15:00", "16:00"]
}
```

### 2.6 Doctor Dashboard
- **Endpoint**: `/doctors/dashboard`
- **Method**: `GET`
- **Access**: Private (Doctor Only)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Retrieves statistics and today's appointments for the logged-in doctor.

**Success Response (200 OK)**:
```json
{
  "success": true,
  "doctor": { ... },
  "statistics": {
    "total": 15,
    "confirmed": 10,
    "checked": 2,
    "completed": 0,
    "pendingPayment": 3,
    "cancelled": 0,
    "missed": 0,
    "totalRevenue": 5000,
    "premiumCount": 5,
    "normalCount": 8,
    "homeCount": 2
  },
  "normalAppointments": [ ... ],
  "premiumAppointments": [ ... ],
  "homeAppointments": [ ... ]
}
```

### 2.7 Get My Appointments (Doctor)
- **Endpoint**: `/doctors/my-appointments`
- **Method**: `GET`
- **Access**: Private (Doctor Only)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Retrieves all appointments assigned to the logged-in doctor.

**Success Response (200 OK)**:
```json
{
  "success": true,
  "count": 50,
  "appointments": [ ... ]
}
```

### 2.8 Update Premium Schedule
- **Endpoint**: `/doctors/:id/premium-schedule`
- **Method**: `PUT`
- **Access**: Private (Doctor Only)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Update the start/end times and slot duration for premium consultation.

**Request Body**:
```json
{
  "premiumStartTime": "09:00",
  "premiumEndTime": "17:00",
  "slotDuration": 30
}
```

**Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Premium schedule updated",
  "doctor": { ... }
}
```

---

## 3. Patient

### 3.1 Patient Dashboard
- **Endpoint**: `/patients/dashboard`
- **Method**: `GET`
- **Access**: Private (Patient Only)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Retrieves patient statistics and categorize their appointments (upcoming, completed, cancelled).

**Success Response (200 OK)**:
```json
{
  "success": true,
  "statistics": {
    "total": 10,
    "upcoming": 2,
    "completed": 7,
    "cancelled": 1
  },
  "upcoming": [ ... ],
  "completed": [ ... ],
  "cancelled": [ ... ]
}
```

### 3.2 Get My Appointments (Patient)
- **Endpoint**: `/patients/appointments`
- **Method**: `GET`
- **Access**: Private (Patient Only)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Retrieves all appointments for the logged-in patient, sorted by most recent.

**Success Response (200 OK)**:
```json
{
  "success": true,
  "count": 10,
  "appointments": [ ... ]
}
```

### 3.3 Cancel Appointment
- **Endpoint**: `/patients/appointment/:id/cancel`
- **Method**: `PUT`
- **Access**: Private (Patient Only)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Cancels an appointment. Validates chronological checks and prevents cancelling past appointments. (Alias route for patient specific cancellation).

**Request Body**: (Optional)
```json
{
  "reason": "Not feeling well anymore."
}
```

**Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Appointment cancelled successfully",
  "appointment": { ... }
}
```

---

## 4. Appointment

### 4.1 Book Normal Appointment
- **Endpoint**: `/appointments/normal`
- **Method**: `POST`
- **Access**: Private (Patient Only)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Book a token-based normal consultation for today.

**Request Body**:
```json
{
  "doctorId": "60d..."
}
```

**Success Response (201 Created)**:
```json
{
  "success": true,
  "tokenNumber": 12,
  "appointment": {
    "_id": "60d...",
    "patientId": "60d...",
    "doctorId": "60d...",
    "appointmentType": "normal",
    "amountPaid": 500,
    "tokenNumber": 12,
    "appointmentDate": "2023-10-01T00:00:00.000Z"
  }
}
```

### 4.2 Book Premium Appointment
- **Endpoint**: `/appointments/premium`
- **Method**: `POST`
- **Access**: Private (Patient Only)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Book a premium specific time-slot appointment. Checks for daily limits and slot conflicts atomically. Returns a booking reference.

**Request Body**:
```json
{
  "doctorId": "60d...",
  "slotDate": "2023-11-01",
  "slotTime": "10:30"
}
```

**Success Response (201 Created)**:
```json
{
  "success": true,
  "message": "Premium appointment booked successfully",
  "bookingReference": "BK1634567890123",
  "appointment": {
    "_id": "60d...",
    "paymentStatus": "pending",
    "status": "pending_payment"
  }
}
```

### 4.3 Book Home Visit Appointment
- **Endpoint**: `/appointments/home`
- **Method**: `POST`
- **Access**: Private (Patient Only)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Request a home visit.

**Request Body**:
```json
{
  "doctorId": "60d...",
  "visitDate": "2023-11-01",
  "slotTime": "15:00",
  "homeVisitAddress": "123 Main St",
  "homeVisitLandmark": "Near Park",
  "homeVisitCity": "Mumbai",
  "homeVisitPincode": "400001"
}
```

**Success Response (201 Created)**:
```json
{
  "success": true,
  "message": "Home visit appointment created",
  "bookingReference": "BK1634567890123",
  "appointment": { ... }
}
```

### 4.4 Get Appointment Ticket
- **Endpoint**: `/appointments/ticket/:id`
- **Method**: `GET`
- **Access**: Private (Logged-in user)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Gets the details needed for the appointment ticket/receipt.

**Success Response (200 OK)**:
```json
{
  "success": true,
  "appointment": {
    "patientId": { "name": "John", "mobile": "987...", "email": "j@ex.com" },
    "doctorId": { "name": "Dr. Smith", "clinicName": "Care" }
  }
}
```

### 4.5 Mark Appointment Checked (Doctor Action)
- **Endpoint**: `/appointments/:id/check`
- **Method**: `PUT`
- **Access**: Private (Doctor Only)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Update status of an appointment to "checked" (patient arrived/consulting).

**Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Appointment checked",
  "appointment": { ... }
}
```

### 4.6 Cancel Appointment (Global route)
- **Endpoint**: `/appointments/:id/cancel`
- **Method**: `PUT`
- **Access**: Private (Patient Only)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Patient cancels their appointment. Handles refunds automatically if payment was already processed.

**Request Body**:
```json
{
  "reason": "Family emergency"
}
```

**Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Appointment cancelled successfully",
  "appointment": { ... }
}
```

---

## 5. Payment

### 5.1 Create Payment Order
- **Endpoint**: `/payment/create-order`
- **Method**: `POST`
- **Access**: Private (Patient Only)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Create a Razorpay order for an appointment.

**Request Body**:
```json
{
  "appointmentId": "60d..."
}
```

**Success Response (200 OK)**:
```json
{
  "success": true,
  "order": {
    "id": "order_H...",
    "amount": 50000,
    "currency": "INR",
    "receipt": "BK1634567890123"
  },
  "appointment": { ... }
}
```

### 5.2 Verify Payment
- **Endpoint**: `/payment/verify`
- **Method**: `POST`
- **Access**: Private (Patient Only)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Verifies the Razorpay payment signature and updates appointment status to paid/confirmed. Sends confirmation email.

**Request Body**:
```json
{
  "razorpay_order_id": "order_H...",
  "razorpay_payment_id": "pay_H...",
  "razorpay_signature": "signature_hash"
}
```

**Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "appointment": {
    "paymentStatus": "paid",
    "status": "confirmed"
  }
}
```

### 5.3 Create Subscription Order (Doctor)
- **Endpoint**: `/payment/subscription/create-order`
- **Method**: `POST`
- **Access**: Private (Doctor Only)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Create Razorpay order for doctor subscription renewal/purchase.

**Request Body**:
```json
{
  "plan": "monthly" // or "quarterly", "yearly"
}
```

**Success Response (200 OK)**:
```json
{
  "success": true,
  "order": { ... },
  "subscription": { ... }
}
```

### 5.4 Verify Subscription Payment (Doctor)
- **Endpoint**: `/payment/subscription/verify`
- **Method**: `POST`
- **Access**: Private (Doctor Only)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Verify the Razorpay payment signature for doctor subscription. Updates doctor's `subscriptionStatus` to "active".

**Request Body**:
```json
{
  "razorpay_order_id": "order_H...",
  "razorpay_payment_id": "pay_H...",
  "razorpay_signature": "signature_hash"
}
```

**Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Subscription activated successfully",
  "doctor": { ... }
}
```

---

## 6. Admin

### 6.1 Admin Dashboard
- **Endpoint**: `/admin/dashboard`
- **Method**: `GET`
- **Access**: Private (Admin Only)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Get overall system statistics for the admin dashboard.

**Success Response (200 OK)**:
```json
{
  "success": true,
  "statistics": {
    "totalDoctors": 20,
    "activeDoctors": 15,
    "pendingDoctors": 5,
    "totalPatients": 100,
    "totalAppointments": 200,
    "totalRevenue": 150000
  }
}
```

### 6.2 Create Doctor (By Admin)
- **Endpoint**: `/admin/create-doctor`
- **Method**: `POST`
- **Access**: Private (Admin Only)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Admin creates a new doctor profile and user account simultaneously. Grants a 7-day trial subscription automatically.

**Request Body**:
```json
{
  "name": "Dr. House",
  "mobile": "1234567890",
  "email": "house@hospital.com",
  "password": "securepassword",
  "specialization": "Diagnostician",
  "qualification": "MD",
  "experience": 15,
  "clinicName": "Princeton-Plainsboro",
  "clinicAddress": "New Jersey",
  "consultationFee": 1000,
  "premiumFee": 1500,
  "homeVisitFee": 2000
}
```

**Success Response (201 Created)**:
```json
{
  "success": true,
  "message": "Doctor created successfully. 7-day trial activated.",
  "doctor": { ... }
}
```

### 6.3 Get Pending Doctors
- **Endpoint**: `/admin/pending-doctors`
- **Method**: `GET`
- **Access**: Private (Admin Only)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Gets all doctors whose `subscriptionStatus` is "inactive".

**Success Response (200 OK)**:
```json
{
  "success": true,
  "count": 5,
  "doctors": [ ... ]
}
```

### 6.4 Approve / Suspend Doctor
- **Endpoint**: `/admin/approve/:id` (Approve) / `/admin/suspend/:id` (Suspend / Activate)
- **Method**: `PUT`
- **Access**: Private (Admin Only)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Approve an inactive doctor or toggle a doctor's suspended state.

**Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Doctor approved successfully" // or "suspended/activated successfully"
}
```

### 6.5 Activate Subscription Manually
- **Endpoint**: `/admin/activate-subscription`
- **Method**: `POST`
- **Access**: Private (Admin Only)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Admin manually activates a doctor's subscription.

**Request Body**:
```json
{
  "doctorId": "60d...",
  "plan": "monthly" // trial, monthly, quarterly, yearly
}
```

**Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Subscription activated successfully",
  "doctor": { ... }
}
```

### 6.6 Patients & Doctors Lists / Searches
- **Endpoints**: `/admin/patients`, `/admin/patients/search?keyword=`, `/admin/doctors`, `/admin/doctors/search?keyword=`
- **Method**: `GET`
- **Access**: Private (Admin Only)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Retrieve lists or search through all users and doctors in the system.

### 6.7 Get Revenue Report
- **Endpoint**: `/admin/revenue-report`
- **Method**: `GET`
- **Access**: Private (Admin Only)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Detailed revenue insights and payments status.

**Success Response (200 OK)**:
```json
{
  "success": true,
  "revenue": 150000,
  "paidAppointments": 300,
  "pendingPayments": 10,
  "refundPending": 2
}
```

### 6.8 Approve Refund
- **Endpoint**: `/admin/refund/:id`
- **Method**: `PUT`
- **Access**: Private (Admin Only)
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Approve a pending refund for a cancelled appointment.

**Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Refund approved successfully"
}
```

---
*Generated securely via Markdown.*
