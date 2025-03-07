import React from 'react';
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
} from 'lucide-react';

interface PaymentOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  processingTime: string;
  fee: string;
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
    id: 'crypto-eth',
    name: 'Ethereum (ETH)',
    icon: <Wallet className="w-6 h-6" />,
    description: 'Pay with ETH from your crypto wallet',
    processingTime: '~5 minutes',
    fee: 'Network fee only',
  },
  {
    id: 'crypto-btc',
    name: 'Bitcoin (BTC)',
    icon: <Bitcoin className="w-6 h-6" />,
    description: 'Pay with BTC from your crypto wallet',
    processingTime: '~30 minutes',
    fee: 'Network fee only',
  },
];

export const PaymentOptionsModal = ({ 
  isOpen, 
  onClose, 
  amount,
  onSelectPayment 
}: PaymentOptionsModalProps) => {
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
                onClick={() => onSelectPayment(option.id)}
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
                  </div>
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