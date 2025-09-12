"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch?: (category: string, model: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchModel, setSearchModel] = useState<string>("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(selectedCategory, searchModel);
    } else {
      // Default behavior - log to console
      console.log('Searching for:', { category: selectedCategory, model: searchModel });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-0 mb-8">
      <div className="bg-white rounded-lg shadow-lg p-6 border border-border">
        <h2 className="text-2xl font-semibold text-center mb-6 text-foreground">
          Find Your Perfect Vehicle
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          {/* Category Dropdown */}
          <div className="flex-1 space-y-2 w-full">
            <label htmlFor="category" className="text-sm font-medium text-foreground">
              Category
            </label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="hatchback">Hatchback</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Model Search Field */}
          <div className="flex-1 space-y-2 w-full">
            <label htmlFor="model" className="text-sm font-medium text-foreground">
              Model
            </label>
            <Input
              id="model"
              type="text"
              placeholder="Enter model name..."
              value={searchModel}
              onChange={(e) => setSearchModel(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Search Button */}
          <Button 
            onClick={handleSearch}
            className="w-full sm:w-auto px-8 py-2 h-10"
            size="lg"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
