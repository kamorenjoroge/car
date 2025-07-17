// app/booking/page.tsx
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCalendarAlt, FaIdCard, FaCar, FaUser } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

export default function BookingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    pickupDate: '',
    returnDate: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idNumber: '',
    drivingLicense: '',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateDays = () => {
    if (formData.pickupDate && formData.returnDate) {
      const start = new Date(formData.pickupDate);
      const end = new Date(formData.returnDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (!formData.pickupDate || !formData.returnDate) {
        throw new Error('Please select pickup and return dates');
      }
      if (new Date(formData.returnDate) <= new Date(formData.pickupDate)) {
        throw new Error('Return date must be after pickup date');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Booking request submitted successfully!');
      router.push('/booking-confirmation');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to submit booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-earth mb-2">Complete Your Booking</h1>
        <p className="text-earth/80 mb-8">Fill in your details to reserve your vehicle</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Selection */}
          <div className="bg-secondary/10 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-earth mb-4 flex items-center gap-2">
              <FaCalendarAlt className="text-primary" />
              Rental Period
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pickupDate" className="block text-sm font-medium text-earth mb-1">
                  Pickup Date
                </label>
                <input
                  type="date"
                  id="pickupDate"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 rounded-lg border border-earth/20 focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="returnDate" className="block text-sm font-medium text-earth mb-1">
                  Return Date
                </label>
                <input
                  type="date"
                  id="returnDate"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  min={formData.pickupDate || new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 rounded-lg border border-earth/20 focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>
            {calculateDays() > 0 && (
              <p className="mt-3 text-sm text-earth/60">
                Rental duration: {calculateDays()} day{calculateDays() !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Personal Information */}
          <div className="bg-secondary/10 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-earth mb-4 flex items-center gap-2">
              <FaUser className="text-primary" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-earth mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-earth/20 focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-earth mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-earth/20 focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-earth mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-earth/20 focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-earth mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-earth/20 focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Identification */}
          <div className="bg-secondary/10 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-earth mb-4 flex items-center gap-2">
              <FaIdCard className="text-primary" />
              Identification
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="idNumber" className="block text-sm font-medium text-earth mb-1">
                  National ID/Passport Number
                </label>
                <input
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-earth/20 focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="drivingLicense" className="block text-sm font-medium text-earth mb-1">
                  Driving License Number
                </label>
                <input
                  type="text"
                  id="drivingLicense"
                  name="drivingLicense"
                  value={formData.drivingLicense}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-earth/20 focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div className="bg-secondary/10 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-earth mb-4 flex items-center gap-2">
              <FaCar className="text-primary" />
              Additional Requests
            </h2>
            <div>
              <label htmlFor="specialRequests" className="block text-sm font-medium text-earth mb-1">
                Special Requests (Optional)
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-earth/20 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="space-y-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeTerms"
                required
                className="mt-1 mr-2"
              />
              <label htmlFor="agreeTerms" className="text-sm text-earth/80">
                I agree to the Terms and Conditions and confirm that all information provided is accurate.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}