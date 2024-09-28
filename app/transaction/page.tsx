"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Transaction = {
  id: number;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
  createdAt: string;
};

const SpendingTransaction = () => {
  const { data: session, status } = useSession();

  const id = session?.user?.id;

  if (status === "unauthenticated") {
    redirect("/login");
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch(`/api/spending/${id}`);
      const data = await response.json();
      setTransactions(data.transactions);
    };
    fetchTransactions();
  }, [id]);

  console.log(transactions);

  const addTransaction = async () => {
    if (!amount || !category || !type) {
      return alert("All Fields are required");
    }

    const res = await fetch(`/api/spending/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: parseInt(amount), category, type }),
    });
    if (res.status === 200) {
      const data = await res.json();
      alert(data.message);
    } else {
      alert("Error posting user");
    }
  };

  const totalIncome = transactions
    ?.filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    ?.filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Spending Tracker</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={addTransaction}>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Enter category"
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={type}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Add Transaction</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>Total Income: ${totalIncome?.toFixed(2)}</p>
              <p>Total Expenses: ${totalExpenses?.toFixed(2)}</p>
              <p
                className={`font-bold ${
                  balance >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                Balance: ${balance.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent SpendingTransaction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {transactions
              ?.slice()
              .reverse()
              .map((transaction) => (
                <div
                  key={transaction.id}
                  className={`p-2 rounded ${
                    transaction.type === "income"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  <p className="font-semibold">{transaction.category}</p>
                  <p>
                    ${transaction.amount.toFixed(2)} -{" "}
                    {transaction.createdAt.split("T")[0]}
                  </p>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpendingTransaction;
