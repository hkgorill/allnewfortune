import { NextResponse } from "next/server";
import { fortuneData } from "@/app/lib/fortuneData";

// Simple hash function to generate a seed from a string
function getHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Function to select an item from an array based on a seed
function selectItem<T>(array: T[], seed: number, modifier: number = 0): T {
  const index = (seed + modifier) % array.length;
  return array[index];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { birthdate, name, gender, birthtime } = body;

    if (!birthdate) {
      return NextResponse.json(
        { error: "Birthdate is required" },
        { status: 400 }
      );
    }

    // Create a unique seed based on the user's input.
    // Using birthdate and name ensures that the same person gets the same result (consistency).
    // If name is not provided, we use a default string, so birthdate becomes the main factor.
    // We also include the year 2026 to ensure the fortune changes next year.
    const seedString = `${birthdate}-${name || "anonymous"}-${
      gender || "none"
    }-${birthtime || "unknown"}-2026`;
    const seed = getHash(seedString);

    // Deterministically select fortune data based on the seed
    // We use different modifiers (primes or arbitrary numbers) to pick different items for each category
    const overall = selectItem(fortuneData.overall, seed, 1);
    const money = selectItem(fortuneData.money, seed, 2);
    const love = selectItem(fortuneData.love, seed, 3);
    const health = selectItem(fortuneData.health, seed, 4);
    const advice = selectItem(fortuneData.advice, seed, 5);
    const lucky_color = selectItem(fortuneData.lucky_color, seed, 6);
    const lucky_item = selectItem(fortuneData.lucky_item, seed, 7);

    // Simulate a slight network delay to make the "Loading" animation feel natural
    // (Optional, but good for UX so the loading screen doesn't flash too quickly)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const result = {
      overall,
      money,
      love,
      health,
      advice,
      lucky_color,
      lucky_item,
      illustration: "/globe.svg", // Placeholder
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in fortune API:", error);
    return NextResponse.json(
      { error: "Failed to generate fortune" },
      { status: 500 }
    );
  }
}
