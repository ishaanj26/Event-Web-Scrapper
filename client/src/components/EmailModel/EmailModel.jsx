import { Mail, Ticket, X, ArrowLeft, Shield } from "lucide-react";
import { useState } from "react";
import { formatEventDate } from "../../utilities/utilities";
import axios from "axios";

// Email Modal Component with OTP
export const EmailModal = ({
  show,
  selectedEvent,
  email,
  setEmail,
  emailOptIn,
  setEmailOptIn,
  emailError,
  setEmailError,
  onSubmit,
  onClose,
  redirectUrl // Add this prop for the redirect URL
}) => {
  const [step, setStep] = useState('email'); // 'email' or 'otp'
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [birthday, setBirthday] = useState('');
  const [birthdayError, setBirthdayError] = useState('');

  if (!show) return null;

  // Generate a random 6-digit OTP (in real app, this would be sent via email)
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Store the generated OTP (in real app, this would be stored on server)

  const handleEmailSubmit = async () => {
    console.log(email)
    if (!email) {
      setEmailError('Email address is required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (!birthday) {
      setBirthdayError('Date of birth is required');
      return;
    }

    // Validate age (must be at least 13 years old)
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      setBirthdayError('You must be at least 18 years old to register');
      return;
    }

    try {
      // Generate and "send" OTP (in real app, make API call to send OTP via email)
      const newOTP = generateOTP();
      setGeneratedOTP(newOTP);
      console.log(newOTP)

      // const response = await axios.post('http://localhost:8080/api/verify-email', {
      const response = await axios.post('https://event-web-scrapper.onrender.com/api/verify-email', {
        email,
        newOTP
      });

      console.log(`OTP sent to ${email}: ${newOTP}`); // For testing purposes

      setStep('otp');
      setEmailError('');

      // Start resend cooldown
      setResendCooldown(30);
      const interval = setInterval(() => {
        setResendCooldown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (error) {
      setEmailError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async () => {
    if (!otp) {
      setOtpError('Please enter the OTP');
      return;
    }

    if (otp.length !== 6) {
      setOtpError('OTP must be 6 digits');
      return;
    }

    setIsLoading(true);

    try {

      // Verify OTP (in real app, verify with server)
      if (otp === generatedOTP) {
        // OTP is correct
        setOtpError('');

        // Call the original onSubmit if provided
        if (onSubmit) {
          await onSubmit();
        }
        setStep('email')
        setBirthday('')
        setBirthdayError('')
        // Redirect to the specified URL
        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          // Default redirect or close modal
          onClose();
        }
      } else {
        setOtpError('Invalid OTP. Please check and try again.');
      }
    } catch (error) {
      setOtpError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);

    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;

    setIsLoading(true);

    try {
      // Generate new OTP
      const newOTP = generateOTP();
      setGeneratedOTP(newOTP);

      // const response = await axios.post('http://localhost:8080/api/verify-email', {
      const response = await axios.post('https://event-web-scrapper.onrender.com/api/verify-email', {
        email,
        newOTP
      });

      console.log(`New OTP sent to ${email}: ${newOTP}`); // For testing purposes

      setOtp('');
      setOtpError('');

      // Start resend cooldown
      setResendCooldown(30);
      const interval = setInterval(() => {
        setResendCooldown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (error) {
      setOtpError('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setStep('email');
    setOtp('');
    setOtpError('');
  };

  const handleClose = () => {
    setStep('email');
    setOtp('');
    setOtpError('');
    setBirthdayError('');
    setGeneratedOTP('');
    setBirthday('')
    onClose();
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
    setOtpError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 bg-opacity-90 rounded-lg shadow-lg px-6 py-4 mb-8 max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            {step === 'otp' && (
              <button
                onClick={handleBack}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <h3 className="text-xl font-semibold text-white">
              {step === 'email' ? 'Get Tickets' : 'Verify Email'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <h4 className="font-medium text-white mb-1">{selectedEvent?.name}</h4>
            <p className="text-sm text-gray-400">{selectedEvent?.venue}</p>
          </div>

          {step === 'email' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }}
                    placeholder="Enter your email address"
                    className="text-white w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-700 bg-gray-800"
                  />
                </div>
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>

              <div>
                <label htmlFor="birthday" className="block text-sm font-medium text-gray-400 mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  id="birthday"
                  value={birthday}
                  onChange={(e) => {
                    setBirthday(e.target.value);
                    setBirthdayError('');
                  }}
                  className="text-white w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-700 bg-gray-800"
                />
                {birthdayError && (
                  <p className="text-red-500 text-sm mt-1">{birthdayError}</p>
                )}
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="emailOptIn"
                  checked={emailOptIn}
                  onChange={(e) => setEmailOptIn(e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="emailOptIn" className="text-sm text-gray-400 cursor-pointer">
                  I would like to receive updates about upcoming events and special offers in this city.
                </label>
              </div>
            </div>
          )}

          {step === 'otp' && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <Shield className="h-12 w-12 text-purple-500 mx-auto mb-2" />
                <p className="text-sm text-gray-400">
                  We've sent a 6-digit verification code to
                </p>
                <p className="text-white font-medium">{email}</p>
              </div>

              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-400 mb-1">
                  Verification Code *
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="Enter 6-digit code"
                  className="text-white w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-700 bg-gray-800 text-center text-lg tracking-widest"
                  maxLength={6}
                />
                {otpError && (
                  <p className="text-red-500 text-sm mt-1">{otpError}</p>
                )}
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">
                  Didn't receive the code?
                </p>
                <button
                  onClick={handleResendOTP}
                  disabled={resendCooldown > 0 || isLoading}
                  className={`text-sm ${resendCooldown > 0 || isLoading
                    ? 'text-gray-500 cursor-not-allowed'
                    : 'text-purple-400 hover:text-purple-300 cursor-pointer'
                    }`}
                >
                  {resendCooldown > 0
                    ? `Resend in ${resendCooldown}s`
                    : 'Resend Code'
                  }
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              onClick={step === 'email' ? handleClose : handleBack}
              className="flex-1 px-4 py-2 border border-gray-300 text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            >
              {step === 'email' ? 'Cancel' : 'Back'}
            </button>
            <button
              onClick={step === 'email' ? handleEmailSubmit : handleOTPSubmit}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  {step === 'email' ? (
                    <>
                      <Mail className="h-4 w-4" />
                      Send Verification Code
                    </>
                  ) : (
                    <>
                      <Ticket className="h-4 w-4" />
                      Continue to Tickets
                    </>
                  )}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};