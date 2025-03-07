import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { PaymentOptionsModal } from '../components/PaymentOptionsModal';
import { toast } from 'react-hot-toast';
import type { Property } from '../lib/supabase';

const InvestmentPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [property, setProperty] = React.useState<Property | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [investmentAmount, setInvestmentAmount] = React.useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = React.useState(false);

  React.useEffect(() => {
    // Redirect to sign in if not authenticated
    if (!user) {
      navigate('/signin', { state: { returnTo: `/invest/${id}` } });
      return;
    }

    // Fetch property details
    async function fetchProperty() {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProperty(data);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
  }, [id, user, navigate]);

  const handleMakePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!property || !user) return;

    const amount = parseFloat(investmentAmount);
    if (isNaN(amount) || amount < property.min_investment) {
      toast.error(`Minimum investment amount is AED ${property.min_investment.toLocaleString()}`);
      return;
    }

    // Check if the amount is in increments of 500
    if (amount % 500 !== 0) {
      toast.error('Investment amount must be in increments of 500 AED');
      return;
    }

    setIsPaymentModalOpen(true);
  };

  const handlePaymentMethodSelect = async (method: string) => {
    if (!property || !user) return;
    const amount = parseFloat(investmentAmount);

    try {
      // Create pending investment record
      const { error: investmentError } = await supabase
        .from('investments')
        .insert({
          user_id: user.id,
          property_id: property.id,
          amount: amount,
          payment_method: method,
          status: 'pending'
        });

      if (investmentError) throw investmentError;

      // Close payment modal
      setIsPaymentModalOpen(false);

      // Redirect based on payment method
      switch (method) {
        case 'card':
          navigate(`/payment/stripe/${property.id}`, { 
            state: { amount, investmentId: property.id } 
          });
          break;
        case 'paypal':
          navigate(`/payment/paypal/${property.id}`, { 
            state: { amount, investmentId: property.id } 
          });
          break;
        case 'crypto-eth':
          navigate(`/payment/crypto/${property.id}`, { 
            state: { amount, investmentId: property.id, currency: 'ETH' } 
          });
          break;
        case 'crypto-btc':
          navigate(`/payment/crypto/${property.id}`, { 
            state: { amount, investmentId: property.id, currency: 'BTC' } 
          });
          break;
        default:
          toast.error('Invalid payment method selected');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Failed to process payment. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center">Loading investment details...</div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center">Property not found</div>
        </div>
      </div>
    );
  }

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
          Back to property
        </Button>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-6">Invest in {property.title}</h1>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Investment Summary</h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property</span>
                  <span className="font-medium">{property.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span>{property.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Minimum Investment</span>
                  <span className="font-medium">AED {property.min_investment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected ROI</span>
                  <span className="font-medium text-green-600">{property.expected_roi}%</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleMakePayment} className="space-y-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Investment Amount (AED)
                </label>
                <Input
                  id="amount"
                  type="number"
                  min={property.min_investment}
                  step="500"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  placeholder={`Minimum ${property.min_investment.toLocaleString()} AED`}
                  className="w-full"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Investment amounts must be in increments of 500 AED.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12"
              >
                Make Payment
              </Button>
            </form>

            <div className="mt-6 text-sm text-gray-500">
              <p>
                By proceeding with the payment, you agree to our terms and conditions.
                Our team will contact you shortly to complete the investment process.
              </p>
            </div>
          </div>
        </div>
      </div>

      <PaymentOptionsModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={parseFloat(investmentAmount) || 0}
        onSelectPayment={handlePaymentMethodSelect}
      />
    </div>
  );
};

export default InvestmentPage; 