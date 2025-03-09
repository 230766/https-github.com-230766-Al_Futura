import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';

const BankTransfer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, investmentId } = location.state || {};
  
  const [accountName, setAccountName] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [iban, setIban] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would process the bank transfer details
    alert('Bank transfer details submitted successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>

        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-6">Bank Transfer</h1>
            
            <div className="mb-6">
              <div className="text-lg font-semibold">Amount to Pay</div>
              <div className="text-3xl font-bold text-blue-600">
                AED {amount?.toLocaleString()}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="accountName">Account Holder Name</Label>
                <Input
                  id="accountName"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="Enter your bank name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Enter your account number"
                  required
                />
              </div>

              <div>
                <Label htmlFor="swiftCode">SWIFT/BIC Code</Label>
                <Input
                  id="swiftCode"
                  value={swiftCode}
                  onChange={(e) => setSwiftCode(e.target.value)}
                  placeholder="Enter SWIFT/BIC code"
                  required
                />
              </div>

              <div>
                <Label htmlFor="iban">IBAN</Label>
                <Input
                  id="iban"
                  value={iban}
                  onChange={(e) => setIban(e.target.value)}
                  placeholder="Enter IBAN"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Submit Bank Details
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankTransfer; 