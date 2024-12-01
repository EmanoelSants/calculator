import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calculator,
  Plus,
  Minus,
  X,
  Divide,
  Percent,
  RotateCcw,
  History,
} from "lucide-react";

type Operation = "+" | "-" | "*" | "/" | "%" | null;

const App: React.FC = () => {
  const [display, setDisplay] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation>(null);
  const [newNumber, setNewNumber] = useState<boolean>(true);
  const [calculationType, setCalculationType] = useState<
    "standard" | "scientific"
  >("standard");
  const [history, setHistory] = useState<string[]>([]);

  const clearCalculator = (): void => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleNumber = (num: string): void => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperation = (op: Operation): void => {
    const current = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setPreviousValue(result);
      setDisplay(result.toString());
    }

    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a: number, b: number, op: Operation): number => {
    let result: number;
    switch (op) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "*":
        result = a * b;
        break;
      case "/":
        result = a / b;
        break;
      case "%":
        result = a * (b / 100);
        break;
      default:
        result = b;
    }

    if (calculationType === "scientific") {
      result = Math.round(result * 100) / 100;
    }

    setHistory((prev) => [...prev, `${a} ${op} ${b} = ${result}`].slice(-5));
    return result;
  };

  const handleEquals = (): void => {
    if (previousValue !== null && operation) {
      const current = parseFloat(display);
      const result = calculate(previousValue, current, operation);
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md mx-auto bg-[#242525] p-6 rounded-3xl shadow-2xl border-[#475156]">
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between bg-[#475156]/20 p-3 rounded-xl gap-4 md:gap-0">
            <div className="flex items-center gap-2 text-[#41a8f0]">
              <Calculator className="w-6 h-6" />
              <Select
                value={calculationType}
                onValueChange={(value) => {
                  setCalculationType(value as "standard" | "scientific");
                  clearCalculator();
                }}
              >
                <SelectTrigger className="w-32 bg-[#475156] border-0 text-[#41a8f0] hover:bg-[#475156]/80 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#242525] border-[#475156]">
                  <SelectItem
                    value="standard"
                    className="text-[#41a8f0] hover:bg-[#475156]"
                  >
                    Padrão
                  </SelectItem>
                  <SelectItem
                    value="scientific"
                    className="text-[#41a8f0] hover:bg-[#475156]"
                  >
                    Científica
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-[#41a8f0]" />
              <div className="text-xs text-[#41a8f0] max-w-[150px] truncate">
                {history[history.length - 1]}
              </div>
            </div>
          </div>

          <div className="bg-[#475156] p-6 rounded-2xl shadow-inner border border-[#475156]/50">
            <div className="text-right text-4xl text-white overflow-hidden transition-all">
              {display}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <Button className="responsive-btn" onClick={clearCalculator}>
              <RotateCcw className="w-5 h-5" />
            </Button>
            <Button
              className="responsive-btn"
              onClick={() => handleOperation("%")}
            >
              <Percent className="w-5 h-5" />
            </Button>
            <Button
              className="responsive-btn"
              onClick={() => setDisplay((parseFloat(display) * -1).toString())}
            >
              +/-
            </Button>
            <Button
              className="responsive-btn bg-red-500/90 hover:bg-red-600"
              onClick={() => handleOperation("/")}
            >
              <Divide className="w-5 h-5" />
            </Button>

            {[7, 8, 9].map((num) => (
              <Button
                key={num}
                className="responsive-btn"
                onClick={() => handleNumber(num.toString())}
              >
                {num}
              </Button>
            ))}
            <Button
              className="responsive-btn bg-red-500/90 hover:bg-red-600"
              onClick={() => handleOperation("*")}
            >
              <X className="w-5 h-5" />
            </Button>

            {[4, 5, 6].map((num) => (
              <Button
                key={num}
                className="responsive-btn"
                onClick={() => handleNumber(num.toString())}
              >
                {num}
              </Button>
            ))}
            <Button
              className="responsive-btn bg-red-500/90 hover:bg-red-600"
              onClick={() => handleOperation("-")}
            >
              <Minus className="w-5 h-5" />
            </Button>

            {[1, 2, 3].map((num) => (
              <Button
                key={num}
                className="responsive-btn"
                onClick={() => handleNumber(num.toString())}
              >
                {num}
              </Button>
            ))}
            <Button
              className="responsive-btn bg-red-500/90 hover:bg-red-600"
              onClick={() => handleOperation("+")}
            >
              <Plus className="w-5 h-5" />
            </Button>

            <Button
              className="responsive-btn col-span-2"
              onClick={() => handleNumber("0")}
            >
              0
            </Button>
            <Button
              className="responsive-btn"
              onClick={() => handleNumber(".")}
            >
              .
            </Button>
            <Button
              className="responsive-btn bg-[#41a8f0] hover:bg-[#3090d0]"
              onClick={handleEquals}
            >
              =
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
