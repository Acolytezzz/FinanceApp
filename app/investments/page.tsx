"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Stock = {
  id: number;
  symbol: string;
  shares: number;
  purchasePrice: number;
  currentPrice: number;
};

// Mock API call
const fetchStockPrice = async (symbol: string): Promise<number> => {
  // In a real application, this would be an API call to a stock price service
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
  return Math.random() * 1000; // Return a random price between 0 and 1000
};

const Investment = () => {
  const { data: session, status } = useSession();

  const user = session?.user;

  const [stocks, setStocks] = useState<Stock[]>([]);
  const [symbol, setSymbol] = useState("");
  const [shares, setShares] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");

  useEffect(() => {
    const savedStocks = localStorage.getItem("stocks");
    if (savedStocks) {
      setStocks(JSON.parse(savedStocks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("stocks", JSON.stringify(stocks));
  }, [stocks]);

  const addStock = async () => {
    if (!symbol || !shares || !purchasePrice) return;
    const currentPrice = await fetchStockPrice(symbol);
    const newStock: Stock = {
      id: Date.now(),
      symbol: symbol.toUpperCase(),
      shares: parseFloat(shares),
      purchasePrice: parseFloat(purchasePrice),
      currentPrice,
    };
    setStocks([...stocks, newStock]);
    setSymbol("");
    setShares("");
    setPurchasePrice("");
  };

  const updatePrices = async () => {
    const updatedStocks = await Promise.all(
      stocks.map(async (stock) => ({
        ...stock,
        currentPrice: await fetchStockPrice(stock.symbol),
      }))
    );
    setStocks(updatedStocks);
  };

  const totalValue = stocks.reduce(
    (sum, stock) => sum + stock.shares * stock.currentPrice,
    0
  );
  const totalCost = stocks.reduce(
    (sum, stock) => sum + stock.shares * stock.purchasePrice,
    0
  );
  const totalGain = totalValue - totalCost;

  if (status === "loading") {
    return <div className="text-center text-2xl text-white">Loading...</div>;
  } else if (status === "authenticated") {
    return (
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">Investment Tracker</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addStock();
                }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="symbol">Stock Symbol</Label>
                  <Input
                    id="symbol"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="Enter stock symbol"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="shares">Number of Shares</Label>
                  <Input
                    id="shares"
                    type="number"
                    value={shares}
                    onChange={(e) => setShares(e.target.value)}
                    placeholder="Enter number of shares"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="purchasePrice">Purchase Price</Label>
                  <Input
                    id="purchasePrice"
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    placeholder="Enter purchase price"
                    required
                  />
                </div>
                <Button type="submit">Add Stock</Button>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>Total Value: ${totalValue.toFixed(2)}</p>
                <p>Total Cost: ${totalCost.toFixed(2)}</p>
                <p
                  className={`font-bold ${
                    totalGain >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Total Gain/Loss: ${totalGain.toFixed(2)} (
                  {((totalGain / totalCost) * 100).toFixed(2)}%)
                </p>
              </div>
              <Button onClick={updatePrices} className="mt-4">
                Update Prices
              </Button>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Your Stocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stocks.map((stock) => {
                const currentValue = stock.shares * stock.currentPrice;
                const purchaseValue = stock.shares * stock.purchasePrice;
                const gain = currentValue - purchaseValue;
                const gainPercentage = (gain / purchaseValue) * 100;
                return (
                  <div key={stock.id} className="p-2 rounded bg-gray-100">
                    <p className="font-semibold">
                      {stock.symbol} - {stock.shares} shares
                    </p>
                    <p>Current Price: ${stock.currentPrice.toFixed(2)}</p>
                    <p>Purchase Price: ${stock.purchasePrice.toFixed(2)}</p>
                    <p
                      className={gain >= 0 ? "text-green-600" : "text-red-600"}
                    >
                      Gain/Loss: ${gain.toFixed(2)} ({gainPercentage.toFixed(2)}
                      %)
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } else if (status === "unauthenticated") {
    redirect("/login");
  }
};

export default Investment;
