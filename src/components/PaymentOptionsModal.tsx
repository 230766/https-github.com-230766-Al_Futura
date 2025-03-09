import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { 
  CreditCard, 
  Wallet, 
  Bitcoin,
  DollarSign,
  Building,
  ChevronRight,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface PaymentOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  processingTime: string;
  fee: string;
  cryptoOptions?: { value: string; label: string }[];
}

interface PaymentOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onSelectPayment: (method: string) => void;
}

const paymentOptions: PaymentOption[] = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: <CreditCard className="w-6 h-6" />,
    description: 'Pay securely with Visa, Mastercard, or American Express',
    processingTime: 'Instant',
    fee: '2.9% + AED 1.50',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: <DollarSign className="w-6 h-6" />,
    description: 'Pay using your PayPal account',
    processingTime: 'Instant',
    fee: '3.9% + AED 1.50',
  },
  {
    id: 'crypto',
    name: 'Cryptocurrency',
    icon: <Wallet className="w-6 h-6" />,
    description: 'Pay with your preferred cryptocurrency',
    processingTime: 'Varies by currency',
    fee: 'Network fee only',
    cryptoOptions: [
      { value: 'btc', label: 'Bitcoin (BTC)' },
      { value: 'eth', label: 'Ethereum (ETH)' },
      { value: 'sol', label: 'Solana (SOL)' },
      { value: 'xrp', label: 'Ripple (XRP)' },
      { value: 'xlm', label: 'Stellar (XLM)' },
      { value: 'ada', label: 'Cardano (ADA)' },
    ],
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    icon: <Building className="w-6 h-6" />,
    description: 'Pay directly from your bank account',
    processingTime: '1-3 business days',
    fee: 'No fee',
  },
];

export const PaymentOptionsModal = ({ 
  isOpen, 
  onClose, 
  amount,
  onSelectPayment 
}: PaymentOptionsModalProps) => {
  const [selectedCrypto, setSelectedCrypto] = useState<string>('');

  const handlePaymentSelect = (option: PaymentOption) => {
    if (option.id === 'crypto') {
      if (selectedCrypto) {
        onSelectPayment(`crypto-${selectedCrypto}`);
      }
    } else {
      onSelectPayment(option.id);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Select Payment Method
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="mb-6">
            <div className="text-lg font-semibold">Amount to Pay</div>
            <div className="text-3xl font-bold text-blue-600">
              AED {amount.toLocaleString()}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {paymentOptions.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                className="flex items-start p-4 h-auto hover:border-blue-600 hover:bg-blue-50 transition-colors"
                onClick={() => handlePaymentSelect(option)}
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    {option.icon}
                  </div>
                  <div className="flex-grow text-left">
                    <div className="font-semibold text-lg">{option.name}</div>
                    <div className="text-sm text-gray-600">{option.description}</div>
                    <div className="mt-1 flex items-center gap-4 text-sm">
                      <span className="text-gray-500">
                        Processing: {option.processingTime}
                      </span>
                      <span className="text-gray-500">
                        Fee: {option.fee}
                      </span>
                    </div>
                    {option.cryptoOptions && (
                      <div className="mt-2">
                        <Select
                          value={selectedCrypto}
                          onValueChange={setSelectedCrypto}
                        >
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select cryptocurrency" />
                          </SelectTrigger>
                          <SelectContent>
                            {option.cryptoOptions.map((crypto) => (
                              <SelectItem key={crypto.value} value={crypto.value}>
                                {crypto.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Button>
            ))}
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>
              All payments are processed securely. By proceeding with the payment,
              you agree to our terms and conditions.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 