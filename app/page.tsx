"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Welcome to FinTrack</h1>
      <p className="text-xl text-center text-gray-200">
        Your personal finance companion
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Track Your Spending</CardTitle>
            <CardDescription>
              Monitor your daily expenses and income
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DollarSign className="w-12 h-12 text-blue-500 mb-4" />
            <p className="mb-4">
              Keep a close eye on where your money goes and stay within your
              budget.
            </p>

            <Button asChild>
              <Link href="/spending">
                Go to Spending <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manage Investments</CardTitle>
            <CardDescription>Track your stock portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <TrendingUp className="w-12 h-12 text-green-500 mb-4" />
            <p className="mb-4">
              Monitor your stock investments and track their performance over
              time.
            </p>
            <Button asChild>
              <Link href="/investments">
                Go to Investments <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
