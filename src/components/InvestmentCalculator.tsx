import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  BarChart,
  LineChart,
  PieChart,
  DollarSign,
  TrendingUp,
  Percent,
} from "lucide-react";

interface InvestmentCalculatorProps {
  initialAmount?: number;
  minAmount?: number;
  maxAmount?: number;
  defaultYears?: number;
  expectedAnnualReturn?: number;
  comparisonInvestments?: Array<{
    name: string;
    annualReturn: number;
    color: string;
  }>;
}

const InvestmentCalculator = ({
  initialAmount = 5000,
  minAmount = 500,
  maxAmount = 100000,
  defaultYears = 5,
  expectedAnnualReturn = 8.5,
  comparisonInvestments = [
    { name: "Savings Account", annualReturn: 1.5, color: "#94a3b8" },
    { name: "Stock Market", annualReturn: 7.0, color: "#64748b" },
    { name: "Real Estate", annualReturn: 8.5, color: "#0ea5e9" },
  ],
}: InvestmentCalculatorProps) => {
  const [investmentAmount, setInvestmentAmount] =
    useState<number>(initialAmount);
  const [years, setYears] = useState<number>(defaultYears);
  const [returns, setReturns] = useState<{
    amount: number;
    profit: number;
    annualReturn: number;
    comparisons: Array<{
      name: string;
      finalAmount: number;
      profit: number;
      color: string;
    }>;
  }>({
    amount: 0,
    profit: 0,
    annualReturn: expectedAnnualReturn,
    comparisons: [],
  });

  // Calculate investment returns
  useEffect(() => {
    const calculateReturns = () => {
      // Calculate main investment return
      const finalAmount =
        investmentAmount * Math.pow(1 + expectedAnnualReturn / 100, years);
      const profit = finalAmount - investmentAmount;

      // Calculate comparison investments
      const comparisons = comparisonInvestments.map((investment) => {
        const comparisonFinalAmount =
          investmentAmount * Math.pow(1 + investment.annualReturn / 100, years);
        const comparisonProfit = comparisonFinalAmount - investmentAmount;

        return {
          name: investment.name,
          finalAmount: comparisonFinalAmount,
          profit: comparisonProfit,
          color: investment.color,
        };
      });

      setReturns({
        amount: finalAmount,
        profit: profit,
        annualReturn: expectedAnnualReturn,
        comparisons: comparisons,
      });
    };

    calculateReturns();
  }, [investmentAmount, years, expectedAnnualReturn, comparisonInvestments]);

  // Handle investment amount change from slider
  const handleAmountSliderChange = (value: number[]) => {
    setInvestmentAmount(value[0]);
  };

  // Handle investment amount change from input
  const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= minAmount && value <= maxAmount) {
      setInvestmentAmount(value);
    }
  };

  // Handle years change from slider
  const handleYearsSliderChange = (value: number[]) => {
    setYears(value[0]);
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-2">
            Investment Calculator
          </h2>
          <p className="text-gray-600">
            Calculate your potential returns on real estate investments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Investment Parameters</CardTitle>
              <CardDescription>Adjust your investment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Investment Amount */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">
                    Investment Amount
                  </label>
                  <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                    <DollarSign className="h-4 w-4 text-blue-500 mr-1" />
                    <span className="text-sm font-semibold text-blue-700">
                      {investmentAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
                <Slider
                  value={[investmentAmount]}
                  min={minAmount}
                  max={maxAmount}
                  step={500}
                  onValueChange={handleAmountSliderChange}
                  className="my-4"
                />
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <Input
                    type="number"
                    value={investmentAmount}
                    onChange={handleAmountInputChange}
                    min={minAmount}
                    max={maxAmount}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Investment Period */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">
                    Investment Period
                  </label>
                  <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                    <span className="text-sm font-semibold text-blue-700">
                      {years} {years === 1 ? "year" : "years"}
                    </span>
                  </div>
                </div>
                <Slider
                  value={[years]}
                  min={1}
                  max={20}
                  step={1}
                  onValueChange={handleYearsSliderChange}
                  className="my-4"
                />
              </div>

              {/* Expected Annual Return */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">
                    Expected Annual Return
                  </label>
                  <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                    <Percent className="h-4 w-4 text-blue-500 mr-1" />
                    <span className="text-sm font-semibold text-blue-700">
                      {expectedAnnualReturn}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Projected Returns</CardTitle>
              <CardDescription>
                Based on your investment parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Total Value */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <BarChart className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="text-sm font-medium text-blue-800">
                      Total Value
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-blue-700">
                    ${Math.round(returns.amount).toLocaleString()}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    After {years} {years === 1 ? "year" : "years"}
                  </p>
                </div>

                {/* Total Profit */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="text-sm font-medium text-green-800">
                      Total Profit
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-green-700">
                    ${Math.round(returns.profit).toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    {((returns.profit / investmentAmount) * 100).toFixed(1)}%
                    return on investment
                  </p>
                </div>
              </div>

              {/* Comparison Chart (Visual Representation) */}
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">
                  Investment Comparison
                </h3>
                <div className="space-y-3">
                  {returns.comparisons.map((comparison, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{comparison.name}</span>
                        <span className="text-sm font-medium">
                          ${Math.round(comparison.finalAmount).toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="h-2.5 rounded-full"
                          style={{
                            width: `${Math.min(100, (comparison.finalAmount / (maxAmount * 2)) * 100)}%`,
                            backgroundColor: comparison.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Start Investing Now
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
          <p className="font-medium mb-2">Important Information:</p>
          <p>
            The calculator provides estimates based on the given parameters.
            Actual returns may vary. Past performance is not indicative of
            future results. Please consult with a financial advisor before
            making investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator;
